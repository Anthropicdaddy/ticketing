import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders, tickets, ticketTiers, events } from "@/lib/db/schema";
import { sql, eq, count, sum } from "drizzle-orm";

export async function GET() {
  try {
    const [totalOrders] = await db
      .select({ value: count() })
      .from(orders);

    const [pendingOrders] = await db
      .select({ value: count() })
      .from(orders)
      .where(eq(orders.status, "pending_approval"));

    const [totalRevenue] = await db
      .select({ value: sum(orders.totalAmount) })
      .from(orders)
      .where(sql`${orders.status} IN ('approved', 'completed')`);

    const [totalTickets] = await db
      .select({ value: count() })
      .from(tickets);

    const [activeEvents] = await db
      .select({ value: count() })
      .from(events)
      .where(eq(events.status, "active"));

    return NextResponse.json({
      totalOrders: totalOrders?.value ?? 0,
      pendingOrders: pendingOrders?.value ?? 0,
      totalRevenue: totalRevenue?.value ?? "0",
      totalTickets: totalTickets?.value ?? 0,
      activeEvents: activeEvents?.value ?? 0,
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
