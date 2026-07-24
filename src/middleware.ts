import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/lib/i18n";

const isPublicRoute = createRouteMatcher([
  "/",
  "/:lang",
  "/:lang/events(.*)",
  "/:lang/checkout(.*)",
  "/:lang/order(.*)",
  "/api/orders(.*)",
  "/api/tickets(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect();
  }

  if (isPublicRoute(req)) {
    return handleI18nRouting(req);
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
