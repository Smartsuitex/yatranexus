import { createClient } from "@supabase/supabase-js";
import type { Session } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";

export async function fetchIsAdmin(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("admin_profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (error) return false;
  return data?.role === "admin";
}

export async function verifyAdminAccessToken(accessToken: string): Promise<boolean> {
  const url =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    (typeof import.meta !== "undefined" ? import.meta.env?.VITE_SUPABASE_URL : undefined);
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    (typeof import.meta !== "undefined" ? import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY : undefined);

  if (!url || !key || !accessToken) return false;

  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });

  const { data: userData, error: userError } = await client.auth.getUser(accessToken);
  if (userError || !userData.user) return false;

  const { data: profile, error: profileError } = await client
    .from("admin_profiles")
    .select("role")
    .eq("id", userData.user.id)
    .maybeSingle();

  if (profileError) return false;
  return profile?.role === "admin";
}

export async function requireAdminSession(session: Session | null): Promise<void> {
  if (!session?.user?.id) {
    throw new Error("Unauthorized: sign in as admin.");
  }
  const isAdmin = await fetchIsAdmin(session.user.id);
  if (!isAdmin) {
    throw new Error("Unauthorized: admin access required.");
  }
}
