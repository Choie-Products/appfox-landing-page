export function waitlistConfirmationSubject() {
  return "Appfox received your beta access request";
}

export function waitlistConfirmationText() {
  return [
    "Your Appfox beta access request is saved.",
    "",
    "Appfox is an app intelligence platform for iOS and Android developers. The private beta includes research briefs, daily findings, review themes, and competitor and rank tracking.",
    "",
    "This is a receipt, not an invitation. We'll email you when a beta invitation is available. Access is not immediate, and you have not been charged.",
    "",
    "See what is available: https://appfox.app/beta",
    "Follow the product walkthrough: https://appfox.app/how-it-works",
    "Questions about your app or idea? Reply to this email.",
    "",
    "Appfox",
    "https://appfox.app",
  ].join("\n");
}

export function waitlistConfirmationHtml() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Appfox received your beta access request</title>
  </head>
  <body style="margin:0;padding:0;background:#000000;color:#f3f3f4;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#000000;">
      <tr>
        <td align="left" style="padding:40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
            <tr>
              <td style="font-family:Georgia, 'Times New Roman', serif;font-size:28px;line-height:1.2;color:#ffffff;">
                Your access request is saved.
              </td>
            </tr>
            <tr>
              <td style="padding-top:16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:16px;line-height:1.6;color:#9a9a9e;">
                Appfox helps iOS and Android developers research ideas, understand reviews, and track competitors.
                <p>This is a receipt, not an invitation. We'll email you when a beta invitation is available. Access is not immediate, and you have not been charged.</p>
                <p><a href="https://appfox.app/beta" style="color:#fe5000;">Explore the current beta</a> or <a href="https://appfox.app/how-it-works" style="color:#fe5000;">follow the product walkthrough</a>.</p>
                <p>Questions about your app or idea? Reply to this email.</p>
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
