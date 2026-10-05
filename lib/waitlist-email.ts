export function waitlistConfirmationSubject() {
  return "Appfox received your beta access request";
}

export function waitlistConfirmationText() {
  return [
    "You're on the Appfox list.",
    "",
    "Thanks for your interest in Appfox. Your request for private beta access is saved.",
    "",
    "We'll email you when an invitation is available. This is a receipt, not an invitation. Access is not immediate, and you have not been charged.",
    "",
    "While you wait, see how Appfox helps you research app ideas, understand reviews, and track competitors.",
    "Explore the product: https://www.appfox.app/how-it-works",
    "See beta features: https://www.appfox.app/beta",
    "",
    "Questions about your app or idea? Reply to this email.",
    "",
    "Appfox · Milan, Italy",
    "https://www.appfox.app",
  ].join("\n");
}

export function waitlistConfirmationHtml() {
  // Inline light styles survive email clients that strip <style>. Supported
  // clients opt into the recipient's current dark preference, not signup-time
  // browser state. Keep the transparent product mark readable in both modes.
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Appfox received your beta access request</title>
    <style>
      :root { color-scheme: light dark; supported-color-schemes: light dark; }
      body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
      a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
      @media screen and (max-width: 600px) {
        .email-shell { padding: 24px 16px !important; }
        .email-content { padding: 28px 24px !important; }
        .email-heading { font-size: 26px !important; line-height: 32px !important; }
      }
      @media (prefers-color-scheme: dark) {
        .email-page { background-color: #09090b !important; }
        .email-card { background-color: #18181b !important; border-color: #3f3f46 !important; }
        .email-ink { color: #fafafa !important; }
        .email-copy { color: #d4d4d8 !important; }
        .email-muted { color: #a1a1aa !important; }
        .email-rule { border-color: #3f3f46 !important; }
        .email-button { background-color: #fafafa !important; color: #18181b !important; }
      }
      /* Outlook adds this attribute instead of honoring the media query. */
      [data-ogsc] .email-page { background-color: #09090b !important; }
      [data-ogsc] .email-card { background-color: #18181b !important; border-color: #3f3f46 !important; }
      [data-ogsc] .email-ink { color: #fafafa !important; }
      [data-ogsc] .email-copy { color: #d4d4d8 !important; }
      [data-ogsc] .email-muted { color: #a1a1aa !important; }
      [data-ogsc] .email-rule { border-color: #3f3f46 !important; }
      [data-ogsc] .email-button { background-color: #fafafa !important; color: #18181b !important; }
    </style>
  </head>
  <body class="email-page" style="margin:0;padding:0;background-color:#f3f3f4;color:#18181b;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
    <div style="display:none;font-size:1px;line-height:1px;color:#f3f3f4;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
      Your beta access request is saved. We'll email you when an invitation is available.
    </div>
    <table role="presentation" class="email-page" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f3f3f4" style="width:100%;background-color:#f3f3f4;">
      <tr>
        <td class="email-shell" align="center" style="padding:48px 24px;">
          <!--[if mso]><table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;">
            <tr>
              <td class="email-card email-content" bgcolor="#ffffff" style="padding:40px;background-color:#ffffff;border:1px solid #e4e4e7;border-radius:16px;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-bottom:36px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="34" valign="middle" style="width:34px;">
                            <a href="https://www.appfox.app" style="text-decoration:none;">
                              <img src="https://www.appfox.app/email/appfox-mark.png" width="34" height="36" alt="Appfox fox mark" style="display:block;width:34px;height:36px;border:0;" />
                            </a>
                          </td>
                          <td valign="middle" style="padding-left:10px;">
                            <a class="email-ink" href="https://www.appfox.app" style="font-family:'Geist','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:24px;font-weight:700;line-height:32px;letter-spacing:-0.8px;color:#18181b;text-decoration:none;">Appfox</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p class="email-muted" style="margin:0 0 12px;font-size:11px;font-weight:600;line-height:16px;letter-spacing:1.2px;color:#71717a;">PRIVATE BETA</p>
                      <h1 class="email-heading email-ink" style="margin:0 0 16px;font-family:'Geist','Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:30px;font-weight:600;line-height:36px;letter-spacing:-0.9px;color:#18181b;">You're on the list.</h1>
                      <p class="email-copy" style="margin:0 0 16px;font-size:15px;line-height:24px;color:#52525b;">Thanks for your interest in Appfox. Your request for private beta access is saved.</p>
                      <p class="email-copy" style="margin:0;font-size:15px;line-height:24px;color:#52525b;">We'll email you when an invitation is available. This is a receipt, not an invitation. Access is not immediate, and you have not been charged.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:28px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td class="email-rule" style="padding-top:28px;border-top:1px solid #e4e4e7;">
                            <h2 class="email-ink" style="margin:0 0 8px;font-size:15px;font-weight:600;line-height:22px;color:#18181b;">While you wait</h2>
                            <p class="email-copy" style="margin:0 0 20px;font-size:15px;line-height:24px;color:#52525b;">See how Appfox helps you research app ideas, understand reviews, and track competitors.</p>
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                              <tr>
                                <td class="email-button" align="center" bgcolor="#18181b" style="background-color:#18181b;border-radius:999px;mso-padding-alt:14px 24px;">
                                  <a class="email-button" href="https://www.appfox.app/how-it-works" style="display:inline-block;background-color:#18181b;border-radius:999px;padding:14px 24px;font-size:14px;font-weight:600;line-height:20px;color:#fafafa;text-decoration:none;">Explore the product</a>
                                </td>
                              </tr>
                            </table>
                            <p style="margin:16px 0 0;font-size:14px;line-height:22px;"><a class="email-copy" href="https://www.appfox.app/beta" style="color:#52525b;text-decoration:underline;text-underline-offset:3px;">See beta features</a></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:32px;">
                      <p class="email-muted" style="margin:0;font-size:13px;line-height:20px;color:#71717a;">Questions about your app or idea?<br />Reply to this email. We'd love to hear from you.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="email-muted" align="center" style="padding:24px 16px 0;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;font-size:12px;line-height:20px;color:#52525b;">
                Appfox &middot; Milan, Italy<br />
                <a class="email-muted" href="https://www.appfox.app" style="color:#52525b;text-decoration:underline;text-underline-offset:3px;">appfox.app</a>
              </td>
            </tr>
          </table>
          <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
