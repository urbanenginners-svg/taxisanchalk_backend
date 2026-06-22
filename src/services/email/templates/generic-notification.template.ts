import { renderTemplate } from './template.renderer';

const SUBJECT_TEMPLATE = '{{title}}';

const BODY_TEMPLATE = `
<!doctype html>
<html>
  <body style="font-family: Arial, sans-serif; color: #1f2937;">
    <h2 style="margin-bottom: 8px;">{{title}}</h2>
    <p style="margin: 0 0 16px;">Hello {{name}},</p>
    <p style="margin: 0 0 12px;">{{message}}</p>
    <p style="margin: 0;">Regards,<br/>{{teamName}}</p>
  </body>
</html>
`;

export function genericNotificationTemplate(variables: Record<string, string>) {
  return {
    subject: renderTemplate(SUBJECT_TEMPLATE, variables),
    html: renderTemplate(BODY_TEMPLATE, variables),
  };
}
