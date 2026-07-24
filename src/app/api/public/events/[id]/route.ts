import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events, ticketTiers, eventDates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, id));

    if (!event) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const tiers = await db
      .select()
      .from(ticketTiers)
      .where(eq(ticketTiers.eventId, event.id));

    const dates = await db
      .select()
      .from(eventDates)
      .where(eq(eventDates.eventId, event.id))
      .orderBy(eventDates.date);

    return NextResponse.json({
      id: event.id,
      titleJa: event.titleJa,
      titleEn: event.titleEn,
      titleZh: event.titleZh,
      descriptionJa: event.descriptionJa,
      descriptionEn: event.descriptionEn,
      descriptionZh: event.descriptionZh,
      venue: event.venue,
      address: event.address,
      eventDate: event.eventDate,
      imageUrl: event.imageUrl,
      status: event.status,
      tiers: tiers.map(t => ({
        id: t.id,
        nameJa: t.nameJa,
        nameEn: t.nameEn,
        nameZh: t.nameZh,
        price: t.price,
        quantityTotal: t.quantityTotal,
        quantitySold: t.quantitySold,
      })),
      dates: dates.map(d => ({
        id: d.id,
        date: d.date,
        label: d.label,
      })),
    });
  } catch (error) {
    console.error("Public event detail API error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
