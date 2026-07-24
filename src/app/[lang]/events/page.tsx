import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function EventsPage({ params }: Props) {
  const { lang } = await params;
  setRequestLocale(lang);
  return <EventsContent locale={lang} />;
}

function EventsContent({ locale }: { locale: string }) {
  const t = useTranslations();

  const sampleEvents = [
    {
      id: "1",
      title: { ja: "よひろ 2026", en: "Yohiro 2026", zh: "Yohiro 2026" },
      artist: "Yohiro",
      venue: "東京ドーム",
      date: "2026-08-15T19:00:00",
      priceFrom: "8,800",
      status: "active" as const,
      tags: ["コンサート", "人気"],
      gradient: "from-primary/20 via-primary/5 to-transparent",
    },
    {
      id: "2",
      title: { ja: "(summer) festival", en: "(summer) festival", zh: "(summer) festival" },
      artist: "Various Artists",
      venue: "横浜アリーナ",
      date: "2026-09-01T18:00:00",
      priceFrom: "12,000",
      status: "active" as const,
      tags: ["フェス", "夏"],
      gradient: "from-amber-100/40 via-orange-50/20 to-transparent",
    },
    {
      id: "3",
      title: { ja: "ロックフェス 2026", en: "Rock Fest 2026", zh: "摇滚音乐节 2026" },
      artist: "Multiple Artists",
      venue: "幕張メッセ",
      date: "2026-10-10T12:00:00",
      priceFrom: "15,000",
      status: "active" as const,
      tags: ["ロック", "フェス"],
      gradient: "from-violet-100/30 via-purple-50/20 to-transparent",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-xl font-bold tracking-tight text-foreground">
              Kippo<span className="text-primary">🌸</span>
            </span>
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-2 block">Events</span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {t("events.title")}
          </h1>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["すべて", "今週末", "コンサート", "フェス", "スポーツ"].map((chip, i) => (
            <button
              key={chip}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                i === 0
                  ? "bg-foreground text-background"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleEvents.map((event) => {
            const title = event.title[locale as keyof typeof event.title] || event.title.ja;
            return (
              <Link key={event.id} href={`/events/${event.id}`}>
                <article className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50">
                  {/* Image area */}
                  <div className={`relative aspect-[16/10] bg-gradient-to-br ${event.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/40 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                        </svg>
                      </div>
                    </div>
                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {event.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/70 backdrop-blur-sm text-foreground/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-base font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                        {title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="shrink-0 bg-mint/10 text-mint border-0 text-[10px] font-semibold"
                      >
                        ○ 販売中
                      </Badge>
                    </div>

                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <span>
                          {new Date(event.date).toLocaleDateString(locale, {
                            month: "short",
                            day: "numeric",
                            weekday: "short",
                          })}{" "}
                          {new Date(event.date).toLocaleTimeString(locale, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Prices from</span>
                        <p className="text-lg font-bold text-foreground">¥{event.priceFrom}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
