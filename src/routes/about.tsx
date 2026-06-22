import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Shield, Users, Lightbulb, Clock, CheckCircle, Send } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Khalti" },
      { name: "description", content: "Learn about Khalti, our mission, vision, and values in digital payments." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Building the Future of <span className="text-primary">Digital Payments</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              We are a modern digital payment platform dedicated to making online transactions simple, secure, and accessible. Our mission is to empower businesses and individuals with seamless payment solutions that drive financial inclusion and digital transformation.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-extrabold text-foreground">Our Story</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Founded with a vision to revolutionize digital payments, our platform connects users, merchants, and businesses through a secure financial ecosystem. We believe that every transaction should be fast, transparent, and hassle-free.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              As digital commerce continues to grow, we remain committed to providing innovative payment solutions that simplify everyday financial activities while maintaining the highest standards of security and reliability.
            </p>
          </div>
        </section>

        <section className="bg-muted/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-card p-8 shadow-card">
                <h3 className="text-xl font-extrabold text-foreground">Mission</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  To provide secure, innovative, and accessible payment solutions that empower businesses and individuals to thrive in the digital economy.
                </p>
              </div>
              <div className="rounded-2xl bg-card p-8 shadow-card">
                <h3 className="text-xl font-extrabold text-foreground">Vision</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  To become the most trusted digital payment ecosystem, enabling seamless financial transactions for everyone, everywhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold text-foreground">Core Values</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield, title: "Security First", desc: "Advanced encryption and industry-standard security protocols protect every transaction." },
              { icon: Users, title: "Customer Centric", desc: "Every feature we build is designed to improve user experience and business growth." },
              { icon: Lightbulb, title: "Innovation", desc: "We continuously evolve our technology to meet changing market demands." },
              { icon: Clock, title: "Reliability", desc: "Providing stable and uninterrupted payment services that users can depend on." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-card p-6 shadow-card text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-muted/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-card p-8 shadow-card">
              <h2 className="text-xl font-extrabold text-foreground">Why Choose Us</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Fast and secure transactions",
                  "Multiple payment options",
                  "Real-time transaction monitoring",
                  "Merchant-friendly solutions",
                  "Dedicated customer support",
                  "Scalable API infrastructure",
                  "Transparent pricing",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
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
