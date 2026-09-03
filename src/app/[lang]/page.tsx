import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TicketRequestForm } from "@/components/ticket-request-form";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  setRequestLocale(lang);
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-xl font-bold tracking-tight text-foreground">
              Kippo<span className="text-primary">🌸</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/events">
              <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                {t("nav.events")}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
          <svg className="absolute top-32 left-[15%] w-4 h-4 text-primary/20 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2C10 2 4 6 4 10C4 14 10 18 10 18C10 18 16 14 16 10C16 6 10 2 10 2Z" />
          </svg>
          <svg className="absolute top-48 right-[20%] w-3 h-3 text-primary/15 animate-pulse" style={{ animationDelay: "1s" }} viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2C10 2 4 6 4 10C4 14 10 18 10 18C10 18 16 14 16 10C16 6 10 2 10 2Z" />
          </svg>
          <svg className="absolute bottom-32 left-[25%] w-5 h-5 text-primary/10 animate-pulse" style={{ animationDelay: "2s" }} viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2C10 2 4 6 4 10C4 14 10 18 10 18C10 18 16 14 16 10C16 6 10 2 10 2Z" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">チケット探索サービス</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
            探してるチケット、
            <br />
            <span className="text-primary">見つけてあげる。</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            欲しいチケットを教えてください。
            <br className="hidden md:block" />
            Kippoが代わりに探して、お届けします。
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <TicketRequestForm />
        </div>
      </section>

      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-widest text-primary uppercase mb-3 block">How it works</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {t("home.howItWorks")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                ),
                titleJa: "リクエストを送る",
                titleEn: "Send Request",
                desc: "欲しいチケットの情報を\n简单にフォームに入力",
              },
              {
                step: "02",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                ),
                titleJa: "Kippoが探す",
                titleEn: "Kippo Searches",
                desc: "スタッフが最適なチケットを\n探してお届けします",
              },
              {
                step: "03",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                  </svg>
                ),
                titleJa: "メールで連絡",
                titleEn: "Email Update",
                desc: "チケットが見つかったら\n価格と支払い方法をお知らせ",
              },
            ].map((item) => (
              <Card key={item.step} className="group border-0 bg-card shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-bold text-primary/40 tracking-wider">{item.step}</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.titleJa}</h3>
                  <p className="text-xs font-medium text-primary/60 uppercase tracking-wide mb-3">{item.titleEn}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden gradient-sakura p-12 md:p-16 text-center">
            <div className="absolute inset-0 opacity-10">
              <svg className="absolute top-4 left-8 w-20 h-20 text-white" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 5C50 5 20 25 20 50C20 75 50 95 50 95C50 95 80 75 80 50C80 25 50 5 50 5Z" />
              </svg>
              <svg className="absolute bottom-4 right-8 w-16 h-16 text-white" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 5C50 5 20 25 20 50C20 75 50 95 50 95C50 95 80 75 80 50C80 25 50 5 50 5Z" />
              </svg>
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                お探しのチケット、見つかりますか？
              </h2>
              <p className="text-white/80 mb-8 max-w-md mx-auto">
                人気イベントのチケットはすぐに完売します。<br />
                でも安心してください。Kippoがお手伝いします。
              </p>
              <Button
                size="lg"
                className="h-14 px-8 text-base font-medium rounded-full bg-white text-primary hover:bg-white/90 shadow-lg"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                チケットを探す
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">Kippo<span className="text-primary">🌸</span></span>
            <span className="text-xs text-muted-foreground">© 2026</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>利用規約</span>
            <span>プライバシーポリシー</span>
            <span>お問い合わせ</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
