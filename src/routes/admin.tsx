import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Briefcase,
  Wrench,
  MessagesSquare,
  Inbox,
  Settings,
  KeyRound,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import logo from "@/assets/tmooh-logo.svg";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};
const nav: NavItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/messages", label: "Messages", icon: Inbox },
  { to: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { to: "/admin/services", label: "Services", icon: Wrench },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessagesSquare },
  { to: "/admin/settings", label: "Site Settings", icon: Settings },
  { to: "/admin/password", label: "Change Password", icon: KeyRound },
];

function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!user) return <LoginScreen />;

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md rounded-2xl border border-white/10 bg-card p-8 text-center">
          <ShieldAlert className="mx-auto mb-3 h-10 w-10 text-destructive" />
          <h2 className="mb-2 text-xl font-semibold">Access denied</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Your account doesn't have admin permissions.
          </p>
          <Button variant="outline" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-64 shrink-0 border-e border-white/10 bg-card/50 p-4 md:block">
        <div className="mb-6 px-2 flex flex-col gap-4">
          <Link to="/">
            <img src={logo} alt="TMOOH" className="h-8 w-auto" />
          </Link>
          <div>
            <h1 className="text-sm font-bold opacity-70 uppercase tracking-wider">Admin Panel</h1>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <nav className="space-y-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to as any}
              activeOptions={item.exact ? { exact: true } : undefined}
              activeProps={{ className: "bg-primary/15 text-foreground" }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          variant="outline"
          size="sm"
          className="mt-6 w-full"
          onClick={signOut}
        >
          <LogOut className="me-2 h-4 w-4" /> Sign out
        </Button>
      </aside>

      {/* Mobile top nav */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 border-b border-white/10 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/">
            <img src={logo} alt="TMOOH" className="h-6 w-auto" />
          </Link>
          <h1 className="text-sm font-bold">Admin</h1>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-1 overflow-x-auto px-2 pb-2">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to as any}
              activeOptions={item.exact ? { exact: true } : undefined}
              activeProps={{ className: "bg-primary/15 text-foreground" }}
              className="shrink-0 rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-x-hidden p-4 pt-28 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const loc = useLocation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Welcome back");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-card p-8 shadow-card"
        key={loc.pathname}
      >
        <div className="mb-6 flex justify-center">
          <img src={logo} alt="TMOOH" className="h-16 w-auto" />
        </div>
        <h1 className="mb-1 text-2xl font-bold">Admin Login</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Sign in to manage your site content.
        </p>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </div>
      </form>
    </div>
  );
}
