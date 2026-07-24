import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const eventId = formData.get("eventId") as string;
    const tierId = formData.get("tierId") as string;
    const screenshot = formData.get("screenshot") as File;

    if (!email || !name || !eventId || !tierId || !screenshot) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

    // Send immediate confirmation email
    try {
      await resend.emails.send({
        from: "Kippo🌸 <noreply@kippo-ticket.com>",
        to: [email],
        subject: "【Kippo🌸】注文を受け付けました - 支払い確認中",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: 'Hiragino Sans', 'Yu Gothic', 'Noto Sans JP', sans-serif; line-height: 1.6; color: #1a1a2e; margin: 0; padding: 0; background: #faf9f7; }
                .container { max-width: 500px; margin: 0 auto; padding: 40px 20px; }
                .card { background: white; border-radius: 16px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
                .logo { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 24px; }
                .logo span { color: #ff6b9d; }
                .status-badge { display: inline-flex; align-items: center; gap: 6px; background: #fff7ed; border: 1px solid #fed7aa; color: #c2410c; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 20px; }
                .status-dot { width: 6px; height: 6px; background: #f97316; border-radius: 50%; animation: pulse 2s infinite; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0efe9; font-size: 14px; }
                .info-label { color: #6b6b7b; }
                .info-value { font-weight: 600; color: #1a1a2e; }
                .notice { background: #f0fef4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 13px; color: #166534; }
                .footer { text-align: center; margin-top: 24px; font-size: 11px; color: #9ca3af; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="card">
                  <div class="logo">Kippo<span>🌸</span></div>
                  
                  <div class="status-badge">
                    <span class="status-dot"></span>
                    支払い確認中
                  </div>
                  
                  <p style="font-size: 14px; margin-bottom: 20px;">
                    ${name} 様、注文ありがとうございます。
                    <br />支払いを確認中です。
                  </p>
                  
                  <div class="info-row">
                    <span class="info-label">注文番号</span>
                    <span class="info-value">${orderId}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">メールアドレス</span>
                    <span class="info-value">${email}</span>
                  </div>
                  <div class="info-row" style="border-bottom: none;">
                    <span class="info-label">お支払い金額</span>
                    <span class="info-value" style="color: #ff6b9d;">¥25,000</span>
                  </div>
                  
                  <div class="notice">
                    <strong>確認まで約10分ほどお待ちください。</strong>
                    <br />支払い確認完了後、チケット（PDF）をおメールでお送りします。
                  </div>
                  
                  <div class="footer">
                    このメールは自動送信されています。
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: "Order created. Confirmation email sent.",
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
