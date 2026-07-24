import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function EventsPage({ params }: Props) {
  const { lang } = await params;
  setRequestLocale(lang);

  return <EventsContent locale={lang} />;
}

function EventsContent({ locale }: { locale: string }) {
  const t = useTranslations();

  const sampleEvents = [
    {
      id: "1",
      title: { ja: "よひろ 2026", en: "Yohiro 2026", zh: "Yohiro 2026" },
      venue: "東京ドーム",
      date: "2026-08-15T19:00:00",
      price: "8800",
      status: "active" as const,
    },
    {
      id: "2",
      title: {
        ja: "(summer) festival",
        en: "(summer) festival",
        zh: "(summer) festival",
      },
      venue: "横浜アリーナ",
      date: "2026-09-01T18:00:00",
      price: "12000",
      status: "active" as const,
    },
  ];

  return (
    <main className="min-h-screen">
      <nav className="border-b p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            {t("common.appName")}
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">{t("events.title")}</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleEvents.map((event) => {
            const title = event.title[locale as keyof typeof event.title] || event.title.ja;
            return (
              <Link key={event.id} href={`/events/${event.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="aspect-video bg-muted rounded-t-lg" />
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-lg mb-2">{title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "short",
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      {event.venue}
                    </div>
                    <Badge variant={event.status === "active" ? "default" : "secondary"}>
                      {t(`events.${event.status === "active" ? "available" : "soldOut"}`)}
                    </Badge>
                  </CardContent>
                  <CardFooter>
                    <p className="text-lg font-bold">
                      {t("events.ticketsFrom", { price: event.price })}
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
