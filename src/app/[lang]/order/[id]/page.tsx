import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Lock } from "lucide-react";

type Props = {
  params: Promise<{ lang: string; id: string }>;
};

export default async function OrderPage({ params }: Props) {
  const { lang, id } = await params;
  setRequestLocale(lang);

  return <OrderContent orderId={id} />;
}

function OrderContent({ orderId }: { orderId: string }) {
  const t = useTranslations();

  const order = {
    id: orderId,
    status: "completed" as "pending_approval" | "approved" | "rejected" | "completed",
    totalAmount: "25000",
    eventName: "よひろ 2026",
    tier: "VIP席",
    quantity: 1,
    ticketCode: "TK-2026-A1B2",
    password: "xK9mP2vL",
  };

  const statusColors = {
    pending_approval: "bg-yellow-100 text-yellow-800",
    approved: "bg-blue-100 text-blue-800",
    rejected: "bg-red-100 text-red-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <main className="min-h-screen">
      <nav className="border-b p-4">
        <div className="container mx-auto flex items-center gap-4">
          <Link href="/events">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("common.back")}
            </Button>
          </Link>
          <h1 className="text-xl font-bold">{t("common.appName")}</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">{t("order.title")}</h2>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{order.eventName}</CardTitle>
              <Badge className={statusColors[order.status]}>
                {t(`order.${order.status === "pending_approval" ? "pending" : order.status}`)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("order.orderNumber")}</span>
              <span className="font-mono">{order.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("events.selectTier")}</span>
              <span>{order.tier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("checkout.total")}</span>
              <span className="font-bold">¥{order.totalAmount}</span>
            </div>
          </CardContent>
        </Card>

        {order.status === "completed" && (
          <Card>
            <CardHeader>
              <CardTitle>{t("order.downloadTicket")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">チケットコード:</p>
                <p className="text-lg font-mono font-bold">{order.ticketCode}</p>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <p className="text-sm font-medium text-amber-800">
                    {t("order.ticketPassword")}
                  </p>
                </div>
                <p className="text-lg font-mono font-bold text-amber-800">
                  {order.password}
                </p>
                <p className="text-xs text-amber-600 mt-2">
                  {t("order.ticketPasswordHint")}
                </p>
              </div>
              <Button className="w-full" size="lg">
                <Download className="w-4 h-4 mr-2" />
                {t("order.downloadTicket")} (PDF)
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
