import type { DbPool } from "@/lib/db";
import { createPool } from "@/lib/db";

let pool: DbPool | null = null;

export function getDbPool(): DbPool {
  if (!pool) {
    pool = createPool();
    // Restore CMS images wiped by Hostinger redeploys (bytes live in MySQL cms_media).
    // Dynamic import avoids circular dependency with cms-media.server.ts.
    void import("@/lib/cms-media.server")
      .then((m) => m.scheduleCmsMediaHydrate())
      .catch(() => {});
  }
  return pool;
}

export async function query<T = unknown>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const [rows] = await getDbPool().query(sql, params);
  return rows as T[];
}

export async function queryOne<T = unknown>(
  sql: string,
  params: unknown[] = [],
): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

export async function execute(sql: string, params: unknown[] = []) {
  return getDbPool().execute(sql, params);
}
