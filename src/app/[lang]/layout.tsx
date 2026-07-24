import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!hasLocale(locales, lang)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={lang}>
      {children}
    </NextIntlClientProvider>
  );
}
