"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";

export function TicketRequestForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const data = {
      eventName: form.get("eventName") as string,
      eventDate: form.get("eventDate") as string || null,
      venue: form.get("venue") as string || null,
      quantity: Number(form.get("quantity") as string),
      maxBudget: form.get("maxBudget") as string || null,
      customerName: form.get("customerName") as string,
      customerEmail: form.get("customerEmail") as string,
    };

    try {
      const res = await fetch("/api/public/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
    } catch {
      setError("送信に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <Card className="border-0 bg-card shadow-soft rounded-2xl overflow-hidden">
        <CardContent className="p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-mint/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-mint" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            リクエストを送信しました！
          </h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            チケットが見つかり次第、メールでお知らせします。
            <br />
            お待ちください！
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSuccess(false);
              (e.currentTarget as HTMLFormElement)?.reset();
            }}
            className="rounded-full"
          >
            別のチケットを探す
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-card shadow-soft rounded-2xl overflow-hidden">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="eventName" className="text-sm font-medium text-foreground">
              イベント名 <span className="text-primary">*</span>
            </Label>
            <Input
              id="eventName"
              name="eventName"
              placeholder="例: 嵐 ライブツアー 2026"
              required
              className="h-12 rounded-xl border-border/50 bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventDate" className="text-sm font-medium text-foreground">
                開催日（分かれば）
              </Label>
              <Input
                id="eventDate"
                name="eventDate"
                type="date"
                className="h-12 rounded-xl border-border/50 bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm font-medium text-foreground">
                枚数 <span className="text-primary">*</span>
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                max="10"
                defaultValue="1"
                required
                className="h-12 rounded-xl border-border/50 bg-background"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue" className="text-sm font-medium text-foreground">
              会場（分かれば）
            </Label>
            <Input
              id="venue"
              name="venue"
              placeholder="例: 東京ドーム"
              className="h-12 rounded-xl border-border/50 bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxBudget" className="text-sm font-medium text-foreground">
              予算上限（1枚あたり）
            </Label>
            <Input
              id="maxBudget"
              name="maxBudget"
              type="number"
              placeholder="例: 30000"
              className="h-12 rounded-xl border-border/50 bg-background"
            />
            <p className="text-xs text-muted-foreground">※指定なしの場合、最適な価格をお探します</p>
          </div>

          <div className="border-t border-border/50 pt-5 mt-5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">連絡先</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customerName" className="text-sm font-medium text-foreground">
                  お名前 <span className="text-primary">*</span>
                </Label>
                <Input
                  id="customerName"
                  name="customerName"
                  placeholder="山田 太郎"
                  required
                  className="h-12 rounded-xl border-border/50 bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail" className="text-sm font-medium text-foreground">
                  メールアドレス <span className="text-primary">*</span>
                </Label>
                <Input
                  id="customerEmail"
                  name="customerEmail"
                  type="email"
                  placeholder="example@email.com"
                  required
                  className="h-12 rounded-xl border-border/50 bg-background"
                />
                <p className="text-xs text-muted-foreground">チケットが見つかったらこちらにご連絡します</p>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive bg-destructive/5 p-3 rounded-lg">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 text-base font-medium rounded-full gradient-sakura text-white border-0 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "チケットを探す"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
