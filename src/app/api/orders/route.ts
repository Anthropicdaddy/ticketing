import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;

    if (!email || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

    // Send confirmation email via Resend
    try {
      await resend.emails.send({
        from: "Kippo🌸 <onboarding@resend.dev>",
        to: [email],
        subject: "【Kippo🌸】注文を受け付けました - 支払い確認中",
        html: `
          <!DOCTYPE html>
          <html>
            <head><meta charset="utf-8"></head>
            <body style="font-family:sans-serif;line-height:1.6;color:#1a1a2e;margin:0;padding:0;background:#faf9f7">
              <div style="max-width:500px;margin:0 auto;padding:40px 20px">
                <div style="background:white;border-radius:16px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.04)">
                  <div style="font-size:24px;font-weight:bold;text-align:center;margin-bottom:24px">Kippo🌸</div>
                  <div style="display:inline-flex;align-items:center;gap:6px;background:#fff7ed;border:1px solid #fed7aa;color:#c2410c;padding:6px 12px;border-radius:20px;font-size:12px;font-weight:600;margin-bottom:20px">
                    ⏳ 支払い確認中
                  </div>
                  <p style="font-size:14px;margin-bottom:20px">${name} 様、注文ありがとうございます。<br>支払いを確認中です。</p>
                  <div style="padding:10px 0;border-bottom:1px solid #f0efe9;font-size:14px;display:flex;justify-content:space-between">
                    <span style="color:#6b6b7b">注文番号</span><span style="font-weight:600">${orderId}</span>
                  </div>
                  <div style="padding:10px 0;border-bottom:1px solid #f0efe9;font-size:14px;display:flex;justify-content:space-between">
                    <span style="color:#6b6b7b">メール</span><span style="font-weight:600">${email}</span>
                  </div>
                  <div style="padding:10px 0;font-size:14px;display:flex;justify-content:space-between">
                    <span style="color:#6b6b7b">金額</span><span style="font-weight:600;color:#ff6b9d">¥25,000</span>
                  </div>
                  <div style="background:#f0fef4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;margin:20px 0;font-size:13px;color:#166534">
                    <strong>確認まで約10分ほどお待ちください。</strong><br>確認完了後、チケット（PDF）をお送りします。
                  </div>
                  <div style="text-align:center;margin-top:24px;font-size:11px;color:#9ca3af">このメールは自動送信されています。</div>
                </div>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error("Email send failed (non-blocking):", emailError);
      // Don't fail the order if email fails
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
