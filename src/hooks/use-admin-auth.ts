import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { fetchIsAdmin } from "@/lib/admin-auth";

export function useAdminAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function resolveSession(nextSession: Session | null) {
      if (!mounted) return;
      setSession(nextSession);
      if (nextSession?.user?.id) {
        setIsAdmin(await fetchIsAdmin(nextSession.user.id));
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    }

    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) {
        setAuthError(error.message);
        setSession(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      void resolveSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void resolveSession(nextSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
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
