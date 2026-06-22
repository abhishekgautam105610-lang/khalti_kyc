import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mail, MessageCircle, Phone, BookOpen, ChevronDown, HelpCircle, CreditCard, Store, Code } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — Khalti" },
      { name: "description", content: "Get help with your Khalti account, payments, merchant services, and API integration." },
    ],
  }),
  component: Support,
});

function Support() {
  const { t } = useTranslation();
  const faqs = t("support.faqs");
  const channels = [
    { icon: Mail, title: t("support.emailSupport"), desc: t("support.emailSupportDesc"), action: "support@khalti.cfd" },
    { icon: MessageCircle, title: t("support.liveChat"), desc: t("support.liveChatDesc"), action: t("common.startChat") },
    { icon: Phone, title: t("support.phoneSupport"), desc: t("support.phoneSupportDesc"), action: t("footer.tollFreeNtc") },
    { icon: BookOpen, title: t("support.helpCenter"), desc: t("support.helpCenterDesc"), action: t("common.visitHelpCenter") },
  ];
  const categories = [
    { icon: HelpCircle, title: t("support.accountIssues"), desc: t("support.accountIssuesDesc") },
    { icon: CreditCard, title: t("support.paymentIssues"), desc: t("support.paymentIssuesDesc") },
    { icon: Store, title: t("support.merchantSupport"), desc: t("support.merchantSupportDesc") },
    { icon: Code, title: t("support.technicalSupport"), desc: t("support.technicalSupportDesc") },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("support.heroTitle")} <span className="text-primary">{t("support.heroTitleHighlight")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t("support.heroDesc")}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold text-foreground">{t("support.faq")}</h2>
          <div className="mt-8 mx-auto max-w-3xl space-y-3">
            {faqs.map((faq: any) => (
              <details key={faq.q} className="group rounded-xl border border-border bg-card">
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-foreground">
                  {faq.q}
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-border px-5 py-4 text-sm text-muted-foreground">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-muted/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-extrabold text-foreground">{t("support.contactChannels")}</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {channels.map((ch) => (
                <div key={ch.title} className="rounded-2xl bg-card p-6 shadow-card text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10">
                    <ch.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-bold text-foreground">{ch.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{ch.desc}</p>
                  <p className="mt-3 text-xs font-semibold text-primary">{ch.action}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold text-foreground">{t("support.categories")}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {categories.map((cat) => (
              <div key={cat.title} className="flex gap-4 rounded-2xl bg-card p-6 shadow-card">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10">
                  <cat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{cat.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-foreground">{t("common.ctaTitle")}</h2>
          <p className="mt-3 text-muted-foreground">{t("common.ctaDesc")}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-elevated transition-transform hover:scale-105">
              {t("common.createAccount")}
            </Link>
            <Link to="/contact" className="rounded-full border border-border bg-background px-8 py-3 text-sm font-bold text-foreground transition-colors hover:bg-accent">
              {t("common.contactSales")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
