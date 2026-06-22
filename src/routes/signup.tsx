import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Send,
  Eye,
  EyeOff,
  User,
  Smartphone,
  Mail,
  Calendar,
  Check,
  Circle,
} from "lucide-react";
import { AuthBrandPanel } from "@/components/site/AuthBrandPanel";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Join Khalti — Sign up" },
      {
        name: "description",
        content:
          "Create your Khalti account to pay, book and transfer cash easily.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [pw, setPw] = useState("");
  const [cpw, setCpw] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
  });

  const rules = [
    { ok: pw.length >= 8, label: "At least 8 characters long" },
    { ok: /[A-Z]/.test(pw), label: "At least one uppercase letter" },
    { ok: /[a-z]/.test(pw), label: "At least one lowercase letter" },
    {
      ok: /[!@#$%^&*(),.?":{}|<>_\-]/.test(pw),
      label: "At least one special character",
    },
    { ok: /\d/.test(pw), label: "At least one number" },
  ];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim()) {
      toast.error("Email is required.");
      return;
    }
    if (pw !== cpw) {
      toast.error("Passwords do not match.");
      return;
    }
    if (pw.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setSubmitting(true);
    const { error } = await signUp(form.email.trim(), pw);
    setSubmitting(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Account created! Please check your email to confirm.");
    navigate({ to: "/kyc" });
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthBrandPanel />

      <div className="flex flex-col bg-white px-5 py-8 sm:px-10 lg:px-16 lg:py-10">
        <div className="flex items-start justify-between">
          <Link to="/" className="flex items-center gap-1.5 lg:hidden">
            <span className="text-3xl font-extrabold text-primary">khalti</span>
            <Send className="h-5 w-5 -rotate-12 fill-primary text-primary" />
          </Link>
          <Link
            to="/login"
            className="ml-auto text-sm font-semibold text-primary hover:underline"
          >
            Have an account? Login
          </Link>
        </div>

        <div className="mx-auto mt-8 w-full max-w-md flex-1 lg:mt-10">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Join the cashless world.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            By having a khalti account, you can pay, book and transfer cash
            easily.
          </p>
          <p className="text-sm text-muted-foreground">Sign up in just seconds.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <Field
              label="Full name"
              required
              icon={<User className="h-4 w-4" />}
            >
              <input
                required
                value={form.name}
                onChange={set("name")}
                placeholder="Full name"
                className={inputCls}
              />
            </Field>

            <Field
              label="Mobile number"
              required
              icon={<Smartphone className="h-4 w-4" />}
            >
              <input
                required
                type="tel"
                value={form.mobile}
                onChange={set("mobile")}
                placeholder="Mobile number"
                className={inputCls}
              />
            </Field>

            <Field label="Email" required icon={<Mail className="h-4 w-4" />}>
              <input
                type="email"
                required
                value={form.email}
                onChange={set("email")}
                placeholder="Email"
                className={inputCls}
              />
            </Field>

            <Field label="Date of Birth" icon={<Calendar className="h-4 w-4" />}>
              <input
                value={form.dob}
                onChange={set("dob")}
                placeholder="Date of Birth (YYYY-MM-DD) in AD"
                className={inputCls}
              />
            </Field>

            <div>
              <label className="text-sm font-semibold text-foreground">
                Gender
              </label>
              <div className="mt-2 flex flex-wrap gap-6">
                {["Male", "Female", "Other"].map((g) => (
                  <label
                    key={g}
                    className="flex cursor-pointer items-center gap-2 text-sm"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={set("gender")}
                      className="h-4 w-4 accent-primary"
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-md border border-border bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label="Toggle password"
                >
                  {showPw ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <ul className="mt-3 space-y-1 text-xs">
                {rules.map((r) => (
                  <li
                    key={r.label}
                    className={`flex items-center gap-2 ${
                      r.ok ? "text-emerald-600" : "text-orange-500"
                    }`}
                  >
                    {r.ok ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Circle className="h-3 w-3" />
                    )}
                    {r.label}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground">
                Confirm Password
              </label>
              <div className="relative mt-2">
                <input
                  type={showCpw ? "text" : "password"}
                  required
                  value={cpw}
                  onChange={(e) => setCpw(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full rounded-md border border-border bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowCpw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label="Toggle password"
                >
                  {showCpw ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              By signing up you agree to the Khalti&apos;s{" "}
              <a href="#" className="text-sky-600 hover:underline">
                Terms &amp; Conditions.
              </a>
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-primary py-3.5 text-base font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {submitting ? "Creating account…" : "Join"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({
  label,
  required,
  icon,
  children,
}: {
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground">
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      <div className="relative mt-2">
        {children}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
      </div>
    </div>
  );
}
