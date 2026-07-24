const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

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
