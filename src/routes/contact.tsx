import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MapPin, Briefcase, HeadphonesIcon, Code } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "@/lib/i18n/context";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Khalti" },
      { name: "description", content: "Get in touch with Khalti for business inquiries, customer support, and developer assistance." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t } = useTranslation();
  const contacts = [
    { icon: MapPin, title: t("contact.headquarters"), desc: t("contact.headquartersDesc"), detail: t("contact.headquartersDetail") },
    { icon: Briefcase, title: t("contact.businessInquiries"), desc: t("contact.businessInquiriesDesc"), detail: t("contact.businessInquiriesDetail") },
    { icon: HeadphonesIcon, title: t("contact.customerSupport"), desc: t("contact.customerSupportDesc"), detail: t("contact.customerSupportDetail") },
    { icon: Code, title: t("contact.developerSupport"), desc: t("contact.developerSupportDesc"), detail: t("contact.developerSupportDetail") },
  ];
  const [form, setForm] = useState({ fullName: "", company: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success(t("contact.success"));
    setForm({ fullName: "", company: "", email: "", phone: "", subject: "", message: "" });
    setSending(false);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t("contact.heroTitle")} <span className="text-primary">{t("contact.heroTitleHighlight")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {t("contact.heroDesc")}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground">{t("contact.contactInfo")}</h2>
              <div className="mt-8 space-y-6">
                {contacts.map((c) => (
                  <div key={c.title} className="flex gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10">
                      <c.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{c.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                      <p className="mt-1 text-sm font-semibold text-primary">{c.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-card p-8 shadow-card">
              <h2 className="text-xl font-extrabold text-foreground">{t("contact.formTitle")}</h2>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{t("contact.fullName")}</label>
                    <input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{t("contact.companyName")}</label>
                    <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{t("contact.emailAddress")}</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{t("contact.phoneNumber")}</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{t("contact.subject")}</label>
                  <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{t("contact.message")}</label>
                  <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <button type="submit" disabled={sending} className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground shadow-elevated transition-transform hover:scale-105 disabled:opacity-60">
                  {sending ? t("contact.sending") : t("contact.send")}
                </button>
              </form>
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
