const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

export async function sendTicketRequestNotification(data: {
  requestId: string;
  eventName: string;
  eventDate: string;
  venue: string;
  quantity: number;
  maxBudget: string;
  customerName: string;
  customerEmail: string;
}) {
  if (!CHAT_ID || CHAT_ID === "PLACEHOLDER" || !BOT_TOKEN) {
    console.error("Telegram not configured");
    return;
  }

  const text =
    "🎫 *新しいチケット探索リクエスト*\n\n" +
    "リクエストID: `" + data.requestId + "`\n" +
    "イベント: " + data.eventName + "\n" +
    "日程: " + data.eventDate + "\n" +
    "会場: " + data.venue + "\n" +
    "枚数: " + data.quantity + "枚\n" +
    "予算上限: " + data.maxBudget + "\n\n" +
    "👤 お客様情報\n" +
    "名前: " + data.customerName + "\n" +
    "メール: " + data.customerEmail + "\n\n" +
    "チケットが見つかったら以下を送信してください:\n" +
    "`/fulfill " + data.requestId + " [金額] [振込先]`";

  const res = await fetch(
    "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "Markdown",
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Telegram sendMessage failed:", err);
  }
}

export async function sendTicketFoundEmail({
  to,
  customerName,
  eventName,
  price,
  paymentAccount,
}: {
  to: string;
  customerName: string;
  eventName: string;
  price: string;
  paymentAccount: string;
}) {
  const nodemailer = await import("nodemailer");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Hiragino Sans', 'Yu Gothic', sans-serif; line-height: 1.6; color: #1a1a2e; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ff6b9d 0%, #ff8fb1 50%, #ffa7c4 100%); color: white; padding: 32px 24px; text-align: center; border-radius: 16px 16px 0 0; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { margin: 8px 0 0; opacity: 0.9; font-size: 14px; }
          .content { padding: 32px 24px; background: #ffffff; }
          .ticket-box { background: #fff0f5; border: 2px dashed #ff6b9d; padding: 24px; margin: 24px 0; border-radius: 12px; text-align: center; }
          .ticket-box .event-name { font-size: 20px; font-weight: 700; color: #1a1a2e; margin-bottom: 8px; }
          .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f0efe9; }
          .detail-row:last-child { border-bottom: none; }
          .detail-label { color: #6b6b7b; font-size: 14px; }
          .detail-value { font-weight: 600; color: #1a1a2e; font-size: 14px; }
          .price-box { background: #1a1a2e; color: white; padding: 24px; margin: 24px 0; border-radius: 12px; text-align: center; }
          .price-box .amount { font-size: 32px; font-weight: 700; letter-spacing: -1px; }
          .price-box .label { font-size: 12px; opacity: 0.7; margin-bottom: 4px; }
          .payment-box { background: #f0efe9; padding: 20px; margin: 24px 0; border-radius: 12px; }
          .payment-box h3 { margin: 0 0 12px; font-size: 16px; color: #1a1a2e; }
          .payment-box .account { font-family: monospace; font-size: 18px; font-weight: 700; color: #ff6b9d; background: white; padding: 12px; border-radius: 8px; text-align: center; letter-spacing: 2px; }
          .cta { text-align: center; margin: 32px 0; }
          .cta a { display: inline-block; background: linear-gradient(135deg, #ff6b9d 0%, #ff8fb1 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: 600; font-size: 16px; }
          .footer { text-align: center; padding: 24px; color: #6b6b7b; font-size: 12px; }
          .footer a { color: #ff6b9d; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 チケットが見つかりました！</h1>
            <p>Kippoがお探しのチケットを見つけました</p>
          </div>
          <div class="content">
            <p>${customerName} 様</p>
            <p>お待たせしました！ご希望のチケットが見つかりました。</p>

            <div class="ticket-box">
              <div class="event-name">${eventName}</div>
            </div>

            <div class="detail-row">
              <span class="detail-label">イベント名</span>
              <span class="detail-value">${eventName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">チケット枚数</span>
              <span class="detail-value">確認メールに記載</span>
            </div>

            <div class="price-box">
              <div class="label">お支払い金額</div>
              <div class="amount">${price}</div>
            </div>

            <div class="payment-box">
              <h3>💳 お支払い方法</h3>
              <p style="margin: 0 0 8px; font-size: 14px; color: #6b6b7b;">以下の口座に上記金額をお振込ください</p>
              <div class="account">${paymentAccount}</div>
            </div>

            <div style="background: #fff0f5; padding: 16px; border-radius: 8px; margin: 24px 0;">
              <p style="margin: 0; font-size: 14px; color: #1a1a2e;">
                <strong>次のステップ:</strong><br>
                1. 上記口座に振込<br>
                2. 振込完了後、このメールに返信<br>
                3. チケットをメールでお送りします
              </p>
            </div>
          </div>
          <div class="footer">
            <p>このメールは Kippo🌸 から送信されました</p>
            <p><a href="https://kippo.jp">kippo.jp</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Kippo🌸" <${process.env.GMAIL_USER}>`,
    to,
    subject: `🎉 チケットが見つかりました - ${eventName}`,
    html,
  });
}

export async function sendPaymentNotification(data: {
  orderId: string;
  customerName: string;
  customerEmail: string;
  amount: string;
}) {
  if (!CHAT_ID || CHAT_ID === "PLACEHOLDER" || !BOT_TOKEN) {
    console.error("Telegram not configured");
    return;
  }

  const text =
    "🎫 *新しい注文*\n\n" +
    "注文番号: `" + data.orderId + "`\n" +
    "顧客名: " + data.customerName + "\n" +
    "メール: " + data.customerEmail + "\n" +
    "金額: ¥" + data.amount + "\n\n" +
    "ステータス: 承認待ち";

  const res = await fetch(
    "https://api.telegram.org/bot" + BOT_TOKEN + "/sendMessage",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "Markdown",
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Telegram sendMessage failed:", err);
  }
}

export async function sendReceiptPhoto(
  photoBuffer: Buffer,
  caption: string
) {
  if (!CHAT_ID || CHAT_ID === "PLACEHOLDER" || !BOT_TOKEN) {
    console.error("Telegram not configured");
    return;
  }

  // Convert buffer to base64
  const base64 = photoBuffer.toString("base64");

  // Use FormData for file upload
  const formData = new FormData();
  formData.append("chat_id", CHAT_ID);
  formData.append("caption", caption);

  // Create a Blob from the buffer
  const arrayBuffer = new Uint8Array(photoBuffer);
  const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
  formData.append("photo", blob, "receipt.jpg");

  const res = await fetch(
    "https://api.telegram.org/bot" + BOT_TOKEN + "/sendPhoto",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Telegram sendPhoto failed:", err);
  }
}
