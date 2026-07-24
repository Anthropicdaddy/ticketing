import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/lib/i18n";

const isAdminRoute = createRouteMatcher(["/kicheleboyz(.*)"]);

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect();
  }

  return handleI18nRouting(req);
});

export const config = {
  matcher: [
    "/((?!_next|api|.*\\..*).*)",
  ],
};
