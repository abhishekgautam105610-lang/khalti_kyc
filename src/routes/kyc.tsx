import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { RequireAuth, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/kyc")({
  head: () => ({ meta: [{ title: "KYC Verification — Khalti" }] }),
  component: KycLayout,
});

function KycLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/login" });
  };
  return (
    <RequireAuth>
      <div className="min-h-screen bg-muted/40">
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link to="/login" className="flex items-center gap-1.5">
              <span className="text-2xl font-extrabold text-primary">khalti</span>
              <Send className="h-4 w-4 -rotate-12 fill-primary text-primary" />
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
          <Outlet />
        </main>
      </div>
    </RequireAuth>
  );
}
