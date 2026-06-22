import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Shield, Users, Lightbulb, Clock, CheckCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Khalti" },
      { name: "description", content: "Learn about Khalti, our mission, vision, and values in digital payments." },
    ],
  }),
  component: About,
});

function About() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("about.heroTitle")} <span className="text-primary">{t("about.heroTitleHighlight")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t("about.heroDesc")}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-extrabold text-foreground">{t("about.ourStory")}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.storyP1")}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("about.storyP2")}</p>
          </div>
        </section>

        <section className="bg-muted/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-card p-8 shadow-card">
                <h3 className="text-xl font-extrabold text-foreground">{t("about.mission")}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("about.missionDesc")}</p>
              </div>
              <div className="rounded-2xl bg-card p-8 shadow-card">
                <h3 className="text-xl font-extrabold text-foreground">{t("about.vision")}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{t("about.visionDesc")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold text-foreground">{t("about.coreValues")}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: t("about.security"), desc: t("about.securityDesc") },
              { icon: Users, title: t("about.customer"), desc: t("about.customerDesc") },
              { icon: Lightbulb, title: t("about.innovation"), desc: t("about.innovationDesc") },
              { icon: Clock, title: t("about.reliability"), desc: t("about.reliabilityDesc") },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-card p-6 shadow-card text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-muted/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-card p-8 shadow-card">
              <h2 className="text-xl font-extrabold text-foreground">{t("about.whyChoose")}</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {t("about.reasons").map((item: string) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
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
