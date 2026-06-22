import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  MessageCircle,
  Send,
  ExternalLink,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export function Footer() {
  const { t } = useTranslation();
  const columns = [
    {
      title: t("footer.company"),
      links: [
        t("footer.aboutUs"),
        t("footer.contactUs"),
        t("footer.helpSupport"),
        t("footer.careers"),
        t("footer.procurement"),
        t("footer.semiAnnual"),
      ],
    },
    {
      title: t("footer.codeOfConduct"),
      links: [
        t("footer.privacyPolicy"),
        t("footer.disputePolicy"),
        t("footer.terms"),
        t("footer.dormantPolicy"),
        t("footer.flightFare"),
      ],
    },
    {
      title: t("footer.developer"),
      links: [
        t("footer.paymentGateway"),
        t("footer.openSource"),
        t("footer.billingApi"),
      ],
    },
    {
      title: t("footer.charges"),
      links: [t("footer.serviceCharge"), t("footer.transactionLimit")],
    },
  ];

  return (
    <footer className="bg-surface-dark text-surface-dark-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-12 sm:px-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="rounded-md bg-white/5 px-4 py-3 text-center">
            <p className="text-2xl font-black tracking-tight">SISA</p>
            <p className="text-[11px] font-semibold tracking-wider text-white/80">
              {t("trustBadges.pciDss")}
            </p>
          </div>
          <div className="rounded-md bg-white px-4 py-3 text-center text-surface-dark">
            <p className="text-sm font-bold leading-tight">ISO 27001</p>
            <p className="text-[10px] font-semibold leading-tight text-indigo-700">
              {t("trustBadges.infoSec")}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {columns.map((c) => (
          <div key={c.title}>
            <h3 className="text-base font-bold">{c.title}</h3>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap gap-4 px-6 pb-10 sm:px-8">
        <Link
          to="/login"
          className="rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-surface-dark"
        >
          {t("footer.join")}
        </Link>
        <Link
          to="/login"
          className="rounded-full px-8 py-3 text-sm font-semibold text-white transition-colors hover:text-primary"
        >
          {t("footer.login")}
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 px-6 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        <div>
          <h3 className="text-base font-bold">{t("footer.callSupport")}</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>{t("footer.tollFreeNcell")}</li>
            <li>{t("footer.tollFreeNtc")}</li>
            <li>{t("footer.landline")}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold">{t("footer.chatSupport")}</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>{t("footer.whatsapp")}</li>
            <li>{t("footer.viber")}</li>
            <li>{t("footer.email")}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold">{t("footer.grievanceOfficer")}</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>{t("footer.grievanceName")}</li>
            <li>{t("footer.grievanceCall")}</li>
            <li>{t("footer.grievanceEmail")}</li>
            <li className="flex items-center gap-1 font-semibold text-white">
              {t("footer.nrbGrievance")} <ExternalLink className="h-3.5 w-3.5" />
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-black/40 py-8">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <p className="text-center text-base font-semibold">
            {t("footer.getConnected")}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {[Facebook, Instagram, Linkedin, Twitter, Youtube, MessageCircle].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ),
            )}
          </div>
          <div className="mt-6 flex items-center justify-center gap-1.5 text-primary">
            <span className="text-xl font-extrabold">khalti</span>
            <Send className="h-3.5 w-3.5 -rotate-12 fill-primary" />
          </div>
          <p className="mt-3 text-center text-xs text-white/60">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
