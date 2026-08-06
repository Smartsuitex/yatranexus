import { Navigate, Outlet, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { signOutAdmin } from "@/lib/admin-api";
import { toast } from "sonner";

const SIDEBAR_COLLAPSED_KEY = "yn-admin-sidebar-collapsed";

function readCollapsedPreference(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1";
  } catch {
    return false;
  }
}

export function AdminShell() {
  const { session, isAdmin, loading, authError } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    setSidebarCollapsed(readCollapsedPreference());
  }, []);

  useEffect(() => {
    if (loading || !session || !isAdmin) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [loading, session, isAdmin]);

  function toggleSidebarCollapsed() {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0");
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }

  async function handleSignOut() {
    try {
      await signOutAdmin();
      toast.success("Signed out");
      navigate({ to: "/admin/login" });
    } catch {
      toast.error("Could not sign out");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" />;
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-display text-2xl font-bold">Access denied</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          {authError ??
            "This account is not authorized for the admin panel. Contact your site administrator."}
        </p>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-muted/20">
      <AdminSidebar
        onSignOut={handleSignOut}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={toggleSidebarCollapsed}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="shrink-0 border-b border-border bg-background px-6 py-4">
          <p className="text-sm text-muted-foreground">
            Signed in as{" "}
            <span className="font-medium text-foreground">{session.email}</span>
          </p>
        </header>
        <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
