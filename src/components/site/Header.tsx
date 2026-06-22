import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Send } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export function Header() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: t("header.home"), to: "/" },
    { label: t("header.about"), to: "/about" },
    { label: t("header.services"), to: "/services" },
    { label: t("header.developers"), to: "/developers" },
    { label: t("header.support"), to: "/support" },
    { label: t("header.contact"), to: "/contact" },
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-header" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-1.5">
          <span className="text-2xl font-extrabold tracking-tight text-primary">
            khalti
          </span>
          <Send className="h-4 w-4 -rotate-12 fill-primary text-primary" />
          <span className="ml-1 hidden text-[10px] font-semibold text-muted-foreground sm:inline">
            {t("header.by")} <span className="font-bold text-foreground">{t("header.ime")}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((it) => (
            <Link
              key={it.label}
              to={it.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {it.label}
            </Link>
          ))}
          <Link
            to="/login"
            className="text-sm font-semibold text-foreground/80 hover:text-primary"
          >
            {t("header.login")}
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-105"
          >
            {t("header.signUp")}
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md text-foreground lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="flex flex-col px-4 py-3">
            {navItems.map((it) => (
              <Link
                key={it.label}
                to={it.to}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-foreground/90 hover:text-primary"
              >
                {it.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-primary px-5 py-3 text-center text-base font-semibold text-primary"
            >
              {t("header.login")}
            </Link>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-base font-semibold text-primary-foreground"
            >
              {t("header.signUp")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
