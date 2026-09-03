import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events, ticketTiers, eventDates } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";

export async function GET() {
  try {
    const allEvents = await db
      .select()
      .from(events)
      .where(eq(events.status, "active"))
      .orderBy(events.eventDate);

    const result = await Promise.all(
      allEvents.map(async (event) => {
        const tiers = await db
          .select()
          .from(ticketTiers)
          .where(eq(ticketTiers.eventId, event.id));

        const dates = await db
          .select()
          .from(eventDates)
          .where(eq(eventDates.eventId, event.id))
          .orderBy(eventDates.date);

        const lowestPrice = tiers.length > 0
          ? tiers.reduce((min, t) => Number(t.price) < min ? Number(t.price) : min, Number(tiers[0].price))
          : 0;

        const totalTickets = tiers.reduce((s, t) => s + t.quantityTotal, 0);
        const soldTickets = tiers.reduce((s, t) => s + t.quantitySold, 0);

        return {
          id: event.id,
          titleJa: event.titleJa,
          titleEn: event.titleEn,
          titleZh: event.titleZh,
          venue: event.venue,
          eventDate: event.eventDate,
          imageUrl: event.imageUrl,
          status: event.status,
          lowestPrice,
          totalTickets,
          soldTickets,
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
        };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Public events API error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
