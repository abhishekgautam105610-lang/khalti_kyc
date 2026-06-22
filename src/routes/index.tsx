import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Promo } from "@/components/site/Promo";
import { InfoCard } from "@/components/site/InfoCard";
import { TrustBadges } from "@/components/site/TrustBadges";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Khalti — Digital Wallet for Infinite Possibilities" },
      {
        name: "description",
        content:
          "Khalti is a digital wallet for wallet-to-wallet transfers, utility bills, and instant online payments. Complete the survey and earn up to 10,000 NPR.",
      },
      { property: "og:title", content: "Khalti — Digital Wallet" },
      {
        property: "og:description",
        content: "Pay bills, transfer money and shop online with Khalti.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Promo />
        <InfoCard />
        <TrustBadges />
      </main>
      <Footer />
    </div>
  );
}
