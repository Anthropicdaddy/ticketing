"use client";

import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Check, Clock, Shield, Image, X, Send } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const t = useTranslations();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const event = {
    title: "よひろ 2026",
    tier: "VIP席",
    price: "25,000",
    priceRaw: 25000,
    quantity: 1,
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setScreenshot(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("email", form.email);
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("eventId", "1");
      formData.append("tierId", "t1");
      if (screenshot) formData.append("screenshot", screenshot);

      const res = await fetch("/api/orders", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        alert("エラーが発生しました。もう一度お試しください。");
      }
    } catch (err) {
      alert("エラーが発生しました。もう一度お試しください。");
    } finally {
      setUploading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">注文を受け付けました</h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            支払い確認中です。約10分以内に確認メールをお送りします。
          </p>
          <div className="bg-secondary/50 rounded-xl p-4 mb-8">
            <p className="text-xs text-muted-foreground">
              確認完了後、チケット（PDF）をメールでお送りします。
              <br />
              しばらくお待ちください。
            </p>
          </div>
          <Link href="/ja">
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
          <Link href="/ja" className="flex items-center gap-2.5">
            <span className="text-xl font-bold tracking-tight text-foreground">
              Kippo<span className="text-primary">🌸</span>
            </span>
          </Link>
          <Link href="/ja/events">
            <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-1" />
              戻る
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">支払い</h1>
          <p className="text-sm text-muted-foreground">以下の手順に従ってお支払いください</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Ticket summary */}
          <div className="bg-card rounded-2xl border border-border/50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">{event.title}</p>
                <p className="text-sm font-semibold text-foreground">{event.tier}</p>
              </div>
              <p className="text-xl font-bold text-foreground">¥{event.price}</p>
            </div>
          </div>

          {/* Payment instructions */}
          <div className="bg-card rounded-2xl border border-border/50 p-5 space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">支払い方法</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-pink-50 text-pink-600 border border-pink-100">PayPay</span>
            </div>

            <div className="bg-gradient-to-br from-pink-50/80 to-rose-50/50 rounded-xl p-4 space-y-3">
              <p className="text-xs font-medium text-rose-700/70">お支払い先</p>
              <div className="bg-white rounded-lg p-3 border border-pink-100/50">
                <p className="text-xs text-muted-foreground mb-1">PayPay ID</p>
                <p className="text-base font-bold text-foreground font-mono">@kippo-ticket</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-pink-100/50">
                <p className="text-xs text-muted-foreground mb-1">お支払い金額</p>
                <p className="text-2xl font-bold text-rose-600">¥{event.price}</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                <p className="text-xs text-muted-foreground leading-relaxed">PayPayアプリで上記IDに <strong className="text-foreground">¥{event.price}</strong> を送金</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                <p className="text-xs text-muted-foreground leading-relaxed">送金完了画面のスクリーンショットを撮影</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                <p className="text-xs text-muted-foreground leading-relaxed">以下のフォームにアップロード</p>
              </div>
            </div>
          </div>

          {/* Email + Upload */}
          <div className="bg-card rounded-2xl border border-border/50 p-5 space-y-5">
            <h3 className="text-sm font-semibold text-foreground">ご注文情報</h3>

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
              <p className="text-[10px] text-muted-foreground mt-1">チケット（PDF）をこのメールアドレスに送信します</p>
            </div>

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

            {/* Screenshot upload */}
            <div>
              <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                支払い証明スクリーンショット <span className="text-destructive">*</span>
              </Label>

              {!preview ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-border/60 rounded-xl p-8 text-center hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">クリックしてアップロード</p>
                  <p className="text-[10px] text-muted-foreground">JPG, PNG (最大5MB)</p>
                </button>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-border/50">
                  <img
                    src={preview}
                    alt="支払いスクリーンショット"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-foreground/80 flex items-center justify-center text-white hover:bg-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-3">
                    <p className="text-xs text-white font-medium">{screenshot?.name}</p>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={!form.email || !form.name || !screenshot || uploading}
            className="w-full h-13 rounded-xl text-sm font-medium gradient-sakura text-white border-0 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                送信中...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                注文を送信する
              </span>
            )}
          </Button>

          <div className="flex items-center justify-center gap-1.5">
            <Shield className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-[10px] text-muted-foreground/40">安全な取引</span>
          </div>
        </form>
      </div>
    </main>
  );
}
