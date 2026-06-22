import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  User,
  Settings,
  Send,
  Bell,
  Eye,
  EyeOff,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Zap,
  Smartphone,
  Tv,
  Wifi,
  Droplet,
  Plane,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { RequireAuth, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Khalti" }] }),
  component: Dashboard,
});

const nav = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Wallet, label: "Wallet" },
  { icon: ArrowLeftRight, label: "Transactions" },
  { icon: CreditCard, label: "Payments" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

const services = [
  { icon: Smartphone, label: "Topup", color: "bg-rose-100 text-rose-600" },
  { icon: Zap, label: "Electricity", color: "bg-amber-100 text-amber-600" },
  { icon: Wifi, label: "Internet", color: "bg-sky-100 text-sky-600" },
  { icon: Tv, label: "TV", color: "bg-violet-100 text-violet-600" },
  { icon: Droplet, label: "Water", color: "bg-cyan-100 text-cyan-600" },
  { icon: Plane, label: "Flights", color: "bg-emerald-100 text-emerald-600" },
];

const txns = [
  { name: "Recharge — NTC", amount: -250, time: "Today, 10:24", in: false },
  { name: "Received from Ram", amount: 1500, time: "Today, 09:11", in: true },
  { name: "Electricity Bill", amount: -1245, time: "Yesterday", in: false },
  { name: "Sent to Sita", amount: -800, time: "Yesterday", in: false },
  { name: "Cashback Bonus", amount: 50, time: "2 days ago", in: true },
];

function Dashboard() {
  const { user, signOut, isAdmin } = useAuth();
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(false);

  return (
    <RequireAuth>
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-1.5">
            <span className="text-2xl font-extrabold text-primary">khalti</span>
            <Send className="h-4 w-4 -rotate-12 fill-primary text-primary" />
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-4 flex flex-col gap-1 px-3">
          {nav.map((it) => (
            <button
              key={it.label}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                it.active
                  ? "bg-primary text-primary-foreground shadow-elevated"
                  : "text-white/80 hover:bg-sidebar-accent"
              }`}
            >
              <it.icon className="h-5 w-5" />
              {it.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-4 sm:px-8">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="hidden text-lg font-bold lg:block">Dashboard</h1>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                to="/admin/kyc"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Admin Panel
              </Link>
            )}
            <button className="relative grid h-10 w-10 place-items-center rounded-full bg-accent">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
            </button>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                {user?.email?.charAt(0).toUpperCase() ?? "U"}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold leading-tight">{user?.email?.split("@")[0] ?? "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.email ?? ""}</p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="grid h-10 w-10 place-items-center rounded-full bg-accent text-muted-foreground hover:text-foreground"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-4 sm:p-8">
          {/* Balance + Quick actions */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-elevated transition-transform hover:-translate-y-1 sm:p-8 lg:col-span-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">
                    Available Balance
                  </p>
                  <div className="mt-2 flex items-baseline gap-3">
                    <p className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                      {show ? "Rs 24,580" : "Rs ••••••"}
                    </p>
                    <button
                      onClick={() => setShow((v) => !v)}
                      className="text-white/80 hover:text-white"
                    >
                      {show ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-white/70">
                    Khalti Wallet · ID 9801XXXXXX
                  </p>
                </div>
                <div className="rounded-full bg-white/15 p-3 backdrop-blur">
                  <Wallet className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary transition-transform hover:scale-105">
                  <Plus className="h-4 w-4" /> Load Money
                </button>
                <button className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/25">
                  <ArrowUpRight className="h-4 w-4" /> Send
                </button>
                <button className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/25">
                  <ArrowDownLeft className="h-4 w-4" /> Request
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-card p-6 shadow-card sm:p-8">
              <p className="text-sm font-semibold text-muted-foreground">
                This month
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Income</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    + Rs 12,400
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Spending</p>
                  <p className="text-2xl font-bold text-primary">- Rs 8,945</p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-2/3 rounded-full bg-gradient-primary" />
                </div>
                <p className="text-xs text-muted-foreground">
                  72% of monthly budget used
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="rounded-3xl bg-card p-6 shadow-card sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Quick Services</h2>
              <button className="text-xs font-semibold text-primary hover:underline">
                View all
              </button>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
              {services.map((s) => (
                <button
                  key={s.label}
                  className="flex flex-col items-center gap-2 rounded-2xl p-3 transition-colors hover:bg-accent"
                >
                  <div
                    className={`grid h-14 w-14 place-items-center rounded-2xl ${s.color}`}
                  >
                    <s.icon className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-medium text-foreground">
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="rounded-3xl bg-card p-6 shadow-card sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Recent Transactions</h2>
              <button className="text-xs font-semibold text-primary hover:underline">
                See all
              </button>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {txns.map((t, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between py-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${
                        t.in
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      {t.in ? (
                        <ArrowDownLeft className="h-5 w-5" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.time}</p>
                    </div>
                  </div>
                  <p
                    className={`shrink-0 text-sm font-bold ${
                      t.in ? "text-emerald-600" : "text-foreground"
                    }`}
                  >
                    {t.in ? "+" : ""}Rs {Math.abs(t.amount).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
    </RequireAuth>
  );
}
