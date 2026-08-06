import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { resetAdminPassword } from "@/lib/admin-api";

export const Route = createFileRoute("/admin/reset-password")({
  head: () => ({ meta: [{ title: "Reset password | YatraNexus Admin" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  component: AdminResetPasswordPage,
});

function AdminResetPasswordPage() {
  const navigate = useNavigate();
  const { token } = Route.useSearch();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (token) setReady(true);
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      toast.error("Missing reset token.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetAdminPassword(token, password);
      toast.success("Password updated. Sign in with your new password.");
      navigate({ to: "/admin/login" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-soft">
        <h1 className="font-display text-2xl font-bold">Set new password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a new password for your admin account.
        </p>

        {!ready ? (
          <p className="mt-6 text-sm text-muted-foreground">
            Open the reset link from your email to continue. If you already used it,{" "}
            <Link to="/admin/login" className="text-[color:var(--brand-orange)]">
              sign in
            </Link>
            .
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">New password</span>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm"
              />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">Confirm password</span>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
            >
              {loading ? "Updating…" : "Update password"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm">
          <Link to="/admin/login" className="text-[color:var(--brand-orange)]">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
