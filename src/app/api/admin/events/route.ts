import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events, ticketTiers, tickets, eventDates } from "@/lib/db/schema";
import { eq, desc, sql, count } from "drizzle-orm";

export async function GET() {
  try {
    const allEvents = await db
      .select()
      .from(events)
      .orderBy(desc(events.createdAt));

    const result = await Promise.all(
      allEvents.map(async (event) => {
        const tiers = await db
          .select({
            id: ticketTiers.id,
            nameJa: ticketTiers.nameJa,
            nameEn: ticketTiers.nameEn,
            nameZh: ticketTiers.nameZh,
            price: ticketTiers.price,
            quantityTotal: ticketTiers.quantityTotal,
            quantitySold: ticketTiers.quantitySold,
            isActive: ticketTiers.isActive,
          })
          .from(ticketTiers)
          .where(eq(ticketTiers.eventId, event.id));

        const dates = await db
          .select()
          .from(eventDates)
          .where(eq(eventDates.eventId, event.id))
          .orderBy(eventDates.date);

        const totalTickets = tiers.reduce((s, t) => s + t.quantityTotal, 0);
        const soldTickets = tiers.reduce((s, t) => s + t.quantitySold, 0);

        return {
          ...event,
          tiers,
          dates,
          totalTickets,
          soldTickets,
        };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Events API error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      titleJa,
      titleEn,
      titleZh,
      descriptionJa,
      descriptionEn,
      descriptionZh,
      venue,
      address,
      eventDate,
      imageUrl,
      status,
      tiers,
      dates,
    } = body;

    const [event] = await db
      .insert(events)
      .values({
        titleJa,
        titleEn,
        titleZh,
        descriptionJa: descriptionJa || null,
        descriptionEn: descriptionEn || null,
        descriptionZh: descriptionZh || null,
        venue,
        address: address || null,
        eventDate: new Date(eventDate),
        imageUrl: imageUrl || null,
        status: status || "draft",
      })
      .returning();

    if (tiers && tiers.length > 0) {
      await db.insert(ticketTiers).values(
        tiers.map((t: any) => ({
          eventId: event.id,
          nameJa: t.nameJa,
          nameEn: t.nameEn,
          nameZh: t.nameZh,
          price: t.price,
          quantityTotal: t.quantityTotal,
        }))
      );
    }

    if (dates && dates.length > 0) {
      await db.insert(eventDates).values(
        dates.map((d: any) => ({
          eventId: event.id,
          date: new Date(d.date),
          label: d.label || null,
        }))
      );
    }

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("id");

    if (!eventId) {
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }

    await db.delete(events).where(eq(events.id, eventId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete event error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
