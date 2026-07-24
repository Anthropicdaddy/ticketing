import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendTicketEmailParams {
  to: string;
  customerName: string;
  eventName: string;
  ticketCode: string;
  password: string;
  pdfBuffer: Buffer;
}

export async function sendTicketEmail({
  to,
  customerName,
  eventName,
  ticketCode,
  password,
  pdfBuffer,
}: SendTicketEmailParams) {
  const { data, error } = await resend.emails.send({
    from: "チケット販売 <tickets@yourdomain.com>",
    to: [to],
    subject: `チケット発行のお知らせ - ${eventName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Hiragino Sans', 'Yu Gothic', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .ticket-box { background: white; border: 2px dashed #ccc; padding: 20px; margin: 20px 0; text-align: center; }
            .code { font-size: 24px; font-weight: bold; color: #e63946; letter-spacing: 2px; }
            .password-box { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 8px; }
            .password { font-size: 20px; font-weight: bold; color: #856404; font-family: monospace; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>チケット発行のお知らせ</h1>
            </div>
            <div class="content">
              <p>${customerName} 様</p>
              <p>ご注文のチケットが発行されました。下記の情報をご確認ください。</p>
              
              <div class="ticket-box">
                <p style="color: #666; margin-bottom: 5px;">チケットコード</p>
                <div class="code">${ticketCode}</div>
              </div>
              
              <div class="password-box">
                <p style="margin-bottom: 5px;">🔑 チケットのパスワード</p>
                <div class="password">${password}</div>
                <p style="font-size: 12px; color: #856404;">PDFを開く際にこのパスワードを入力してください</p>
              </div>
              
              <p>添付のPDFファイルをダウンロードし、パスワードを入力してチケットを表示してください。</p>
              <p>入場時にチケットコードとパスワードの提示が必要です。</p>
            </div>
            <div class="footer">
              <p>このメールは自動送信されています。</p>
              <p>ご不明な点がございましたら、管理者にお問い合わせください。</p>
            </div>
          </div>
        </body>
      </html>
    `,
    attachments: [
      {
        filename: `ticket-${ticketCode}.pdf`,
        content: pdfBuffer,
      },
    ],
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}
