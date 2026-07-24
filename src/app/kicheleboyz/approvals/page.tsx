"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Eye, Image } from "lucide-react";

interface PendingOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  eventName: string;
  tier: string;
  quantity: number;
  totalAmount: string;
  createdAt: string;
  screenshotUrl?: string;
}

const samplePendingOrders: PendingOrder[] = [
  {
    id: "ORD-001",
    customerName: "田中太郎",
    customerEmail: "tanaka@example.com",
    eventName: "よひろ 2026",
    tier: "VIP席",
    quantity: 2,
    totalAmount: "50000",
    createdAt: "2026-07-24T10:30:00",
  },
  {
    id: "ORD-003",
    customerName: "鈴木一郎",
    customerEmail: "suzuki@example.com",
    eventName: "(summer) festival",
    tier: "B席",
    quantity: 1,
    totalAmount: "8800",
    createdAt: "2026-07-24T11:15:00",
  },
];

export default function ApprovalsPage() {
  const [orders, setOrders] = useState(samplePendingOrders);
  const [selectedOrder, setSelectedOrder] = useState<PendingOrder | null>(null);
  const [notes, setNotes] = useState("");

  const handleApprove = (orderId: string) => {
    setOrders(orders.filter((o) => o.id !== orderId));
    setSelectedOrder(null);
  };

  const handleReject = (orderId: string) => {
    setOrders(orders.filter((o) => o.id !== orderId));
    setSelectedOrder(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">承認待ち</h1>
          <p className="text-muted-foreground">
            {orders.length}件の承認待ち注文があります
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {orders.map((order) => (
            <Card
              key={order.id}
              className={`cursor-pointer transition-colors ${
                selectedOrder?.id === order.id
                  ? "border-primary"
                  : "hover:border-muted-foreground/50"
              }`}
              onClick={() => setSelectedOrder(order)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{order.customerName}</p>
                      <Badge variant="secondary">承認待ち</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.eventName} - {order.tier} × {order.quantity}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {order.customerEmail}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">¥{order.totalAmount}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString("ja-JP")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {orders.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">承認待ちの注文はありません</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          {selectedOrder ? (
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">注文詳細</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Image className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">支払いスクリーンショット</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">注文ID</span>
                    <span className="font-mono">{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">顧客名</span>
                    <span>{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">メール</span>
                    <span>{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">イベント</span>
                    <span>{selectedOrder.eventName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">チケット</span>
                    <span>
                      {selectedOrder.tier} × {selectedOrder.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>合計</span>
                    <span>¥{selectedOrder.totalAmount}</span>
                  </div>
                </div>

                <Textarea
                  placeholder="管理者メモ（任意）"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleApprove(selectedOrder.id)}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    承認
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleReject(selectedOrder.id)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    却下
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Eye className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">
                  注文を選択して詳細を表示
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
