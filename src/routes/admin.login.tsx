import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { signInAdmin } from "@/lib/admin-api";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Admin Login | YatraNexus" }],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate({ to: "/admin" });
    }
  }, [loading, isAuthenticated, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signInAdmin(email.trim(), password);
      toast.success("Welcome back!");
      // Full navigation ensures the session cookie is picked up before admin loads
      window.location.assign("/admin");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-soft">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold">
            Yatra<span className="text-brand-gradient">Nexus</span> Admin
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your travel website
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-brand-gradient py-3 text-sm font-semibold text-white shadow-soft disabled:opacity-70"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          <Link to="/admin/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </p>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
