import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SendEmailCommand, SendRawEmailCommand, SESClient } from '@aws-sdk/client-ses';

import { AppConfigService } from 'src/services/env/env.service';
import { EMAIL_TEMPLATE_MAPPINGS } from './email.constants';
import { EmailTemplateMapping } from './types/email-template-mapping.type';

type SendTemplatedEmailParams = {
  to: string | string[];
  templateKey: string;
  variables: Record<string, string>;
  cc?: string[];
  bcc?: string[];
  replyTo?: string[];
  from?: string;
};

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly sesClient: SESClient;
  private readonly defaultFromEmail?: string;

  constructor(
    private readonly config: AppConfigService,
    @Inject(EMAIL_TEMPLATE_MAPPINGS)
    private readonly templateMappings: EmailTemplateMapping,
  ) {
    const region =
      (this.config.get('AWS_SES_REGION') as string) ||
      (this.config.get('AWS_REGION') as string) ||
      'us-east-1';

    this.defaultFromEmail =
      (this.config.get('AWS_SES_NOREPLY_EMAIL') as string) ||
      'no-reply@sbzee.com';

    this.sesClient = new SESClient({
      region,
      credentials: {
        accessKeyId: this.config.get('AWS_ACCESS_KEY_ID') as string,
        secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY') as string,
      },
    });
  }

  async sendTemplatedEmail(params: SendTemplatedEmailParams): Promise<void> {
    const toAddresses = Array.isArray(params.to) ? params.to : [params.to];
    const templateBuilder = this.templateMappings[params.templateKey];

    if (!templateBuilder) {
      throw new BadRequestException(
        `Email template mapping not found for key: ${params.templateKey}`,
      );
    }

    const fromEmail = params.from || this.defaultFromEmail;
    if (!fromEmail) {
      throw new BadRequestException(
        'Missing sender email. Set AWS_SES_NOREPLY_EMAIL or provide from in request.',
      );
    }

    const { subject, html } = templateBuilder(params.variables);

    try {
      await this.sesClient.send(
        new SendEmailCommand({
          Source: fromEmail,
          Destination: {
            ToAddresses: toAddresses,
            CcAddresses: params.cc,
            BccAddresses: params.bcc,
          },
          ReplyToAddresses: params.replyTo,
          Message: {
            Subject: {
              Charset: 'UTF-8',
              Data: subject,
            },
            Body: {
              Html: {
                Charset: 'UTF-8',
                Data: html,
              },
            },
          },
        }),
      );
    } catch (error) {
      this.logger.error(
        `Failed sending SES email for template ${params.templateKey}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException(
        'Unable to send email right now. Please try again later.',
      );
    }
  }

  /**
   * Sends an email with a single CSV file attachment via AWS SES SendRawEmailCommand.
   */
  async sendEmailWithCsvAttachment(params: {
    to: string | string[];
    subject: string;
    htmlBody: string;
    csvBuffer: Buffer;
    csvFilename: string;
    from?: string;
  }): Promise<void> {
    const toAddresses = Array.isArray(params.to) ? params.to : [params.to];
    const fromEmail = params.from || this.defaultFromEmail;

    if (!fromEmail) {
      throw new BadRequestException(
        'Missing sender email. Set AWS_SES_NOREPLY_EMAIL or provide from in request.',
      );
    }

    const boundary = `sbzee_boundary_${Date.now()}`;
    const csvBase64 = params.csvBuffer.toString('base64');

    const rawMessage = [
      `From: ${fromEmail}`,
      `To: ${toAddresses.join(', ')}`,
      `Subject: ${params.subject}`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset=UTF-8',
      'Content-Transfer-Encoding: quoted-printable',
      '',
      params.htmlBody,
      '',
      `--${boundary}`,
      `Content-Type: text/csv; name="${params.csvFilename}"`,
      'Content-Transfer-Encoding: base64',
      `Content-Disposition: attachment; filename="${params.csvFilename}"`,
      '',
      csvBase64,
      '',
      `--${boundary}--`,
    ].join('\r\n');

    try {
      await this.sesClient.send(
        new SendRawEmailCommand({
          RawMessage: { Data: Buffer.from(rawMessage) },
        }),
      );
    } catch (error) {
      this.logger.error(
        `Failed sending SES raw email with attachment "${params.csvFilename}"`,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException(
        'Unable to send email with attachment right now. Please try again later.',
      );
    }
  }
}
