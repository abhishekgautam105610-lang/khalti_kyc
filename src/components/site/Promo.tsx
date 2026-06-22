import { ChevronDown } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "@/lib/i18n/context";

export function Promo() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useTranslation();
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
      <h2 className="text-2xl font-bold leading-snug text-muted-foreground sm:text-3xl">
        {t("promo.title")}{" "}
        <span className="text-foreground">{t("promo.amount")}</span> {t("promo.forCompleting")}
      </h2>

      <div className="mt-8 space-y-5 text-left text-base leading-relaxed text-foreground/90 sm:text-lg">
        <p>{t("promo.p1")}</p>
        <p>{t("promo.p2")}</p>
        <p className="font-semibold text-emerald-600">{t("promo.limited")}</p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <button
          onClick={() => navigate({ to: "/login" })}
          className="w-full rounded-xl bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
        >
          {t("promo.takeBonus")}
        </button>
        <div className="relative w-full sm:w-auto">
          <select
            aria-label={t("promo.language")}
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "ne")}
            className="w-full appearance-none rounded-lg border border-border bg-background py-3 pl-10 pr-10 text-sm font-medium text-foreground shadow-card focus:outline-none focus:ring-2 focus:ring-ring sm:w-44"
          >
            <option value="en">🇬🇧 English</option>
            <option value="ne">🇳🇵 नेपाली</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
