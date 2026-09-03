"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ExternalLink, Copy, Check } from "lucide-react";

interface TicketRequest {
  id: string;
  eventName: string;
  eventDate: string | null;
  venue: string | null;
  quantity: number;
  maxBudget: string | null;
  customerName: string;
  customerEmail: string;
  status: "pending" | "searching" | "found" | "completed";
  createdAt: string;
}

const statusConfig = {
  pending: { label: "未対応", color: "bg-yellow-100 text-yellow-800" },
  searching: { label: "探索中", color: "bg-blue-100 text-blue-800" },
  found: { label: "チケット発見", color: "bg-mint/10 text-mint" },
  completed: { label: "完了", color: "bg-gray-100 text-gray-600" },
};

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<TicketRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/public/requests")
      .then((r) => r.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function copyFulfillCommand(request: TicketRequest) {
    const cmd = `/fulfill ${request.id} [price] [account]`;
    navigator.clipboard.writeText(cmd);
    setCopiedId(request.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">チケットリクエスト</h1>
          <p className="text-sm text-muted-foreground mt-1">
            ユーザーから届いたチケット探索リクエスト一覧
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 border-0">
            未対応: {requests.filter((r) => r.status === "pending").length}
          </Badge>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-0">
            探索中: {requests.filter((r) => r.status === "searching").length}
          </Badge>
        </div>
      </div>

      {requests.length === 0 ? (
        <Card className="border-0 bg-card shadow-soft rounded-2xl">
          <CardContent className="p-16 text-center">
            <p className="text-muted-foreground text-lg">リクエストはまだありません</p>
            <p className="text-sm text-muted-foreground/60 mt-2">
              ユーザーがチケットを探すとここに表示されます
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => {
            const status = statusConfig[request.status];
            return (
              <Card
                key={request.id}
                className="border-0 bg-card shadow-soft hover:shadow-elevated transition-all duration-200 rounded-2xl overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-foreground truncate">
                          {request.eventName}
                        </h3>
                        <Badge className={`${status.color} border-0 text-xs font-semibold`}>
                          {status.label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-xs text-muted-foreground block mb-0.5">開催日</span>
                          <span className="font-medium text-foreground">
                            {request.eventDate
                              ? new Date(request.eventDate).toLocaleDateString("ja-JP", {
                                  month: "short",
                                  day: "numeric",
                                  weekday: "short",
                                })
                              : "未定"}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-0.5">会場</span>
                          <span className="font-medium text-foreground">
                            {request.venue || "未定"}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-0.5">枚数</span>
                          <span className="font-medium text-foreground">{request.quantity}枚</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-0.5">予算上限</span>
                          <span className="font-medium text-foreground">
                            {request.maxBudget
                              ? `¥${Number(request.maxBudget).toLocaleString()}`
                              : "指定なし"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-6 text-sm">
                        <div>
                          <span className="text-xs text-muted-foreground block mb-0.5">お客様</span>
                          <span className="font-medium text-foreground">{request.customerName}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-0.5">メール</span>
                          <span className="font-medium text-foreground">{request.customerEmail}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground block mb-0.5">リクエスト日</span>
                          <span className="font-medium text-foreground">
                            {new Date(request.createdAt).toLocaleDateString("ja-JP")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg text-xs"
                        onClick={() => copyFulfillCommand(request)}
                      >
                        {copiedId === request.id ? (
                          <Check className="w-3.5 h-3.5 mr-1" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 mr-1" />
                        )}
                        コピー
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-lg text-xs text-muted-foreground"
                        onClick={() => {
                          window.open(`mailto:${request.customerEmail}`, "_blank");
                        }}
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        メール
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="mt-8 p-4 bg-muted/50 rounded-xl">
        <p className="text-xs text-muted-foreground">
          <strong>使い方:</strong> チケットが見つかったら、「コピー」ボタンでコマンドをコピーし、Telegramボットに送信してください。
          <code className="mx-1 px-1.5 py-0.5 bg-background rounded text-[11px]">
            /fulfill [REQUEST_ID] [金額] [振込先]
          </code>
          ユーザーにメールが送信されます。
        </p>
      </div>
    </div>
  );
}
