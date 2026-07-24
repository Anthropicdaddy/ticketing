"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Copy, Check, Shield, Clock } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const event = {
    title: "よひろ 2026",
    tier: "VIP席",
    price: "25,000",
    quantity: 1,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const copyAmount = () => {
    navigator.clipboard.writeText("25000");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-mint/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-mint" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">注文を受け付けました</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            支払い確認後、チケットをメールでお送りします。
            <br />
            しばらくお待ちください。
          </p>
          <Link href="/">
            <Button variant="ghost" className="rounded-full text-muted-foreground">
              トップに戻る
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-xl font-bold tracking-tight text-foreground">
              Kippo<span className="text-primary">🌸</span>
            </span>
          </Link>
          <Link href="/events">
            <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground">
              ← 戻る
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-16">
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-2">ご注文内容</h1>
        <p className="text-sm text-muted-foreground mb-10">入力内容をご確認ください</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer info */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-5">
            <h3 className="text-sm font-semibold text-foreground">お客様情報</h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  お名前 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="田中 太郎"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="h-11 rounded-xl border-border/50 bg-secondary/30 focus:bg-background transition-colors"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  メールアドレス <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="h-11 rounded-xl border-border/50 bg-secondary/30 focus:bg-background transition-colors"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  電話番号
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="090-1234-5678"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="h-11 rounded-xl border-border/50 bg-secondary/30 focus:bg-background transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">支払い方法</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/5 text-primary">PayPay</span>
            </div>

            {/* PayPay instructions */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-5 space-y-4">
              <div>
                <p className="text-xs font-medium text-rose-700/60 mb-1">お支払い金額</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-rose-700">¥{event.price}</span>
                  <button
                    type="button"
                    onClick={copyAmount}
                    className="p-1.5 rounded-lg bg-white/60 hover:bg-white transition-colors"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-mint" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-rose-600/60" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <p className="text-xs text-rose-700/80">PayPayアプリで上記金額をお支払いください</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <p className="text-xs text-rose-700/80">支払い完了後、スクリーンショットを撮影</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <p className="text-xs text-rose-700/80">スクリーンショットを管理者に送信</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-card rounded-2xl border border-border/50 p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">注文確認</h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{event.tier} × {event.quantity}</span>
                <span className="text-sm font-medium text-foreground">¥{event.price}</span>
              </div>
              <div className="h-px bg-border/50" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-foreground">合計</span>
                <span className="text-lg font-bold text-foreground">¥{event.price}</span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 mt-6 rounded-full text-sm font-medium gradient-sakura text-white border-0 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
            >
              注文を確定する
            </Button>

            <div className="flex items-center justify-center gap-1.5 mt-4">
              <Shield className="w-3 h-3 text-muted-foreground/50" />
              <span className="text-[10px] text-muted-foreground/50">安全な取引</span>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
