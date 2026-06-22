import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CreditCard, Store, Wallet, Code, Building2, CheckCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Khalti" },
      { name: "description", content: "Explore Khalti's payment solutions including payment gateway, merchant solutions, digital wallet, business APIs, and enterprise solutions." },
    ],
  }),
  component: Services,
});

const services = [
  {
    icon: CreditCard,
    title: "Payment Gateway",
    subtitle: "Accept payments through multiple channels with a single integration.",
    features: ["Instant payment processing", "Secure checkout experience", "Multi-platform support", "Automated payment verification", "Transaction reporting", "Refund management"],
  },
  {
    icon: Store,
    title: "Merchant Solutions",
    subtitle: "Designed for businesses of all sizes.",
    benefits: ["Merchant dashboard", "Sales analytics", "Settlement management", "Transaction history", "Team management", "Business reporting tools"],
  },
  {
    icon: Wallet,
    title: "Digital Wallet",
    subtitle: "A convenient way for users to store and manage funds digitally.",
    features: ["Wallet transfers", "Bill payments", "QR payments", "Transaction history", "Instant top-ups", "Secure account management"],
  },
  {
    icon: Code,
    title: "Business APIs",
    subtitle: "Power your applications with flexible APIs.",
    capabilities: ["Payment collection", "Payment verification", "Refund processing", "Customer management", "Webhook notifications", "Transaction tracking"],
  },
  {
    icon: Building2,
    title: "Enterprise Solutions",
    subtitle: "Tailored payment solutions for large organizations.",
    includes: ["Custom integrations", "Dedicated account management", "Advanced reporting", "Priority support", "Volume-based pricing", "Enhanced security controls"],
  },
];

function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Comprehensive Digital <span className="text-primary">Payment Solutions</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              From payment collection to merchant management, our platform provides everything businesses need to accept, process, and manage digital payments.
            </p>
          </div>
        </section>

        {services.map((svc, i) => (
          <section key={svc.title} className={`py-16 ${i % 2 === 1 ? "bg-muted/40" : ""}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10">
                  <svc.icon className="h-7 w-7 text-primary" />
                </div>
                <h2 className="mt-4 text-2xl font-extrabold text-foreground">{svc.title}</h2>
                <p className="mt-2 text-muted-foreground">{svc.subtitle}</p>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {(svc.features ?? svc.benefits ?? svc.capabilities ?? svc.includes ?? []).map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-xl border border-border bg-card p-4 text-sm">
                    <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

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
