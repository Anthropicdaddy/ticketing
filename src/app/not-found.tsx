"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Sakura petal animation */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/5 flex items-center justify-center">
            <span className="text-6xl font-bold text-primary/20">404</span>
          </div>
          <svg
            className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 text-primary/40 animate-bounce"
            style={{ animationDuration: "3s" }}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2C10 2 4 6 4 10C4 14 10 18 10 18C10 18 16 14 16 10C16 6 10 2 10 2Z" />
          </svg>
          <svg
            className="absolute bottom-2 right-0 w-4 h-4 text-primary/20 animate-bounce"
            style={{ animationDuration: "4s", animationDelay: "1s" }}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2C10 2 4 6 4 10C4 14 10 18 10 18C10 18 16 14 16 10C16 6 10 2 10 2Z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          ページが見つかりません
        </h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          お探しのページは存在しないか、移動した可能性があります。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button className="h-11 px-6 rounded-full text-sm font-medium gradient-sakura text-white border-0 shadow-lg shadow-primary/20">
              トップに戻る
            </Button>
          </Link>
          <Link href="/events">
            <Button variant="ghost" className="h-11 px-6 rounded-full text-sm font-medium text-muted-foreground">
              イベントを見る
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
