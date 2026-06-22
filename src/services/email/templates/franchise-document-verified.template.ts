import { renderTemplate } from './template.renderer';

const SUBJECT_TEMPLATE =
  'Your Documents Have Been Verified – SBZEE';

const BODY_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Your Documents Have Been Verified – SBZEE</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body, html {
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      background-color: #f0f4f0;
      font-family: 'Inter', Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img   { border: 0; outline: none; text-decoration: none; display: block; }
    a     { color: #21bf6b; text-decoration: none; }

    .email-wrapper {
      width: 100%;
      background-color: #f0f4f0;
      padding: 40px 16px;
    }

    .email-container {
      max-width: 580px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    }

    .header-strip {
      height: 5px;
      background: linear-gradient(90deg, #21bf6b, #17a05a);
    }

    .header {
      background: linear-gradient(145deg, #21bf6b 0%, #17a05a 60%, #0e8549 100%);
      padding: 40px 40px 32px;
      text-align: center;
    }

    .logo-text {
      font-size: 28px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.5px;
    }

    .logo-dot {
      color: rgba(255,255,255,0.6);
    }

    .header-title {
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      margin-top: 16px;
    }

    .header-subtitle {
      font-size: 14px;
      color: rgba(255,255,255,0.75);
      margin-top: 6px;
    }

    .body {
      padding: 36px 40px;
    }

    .greeting {
      font-size: 16px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 12px;
    }

    .body-text {
      font-size: 15px;
      color: #4b5563;
      line-height: 1.7;
      margin-bottom: 12px;
    }

    .badge {
      display: inline-block;
      background-color: #e8faf1;
      color: #17a05a;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 100px;
      margin-bottom: 24px;
      border: 1px solid #b6ecd4;
    }

    .info-box {
      background-color: #f8fafb;
      border-left: 4px solid #21bf6b;
      border-radius: 0 10px 10px 0;
      padding: 16px 20px;
      margin: 24px 0;
    }

    .info-box-text {
      font-size: 13.5px;
      color: #374151;
      line-height: 1.6;
    }

    .divider {
      border: none;
      border-top: 1px solid #f0f0f0;
      margin: 28px 0;
    }

    .cta-wrapper { text-align: center; margin: 32px 0 24px; }

    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #21bf6b, #17a05a);
      color: #ffffff !important;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      padding: 14px 36px;
      border-radius: 10px;
      box-shadow: 0 4px 16px rgba(33, 191, 107, 0.35);
      letter-spacing: 0.2px;
    }

    .footer {
      background-color: #f8fafb;
      padding: 28px 40px;
      text-align: center;
      border-top: 1px solid #f0f0f0;
    }

    .footer-brand {
      font-size: 16px;
      font-weight: 800;
      color: #21bf6b;
      margin-bottom: 8px;
    }

    .footer-links {
      margin: 10px 0;
    }

    .footer-link {
      font-size: 12px;
      color: #21bf6b !important;
      text-decoration: none;
      margin: 0 10px;
    }

    .footer-text {
      font-size: 12px;
      color: #9ca3af;
      line-height: 1.6;
      margin-top: 8px;
    }

    .footer-copy {
      font-size: 11px;
      color: #d1d5db;
      margin-top: 14px;
    }

    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 20px 10px; }
      .header        { padding: 28px 24px 24px; }
      .body          { padding: 28px 24px; }
      .footer        { padding: 24px 20px; }
      .header-title  { font-size: 19px; }
      .cta-button    { padding: 13px 28px; font-size: 14px; }
    }
  </style>
</head>
<body>

<div class="email-wrapper">
  <table class="email-container" width="100%" cellpadding="0" cellspacing="0" role="presentation">

    <!-- Top accent strip -->
    <tr>
      <td class="header-strip"></td>
    </tr>

    <!-- HEADER -->
    <tr>
      <td class="header">

        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:24px;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="height:72px;">
                    <img src="https://partner.sbzee.com/assets/LogoWhite-CJzTs3Wu.svg" alt="SBZEE Logo" style="width:100%;height:100%;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <div class="header-title">Documents Verified Successfully</div>
        <div class="header-subtitle">Your franchise onboarding is moving forward</div>

      </td>
    </tr>

    <!-- BODY -->
    <tr>
      <td class="body">

        <div class="badge">&#10003;&nbsp; Verification Complete</div>

        <p class="greeting">Hi {{name}},</p>

        <p class="body-text">
          We are pleased to inform you that your submitted documents have been
          <strong style="color:#111827;">successfully verified</strong> by our team.
        </p>

        <p class="body-text">
          Your application is now progressing to the next stage of the
          <strong style="color:#111827;">SBZEE Franchise onboarding process</strong>.
          Our team will soon connect with you regarding the final steps and setup.
        </p>

        <div class="info-box">
          <p class="info-box-text">
            &#128276;&nbsp; <strong>What's next?</strong><br/>
            Our team will reach out to you shortly with details on the final onboarding steps.
            Please keep an eye on your registered email and phone number.
          </p>
        </div>

        <!-- Timeline -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:28px 0;">
          <tr>
            <td>
              <!-- Step 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:8px;">
                <tr>
                  <td width="32" valign="middle">
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="width:24px;height:24px;background:#21bf6b;border-radius:50%;text-align:center;vertical-align:middle;">
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;">
                            <path d="M2 7L5 10L11 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="padding-left:12px;padding-bottom:10px;border-bottom:1px solid #f3f4f6;">
                    <span style="font-size:14px;font-weight:600;color:#21bf6b;">Application Submitted</span>
                  </td>
                </tr>
              </table>

              <!-- Step 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:8px;">
                <tr>
                  <td width="32" valign="middle">
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="width:24px;height:24px;background:#21bf6b;border-radius:50%;text-align:center;vertical-align:middle;">
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;">
                            <path d="M2 7L5 10L11 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="padding-left:12px;padding-bottom:10px;border-bottom:1px solid #f3f4f6;">
                    <span style="font-size:14px;font-weight:600;color:#21bf6b;">Documents Submitted</span>
                  </td>
                </tr>
              </table>

              <!-- Step 3 — CURRENT (verified) -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:8px;">
                <tr>
                  <td width="32" valign="middle">
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="width:24px;height:24px;background:#21bf6b;border-radius:50%;text-align:center;vertical-align:middle;">
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;">
                            <path d="M2 7L5 10L11 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="padding-left:12px;padding-bottom:10px;border-bottom:1px solid #f3f4f6;">
                    <span style="font-size:14px;font-weight:700;color:#21bf6b;">Verification Complete &#10004;</span>
                    <span style="display:block;font-size:12px;color:#6b7280;margin-top:1px;">Your documents have been approved</span>
                  </td>
                </tr>
              </table>

              <!-- Step 4 — NEXT -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:8px;">
                <tr>
                  <td width="32" valign="middle">
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="width:24px;height:24px;border:2px solid #d1d5db;border-radius:50%;background:#fff;text-align:center;vertical-align:middle;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                  <td style="padding-left:12px;padding-bottom:10px;border-bottom:1px solid #f3f4f6;">
                    <span style="font-size:14px;font-weight:400;color:#9ca3af;">Final Steps &amp; Setup</span>
                  </td>
                </tr>
              </table>

              <!-- Step 5 -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td width="32" valign="middle">
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="width:24px;height:24px;border:2px solid #d1d5db;border-radius:50%;background:#fff;text-align:center;vertical-align:middle;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                  <td style="padding-left:12px;">
                    <span style="font-size:14px;font-weight:400;color:#9ca3af;">Access Granted</span>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>

        <!-- CTA Button -->
        <div class="cta-wrapper">
          <a href="https://partner.sbzee.com/login" class="cta-button" target="_blank">
            Go to My Dashboard &rarr;
          </a>
        </div>

        <hr class="divider" />

        <p class="body-text">
          Thank you for your cooperation and prompt document submission. We look forward to welcoming you as a valued SBZEE franchise partner.
        </p>

        <p style="font-size:15px;color:#374151;line-height:1.7;margin-top:16px;">
          Warm regards,<br/>
          <strong style="color:#111827;">Team SBZEE</strong><br/>
          <span style="font-size:13px;color:#9ca3af;">Franchise Onboarding Division</span>
        </p>

      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td class="footer">

        <div class="footer-brand">SBZEE.</div>

        <div class="footer-links">
          <a href="https://sbzee.in" class="footer-link" target="_blank">Website</a>
          <a href="mailto:support@sbzee.in" class="footer-link">Support</a>
          <a href="https://franchise.sbzee.in" class="footer-link" target="_blank">Franchise Portal</a>
        </div>

        <p class="footer-text">
          Questions? Write to us at
          <a href="mailto:support@sbzee.in" style="color:#21bf6b;font-weight:600;">support@sbzee.in</a>
        </p>

        <p class="footer-copy">
          &copy; 2026 SBZEE. All rights reserved.<br/>
          You are receiving this email because you applied for an SBZEE Franchise.
        </p>

      </td>
    </tr>

    <!-- Bottom accent strip -->
    <tr>
      <td style="height:4px;background:linear-gradient(90deg,#21bf6b,#17a05a);"></td>
    </tr>

  </table>
</div>

</body>
</html>`;

export function franchiseDocumentVerifiedTemplate(
  variables: Record<string, string>,
) {
  return {
    subject: renderTemplate(SUBJECT_TEMPLATE, variables),
    html: renderTemplate(BODY_TEMPLATE, variables),
  };
}
