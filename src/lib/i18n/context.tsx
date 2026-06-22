import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { en } from "./en";
import { ne } from "./ne";
type Language = "en" | "ne";

const translations: Record<Language, Record<string, any>> = { en, ne };

type I18nContext = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
};

const Ctx = createContext<I18nContext | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("lang") as Language) || "en";
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", language);
    document.documentElement.lang = language;
  }, [language]);

  function t(path: string): string {
    const keys = path.split(".");
    let current: any = translations[language];
    for (const key of keys) {
      if (current == null) return path;
      current = current[key];
    }
    return typeof current === "string" ? current : path;
  }

  return <Ctx.Provider value={{ language, setLanguage, t }}>{children}</Ctx.Provider>;
}

export function useTranslation() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
}
