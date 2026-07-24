"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar, MapPin } from "lucide-react";

interface Event {
  id: string;
  title: string;
  venue: string;
  date: string;
  status: "draft" | "active" | "sold_out" | "ended";
  ticketsSold: number;
  ticketsTotal: number;
}

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "よひろ 2026",
    venue: "東京ドーム",
    date: "2026-08-15",
    status: "active",
    ticketsSold: 675,
    ticketsTotal: 750,
  },
  {
    id: "2",
    title: "(summer) festival",
    venue: "横浜アリーナ",
    date: "2026-09-01",
    status: "active",
    ticketsSold: 400,
    ticketsTotal: 1000,
  },
  {
    id: "3",
    title: "ロックフェス2026",
    venue: "幕張メッセ",
    date: "2026-10-10",
    status: "draft",
    ticketsSold: 0,
    ticketsTotal: 2000,
  },
];

export default function EventsManagementPage() {
  const [events, setEvents] = useState(sampleEvents);
  const [search, setSearch] = useState("");

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    draft: "bg-gray-100 text-gray-800",
    active: "bg-green-100 text-green-800",
    sold_out: "bg-red-100 text-red-800",
    ended: "bg-blue-100 text-blue-800",
  };

  const statusLabels = {
    draft: "下書き",
    active: "販売中",
    sold_out: "完売",
    ended: "終了",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">イベント管理</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          新規イベント
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="イベントを検索..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-lg" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{event.title}</h3>
                      <Badge className={statusColors[event.status]}>
                        {statusLabels[event.status]}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.venue}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {event.ticketsSold} / {event.ticketsTotal} 枚
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((event.ticketsSold / event.ticketsTotal) * 100)}%
                    販売済み
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    編集
                  </Button>
                  <Button variant="ghost" size="sm">
                    詳細
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
