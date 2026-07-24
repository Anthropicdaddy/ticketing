"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function KicheleboyzNotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/5 flex items-center justify-center">
            <span className="text-6xl font-bold text-primary/20">404</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          ページが見つかりません
        </h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          お探しのページは存在しないか、移動した可能性があります。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/kicheleboyz">
            <Button className="h-11 px-6 rounded-full text-sm font-medium gradient-sakura text-white border-0 shadow-lg shadow-primary/20">
              ダッシュボードに戻る
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="h-11 px-6 rounded-full text-sm font-medium text-muted-foreground">
              サイトを見る
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
