#!/usr/bin/env node
/**
 * Create (or reset) a confirmed Supabase Auth user and grant admin access.
 *
 * Bun loads .env automatically. Add to .env:
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ...
 *   ADMIN_PASSWORD=Admin@123456
 *
 * Usage:
 *   bun run setup-admin-user
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const publishableKey =
  process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const email = (process.env.ADMIN_EMAIL ?? "superadmin@yatranexus.com").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const fullName = process.env.ADMIN_FULL_NAME ?? "Admin";

if (!url || !serviceKey) {
  console.error("Missing SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY.");
  console.error("");
  console.error("1. Open Supabase Dashboard → Project Settings → API");
  console.error("2. Copy the service_role key (secret JWT, starts with eyJ...)");
  console.error("3. Set it in .env or pass it for this command only:");
  console.error('   $env:SUPABASE_SERVICE_ROLE_KEY="eyJ..."');
  process.exit(1);
}

if (!password || password.length < 8) {
  console.error("Set ADMIN_PASSWORD (min 8 characters), e.g.:");
  console.error('   $env:ADMIN_PASSWORD="Admin@123456"');
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function findUserByEmail(targetEmail) {
  let page = 1;
  while (page <= 50) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const match = data.users.find((u) => u.email?.toLowerCase() === targetEmail);
    if (match) return match;
    if (data.users.length < 200) return null;
    page += 1;
  }
  return null;
}

async function main() {
  console.log(`Setting up admin: ${email}`);

  let userId;
  const existing = await findUserByEmail(email);

  if (existing) {
    console.log(`User exists (${existing.id}). Updating password and confirming email…`);
    const { data, error } = await admin.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
    });
    if (error) throw error;
    userId = data.user.id;
  } else {
    console.log("Creating new auth user…");
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });
    if (error) throw error;
    userId = data.user.id;
  }

  const { error: profileError } = await admin.from("admin_profiles").upsert(
    {
      id: userId,
      email,
      full_name: fullName,
      role: "admin",
    },
    { onConflict: "id" },
  );
  if (profileError) throw profileError;

  console.log("Admin profile granted.");

  if (publishableKey) {
    const client = createClient(url, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error: loginError } = await client.auth.signInWithPassword({ email, password });
    if (loginError) {
      console.error("Warning: login test failed:", loginError.message);
    } else {
      await client.auth.signOut();
      console.log("Login test passed.");
    }
  }

  console.log("");
  console.log("Done. Sign in at /admin/login with:");
  console.log(`  Email:    ${email}`);
  console.log(`  Password: (the ADMIN_PASSWORD you set)`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
