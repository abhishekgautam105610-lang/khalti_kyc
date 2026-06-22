import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MapPin, Briefcase, HeadphonesIcon, Code, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Khalti" },
      { name: "description", content: "Get in touch with Khalti for business inquiries, customer support, and developer assistance." },
    ],
  }),
  component: Contact,
});

const contacts = [
  { icon: MapPin, title: "Headquarters", desc: "Our main office serves as the central hub for operations, support, and business partnerships.", detail: "Kathmandu, Nepal" },
  { icon: Briefcase, title: "Business Inquiries", desc: "For partnership opportunities, enterprise solutions, and merchant onboarding.", detail: "business@khalti.cfd" },
  { icon: HeadphonesIcon, title: "Customer Support", desc: "For account, payment, and service-related assistance.", detail: "support@khalti.cfd" },
  { icon: Code, title: "Developer Support", desc: "Technical assistance for API integrations and platform development.", detail: "dev@khalti.cfd" },
];

function Contact() {
  const [form, setForm] = useState({ fullName: "", company: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Message sent! We'll get back to you soon.");
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
              Let's <span className="text-primary">Connect</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Whether you're a business looking to accept payments or a user seeking assistance, we're here to help.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground">Contact Information</h2>
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
              <h2 className="text-xl font-extrabold text-foreground">Send us a message</h2>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Full Name</label>
                    <input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Company Name</label>
                    <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Email Address</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Phone Number</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Subject</label>
                  <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Message</label>
                  <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <button type="submit" disabled={sending} className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground shadow-elevated transition-transform hover:scale-105 disabled:opacity-60">
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-foreground">Ready to Get Started?</h2>
          <p className="mt-3 text-muted-foreground">Join thousands of users and businesses who trust our platform for secure digital payments.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow-elevated transition-transform hover:scale-105">
              Create Account
            </Link>
            <Link to="/contact" className="rounded-full border border-border bg-background px-8 py-3 text-sm font-bold text-foreground transition-colors hover:bg-accent">
              Contact Sales
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
