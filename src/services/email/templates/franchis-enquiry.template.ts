import { renderTemplate } from './template.renderer';
const SUBJECT_TEMPLATE = '{{title}}';

const BODY_TEMPLATE =  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>Thank you for your interest in Sbzee Franchise Partnership</title>
    <!--[if mso]>
      <style type="text/css">
        body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }
      </style>
    <![endif]-->
    <style>
      /* Client-specific resets */
      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; display: block; }
      table { border-collapse: collapse !important; }
      body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f8fafb; }
      a { color: #21bf6b; text-decoration: none; }

      /* Mobile */
      @media screen and (max-width: 620px) {
        .email-container { width: 100% !important; }
        .px-32 { padding-left: 24px !important; padding-right: 24px !important; }
        .py-40 { padding-top: 28px !important; padding-bottom: 28px !important; }
        .h1 { font-size: 22px !important; line-height: 30px !important; }
        .body-text { font-size: 15px !important; line-height: 24px !important; }
      }
    </style>
  </head>
  <body style="margin:0; padding:0; background-color:#f8fafb;">
    <!-- Preheader (hidden preview text) -->
    <div style="display:none; font-size:1px; color:#f8fafb; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
      We've received your Sbzee EV Cart Franchise application. Our team will reach out shortly.
    </div>

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#f8fafb;">
      <tr>
        <td align="center" style="padding: 32px 16px;">
          <!-- Card -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="email-container"
                 style="width:600px; max-width:600px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);">

            <!-- Brand bar -->
            <tr>
              <td style="background-color:#21bf6b; height:6px; line-height:6px; font-size:0;">&nbsp;</td>
            </tr>

            <!-- Header / Logo -->
            <tr>
              <td align="left" class="px-32" style="padding: 28px 40px 8px 40px; background-color:#ffffff;">
                <!-- Replace the src below with a hosted PNG export of LogoGreen.svg -->
                <img src="https://dev.partner.sbzee.com/assets/LogoGreen-CKXCRMgY.svg" width="120" height="60" alt="Sbzee"
                     style="display:block; border:0; outline:none; text-decoration:none; height:auto; width:120px;" />
              </td>
            </tr>

            <!-- Hero / Title -->
            <tr>
              <td class="px-32 py-40" style="padding: 24px 40px 8px 40px; background-color:#ffffff;">
                <h1 class="h1" style="margin:0; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:24px; line-height:32px; font-weight:800; color:#111827; letter-spacing:-0.2px;">
                  Thank you for your interest in Sbzee Franchise Partnership
                </h1>
                <p class="body-text" style="margin: 12px 0 0 0; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:24px; color:#4b5563;">
                  Hi <strong style="color:#111827;">{{Name}}</strong>,
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td class="px-32" style="padding: 12px 40px 8px 40px; background-color:#ffffff;">
                <p class="body-text" style="margin:0 0 14px 0; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:24px; color:#374151;">
                  Thank you for applying for the <strong style="color:#111827;">Sbzee EV Cart Franchise Partnership</strong> opportunity.
                </p>
                <p class="body-text" style="margin:0 0 14px 0; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:24px; color:#374151;">
                  We have received your details successfully. Our team will review your application and connect with you shortly to understand your interest, investment readiness, and location feasibility.
                </p>
                <p class="body-text" style="margin:0 0 14px 0; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:24px; color:#374151;">
                  Please keep your phone available for a quick discussion.
                </p>
                <p class="body-text" style="margin:0 0 4px 0; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:24px; color:#374151;">
                  In the meantime, if you have any immediate questions, feel free to simply reply to this email — we're happy to help.
                </p>
              </td>
            </tr>

            <!-- Highlight strip (brand tint) -->
            <tr>
              <td class="px-32" style="padding: 20px 40px 8px 40px; background-color:#ffffff;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
                       style="background-color:#e8faf1; border-radius:12px;">
                  <tr>
                    <td style="padding: 16px 18px; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:14px; line-height:22px; color:#1aab5f;">
                      <strong style="color:#1aab5f;">What happens next?</strong><br />
                      <span style="color:#166e44;">Our partnerships team typically reaches out within 1–2 business days to schedule a short discovery call.</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Closing / Signature -->
            <tr>
              <td class="px-32" style="padding: 20px 40px 28px 40px; background-color:#ffffff;">
                <p class="body-text" style="margin:0 0 4px 0; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:24px; color:#374151;">
                  We look forward to speaking with you.
                </p>
                <p style="margin:18px 0 0 0; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:15px; line-height:22px; color:#111827;">
                  Best regards,<br />
                  <strong style="color:#111827;">Team Sbzee</strong>
                </p>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding: 0 40px;">
                <div style="height:1px; line-height:1px; font-size:0; background-color:#eef2f5;">&nbsp;</div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" class="px-32" style="padding: 20px 40px 28px 40px; background-color:#ffffff;">
                <p style="margin:0 0 6px 0; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:12px; line-height:18px; color:#9ca3af;">
                  &copy; {{Year}} Sbzee. All rights reserved.
                </p>
                <p style="margin:0; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:12px; line-height:18px; color:#9ca3af;">
                  This is an automated confirmation for your franchise enquiry submission.
                </p>
              </td>
            </tr>
          </table>
          <!-- /Card -->

          <!-- Spacer below card -->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="email-container" style="width:600px; max-width:600px;">
            <tr>
              <td align="center" style="padding: 16px 16px 0 16px; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:11px; line-height:16px; color:#9ca3af;">
                You're receiving this email because you submitted a franchise enquiry on the Sbzee website.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

export function franchiseEnquiryTemplate(variables: Record<string, string>) {
    return {
      subject: renderTemplate(SUBJECT_TEMPLATE, variables),
      html: renderTemplate(BODY_TEMPLATE, variables),
    };
  }
  