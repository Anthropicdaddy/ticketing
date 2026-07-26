import { NextResponse } from "next/server";
import { scrapeEvents } from "@/lib/scraper";

export async function GET() {
  const authHeader = process.env.CRON_SECRET;
  try {
    const result = await scrapeEvents();
    return NextResponse.json({
      success: true,
      scraped: result.scraped,
      errors: result.errors,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron scrape error:", error);
    return NextResponse.json({ error: "Cron scrape failed" }, { status: 500 });
  }
}
