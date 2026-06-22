import type { KycStatus } from "@/types/kyc";
import { CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";

const STYLES: Record<KycStatus, { cls: string; label: string; Icon: typeof Clock }> = {
  pending:  { cls: "bg-amber-100 text-amber-700",   label: "Pending",       Icon: Clock },
  review:   { cls: "bg-sky-100 text-sky-700",       label: "Under Review",  Icon: AlertCircle },
  approved: { cls: "bg-emerald-100 text-emerald-700", label: "Approved",    Icon: CheckCircle2 },
  rejected: { cls: "bg-rose-100 text-rose-700",     label: "Rejected",      Icon: XCircle },
};

export function StatusBadge({ status }: { status: KycStatus }) {
  const s = STYLES[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${s.cls}`}>
      <s.Icon className="h-3.5 w-3.5" /> {s.label}
    </span>
  );
}
