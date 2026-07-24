export const locales = ["ja", "en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ja";

export async function getMessages(locale: Locale) {
  switch (locale) {
    case "ja":
      return (await import("./messages/ja.json")).default;
    case "en":
      return (await import("./messages/en.json")).default;
    case "zh":
      return (await import("./messages/zh.json")).default;
    default:
      return (await import("./messages/ja.json")).default;
  }
}
