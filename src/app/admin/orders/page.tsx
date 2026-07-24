"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  eventName: string;
  tier: string;
  quantity: number;
  totalAmount: string;
  status: "pending_approval" | "approved" | "rejected" | "completed";
  createdAt: string;
}

const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "田中太郎",
    customerEmail: "tanaka@example.com",
    eventName: "よひろ 2026",
    tier: "VIP席",
    quantity: 2,
    totalAmount: "50000",
    status: "pending_approval",
    createdAt: "2026-07-24T10:30:00",
  },
  {
    id: "ORD-002",
    customerName: "佐藤花子",
    customerEmail: "sato@example.com",
    eventName: "よひろ 2026",
    tier: "A席",
    quantity: 1,
    totalAmount: "15000",
    status: "completed",
    createdAt: "2026-07-23T15:45:00",
  },
  {
    id: "ORD-003",
    customerName: "鈴木一郎",
    customerEmail: "suzuki@example.com",
    eventName: "(summer) festival",
    tier: "B席",
    quantity: 1,
    totalAmount: "8800",
    status: "pending_approval",
    createdAt: "2026-07-24T11:15:00",
  },
  {
    id: "ORD-004",
    customerName: "山田次郎",
    customerEmail: "yamada@example.com",
    eventName: "よひろ 2026",
    tier: "B席",
    quantity: 3,
    totalAmount: "26400",
    status: "approved",
    createdAt: "2026-07-22T09:20:00",
  },
];

export default function OrdersManagementPage() {
  const [orders] = useState(sampleOrders);
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    pending_approval: "bg-yellow-100 text-yellow-800",
    approved: "bg-blue-100 text-blue-800",
    rejected: "bg-red-100 text-red-800",
    completed: "bg-green-100 text-green-800",
  };

  const statusLabels = {
    pending_approval: "承認待ち",
    approved: "承認済み",
    rejected: "却下",
    completed: "完了",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">注文管理</h1>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          エクスポート
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="注文ID、顧客名、メールで検索..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>注文ID</TableHead>
                <TableHead>顧客名</TableHead>
                <TableHead>イベント</TableHead>
                <TableHead>チケット</TableHead>
                <TableHead className="text-right">金額</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>日時</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-sm">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.customerEmail}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{order.eventName}</TableCell>
                  <TableCell>
                    {order.tier} × {order.quantity}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ¥{order.totalAmount}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.status]}>
                      {statusLabels[order.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("ja-JP")}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      詳細
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
