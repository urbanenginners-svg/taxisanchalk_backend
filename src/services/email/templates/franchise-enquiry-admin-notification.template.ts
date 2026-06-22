import { renderTemplate } from './template.renderer';

const SUBJECT_TEMPLATE = '{{title}}';

const BODY_TEMPLATE = `
<!doctype html>
<html>
  <body style="font-family: Arial, sans-serif; color: #1f2937;">
    <h2 style="margin-bottom: 16px;">{{title}}</h2>
    <p style="margin: 0 0 16px;">A new franchise enquiry has been submitted with the following details:</p>
    <table cellpadding="8" cellspacing="0" border="1" style="border-collapse: collapse; width: 100%; max-width: 720px; border-color: #d1d5db;">
      <tr><td><strong>Full Name</strong></td><td>{{fullName}}</td></tr>
      <tr><td><strong>Phone Number</strong></td><td>{{phoneNumber}}</td></tr>
      <tr><td><strong>Email Address</strong></td><td>{{emailAddress}}</td></tr>
      <tr><td><strong>Investment Range</strong></td><td>{{investmentRange}}</td></tr>
      <tr><td><strong>Society Name</strong></td><td>{{societyName}}</td></tr>
      <tr><td><strong>Location Access</strong></td><td>{{locationAccess}}</td></tr>
      <tr><td><strong>Expected Start Timeline</strong></td><td>{{expectedStartTimeline}}</td></tr>
      <tr><td><strong>Professional Background</strong></td><td>{{professionalBackground}}</td></tr>
      <tr><td><strong>Investment Comfort</strong></td><td>{{investmentComfort}}</td></tr>
      <tr><td><strong>Monthly Income Range</strong></td><td>{{monthlyIncomeRange}}</td></tr>
      <tr><td><strong>Submitted At</strong></td><td>{{submittedAt}}</td></tr>
    </table>
  </body>
</html>
`;

export function franchiseEnquiryAdminNotificationTemplate(variables: Record<string, string>) {
  return {
    subject: renderTemplate(SUBJECT_TEMPLATE, variables),
    html: renderTemplate(BODY_TEMPLATE, variables),
  };
}
