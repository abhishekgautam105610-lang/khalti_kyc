import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Code, Globe, Smartphone, Apple, Server, CheckCircle, BookOpen, Webhook, Lock, Activity, RefreshCw, Terminal } from "lucide-react";

export const Route = createFileRoute("/developers")({
  head: () => ({
    meta: [
      { title: "Developers — Khalti" },
      { name: "description", content: "Integrate Khalti payment platform with robust APIs, SDKs, and developer tools." },
    ],
  }),
  component: Developers,
});

const steps = [
  { num: "1", title: "Create Developer Account", desc: "Register your account and access the developer dashboard." },
  { num: "2", title: "Obtain API Keys", desc: "Generate secure API credentials for testing and production environments." },
  { num: "3", title: "Integrate SDKs", desc: "Use our SDKs and APIs to enable payments in your application." },
  { num: "4", title: "Go Live", desc: "Complete testing and start accepting real payments." },
];

const sdks = [
  { icon: Globe, name: "Web SDK", desc: "Integrate payment functionality into web applications with minimal effort." },
  { icon: Smartphone, name: "Android SDK", desc: "Native Android integration for seamless mobile experiences." },
  { icon: Apple, name: "iOS SDK", desc: "Secure payment processing for Apple devices." },
  { icon: Server, name: "REST API", desc: "Flexible API endpoints for custom implementations." },
];

const langs = ["JavaScript", "React", "Node.js", "PHP", "Python", "Laravel", "Django"];

function Developers() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Build Powerful <span className="text-primary">Payment Experiences</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Integrate our payment platform into your website, mobile application, or enterprise system using our robust APIs and developer tools.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold text-foreground">Quick Integration</h2>
          <p className="mt-2 text-center text-muted-foreground">Get started in minutes.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="relative rounded-2xl bg-card p-6 shadow-card">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {s.num}
                </div>
                <h3 className="mt-4 font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-muted/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-extrabold text-foreground">Available SDKs</h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sdks.map((sdk) => (
                <div key={sdk.name} className="rounded-2xl bg-card p-6 shadow-card text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10">
                    <sdk.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-bold text-foreground">{sdk.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{sdk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold text-foreground">Developer Features</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, label: "Sandbox environment" },
              { icon: BookOpen, label: "Detailed API documentation" },
              { icon: Webhook, label: "Webhook support" },
              { icon: Lock, label: "Secure authentication" },
              { icon: CheckCircle, label: "Transaction verification" },
              { icon: RefreshCw, label: "Refund APIs" },
              { icon: Activity, label: "Error monitoring" },
              { icon: Terminal, label: "Real-time status updates" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <Icon className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-muted/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-extrabold text-foreground">Sample Code</h2>
            <p className="mt-2 text-center text-muted-foreground">Available in multiple programming languages.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {langs.map((lang) => (
                <div key={lang} className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm">
                  {lang}
                </div>
              ))}
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
