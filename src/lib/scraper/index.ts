import { db } from "@/lib/db";
import { scrapedEvents } from "@/lib/db/schema";
import { and, gte, lte, eq } from "drizzle-orm";

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
const NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

const SCRAPE_SOURCES = [
  {
    name: "eplus",
    url: "https://t.pia.jp/pia/events/keyword--.do",
    searchUrl: (query: string) =>
      `https://t.pia.jp/pia/events/keyword--.do?kw=${encodeURIComponent(query)}`,
  },
  {
    name: "pia",
    url: "https://t.pia.jp/pia/event/event.do?eventBundleCd=",
    listUrl: "https://t.pia.jp/pia/events/all.do",
  },
  {
    name: "l-tike",
    url: "https://www.l-tike.com/search/",
    searchUrl: (query: string) =>
      `https://www.l-tike.com/search/?keyword=${encodeURIComponent(query)}`,
  },
  {
    name: "livewalker",
    url: "https://livewalker.com/live_schedule/t-13/",
    listUrl: "https://livewalker.com/live_schedule/",
  },
];

interface ScrapedEvent {
  sourceUrl: string;
  sourceSite: string;
  titleJa: string;
  titleEn?: string;
  descriptionJa?: string;
  venue: string;
  address?: string;
  eventDate: Date;
  imageUrl?: string;
  priceMin?: string;
  priceMax?: string;
  tierInfo?: string;
  rawHtml?: string;
}

async function nvidiaChat(messages: any[]): Promise<string> {
  const res = await fetch(NVIDIA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${NVIDIA_API_KEY}`,
    },
    body: JSON.stringify({
      model: "nvidia/nemotron-3-ultra-550b-a55b",
      messages,
      temperature: 0.1,
      max_tokens: 4096,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`NVIDIA API error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.choices[0]?.message?.content || "";
}

async function fetchPage(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept-Language": "ja,en;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 8000);
}

function getDateRange(): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() + 3);
  const end = new Date(now);
  end.setDate(end.getDate() + 7);
  return { start, end };
}

export async function scrapeEvents(): Promise<{ scraped: number; errors: string[] }> {
  const errors: string[] = [];
  let totalScraped = 0;
  const { start, end } = getDateRange();

  for (const source of SCRAPE_SOURCES) {
    try {
      const searchQueries = [
        "コンサート",
        "ライブ",
        "フェス",
        "イベント",
        "公演",
      ];

      for (const query of searchQueries) {
        try {
          const url = source.searchUrl
            ? source.searchUrl(query)
            : source.listUrl || source.url;
          const html = await fetchPage(url);
          const cleanText = stripHtml(html);

          const aiResponse = await nvidiaChat([
            {
              role: "system",
              content: `You are an event data extractor. Parse the following text from a Japanese ticketing website and extract event information. Return a JSON array of events. Each event should have:
- titleJa: event title in Japanese
- titleEn: event title in English (if available)
- descriptionJa: brief description in Japanese
- venue: venue name
- address: venue address if available
- eventDate: ISO date string (YYYY-MM-DDTHH:mm:ss)
- imageUrl: URL to event image if found
- priceMin: minimum price as string number
- priceMax: maximum price as string number
- sourceUrl: URL to the event page if found

Only include events happening between ${start.toISOString()} and ${end.toISOString()}.
Return ONLY valid JSON array, no markdown, no explanation. If no events found, return [].`,
            },
            {
              role: "user",
              content: `Extract events from this ${source.name} page text:\n\n${cleanText.substring(0, 6000)}`,
            },
          ]);

          let events: any[];
          try {
            const cleaned = aiResponse
              .replace(/```json\n?/g, "")
              .replace(/```\n?/g, "")
              .trim();
            events = JSON.parse(cleaned);
          } catch {
            continue;
          }

          if (!Array.isArray(events)) continue;

          for (const event of events) {
            if (!event.titleJa || !event.venue || !event.eventDate) continue;

            const eventDate = new Date(event.eventDate);
            if (isNaN(eventDate.getTime())) continue;
            if (eventDate < start || eventDate > end) continue;

            const existing = await db
              .select()
              .from(scrapedEvents)
              .where(
                and(
                  eq(scrapedEvents.sourceUrl, event.sourceUrl || url),
                  eq(scrapedEvents.titleJa, event.titleJa)
                )
              )
              .limit(1);

            if (existing.length > 0) continue;

            await db.insert(scrapedEvents).values({
              sourceUrl: event.sourceUrl || url,
              sourceSite: source.name,
              titleJa: event.titleJa,
              titleEn: event.titleEn || null,
              descriptionJa: event.descriptionJa || null,
              venue: event.venue,
              address: event.address || null,
              eventDate,
              imageUrl: event.imageUrl || null,
              priceMin: event.priceMin || null,
              priceMax: event.priceMax || null,
              tierInfo: event.tierInfo || null,
              rawHtml: cleanText.substring(0, 2000),
            });

            totalScraped++;
          }
        } catch (err) {
          errors.push(`${source.name}/${query}: ${err instanceof Error ? err.message : "unknown"}`);
        }
      }
    } catch (err) {
      errors.push(`${source.name}: ${err instanceof Error ? err.message : "unknown"}`);
    }
  }

  return { scraped: totalScraped, errors };
}

export async function approveScrapedEvent(
  scrapedId: string,
  userId?: string
): Promise<{ success: boolean; eventId?: string; error?: string }> {
  try {
    const [scraped] = await db
      .select()
      .from(scrapedEvents)
      .where(eq(scrapedEvents.id, scrapedId))
      .limit(1);

    if (!scraped) return { success: false, error: "Scraped event not found" };
    if (scraped.status === "approved") return { success: false, error: "Already approved" };

    const { events, eventDates, ticketTiers } = await import("@/lib/db/schema");

    const [newEvent] = await db
      .insert(events)
      .values({
        titleJa: scraped.titleJa,
        titleEn: scraped.titleEn || scraped.titleJa,
        titleZh: scraped.titleJa,
        descriptionJa: scraped.descriptionJa,
        venue: scraped.venue,
        address: scraped.address,
        eventDate: scraped.eventDate,
        imageUrl: scraped.imageUrl,
        status: "active",
      })
      .returning();

    await db.insert(eventDates).values({
      eventId: newEvent.id,
      date: scraped.eventDate,
    });

    if (scraped.priceMin) {
      await db.insert(ticketTiers).values({
        eventId: newEvent.id,
        nameJa: "一般席",
        nameEn: "General",
        nameZh: "普通席",
        price: scraped.priceMin,
        quantityTotal: 100,
        quantitySold: 0,
      });
    }

    await db
      .update(scrapedEvents)
      .set({
        status: "approved",
        reviewedBy: userId ? (userId as any) : undefined,
        reviewedAt: new Date(),
      })
      .where(eq(scrapedEvents.id, scrapedId));

    return { success: true, eventId: newEvent.id };
  } catch (err) {
    console.error("Approve scraped event error:", err);
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

export async function rejectScrapedEvent(scrapedId: string): Promise<boolean> {
  try {
    await db
      .update(scrapedEvents)
      .set({ status: "rejected", reviewedAt: new Date() })
      .where(eq(scrapedEvents.id, scrapedId));
    return true;
  } catch {
    return false;
  }
}
