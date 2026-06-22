import { ShieldCheck, Award, Lock } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    title: "SISA",
    sub: "PCI DSS Certified",
  },
  {
    icon: Award,
    title: "ISO 27001",
    sub: "Information Security Management",
  },
  {
    icon: Lock,
    title: "256-bit SSL",
    sub: "End-to-end Encryption",
  },
];

export function TrustBadges() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {badges.map((b) => (
          <div
            key={b.title}
            className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-transform hover:-translate-y-1"
          >
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-primary/10">
              <b.icon className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{b.title}</p>
              <p className="text-sm text-muted-foreground">{b.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
