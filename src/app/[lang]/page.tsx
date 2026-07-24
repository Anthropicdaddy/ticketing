import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Ticket, CreditCard, Mail } from "lucide-react";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  setRequestLocale(lang);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      <nav className="border-b p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">{t("common.appName")}</h1>
          <div className="flex gap-4">
            <Link href="/events">
              <Button variant="ghost">{t("nav.events")}</Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline">Admin</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">{t("home.hero")}</h2>
        <p className="text-xl text-muted-foreground mb-8">
          {t("home.subtitle")}
        </p>
        <Link href="/events">
          <Button size="lg" className="text-lg px-8">
            {t("home.browseEvents")}
          </Button>
        </Link>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-center mb-12">
          {t("home.howItWorks")}
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Ticket className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold mb-2">{t("home.step1")}</h4>
              <p className="text-muted-foreground">{t("home.step1Desc")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <CreditCard className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold mb-2">{t("home.step2")}</h4>
              <p className="text-muted-foreground">{t("home.step2Desc")}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h4 className="font-semibold mb-2">{t("home.step3")}</h4>
              <p className="text-muted-foreground">{t("home.step3Desc")}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
