import { notFound } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { lang } = await params;
  if (lang !== "en") notFound();

  return <>{children}</>;
}