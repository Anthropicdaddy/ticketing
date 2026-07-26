import { NextRequest, NextResponse } from "next/server";
import { rejectScrapedEvent } from "@/lib/scraper";

export async function POST(request: NextRequest) {
  try {
    const { scrapedEventId } = await request.json();
    if (!scrapedEventId) {
      return NextResponse.json({ error: "scrapedEventId is required" }, { status: 400 });
    }

    const success = await rejectScrapedEvent(scrapedEventId);
    if (!success) {
      return NextResponse.json({ error: "Failed to reject" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reject scraped event error:", error);
    return NextResponse.json({ error: "Failed to reject" }, { status: 500 });
  }
}
