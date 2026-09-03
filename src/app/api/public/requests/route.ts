import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ticketRequests } from "@/lib/db/schema";
import { sendTicketRequestNotification } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventName, eventDate, venue, quantity, maxBudget, customerName, customerEmail } = body;

    if (!eventName || !quantity || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [inserted] = await db
      .insert(ticketRequests)
      .values({
        eventName,
        eventDate: eventDate ? new Date(eventDate) : null,
        venue: venue || null,
        quantity: Number(quantity),
        maxBudget: maxBudget ? String(maxBudget) : null,
        customerName,
        customerEmail,
      })
      .returning();

    await sendTicketRequestNotification({
      requestId: inserted.id,
      eventName,
      eventDate: eventDate || "Not specified",
      venue: venue || "Not specified",
      quantity: Number(quantity),
      maxBudget: maxBudget ? `¥${Number(maxBudget).toLocaleString()}` : "No limit",
      customerName,
      customerEmail,
    });

    return NextResponse.json({ success: true, id: inserted.id });
  } catch (error) {
    console.error("Ticket request API error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const requests = await db
      .select()
      .from(ticketRequests)
      .orderBy(ticketRequests.createdAt);

    return NextResponse.json(requests);
  } catch (error) {
    console.error("Ticket requests GET error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
