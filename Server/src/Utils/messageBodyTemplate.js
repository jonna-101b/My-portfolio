const emailTemplate = (email, subject, formattedMessage) => {
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