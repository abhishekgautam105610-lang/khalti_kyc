import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  FileText,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { StatusBadge } from "@/components/kyc/StatusBadge";
import { getMyKyc, kycCompletionPercent } from "@/lib/kyc/service";
import type { KycSubmission } from "@/types/kyc";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/kyc/")({
  component: KycDashboard,
});

function KycDashboard() {
  const { user } = useAuth();
  const [sub, setSub] = useState<KycSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getMyKyc()
      .then((s) => {
        setSub(s);
        setLoading(false);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : "Failed to load KYC data");
        setLoading(false);
      });
  }, [user]);

  if (loading)
    return <div className="text-sm text-muted-foreground">Loading…</div>;

  if (error)
    return <div className="text-sm text-destructive">{error}</div>;

  const pct = kycCompletionPercent(sub);
  const canResubmit = !sub || sub.status === "rejected";

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-elevated sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" /> KYC Verification
            </div>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              {sub ? "Your verification status" : "Verify your identity"}
            </h1>
            <p className="mt-1 max-w-lg text-sm text-white/85">
              Complete KYC to unlock higher transaction limits, payments, and withdrawals.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {sub && <StatusBadge status={sub.status} />}
            {canResubmit && (
              <Link
                to="/kyc/submit"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-primary transition-transform hover:scale-105"
              >
                {sub ? "Resubmit" : "Start verification"} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-medium text-white/85">
            <span>Profile completion</span>
            <span>{pct}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
            <div className="h-full bg-white transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </section>

      {sub?.status === "rejected" && sub.admin_notes && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
          <div className="min-w-0">
            <p className="font-semibold text-rose-900">Submission rejected</p>
            <p className="mt-1 text-sm text-rose-700">{sub.admin_notes}</p>
            <Link
              to="/kyc/submit"
              className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-rose-700 hover:underline"
            >
              Resubmit now <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {sub ? (
        <section className="rounded-3xl bg-card p-6 shadow-card sm:p-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold">Submitted information</h2>
            <p className="text-xs text-muted-foreground">
              Last updated {new Date(sub.updated_at).toLocaleString()}
            </p>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            <Info label="Full name" value={sub.full_name} />
            <Info label="Date of birth" value={sub.dob} />
            <Info label="Gender" value={sub.gender} />
            <Info label="Nationality" value={sub.nationality} />
            <Info label="Phone" value={sub.phone} />
            <Info label="Email" value={sub.email} />
            <Info label="Address" value={`${sub.address}, ${sub.city}, ${sub.state}`} />
            <Info label="ID" value={`${sub.id_type} · ${sub.id_number}`} />
          </dl>

          <div className="mt-6 border-t border-border pt-5">
            <h3 className="text-sm font-bold">Documents</h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(
                [
                  ["ID — Front", sub.id_front_url],
                  ["ID — Back", sub.id_back_url],
                  ["Passport", sub.passport_url],
                  ["Selfie", sub.selfie_url],
                ] as const
              )
                .filter(([, v]) => v)
                .map(([label, v]) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-border p-3"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{label}</p>
                      <p className="truncate text-xs text-muted-foreground">{v}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="grid gap-4 rounded-3xl bg-card p-6 shadow-card sm:grid-cols-3 sm:p-8">
          {[
            ["1. Personal info", "Name, DOB, address — takes a minute."],
            ["2. ID verification", "Government-issued ID details."],
            ["3. Documents", "ID photos, selfie."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-border p-5">
              <p className="font-bold text-foreground">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-foreground">{value || "—"}</dd>
    </div>
  );
}
