import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CreditCard, Store, Wallet, Code, Building2, CheckCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Khalti" },
      { name: "description", content: "Explore Khalti's payment solutions including payment gateway, merchant solutions, digital wallet, business APIs, and enterprise solutions." },
    ],
  }),
  component: Services,
});

function Services() {
  const { t } = useTranslation();
  const services = [
    {
      icon: CreditCard,
      title: t("services.gateway"),
      subtitle: t("services.gatewayDesc"),
      features: t("services.gatewayFeatures"),
    },
    {
      icon: Store,
      title: t("services.merchant"),
      subtitle: t("services.merchantDesc"),
      features: t("services.merchantBenefits"),
    },
    {
      icon: Wallet,
      title: t("services.wallet"),
      subtitle: t("services.walletDesc"),
      features: t("services.walletFeatures"),
    },
    {
      icon: Code,
      title: t("services.apis"),
      subtitle: t("services.apisDesc"),
      features: t("services.apiCapabilities"),
    },
    {
      icon: Building2,
      title: t("services.enterprise"),
      subtitle: t("services.enterpriseDesc"),
      features: t("services.enterpriseIncludes"),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("services.heroTitle")} <span className="text-primary">{t("services.heroTitleHighlight")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t("services.heroDesc")}
            </p>
          </div>
        </section>

        {services.map((svc, i) => (
          <section key={svc.title} className={`py-16 ${i % 2 === 1 ? "bg-muted/40" : ""}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10">
                  <svc.icon className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mt-4 text-2xl font-extrabold text-foreground">{svc.title}</h2>
                <p className="mt-2 text-muted-foreground">{svc.subtitle}</p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {svc.features.map((item: string) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl border border-border bg-card p-4 text-sm">
                    <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

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
