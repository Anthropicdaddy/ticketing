"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  ShoppingCart,
  Clock,
  Bot,
  Mail,
  Home,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/admin/approvals", label: "承認待ち", icon: Clock },
  { href: "/admin/events", label: "イベント管理", icon: Calendar },
  { href: "/admin/orders", label: "注文管理", icon: ShoppingCart },
  { href: "/admin/ai", label: "AIアシスタント", icon: Bot },
  { href: "/admin/emails", label: "送信履歴", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-muted/50 border-r min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-lg font-bold">Kippo🌸</h2>
        <p className="text-xs text-muted-foreground">管理画面</p>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-8">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Home className="w-4 h-4" />
          サイトを見る
        </Link>
      </div>
    </aside>
  );
}
