import heroImg from "@/assets/hero-illustration.png";
import { useTranslation } from "@/lib/i18n/context";

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="w-full">
      <div className="bg-gradient-promo">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <p className="text-sm font-extrabold tracking-wider text-white sm:text-base">
            {t("hero.voteGlobally")}
          </p>
          <button className="rounded-full bg-amber-400 px-4 py-1.5 text-xs font-bold text-surface-dark transition-transform hover:scale-105 sm:text-sm">
            {t("hero.voteNow")} ▸
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8">
        <img
          src={heroImg}
          alt="Khalti — for infinite possibilities"
          width={1280}
          height={768}
          className="mx-auto h-auto w-full max-w-3xl"
        />
        <p className="-mt-2 text-center text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
          {t("hero.forInfinite")}
        </p>
      </div>
    </section>
  );
}
