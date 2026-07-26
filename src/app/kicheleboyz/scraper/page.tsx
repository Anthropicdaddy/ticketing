"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  X,
  ExternalLink,
  Loader2,
  Globe,
  Calendar,
  MapPin,
  Image,
  RefreshCw,
} from "lucide-react";

interface ScrapedEvent {
  id: string;
  sourceUrl: string;
  sourceSite: string;
  titleJa: string;
  titleEn?: string;
  descriptionJa?: string;
  venue: string;
  address?: string;
  eventDate: string;
  imageUrl?: string;
  priceMin?: string;
  priceMax?: string;
  status: "pending" | "approved" | "rejected";
  scrapedAt: string;
}

export default function ScraperPage() {
  const [events, setEvents] = useState<ScrapedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [processing, setProcessing] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  const fetchEvents = () => {
    fetch("/api/admin/scraper")
      .then((r) => r.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch scraped events:", err);
        setEvents([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleScrape = async () => {
    setScraping(true);
    try {
      const res = await fetch("/api/admin/scraper", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert(`${data.scraped}件のイベントを取得しました`);
        fetchEvents();
      } else {
        alert("スクレイピングに失敗しました");
      }
    } catch (err) {
      alert("スクレイピングに失敗しました");
    } finally {
      setScraping(false);
    }
  };

  const handleApprove = async (id: string) => {
    setProcessing(id);
    try {
      const res = await fetch("/api/admin/scraper/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scrapedEventId: id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchEvents();
      } else {
        alert(data.error || "承認に失敗しました");
      }
    } catch (err) {
      alert("承認に失敗しました");
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id: string) => {
    setProcessing(id);
    try {
      const res = await fetch("/api/admin/scraper/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scrapedEventId: id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchEvents();
      } else {
        alert("却下に失敗しました");
      }
    } catch (err) {
      alert("却下に失敗しました");
    } finally {
      setProcessing(null);
    }
  };

  const filtered =
    filter === "all" ? events : events.filter((e) => e.status === filter);

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, string> = {
    pending: "確認待ち",
    approved: "承認済み",
    rejected: "却下",
  };

  const siteLabels: Record<string, string> = {
    eplus: "e+",
    pia: "Ticket Pia",
    "l-tike": "Lawson Ticket",
    livewalker: "LiveWalker",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">イベントスクレイパー</h1>
          <p className="text-muted-foreground">
            日本の主要チケットサイトからイベントを自動取得
          </p>
        </div>
        <Button
          onClick={handleScrape}
          disabled={scraping}
          className="gradient-sakura text-white border-0"
        >
          {scraping ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4 mr-2" />
          )}
          {scraping ? "取得中..." : "今すぐスクレイプ"}
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        {(["all", "pending", "approved", "rejected"] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "すべて" : statusLabels[f]}
            {f !== "all" && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {events.filter((e) => e.status === f).length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {event.imageUrl ? (
                  <div className="w-full md:w-48 h-40 bg-muted shrink-0">
                    <img
                      src={event.imageUrl}
                      alt={event.titleJa}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full md:w-48 h-40 bg-muted shrink-0 flex items-center justify-center">
                    <Image className="w-8 h-8 text-muted-foreground/40" />
                  </div>
                )}

                <div className="flex-1 p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{event.titleJa}</h3>
                        <Badge className={statusColors[event.status]}>
                          {statusLabels[event.status]}
                        </Badge>
                      </div>
                      {event.titleEn && (
                        <p className="text-sm text-muted-foreground">
                          {event.titleEn}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {siteLabels[event.sourceSite] || event.sourceSite}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(event.eventDate).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "short",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.venue}
                    </span>
                  </div>

                  {event.descriptionJa && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {event.descriptionJa}
                    </p>
                  )}

                  {(event.priceMin || event.priceMax) && (
                    <p className="text-sm font-medium text-foreground">
                      ¥{event.priceMin || "?"}
                      {event.priceMax ? ` ～ ¥${event.priceMax}` : ""}
                    </p>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <a
                      href={event.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      元ページを見る
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {event.status === "pending" && (
                  <div className="flex md:flex-col gap-2 p-4 md:items-end">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(event.id)}
                      disabled={processing === event.id}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {processing === event.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4 mr-1" />
                      )}
                      承認
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(event.id)}
                      disabled={processing === event.id}
                    >
                      <X className="w-4 h-4 mr-1" />
                      却下
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                {filter === "pending"
                  ? "確認待ちのイベントはありません"
                  : "イベントがありません"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
