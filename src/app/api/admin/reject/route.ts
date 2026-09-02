import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders, payments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { orderId, notes } = await request.json();

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
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
