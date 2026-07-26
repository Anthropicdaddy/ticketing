import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders, payments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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

    await db
      .update(orders)
      .set({
        status: "rejected",
        adminNotes: notes || null,
      })
      .where(eq(orders.id, orderId));

    await db
      .update(payments)
      .set({ status: "rejected" })
      .where(eq(payments.orderId, orderId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reject error:", error);
    return NextResponse.json({ error: "Failed to reject order" }, { status: 500 });
  }
}
