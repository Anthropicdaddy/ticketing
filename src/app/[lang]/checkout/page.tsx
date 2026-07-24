"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Copy, Check } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const event = {
    title: "よひろ 2026",
    tier: "VIP席",
    price: "25000",
    quantity: 1,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const copyAmount = () => {
    navigator.clipboard.writeText(event.price);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted) {
    return (
      <main className="min-h-screen">
        <nav className="border-b p-4">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold">{t("common.appName")}</h1>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              {t("checkout.orderSuccess")}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t("checkout.orderPending")}
            </p>
            <Link href="/">
              <Button>{t("common.back")}</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

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
        <h2 className="text-2xl font-bold mb-6">{t("checkout.title")}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("checkout.yourInfo")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">{t("checkout.name")}</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">{t("checkout.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">{t("checkout.phone")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("checkout.paypayInstructions")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-pink-50 p-4 rounded-lg">
                <p className="text-sm mb-2">{t("checkout.step1")}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-pink-600">
                    ¥{event.price}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={copyAmount}
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{t("checkout.step2")}</p>
              <p className="text-sm text-muted-foreground">{t("checkout.step3")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">
                  {event.tier} × {event.quantity}
                </span>
                <span>¥{event.price}</span>
              </div>
              <Separator className="mb-4" />
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">{t("checkout.total")}</span>
                <span className="text-lg font-bold">¥{event.price}</span>
              </div>
              <Button type="submit" className="w-full" size="lg">
                {t("checkout.submitOrder")}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </main>
  );
}
