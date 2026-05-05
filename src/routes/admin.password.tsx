import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";

export const Route = createFileRoute("/admin/password")({
  head: () => ({
    meta: [
      { title: "Change Password" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PasswordPage,
});

function PasswordPage() {
  const { user } = useAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (next.length < 8) return toast.error("Password must be at least 8 characters");
    if (next !== confirm) return toast.error("Passwords do not match");
    if (!user?.email) return toast.error("No active session");

    setBusy(true);
    // Reauthenticate with current password
    const { error: signInErr } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: current,
    });
    if (signInErr) {
      setBusy(false);
      return toast.error("Current password is incorrect");
    }

    const { error } = await supabase.auth.updateUser({ password: next });
    setBusy(false);
    if (error) return toast.error(error.message);

    toast.success("Password updated successfully");
    setCurrent("");
    setNext("");
    setConfirm("");
  };

  return (
    <div className="max-w-md">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-primary/15 p-2">
          <KeyRound className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Change Password</h1>
          <p className="text-sm text-muted-foreground">
            Update the password for {user?.email}.
          </p>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-white/10 bg-card p-6"
      >
        <div>
          <Label htmlFor="current">Current password</Label>
          <Input
            id="current"
            type="password"
            required
            autoComplete="current-password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="next">New password</Label>
          <Input
            id="next"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
          />
          <p className="mt-1 text-xs text-muted-foreground">At least 8 characters.</p>
        </div>
        <div>
          <Label htmlFor="confirm">Confirm new password</Label>
          <Input
            id="confirm"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Updating…" : "Update password"}
        </Button>
      </form>
    </div>
  );
}
