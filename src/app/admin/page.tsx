"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  Clock,
  DollarSign,
  Ticket,
} from "lucide-react";

const stats = [
  { title: "総注文数", value: "156", icon: ShoppingCart, color: "text-blue-600" },
  { title: "承認待ち", value: "12", icon: Clock, color: "text-yellow-600" },
  { title: "総売上", value: "¥2,340,000", icon: DollarSign, color: "text-green-600" },
  { title: "販売済みチケット", value: "289", icon: Ticket, color: "text-purple-600" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">ダッシュボード</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>最近の注文</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: "ORD-001", customer: "田中太郎", amount: "¥25,000", status: "承認待ち" },
                { id: "ORD-002", customer: "佐藤花子", amount: "¥15,000", status: "承認済み" },
                { id: "ORD-003", customer: "鈴木一郎", amount: "¥8,800", status: "承認待ち" },
              ].map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <p
                      className={`text-xs ${
                        order.status === "承認待ち"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>アクティビティ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "新規注文", detail: "田中太郎 - VIP席 ×2", time: "5分前" },
                { action: "支払い承認", detail: "佐藤花子 - A席 ×1", time: "15分前" },
                { action: "チケット発行", detail: "山田次郎 - B席 ×3", time: "1時間前" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.detail}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
