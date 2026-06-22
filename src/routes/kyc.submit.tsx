import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Stepper } from "@/components/kyc/Stepper";
import { FileDrop } from "@/components/kyc/FileDrop";
import { COUNTRIES } from "@/lib/kyc/constants";
import { getMyKyc, submitKyc } from "@/lib/kyc/service";
import { ID_TYPE_LABEL, type IdType } from "@/types/kyc";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/kyc/submit")({
  component: KycWizard,
});

const STEPS = ["Personal", "Identity", "Documents", "Review"];

interface FormState {
  full_name: string; dob: string; gender: "" | "Male" | "Female" | "Other";
  nationality: string; phone: string; email: string;
  address: string; city: string; state: string;
  id_type: "" | IdType; id_number: string;
  id_front_url: string | null; id_back_url: string | null; passport_url: string | null;
  selfie_url: string | null;
}

const EMPTY: FormState = {
  full_name: "", dob: "", gender: "", nationality: "", phone: "", email: "",
  address: "", city: "", state: "",
  id_type: "", id_number: "",
  id_front_url: null, id_back_url: null, passport_url: null,
  selfie_url: null,
};

function KycWizard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;
    getMyKyc().then((s) => {
      if (s) setForm({ ...EMPTY, ...s, gender: s.gender as FormState["gender"] });
    });
  }, [user]);

  const set =
    <K extends keyof FormState>(k: K) =>
    (v: FormState[K]) =>
      setForm((f) => ({ ...f, [k]: v }));

  const validate = (s: number): boolean => {
    const e: Record<string, string> = {};
    const req = (k: keyof FormState, msg: string) => {
      if (!form[k]) e[k] = msg;
    };
    if (s === 0) {
      req("full_name", "Required");
      req("dob", "Required");
      req("gender", "Required");
      req("nationality", "Required");
      req("phone", "Required");
      req("email", "Required");
      req("address", "Required");
      req("city", "Required");
      req("state", "Required");
      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
      if (form.phone && form.phone.replace(/\D/g, "").length < 7) e.phone = "Invalid phone";
    }
    if (s === 1) {
      req("id_type", "Required");
      req("id_number", "Required");
    }
    if (s === 2) {
      if (!form.id_front_url) e.id_front_url = "Required";
      if (!form.selfie_url) e.selfie_url = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(STEPS.length - 1, s + 1));
    else toast.error("Please complete all required fields.");
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async () => {
    if (!validate(2)) return;
    setSubmitting(true);
    try {
      await submitKyc({
        ...form,
        gender: form.gender || "",
        id_type: form.id_type || "",
      } as never);
      toast.success("KYC submitted — under review.");
      navigate({ to: "/kyc" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const pct = useMemo(() => Math.round(((step + 1) / STEPS.length) * 100), [step]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-card p-5 shadow-card sm:p-7">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-primary">
          <ShieldCheck className="h-4 w-4" /> Step {step + 1} of {STEPS.length} · {pct}%
        </div>
        <Stepper steps={STEPS} current={step} />
      </div>

      <div className="rounded-3xl bg-card p-5 shadow-card sm:p-8">
        {step === 0 && <StepPersonal form={form} set={set} errors={errors} />}
        {step === 1 && <StepIdentity form={form} set={set} errors={errors} />}
        {step === 2 && <StepDocs form={form} set={set} errors={errors} />}
        {step === 3 && <StepReview form={form} />}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.01]"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={submitting}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.01] disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Submit for review"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const cls =
  "w-full rounded-md border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

function Lab({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-foreground">
        {label}{required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

type StepProps = {
  form: FormState;
  set: <K extends keyof FormState>(k: K) => (v: FormState[K]) => void;
  errors: Record<string, string>;
};

function StepPersonal({ form, set, errors }: StepProps) {
  return (
    <>
      <h2 className="text-lg font-bold">Personal information</h2>
      <p className="mt-1 text-sm text-muted-foreground">Tell us about yourself.</p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Lab label="Full name" required error={errors.full_name}>
          <input className={cls} value={form.full_name} onChange={(e) => set("full_name")(e.target.value)} />
        </Lab>
        <Lab label="Date of birth" required error={errors.dob}>
          <input type="date" className={cls} value={form.dob} onChange={(e) => set("dob")(e.target.value)} />
        </Lab>
        <Lab label="Gender" required error={errors.gender}>
          <select className={cls} value={form.gender} onChange={(e) => set("gender")(e.target.value as FormState["gender"])}>
            <option value="">Select</option>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </Lab>
        <Lab label="Nationality" required error={errors.nationality}>
          <select className={cls} value={form.nationality} onChange={(e) => set("nationality")(e.target.value)}>
            <option value="">Select</option>
            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Lab>
        <Lab label="Phone number" required error={errors.phone}>
          <input className={cls} value={form.phone} onChange={(e) => set("phone")(e.target.value)} />
        </Lab>
        <Lab label="Email address" required error={errors.email}>
          <input type="email" className={cls} value={form.email} onChange={(e) => set("email")(e.target.value)} />
        </Lab>
        <Lab label="Residential address" required error={errors.address}>
          <input className={cls} value={form.address} onChange={(e) => set("address")(e.target.value)} />
        </Lab>
        <Lab label="City" required error={errors.city}>
          <input className={cls} value={form.city} onChange={(e) => set("city")(e.target.value)} />
        </Lab>
        <Lab label="State / Province" required error={errors.state}>
          <input className={cls} value={form.state} onChange={(e) => set("state")(e.target.value)} />
        </Lab>
      </div>
    </>
  );
}

function StepIdentity({ form, set, errors }: StepProps) {
  return (
    <>
      <h2 className="text-lg font-bold">Identity verification</h2>
      <p className="mt-1 text-sm text-muted-foreground">Government-issued identification.</p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Lab label="Government ID type" required error={errors.id_type}>
          <select className={cls} value={form.id_type} onChange={(e) => set("id_type")(e.target.value as IdType)}>
            <option value="">Select</option>
            {(Object.entries(ID_TYPE_LABEL) as [IdType, string][]).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </Lab>
        <Lab label="ID number" required error={errors.id_number}>
          <input className={cls} value={form.id_number} onChange={(e) => set("id_number")(e.target.value)} />
        </Lab>
      </div>
    </>
  );
}

function StepDocs({ form, set, errors }: StepProps) {
  return (
    <>
      <h2 className="text-lg font-bold">Document uploads</h2>
      <p className="mt-1 text-sm text-muted-foreground">JPG, PNG or PDF up to 10 MB each.</p>
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FileDrop field="id_front_url" label="Front side of ID" required value={form.id_front_url} onChange={set("id_front_url")} />
        <FileDrop field="id_back_url" label="Back side of ID" value={form.id_back_url} onChange={set("id_back_url")} />
        <FileDrop field="passport_url" label="Passport copy" value={form.passport_url} onChange={set("passport_url")} />
        <FileDrop field="selfie_url" label="Selfie photo" required value={form.selfie_url} onChange={set("selfie_url")} />
      </div>
      {(errors.id_front_url || errors.selfie_url) && (
        <p className="mt-3 text-xs font-medium text-destructive">All required documents must be uploaded.</p>
      )}
    </>
  );
}

function StepReview({ form }: { form: FormState }) {
  const rows: [string, string | null][] = [
    ["Full name", form.full_name], ["Date of birth", form.dob],
    ["Gender", form.gender], ["Nationality", form.nationality],
    ["Phone", form.phone], ["Email", form.email],
    ["Address", `${form.address}, ${form.city}, ${form.state}`],
    ["ID type", form.id_type ? ID_TYPE_LABEL[form.id_type as IdType] : ""],
    ["ID number", form.id_number],
  ];
  return (
    <>
      <h2 className="text-lg font-bold">Review & submit</h2>
      <p className="mt-1 text-sm text-muted-foreground">Please confirm everything is correct.</p>
      <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-border py-2">
            <dt className="text-xs font-semibold uppercase text-muted-foreground">{k}</dt>
            <dd className="text-right text-sm font-semibold text-foreground">{v || "—"}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-xs text-muted-foreground">
        By submitting you confirm the information and documents provided are accurate.
        Our team typically reviews submissions within 24–48 hours.
      </p>
    </>
  );
}
