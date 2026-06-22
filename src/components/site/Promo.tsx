import { ChevronDown } from "lucide-react";

export function Promo() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
      <h2 className="text-2xl font-bold leading-snug text-muted-foreground sm:text-3xl">
        Khalti Bank offers each customer the opportunity to receive{" "}
        <span className="text-foreground">10 000 NPR</span> for completing a survey
      </h2>

      <div className="mt-8 space-y-5 text-left text-base leading-relaxed text-foreground/90 sm:text-lg">
        <p>
          At Khalti Bank, we place great importance on our customers experience.
          We want to improve, which is why we've developed a survey to help us
          become more user-friendly.
        </p>
        <p>
          Complete the survey to help us improve and receive a bonus of up to
          10 000 NPR.
        </p>
        <p className="font-semibold text-emerald-600">
          The bank's promotion is limited and valid until 30/07/2026
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <button className="w-full rounded-xl bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto">
          Take the bonus
        </button>
        <div className="relative w-full sm:w-auto">
          <select
            aria-label="Language"
            className="w-full appearance-none rounded-lg border border-border bg-background py-3 pl-10 pr-10 text-sm font-medium text-foreground shadow-card focus:outline-none focus:ring-2 focus:ring-ring sm:w-44"
          >
            <option>🇬🇧 English</option>
            <option>🇳🇵 नेपाली</option>
            <option>🇮🇳 हिन्दी</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
