import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Shield, CreditCard, MapPin, Phone, Mail, Truck, Wrench, Key, Car } from "lucide-react";

export default function ServicesPage() {
  const t = useTranslations("services");

  const steps = [
    {
      number: 1,
      title: t("step1.title"),
      description: t("step1.description"),
      icon: Car,
    },
    {
      number: 2,
      title: t("step2.title"),
      description: t("step2.description"),
      icon: Calendar,
    },
    {
      number: 3,
      title: t("step3.title"),
      description: t("step3.description"),
      items: t("step3.items"),
      icon: Shield,
    },
    {
      number: 4,
      title: t("step4.title"),
      description: t("step4.description"),
      icon: CreditCard,
    },
    {
      number: 5,
      title: t("step5.title"),
      description: t("step5.description"),
      items: t("step5.items"),
      icon: Key,
    },
    {
      number: 6,
      title: t("step6.title"),
      description: t("step6.description"),
      items: t("step6.items"),
      icon: Truck,
    },
  ];

  const financeSteps = [
    {
      number: 1,
      title: t("finance.step1.title"),
      description: t("finance.step1.description"),
      icon: Shield,
    },
    {
      number: 2,
      title: t("finance.step2.title"),
      description: t("finance.step2.description"),
      icon: CreditCard,
    },
    {
      number: 3,
      title: t("finance.step3.title"),
      description: t("finance.step3.description"),
      icon: Calendar,
    },
    {
      number: 4,
      title: t("finance.step4.title"),
      description: t("finance.step4.description"),
      icon: Shield,
    },
    {
      number: 5,
      title: t("finance.step5.title"),
      description: t("finance.step5.description"),
      items: t("finance.step5.items"),
      icon: Key,
    },
  ];

  const documents = [
    t("documents.id"),
    t("documents.kraPin"),
    t("documents.phone"),
    t("documents.email"),
    t("documents.ntsa"),
  ];

  const financeDocuments = [
    t("finance.documents.bankStatements"),
    t("finance.documents.mpesaStatements"),
    t("finance.documents.employment"),
    t("finance.documents.salarySlips"),
    t("finance.documents.id"),
    t("finance.documents.kraPin"),
    t("finance.documents.phone"),
    t("finance.documents.email"),
    t("finance.documents.ntsa"),
  ];

  return (
    <main className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-xl font-bold tracking-tight text-foreground">
              MOTOR <span className="text-primary">HUT</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/cars" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t("inventory")}
            </Link>
            <Link href="/services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t("services")}
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t("about")}
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t("contact")}
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
            {t("pageTitle")}
          </h1>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
              {t("documentsTitle")}
            </h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              {t("documentsDescription")}
            </p>
            <ul className="grid md:grid-cols-2 gap-4">
              {documents.map((doc, i) => (
                <li key={i} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/50">
                  <span className="text-2xl">📄</span>
                  <span className="text-foreground">{doc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
              {t("processTitle")}
            </h2>
            <div className="space-y-6">
              {steps.map((step) => (
                <Card key={step.number} className="border-border/50 bg-card/50 overflow-hidden">
                  <CardContent className="p-6 flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                      {step.items && (
                        <ul className="mt-3 space-y-2">
                          {step.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-6">
              {t("finance.title")}
            </h2>
            <h3 className="text-xl font-semibold text-center text-foreground mb-4">
              {t("finance.documentsTitle")}
            </h3>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              {t("finance.documentsDescription")}
            </p>
            <ul className="grid md:grid-cols-3 gap-4 mb-12">
              {financeDocuments.map((doc, i) => (
                <li key={i} className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border/50">
                  <span className="text-2xl">📄</span>
                  <span className="text-foreground">{doc}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-center text-foreground mb-8">
              {t("finance.processTitle")}
            </h3>
            <div className="space-y-6">
              {financeSteps.map((step) => (
                <Card key={step.number} className="border-border/50 bg-card/50 overflow-hidden">
                  <CardContent className="p-6 flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                      {step.items && (
                        <ul className="mt-3 space-y-2">
                          {step.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="text-primary">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="text-center py-12 bg-card/50 rounded-2xl border border-border/50">
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                {t("cta")}
                <span>→</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="border-t border-border/50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">MOTOR <span className="text-primary">HUT</span></span>
            <span className="text-xs text-muted-foreground">© 2026</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </main>
  );
}