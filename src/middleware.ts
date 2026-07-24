import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/lib/i18n";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/kicheleboyz(.*)"]);
const isApiRoute = createRouteMatcher(["/api(.*)"]);

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export default clerkMiddleware(async (auth, req) => {
  // Skip i18n for admin and API routes
  if (isAdminRoute(req) || isApiRoute(req)) {
    if (isAdminRoute(req)) {
      await auth.protect();
    }
    return NextResponse.next();
  }

  return handleI18nRouting(req);
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
  ],
};
