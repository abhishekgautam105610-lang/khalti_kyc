import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Globe, Smartphone, Apple, Server, BookOpen, Webhook, Lock, CheckCircle, RefreshCw, Activity, Terminal } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export const Route = createFileRoute("/developers")({
  head: () => ({
    meta: [
      { title: "Developers — Khalti" },
      { name: "description", content: "Integrate Khalti payment platform with robust APIs, SDKs, and developer tools." },
    ],
  }),
  component: Developers,
});

const langs = ["JavaScript", "React", "Node.js", "PHP", "Python", "Laravel", "Django"];

function Developers() {
  const { t } = useTranslation();
  const steps = t("developers.steps").map((s: any, i: number) => ({ ...s, num: String(i + 1) }));
  const sdks = [
    { icon: Globe, label: "sdkWeb", desc: "sdkWebDesc" },
    { icon: Smartphone, label: "sdkAndroid", desc: "sdkAndroidDesc" },
    { icon: Apple, label: "sdkIos", desc: "sdkIosDesc" },
    { icon: Server, label: "sdkRest", desc: "sdkRestDesc" },
  ];
  const feats = t("developers.featureList");
  const featIcons = [BookOpen, BookOpen, Webhook, Lock, CheckCircle, RefreshCw, Activity, Terminal];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("developers.heroTitle")} <span className="text-primary">{t("developers.heroTitleHighlight")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t("developers.heroDesc")}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold text-foreground">{t("developers.quick")}</h2>
          <p className="mt-2 text-center text-muted-foreground">{t("developers.quickSub")}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s: any) => (
              <div key={s.num} className="relative rounded-2xl bg-card p-6 shadow-card">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {s.num}
                </div>
                <h3 className="mt-4 font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-muted/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-extrabold text-foreground">{t("developers.sdks")}</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sdks.map((sdk) => (
                <div key={sdk.label} className="rounded-2xl bg-card p-6 shadow-card text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10">
                    <sdk.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-bold text-foreground">{t(`developers.${sdk.label}`)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t(`developers.${sdk.desc}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold text-foreground">{t("developers.features")}</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {feats.map((label: string, i: number) => {
              const Icon = featIcons[i] || BookOpen;
              return (
                <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                  <Icon className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-muted/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-extrabold text-foreground">{t("developers.sampleCode")}</h2>
            <p className="mt-2 text-center text-muted-foreground">{t("developers.sampleCodeDesc")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {langs.map((lang) => (
                <div key={lang} className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm">
                  {lang}
                </div>
              ))}
            </div>
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
