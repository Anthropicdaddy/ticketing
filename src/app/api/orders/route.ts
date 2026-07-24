import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sendPaymentNotification, sendReceiptPhoto } from "@/lib/telegram";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  const logs: string[] = [];

  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const screenshot = formData.get("screenshot") as File | null;

    logs.push("Fields received: email=" + email + ", name=" + name + ", hasScreenshot=" + !!screenshot);

    if (!email || !name) {
      logs.push("ERROR: Missing fields");
      return NextResponse.json({ error: "Missing required fields", logs }, { status: 400 });
    }

    const orderId = "ORD-" + Date.now().toString(36).toUpperCase();
    logs.push("Order ID: " + orderId);

    // 1. Send confirmation email
    let emailSent = false;
    let emailError = null;
    try {
      const info = await transporter.sendMail({
        from: '"Kippo🌸" <' + process.env.GMAIL_USER + ">",
        to: email,
        subject: "【Kippo🌸】注文を受け付けました - 支払い確認中",
        html: '<div style="font-family:sans-serif;padding:40px;max-width:500px;margin:0 auto"><div style="background:white;border-radius:16px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.04)"><div style="font-size:24px;font-weight:bold;text-align:center;margin-bottom:24px">Kippo🌸</div><p style="font-size:14px">' + name + ' 様、注文ありがとうございます。</p><p style="font-size:14px">注文番号: <strong>' + orderId + '</strong></p><p style="font-size:14px">金額: <strong style="color:#ff6b9d">¥25,000</strong></p><div style="background:#f0fef4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;margin:20px 0;font-size:13px;color:#166534"><strong>確認まで約10分ほどお待ちください。</strong></div></div></div>',
      });
      emailSent = true;
      logs.push("Email sent: " + info.messageId);
    } catch (err) {
      emailError = err instanceof Error ? err.message : "unknown";
      logs.push("Email FAILED: " + emailError);
    }

    // 2. Send Telegram notification
    let tgSent = false;
    try {
      await sendPaymentNotification({
        orderId,
        customerName: name,
        customerEmail: email,
        amount: "25,000",
      });
      tgSent = true;
      logs.push("Telegram text sent");
    } catch (err) {
      logs.push("Telegram text FAILED: " + (err instanceof Error ? err.message : "unknown"));
    }

    // 3. Send receipt photo
    if (screenshot) {
      try {
        const bytes = await screenshot.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await sendReceiptPhoto(buffer, "支払い証明 " + orderId + " - " + name);
        logs.push("Telegram photo sent");
      } catch (err) {
        logs.push("Telegram photo FAILED: " + (err instanceof Error ? err.message : "unknown"));
      }
    }

    return NextResponse.json({
      success: true,
      orderId,
      emailSent,
      tgSent,
      logs,
    });
  } catch (error) {
    logs.push("FATAL: " + (error instanceof Error ? error.message : "unknown"));
    return NextResponse.json({ error: "Failed", logs }, { status: 500 });
  }
}
