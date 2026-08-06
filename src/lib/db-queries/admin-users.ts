import type { RowDataPacket } from "mysql2/promise";
import { execute, queryOne } from "@/lib/db-server";
import type { AdminUserRow } from "@/lib/db-types";
import { mapAdminUserRow, newId, toMysqlDatetime } from "./helpers";

export async function findAdminByEmail(email: string): Promise<AdminUserRow | null> {
  const row = await queryOne<RowDataPacket>("SELECT * FROM admin_users WHERE email = ? LIMIT 1", [
    email.trim().toLowerCase(),
  ]);
  return row ? mapAdminUserRow(row) : null;
}

export async function findAdminById(id: string): Promise<AdminUserRow | null> {
  const row = await queryOne<RowDataPacket>("SELECT * FROM admin_users WHERE id = ? LIMIT 1", [id]);
  return row ? mapAdminUserRow(row) : null;
}

export async function createAdminUser(input: {
  email: string;
  password_hash: string;
  full_name?: string | null;
}): Promise<AdminUserRow> {
  const id = newId();
  await execute(
    `INSERT INTO admin_users (id, email, password_hash, full_name, role)
    VALUES (?, ?, ?, ?, 'admin')`,
    [id, input.email.trim().toLowerCase(), input.password_hash, input.full_name ?? null],
  );
  const row = await queryOne<RowDataPacket>("SELECT * FROM admin_users WHERE id = ?", [id]);
  if (!row) throw new Error("Admin user not found after insert");
  return mapAdminUserRow(row);
}

export async function updateAdminPassword(id: string, passwordHash: string): Promise<void> {
  await execute("UPDATE admin_users SET password_hash = ? WHERE id = ?", [passwordHash, id]);
}

export async function setResetToken(
  id: string,
  tokenHash: string,
  expiresAt: string | Date,
): Promise<void> {
  await execute(
    "UPDATE admin_users SET reset_token_hash = ?, reset_token_expires = ? WHERE id = ?",
    [tokenHash, toMysqlDatetime(expiresAt), id],
  );
}

export async function clearResetToken(id: string): Promise<void> {
  await execute(
    "UPDATE admin_users SET reset_token_hash = NULL, reset_token_expires = NULL WHERE id = ?",
    [id],
  );
}

export async function findAdminByResetToken(tokenHash: string): Promise<AdminUserRow | null> {
  const row = await queryOne<RowDataPacket>(
    `SELECT * FROM admin_users
    WHERE reset_token_hash = ?
      AND reset_token_expires IS NOT NULL
      AND reset_token_expires > NOW(3)
    LIMIT 1`,
    [tokenHash],
  );
  return row ? mapAdminUserRow(row) : null;
}
