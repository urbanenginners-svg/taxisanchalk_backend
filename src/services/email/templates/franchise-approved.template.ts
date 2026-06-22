import { renderTemplate } from './template.renderer';

const SUBJECT_TEMPLATE =
  'Welcome to SBZEE – You\'re Now an Official Franchise Partner';

const BODY_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Welcome to SBZEE – You're Now an Official Franchise Partner</title>
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
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

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

    /* ── Header ── */
    .header {
      background: linear-gradient(145deg, #21bf6b 0%, #17a05a 60%, #0e8549 100%);
      padding: 44px 40px 36px;
      text-align: center;
      position: relative;
    }

    .logo-text {
      font-size: 28px;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: -0.5px;
    }

    .logo-dot { color: rgba(255,255,255,0.55); }

    .header-divider {
      width: 40px;
      height: 3px;
      background: rgba(255,255,255,0.4);
      border-radius: 2px;
      margin: 20px auto 22px;
    }

    .header-badge {
      display: inline-block;
      background: rgba(255,255,255,0.18);
      border: 1.5px solid rgba(255,255,255,0.35);
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      padding: 5px 16px;
      border-radius: 100px;
      margin-bottom: 20px;
    }

    .header-title {
      font-size: 26px;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.3;
      margin-bottom: 10px;
    }

    .header-subtitle {
      font-size: 14px;
      color: rgba(255,255,255,0.75);
      line-height: 1.6;
    }

    /* Trophy/Icon row */
    .trophy-cell {
      width: 80px;
      height: 80px;
      background: rgba(255,255,255,0.18);
      border-radius: 50%;
      border: 2px solid rgba(255,255,255,0.35);
      text-align: center;
      vertical-align: middle;
      font-size: 36px;
      line-height: 80px;
    }

    /* ── Stats row ── */
    .stats-row {
      background: #f8fafb;
      border-bottom: 1px solid #f0f0f0;
    }

    .stat-cell {
      padding: 20px 0;
      text-align: center;
      border-right: 1px solid #f0f0f0;
    }

    .stat-cell:last-child { border-right: none; }

    .stat-number {
      font-size: 22px;
      font-weight: 800;
      color: #21bf6b;
    }

    .stat-label {
      font-size: 11px;
      color: #9ca3af;
      font-weight: 500;
      margin-top: 2px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* ── Body ── */
    .body {
      padding: 36px 40px;
    }

    .greeting {
      font-size: 17px;
      font-weight: 700;
      color: #111827;
      margin-bottom: 4px;
    }

    .congrats-line {
      font-size: 15px;
      font-weight: 600;
      color: #21bf6b;
      margin-bottom: 16px;
    }

    .body-text {
      font-size: 15px;
      color: #4b5563;
      line-height: 1.75;
      margin-bottom: 14px;
    }

    /* ── Next Steps ── */
    .section-title {
      font-size: 13px;
      font-weight: 700;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin: 28px 0 16px;
    }

    .step-card {
      background: #f8fafb;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 16px 18px;
      margin-bottom: 10px;
    }

    .step-icon-cell {
      width: 40px;
      height: 40px;
      background: #e8faf1;
      border-radius: 10px;
      text-align: center;
      vertical-align: middle;
      font-size: 18px;
      line-height: 40px;
    }

    .step-title {
      font-size: 14px;
      font-weight: 700;
      color: #111827;
    }

    .step-desc {
      font-size: 12.5px;
      color: #6b7280;
      margin-top: 2px;
      line-height: 1.5;
    }

    /* ── Welcome highlight box ── */
    .highlight-box {
      background: linear-gradient(135deg, #e8faf1 0%, #d1f5e3 100%);
      border: 1.5px solid #b6ecd4;
      border-radius: 12px;
      padding: 20px 22px;
      margin: 24px 0;
      text-align: center;
    }

    .highlight-text {
      font-size: 15px;
      font-weight: 600;
      color: #0e8549;
      line-height: 1.6;
    }

    .highlight-sub {
      font-size: 13px;
      color: #17a05a;
      margin-top: 4px;
    }

    /* ── CTA Button ── */
    .cta-wrapper { text-align: center; margin: 32px 0 8px; }

    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #21bf6b, #17a05a);
      color: #ffffff !important;
      font-size: 15px;
      font-weight: 700;
      text-decoration: none;
      padding: 15px 40px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(33, 191, 107, 0.38);
      letter-spacing: 0.2px;
    }

    .cta-note {
      text-align: center;
      font-size: 12px;
      color: #9ca3af;
      margin-top: 10px;
    }

    /* ── Divider ── */
    .divider {
      border: none;
      border-top: 1px solid #f0f0f0;
      margin: 28px 0;
    }

    /* ── Sign-off ── */
    .signoff-text {
      font-size: 15px;
      color: #374151;
      line-height: 1.75;
    }

    /* ── Footer ── */
    .footer {
      background-color: #f8fafb;
      padding: 28px 40px;
      text-align: center;
      border-top: 1px solid #f0f0f0;
    }

    .footer-brand {
      font-size: 18px;
      font-weight: 900;
      color: #21bf6b;
      margin-bottom: 6px;
    }

    .footer-tagline {
      font-size: 12px;
      color: #9ca3af;
      margin-bottom: 12px;
    }

    .footer-link {
      font-size: 12px;
      color: #21bf6b !important;
      text-decoration: none;
      margin: 0 10px;
    }

    .footer-copy {
      font-size: 11px;
      color: #d1d5db;
      margin-top: 14px;
      line-height: 1.6;
    }

    /* ── Mobile ── */
    @media only screen and (max-width: 600px) {
      .email-wrapper  { padding: 20px 10px; }
      .header         { padding: 32px 24px 28px; }
      .body           { padding: 28px 24px; }
      .footer         { padding: 24px 20px; }
      .header-title   { font-size: 21px; }
      .cta-button     { padding: 14px 30px; font-size: 14px; }
      .stat-number    { font-size: 18px; }
    }
  </style>
</head>
<body>

<div class="email-wrapper">
<table class="email-container" width="100%" cellpadding="0" cellspacing="0" role="presentation">

  <!-- Top accent strip -->
  <tr>
    <td style="height:5px;background:linear-gradient(90deg,#21bf6b,#17a05a);"></td>
  </tr>

  <!-- ═══════════════ HEADER ═══════════════ -->
  <tr>
    <td class="header">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center" style="padding-bottom:20px;">
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

      <div class="header-badge">&#10022; Official Franchise Partner &#10022;</div>

      <div class="header-title">
        Welcome to the SBZEE Family!
      </div>
      <div class="header-subtitle">
        You have successfully completed all onboarding steps.
      </div>

    </td>
  </tr>

  <!-- ═══════════════ STATS ROW ═══════════════ -->
  <tr>
    <td class="stats-row">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td class="stat-cell" width="33%">
            <div class="stat-number">10+</div>
            <div class="stat-label">Partners</div>
          </td>
          <td class="stat-cell" width="34%">
            <div class="stat-number">99%</div>
            <div class="stat-label">Uptime</div>
          </td>
          <td class="stat-cell" width="33%">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Support</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ═══════════════ BODY ═══════════════ -->
  <tr>
    <td class="body">

      <p class="greeting">Hi {{name}},</p>
      <p class="congrats-line">Congratulations and welcome aboard! &#127881;</p>

      <p class="body-text">
        We are <strong style="color:#111827;">delighted to inform you</strong> that you have
        successfully completed all onboarding steps and are now an
        <strong style="color:#111827;">official SBZEE Franchise Partner</strong>.
      </p>

      <p class="body-text">
        We are excited to have you as part of the SBZEE network and look forward to
        building a successful journey together.
      </p>

      <!-- Highlight box -->
      <div class="highlight-box">
        <div class="highlight-text">
          &#127775;&nbsp; You are now part of the SBZEE Franchise Network
        </div>
        <div class="highlight-sub">
          Your partnership is active and ready to grow.
        </div>
      </div>

      <!-- Next Steps section -->
      <p class="section-title">What Happens Next</p>

      <!-- Step 1 -->
      <div class="step-card">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td class="step-icon-cell" width="40" valign="middle">&#128101;</td>
            <td style="padding-left:14px;vertical-align:middle;">
              <div class="step-title">Dedicated Onboarding Support</div>
              <div class="step-desc">Our team will personally guide you through the entire setup process.</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Step 2 -->
      <div class="step-card">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td class="step-icon-cell" width="40" valign="middle">&#127979;</td>
            <td style="padding-left:14px;vertical-align:middle;">
              <div class="step-title">Training &amp; Orientation</div>
              <div class="step-desc">You will receive comprehensive training to help you operate with confidence.</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Step 3 -->
      <div class="step-card">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td class="step-icon-cell" width="40" valign="middle">&#128640;</td>
            <td style="padding-left:14px;vertical-align:middle;">
              <div class="step-title">Launch &amp; Go-Live Support</div>
              <div class="step-desc">We will be with you every step of the way from setup to your first day of operations.</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- Step 4 -->
      <div class="step-card">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td class="step-icon-cell" width="40" valign="middle">&#128241;</td>
            <td style="padding-left:14px;vertical-align:middle;">
              <div class="step-title">Access Your Dashboard</div>
              <div class="step-desc">Log in to your franchise portal to manage orders, inventory, and operations.</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- CTA -->
      <div class="cta-wrapper">
        <a href="https://partner.sbzee.com/login" class="cta-button" target="_blank">
          Access Your Dashboard &nbsp;&rarr;
        </a>
      </div>
      <p class="cta-note">Log in with your registered email to get started</p>

      <hr class="divider" />

      <!-- Sign-off -->
      <p class="signoff-text">
        If you have any questions at any stage, please do not hesitate to reach out to us — we are always here to help.
      </p>

      <p style="font-size:15px;color:#374151;line-height:1.75;margin-top:20px;">
        Welcome aboard!<br/><br/>
        <strong style="color:#111827;">Team SBZEE</strong><br/>
        <span style="font-size:13px;color:#9ca3af;">Franchise Onboarding Division</span>
      </p>

    </td>
  </tr>

  <!-- ═══════════════ FOOTER ═══════════════ -->
  <tr>
    <td class="footer">

      <div class="footer-brand">SBZEE.</div>
      <div class="footer-tagline">Empowering Local Franchise Growth</div>

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center" style="padding-bottom:10px;">
            <a href="https://sbzee.in" class="footer-link" target="_blank">Website</a>
            <a href="mailto:support@sbzee.in" class="footer-link">Support</a>
            <a href="https://franchise.sbzee.in" class="footer-link" target="_blank">Franchise Portal</a>
          </td>
        </tr>
      </table>

      <p style="font-size:12px;color:#6b7280;">
        Need help? Email us at
        <a href="mailto:support@sbzee.in" style="color:#21bf6b;font-weight:600;">support@sbzee.in</a>
      </p>

      <p class="footer-copy">
        &copy; 2026 SBZEE. All rights reserved.<br/>
        You are receiving this email because you completed the SBZEE Franchise onboarding process.
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

export function franchiseApprovedTemplate(variables: Record<string, string>) {
  return {
    subject: renderTemplate(SUBJECT_TEMPLATE, variables),
    html: renderTemplate(BODY_TEMPLATE, variables),
  };
}
