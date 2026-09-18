export function waitlistConfirmationSubject() {
  return "You're on the AppFox waitlist";
}

export function waitlistConfirmationText() {
  return [
    "You're on the AppFox waitlist.",
    "",
    "We'll email you when AppFox is ready to watch your app.",
    "",
    "No spam — just early access.",
    "",
    "AppFox",
    "https://appfox.app",
  ].join("\n");
}

export function waitlistConfirmationHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>You're on the AppFox waitlist</title>
  </head>
  <body style="margin:0;padding:0;background:#000000;color:#f3f3f4;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;">
      <tr>
        <td align="left" style="padding:40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
            <tr>
              <td style="font-family:Georgia, 'Times New Roman', serif;font-size:28px;line-height:1.2;color:#ffffff;">
                You're on the list.
              </td>
            </tr>
            <tr>
              <td style="padding-top:16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:16px;line-height:1.6;color:#9a9a9e;">
                We'll email you when AppFox is ready to watch your app.
              </td>
            </tr>
            <tr>
              <td style="padding-top:28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;line-height:1.6;color:#9a9a9e;">
                <a href="https://appfox.app" style="color:#fe5000;text-decoration:none;">appfox.app</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
