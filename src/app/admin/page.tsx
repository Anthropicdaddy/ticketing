"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, Ticket, ShoppingCart, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  { title: "総注文数", value: "156", change: "+12%", up: true, icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-50" },
  { title: "承認待ち", value: "12", change: "+3", up: true, icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  { title: "総売上", value: "¥2.3M", change: "+15%", up: true, icon: DollarSign, color: "text-mint", bg: "bg-emerald-50" },
  { title: "チケット販売", value: "289", change: "+28", up: true, icon: Ticket, color: "text-primary", bg: "bg-primary/5" },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">ダッシュボード</h1>
        <p className="text-sm text-muted-foreground mt-1">Kippo🌸 の運営状況を確認</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-border/50 shadow-soft">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? "text-mint" : "text-destructive"}`}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-soft">
          <div className="p-5 border-b border-border/50">
            <h3 className="text-sm font-semibold text-foreground">最近の注文</h3>
          </div>
          <div className="p-2">
            {[
              { id: "ORD-001", customer: "田中太郎", amount: "¥50,000", status: "pending", time: "5分前" },
              { id: "ORD-002", customer: "佐藤花子", amount: "¥15,000", status: "completed", time: "15分前" },
              { id: "ORD-003", customer: "鈴木一郎", amount: "¥8,800", status: "pending", time: "1時間前" },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-foreground">
                    {order.customer[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.customer}</p>
                    <p className="text-[10px] text-muted-foreground">{order.id} · {order.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{order.amount}</p>
                  <span className={`text-[10px] font-medium ${order.status === "pending" ? "text-amber-500" : "text-mint"}`}>
                    {order.status === "pending" ? "承認待ち" : "完了"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-soft">
          <div className="p-5 border-b border-border/50">
            <h3 className="text-sm font-semibold text-foreground">アクティビティ</h3>
          </div>
          <div className="p-2">
            {[
              { action: "新規注文", detail: "田中太郎 · VIP席 ×2", time: "5分前", color: "bg-blue-500" },
              { action: "支払い承認", detail: "佐藤花子 · A席 ×1", time: "15分前", color: "bg-mint" },
              { action: "チケット発行", detail: "山田次郎 · B席 ×3", time: "1時間前", color: "bg-primary" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${activity.color} mt-2 shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.detail}</p>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
