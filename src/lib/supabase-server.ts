import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function readSupabaseEnv() {
  const url =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL;

  const key =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY) ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  return { url, key };
}

/** Supabase client for public CMS reads — works in SSR and client-side route loaders. */
export function getServerSupabase() {
  const { url, key } = readSupabaseEnv();

  if (!url || !key) {
    throw new Error("Supabase env vars missing (SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY).");
  }

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Service-role client for server-only reads (e.g. email credentials). */
export function getServerSupabaseService() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    (typeof import.meta !== "undefined" ? import.meta.env?.VITE_SUPABASE_URL : undefined);

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  return createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
