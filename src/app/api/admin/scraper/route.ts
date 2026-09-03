import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { scrapedEvents } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { scrapeEvents } from "@/lib/scraper";

export async function GET() {
  try {
    const events = await db
      .select()
      .from(scrapedEvents)
      .orderBy(desc(scrapedEvents.scrapedAt));

    return NextResponse.json(events);
  } catch (error) {
    console.error("Get scraped events error:", error);
    return NextResponse.json({ error: "Failed to fetch scraped events" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const result = await scrapeEvents();
    return NextResponse.json({
      success: true,
      scraped: result.scraped,
      errors: result.errors,
    });
  } catch (error) {
    console.error("Scrape error:", error);
    return NextResponse.json({ error: "Scraping failed" }, { status: 500 });
  }
}
