import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { sendPasswordReset } from "@/lib/admin-api";

export const Route = createFileRoute("/admin/forgot-password")({
  head: () => ({
    meta: [{ title: "Reset Password | YatraNexus Admin" }],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordReset(email.trim());
      setSent(true);
      toast.success("Reset link sent — check your email");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send reset email");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft">
        <h1 className="font-display text-2xl font-bold">Reset password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your admin email and we'll send a password reset link.
        </p>

        {sent ? (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            If an account exists for <strong>{email}</strong>, a reset link has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-brand-gradient py-3 text-sm font-semibold text-white disabled:opacity-70"
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm">
          <Link to="/admin/login" className="text-primary hover:underline">
            ← Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
