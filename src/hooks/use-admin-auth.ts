import { useEffect, useState } from "react";
import { getAdminSession } from "@/lib/admin-api";

type AdminSessionState = {
  userId: string;
  email: string;
  fullName: string | null;
  role: "admin";
} | null;

export function useAdminAuth() {
  const [session, setSession] = useState<AdminSessionState>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function resolveSession() {
      try {
        const nextSession = await getAdminSession();
        if (!mounted) return;
        setSession(nextSession);
        setIsAdmin(Boolean(nextSession?.role === "admin"));
        setAuthError(null);
      } catch (err) {
        if (!mounted) return;
        setAuthError(err instanceof Error ? err.message : "Could not load session.");
        setSession(null);
        setIsAdmin(false);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void resolveSession();
    const interval = window.setInterval(() => {
      void resolveSession();
    }, 60_000);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return {
    session,
    loading,
    authError,
    isAdmin,
    isAuthenticated: Boolean(session) && isAdmin,
  };
}
