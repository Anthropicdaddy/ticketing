import { NextRequest, NextResponse } from "next/server";
import { approveScrapedEvent } from "@/lib/scraper";

export async function POST(request: NextRequest) {
  try {
    const { scrapedEventId } = await request.json();
    if (!scrapedEventId) {
      return NextResponse.json({ error: "scrapedEventId is required" }, { status: 400 });
    }

    const result = await approveScrapedEvent(scrapedEventId);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, eventId: result.eventId });
  } catch (error) {
    console.error("Approve scraped event error:", error);
    return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
  }
}
