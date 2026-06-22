import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, Eye, EyeOff, Smartphone } from "lucide-react";
import { AuthBrandPanel } from "@/components/site/AuthBrandPanel";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Login — Khalti" },
      { name: "description", content: "Sign in to the Khalti admin panel." },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !pw.trim()) {
      toast.error("Please enter your email and password.");
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: pw,
    });
    if (error) {
      setSubmitting(false);
      toast.error(error.message);
      return;
    }
    const userId = data.user?.id;
    if (!userId) {
      setSubmitting(false);
      toast.error("Login failed");
      return;
    }
    const { data: roleRows } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    setSubmitting(false);
    const isAdmin = Array.isArray(roleRows) && roleRows.some((r) => r.role === "admin");
    if (!isAdmin) {
      toast.error("You don't have admin privileges");
      await supabase.auth.signOut();
      return;
    }
    navigate({ to: "/admin/kyc" });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthBrandPanel />
      <div className="relative flex flex-col bg-white px-5 py-8 sm:px-10 lg:px-16 lg:py-10">
        <div className="flex items-start justify-between">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="text-3xl font-extrabold text-primary sm:text-4xl">
              khalti
            </span>
            <Shield className="h-5 w-5 fill-primary text-primary sm:h-6 sm:w-6" />
          </Link>
          <div className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
            <Shield className="h-4 w-4" /> Admin
          </div>
        </div>
        <div className="mx-auto mt-12 w-full max-w-md flex-1 lg:mt-20">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Admin Login
            </h1>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with your admin credentials
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-semibold text-foreground">Email</label>
              <div className="relative mt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Admin email"
                  className="w-full rounded-md border border-border bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <Smartphone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-foreground">Password</label>
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
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md bg-primary py-3.5 text-base font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {submitting ? "Logging in…" : "Login as Admin"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
