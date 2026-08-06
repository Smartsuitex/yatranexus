#!/usr/bin/env node
/**
 * Create (or reset) a MySQL admin user with bcrypt password hash.
 *
 * Usage:
 *   DATABASE_URL=mysql://user:pass@localhost:3306/yatranexus ADMIN_PASSWORD=Admin@123456 node scripts/setup-admin-user.mjs
 */

import { createPool } from "mysql2/promise";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const envPath = join(root, "..", ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m && process.env[m[1]] == null) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

const DATABASE_URL = process.env.DATABASE_URL;
const email = (process.env.ADMIN_EMAIL ?? "superadmin@yatranexus.com").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const fullName = process.env.ADMIN_FULL_NAME ?? "Admin";

if (!DATABASE_URL) {
  console.error("Set DATABASE_URL in .env");
  process.exit(1);
}

if (!password || password.length < 8) {
  console.error("Set ADMIN_PASSWORD (min 8 characters)");
  process.exit(1);
}

function parseDatabaseUrl(url) {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: u.port ? Number(u.port) : 3306,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ""),
  };
}

async function main() {
  const pool = createPool(parseDatabaseUrl(DATABASE_URL));
  const passwordHash = await bcrypt.hash(password, 12);

  const [rows] = await pool.query("SELECT id FROM admin_users WHERE email = ? LIMIT 1", [email]);
  const existing = rows[0];

  if (existing?.id) {
    await pool.execute(
      "UPDATE admin_users SET password_hash = ?, full_name = ?, updated_at = NOW(3) WHERE id = ?",
      [passwordHash, fullName, existing.id],
    );
    console.log(`Updated admin password for ${email}`);
  } else {
    const id = randomUUID();
    await pool.execute(
      `INSERT INTO admin_users (id, email, password_hash, full_name, role)
       VALUES (?, ?, ?, ?, 'admin')`,
      [id, email, passwordHash, fullName],
    );
    console.log(`Created admin user ${email}`);
  }

  await pool.end();
  console.log("");
  console.log("Sign in at /admin/login with:");
  console.log(`  Email:    ${email}`);
  console.log(`  Password: (the ADMIN_PASSWORD you set)`);
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
