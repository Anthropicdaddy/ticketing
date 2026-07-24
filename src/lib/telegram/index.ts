import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!, { polling: false });
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

interface NotificationData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  amount: string;
}

export async function sendPaymentNotification(data: NotificationData) {
  if (!CHAT_ID || CHAT_ID === "PLACEHOLDER") {
    console.error("TELEGRAM_CHAT_ID not set");
    return;
  }

  const lines = [
    "🎫 *新しい注文*",
    "",
    "注文番号: `" + data.orderId + "`",
    "顧客名: " + data.customerName,
    "メール: " + data.customerEmail,
    "金額: ¥" + data.amount,
    "",
    "ステータス: 承認待ち",
  ];

  await bot.sendMessage(CHAT_ID, lines.join("\n"), { parse_mode: "Markdown" });
}

export async function sendReceiptPhoto(photoBuffer: Buffer, caption: string) {
  if (!CHAT_ID || CHAT_ID === "PLACEHOLDER") {
    console.error("TELEGRAM_CHAT_ID not set");
    return;
  }

  await bot.sendPhoto(CHAT_ID, photoBuffer, { caption });
}
