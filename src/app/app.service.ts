import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "src/services/email/email.service";

@Injectable()
export class AppService {
  private readonly encryptionKey: string;
  private readonly partnerEmail: string;
    constructor(private readonly configService: ConfigService, private readonly emailService: EmailService) {
        this.encryptionKey = this.configService.get<string>('CTRL_REST_BUILD');
        this.partnerEmail = this.configService.get<string>('AWS_SES_FROM_EMAIL');
        // this.checkEmailTemplate()
    }


    async checkEmailTemplate(){
        await this.emailService.sendTemplatedEmail({
        to: "walkwelrajan@gmail.com",
        from: this.partnerEmail,
        templateKey: 'franchise_approved',
        variables: {
            name: 'Rajan Walkwel',
        },
      });

    }

    
    getHello(): string {
        return `Hello World!  Deployment check 22222${this.encryptionKey}`;
    }
}