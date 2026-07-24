import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ lang: string; id: string }>;
};

export default async function EventDetailPage({ params }: Props) {
  const { lang, id } = await params;
  setRequestLocale(lang);

  return <EventDetailContent eventId={id} locale={lang} />;
}

function EventDetailContent({
  eventId,
  locale,
}: {
  eventId: string;
  locale: string;
}) {
  const t = useTranslations();

  const event = {
    id: eventId,
    title: { ja: "よひろ 2026", en: "Yohiro 2026", zh: "Yohiro 2026" },
    description: {
      ja: "人気アーティストによる特別なコンサートイベントです。豪華ゲストも出演予定。",
      en: "A special concert event by a popular artist. Special guests also scheduled.",
      zh: "人气艺术家的特别演唱会活动。还有特别嘉宾出演。",
    },
    venue: "東京ドーム",
    address: "東京都文京区后楽1-3-61",
    date: "2026-08-15T19:00:00",
    tiers: [
      {
        id: "t1",
        name: { ja: "VIP席", en: "VIP Seat", zh: "VIP座位" },
        price: "25000",
        total: 50,
        sold: 32,
      },
      {
        id: "t2",
        name: { ja: "A席", en: "Seat A", zh: "A座" },
        price: "15000",
        total: 200,
        sold: 145,
      },
      {
        id: "t3",
        name: { ja: "B席", en: "Seat B", zh: "B座" },
        price: "8800",
        total: 500,
        sold: 498,
      },
    ],
  };

  const localizedTitle = event.title[locale as keyof typeof event.title] || event.title.ja;
  const localizedDescription = event.description[locale as keyof typeof event.description] || event.description.ja;

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

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="aspect-video bg-muted rounded-lg mb-6" />
            <h2 className="text-2xl font-bold mb-2">{localizedTitle}</h2>
            <p className="text-muted-foreground mb-4">{localizedDescription}</p>
            <div className="flex items-center gap-2 text-sm mb-2">
              <Calendar className="w-4 h-4" />
              {new Date(event.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              {event.venue} - {event.address}
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t("events.selectTier")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.tiers.map((tier) => {
                  const remaining = tier.total - tier.sold;
                  const isAvailable = remaining > 0;
                  const tierName = tier.name[locale as keyof typeof tier.name] || tier.name.ja;
                  return (
                    <div
                      key={tier.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{tierName}</h4>
                        <p className="text-sm text-muted-foreground">
                          ¥{tier.price} - {remaining}枚残り
                        </p>
                      </div>
                      <Link href={`/checkout?event=${event.id}&tier=${tier.id}`}>
                        <Button
                          size="sm"
                          disabled={!isAvailable}
                          variant={isAvailable ? "default" : "secondary"}
                        >
                          {isAvailable ? t("events.buyNow") : t("events.soldOut")}
                        </Button>
                      </Link>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
