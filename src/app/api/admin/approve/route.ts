import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders, payments, tickets, orderItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { orderId, notes } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }

    const [existing] = await db.select().from(orders).where(eq(orders.id, orderId));
    if (!existing) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    if (existing.status !== "pending_approval") {
      return NextResponse.json({ error: "Order is not pending approval" }, { status: 400 });
    }

    await db
      .update(orders)
      .set({
        status: "approved",
        adminNotes: notes || null,
        approvedAt: new Date(),
      })
      .where(eq(orders.id, orderId));

    await db
      .update(payments)
      .set({ status: "verified" })
      .where(eq(payments.orderId, orderId));

    const orderItemsList = await db
      .select({
        quantity: orderItems.quantity,
        eventId: tickets.eventId,
        tierId: tickets.tierId,
      })
      .from(orderItems)
      .innerJoin(tickets, eq(orderItems.ticketId, tickets.id))
      .where(eq(orderItems.orderId, orderId));

    for (const item of orderItemsList) {
      for (let i = 0; i < item.quantity; i++) {
        const ticketCode = "KIPPO-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
        const password = Math.random().toString(36).substring(2, 10);

        await db.insert(tickets).values({
          eventId: item.eventId,
          tierId: item.tierId,
          orderId: orderId,
          ticketCode,
          password,
          status: "sold",
          issuedAt: new Date(),
        });
      }
    }

    Promise.allSettled([
      transporter.sendMail({
        from: '"Kippo🌸" <' + process.env.GMAIL_USER + ">",
        to: existing.customerEmail,
        subject: "【Kippo🌸】お支払い確認完了 - チケット発行",
        html: '<div style="font-family:sans-serif;padding:40px;max-width:500px;margin:0 auto"><div style="background:white;border-radius:16px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.04)"><div style="font-size:24px;font-weight:bold;text-align:center;margin-bottom:24px">Kippo🌸</div><p style="font-size:14px">' + existing.customerName + ' 様</p><p style="font-size:14px">お支払いが確認されました。チケットを発行しました。</p><p style="font-size:14px">注文番号: <strong>' + orderId + '</strong></p><p style="font-size:14px">金額: <strong style="color:#ff6b9d">¥' + existing.totalAmount + '</strong></p><div style="background:#f0fef4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;margin:20px 0;font-size:13px;color:#166534"><strong>チケットが発行されました。詳細はダッシュボードからご確認ください。</strong></div></div></div>',
      }).catch((e) => console.error("Approval email error:", e)),
    ]).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Approve error:", error);
    return NextResponse.json({ error: "Failed to approve order" }, { status: 500 });
  }
}
