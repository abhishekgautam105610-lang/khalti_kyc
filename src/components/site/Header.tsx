import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Send } from "lucide-react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/" },
  { label: "Services", to: "/" },
  { label: "Developers", to: "/" },
  { label: "Support", to: "/" },
  { label: "Contact", to: "/" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            by <span className="font-bold text-foreground">IME</span>
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
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-105"
          >
            Sign up
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
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-base font-semibold text-primary-foreground"
            >
              Sign up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
