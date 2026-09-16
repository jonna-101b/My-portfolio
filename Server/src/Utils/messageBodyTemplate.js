export const emailTemplate = (name, email, subject, formattedMessage) => {
    return (
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f7; color: #51545e; margin: 0; padding: 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              
              <!-- Header -->
              <tr>
                <td style="background-color: #0f172a; padding: 24px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">New Contact Form Submission</h1>
                </td>
              </tr>

              <!-- Content Body -->
              <tr>
                <td style="padding: 32px;">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="padding-bottom: 12px; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Sender Details</td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 8px;"><strong>Name:</strong> ${name}</td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 24px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                    </tr>

                    <tr>
                      <td style="padding-bottom: 12px; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Subject</td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 24px; font-size: 16px; font-weight: 500; color: #111827;">${subject}</td>
                    </tr>

                    <tr>
                      <td style="padding-bottom: 12px; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Message</td>
                    </tr>
                    <tr>
                      <td style="background-color: #f8fafc; padding: 16px; border-radius: 6px; border-left: 4px solid #2563eb; font-size: 15px; line-height: 1.6; color: #374151;">
                        ${formattedMessage}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer Call to Action -->
              <tr>
                <td style="background-color: #f9fafb; padding: 20px 32px; border-top: 1px solid #e5e7eb; text-align: center;">
                  <p style="margin: 0; font-size: 13px; color: #6b7280;">
                    Hit <strong>Reply</strong> in Gmail to answer directly to <strong>${email}</strong>.
                  </p>
                </td>
              </tr>

            </table>
          </body>
        </html>
      `
    );
};

export const forgotPasswordEmailTemplate = (name, password, requestTime = new Date().toUTCString()) => {
    return (
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f7; color: #51545e; margin: 0; padding: 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
              
              <!-- Header -->
              <tr>
                <td style="background-color: #0f172a; padding: 24px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">Portfolio Security & Password Recovery</h1>
                </td>
              </tr>

              <!-- Content Body -->
              <tr>
                <td style="padding: 32px;">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="padding-bottom: 16px; font-size: 16px; color: #111827;">
                        Hello <strong>${name || 'Admin'}</strong>,
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-bottom: 20px; font-size: 14px; line-height: 1.6; color: #4b5563;">
                        A password recovery request was initiated for your portfolio admin account on <strong>${requestTime}</strong>. Here is your current security key / password:
                      </td>
                    </tr>

                    <tr>
                      <td style="background-color: #f8fafc; border: 1px dashed #cbd5e1; padding: 20px; border-radius: 8px; text-align: center;">
                        <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; display: block; margin-bottom: 8px;">Admin Security Key</span>
                        <code style="font-size: 22px; font-weight: 700; color: #0284c7; letter-spacing: 2px; font-family: monospace; background: #e0f2fe; padding: 8px 18px; border-radius: 6px; display: inline-block;">${password}</code>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding-top: 24px; font-size: 13px; line-height: 1.5; color: #94a3b8;">
                        If you did not request this email, please log in and change your credentials immediately or review your environment configuration.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 20px 32px; border-top: 1px solid #e5e7eb; text-align: center;">
                  <p style="margin: 0; font-size: 13px; color: #6b7280;">
                    Portfolio Administration Security System
                  </p>
                </td>
              </tr>

            </table>
          </body>
        </html>
      `
    );
};