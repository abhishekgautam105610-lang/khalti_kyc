import { Send, Apple, Play } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export function InfoCard() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-surface-dark px-6 py-10 text-surface-dark-foreground shadow-elevated sm:px-10 sm:py-14">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-14">
          <div className="flex items-center gap-2">
            <span className="text-6xl font-extrabold tracking-tight text-primary sm:text-7xl">
              khalti
            </span>
            <Send className="h-8 w-8 -rotate-12 fill-primary text-primary sm:h-10 sm:w-10" />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <p className="text-base leading-relaxed text-white/90 sm:text-lg">
              {t("infoCard.description")}
            </p>

            <p className="mt-8 text-center text-sm text-white/70 lg:text-left">
              {t("infoCard.availableOn")}
            </p>
            <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#"
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/30 bg-black px-5 py-3 transition-colors hover:bg-white/10 sm:w-auto"
              >
                <Apple className="h-6 w-6 text-white" />
                <div className="text-left">
                  <div className="text-[10px] leading-none text-white/70">
                    {t("infoCard.downloadOn")}
                  </div>
                  <div className="text-base font-semibold leading-tight text-white">
                    {t("infoCard.appStore")}
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/30 bg-black px-5 py-3 transition-colors hover:bg-white/10 sm:w-auto"
              >
                <Play className="h-6 w-6 fill-emerald-400 text-emerald-400" />
                <div className="text-left">
                  <div className="text-[10px] leading-none text-white/70">
                    {t("infoCard.getItOn")}
                  </div>
                  <div className="text-base font-semibold leading-tight text-white">
                    {t("infoCard.googlePlay")}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
