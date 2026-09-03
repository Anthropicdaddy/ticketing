"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, Ticket, ShoppingCart, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/stats").then((r) => r.json()),
      fetch("/api/admin/orders").then((r) => r.json()),
    ]).then(([statsData, ordersData]) => {
      setStats(statsData);
      setRecentOrders(ordersData.slice(0, 5));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const statCards = [
    { title: "総注文数", value: stats?.totalOrders ?? 0, icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "承認待ち", value: stats?.pendingOrders ?? 0, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "総売上", value: `¥${Number(stats?.totalRevenue ?? 0).toLocaleString()}`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "チケット販売", value: stats?.totalTickets ?? 0, icon: Ticket, color: "text-primary", bg: "bg-primary/5" },
  ];

  const statusLabels: Record<string, string> = {
    pending_approval: "承認待ち",
    approved: "承認済み",
    rejected: "却下",
    completed: "完了",
  };

  const statusColors: Record<string, string> = {
    pending_approval: "text-amber-500",
    approved: "text-blue-500",
    rejected: "text-destructive",
    completed: "text-emerald-500",
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">ダッシュボード</h1>
        <p className="text-sm text-muted-foreground mt-1">Kippo🌸 の運営状況を確認</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border/50">
          <div className="p-5 border-b border-border/50">
            <h3 className="text-sm font-semibold">最近の注文</h3>
          </div>
          <div className="p-2">
            {recentOrders.length === 0 && (
              <p className="p-4 text-sm text-muted-foreground text-center">注文はまだありません</p>
            )}
            {recentOrders.map((order: any) => {
              const initials = order.customerName?.split("").slice(0, 2).join("") || "?";
              return (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.customerName}</p>
                      <p className="text-[10px] text-muted-foreground">{order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">¥{Number(order.totalAmount).toLocaleString()}</p>
                    <span className={`text-[10px] font-medium ${statusColors[order.status] || ""}`}>
                      {statusLabels[order.status] || order.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border/50">
          <div className="p-5 border-b border-border/50">
            <h3 className="text-sm font-semibold">アクティビティ</h3>
          </div>
          <div className="p-2">
            {recentOrders.length === 0 && (
              <p className="p-4 text-sm text-muted-foreground text-center">アクティビティはありません</p>
            )}
            {recentOrders.map((order: any, i: number) => {
              const colors = ["bg-blue-500", "bg-emerald-500", "bg-primary", "bg-amber-500", "bg-purple-500"];
              const action = order.status === "pending_approval" ? "新規注文" : order.status === "approved" ? "支払い承認" : order.status === "completed" ? "チケット発行" : "注文";
              const tierInfo = order.items?.[0]?.tierName || "チケット";
              return (
                <div key={order.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${colors[i % colors.length]} mt-2 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{action}</p>
                    <p className="text-xs text-muted-foreground truncate">{order.customerName} · {tierInfo}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {new Date(order.createdAt).toLocaleDateString("ja-JP")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
