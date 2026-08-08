import fs from "node:fs/promises";
import path from "node:path";
import type { RowDataPacket } from "mysql2/promise";
import { execute, getDbPool, query } from "@/lib/db-server";

/** Disk root for CMS images (same as upload target). */
export function getCmsImagesRoot(): string {
  const custom = process.env.CMS_IMAGES_DIR?.trim();
  if (custom) return path.resolve(custom);
  // Production Node host (`start-server.mjs`) serves static files from dist/client.
  // Runtime admin uploads must land there or they 404 until the next full rebuild.
  if (process.env.NODE_ENV === "production") {
    return path.join(process.cwd(), "dist", "client", "images");
  }
  return path.join(process.cwd(), "public", "images");
}

export function publicUrlFromRelative(relativePath: string): string {
  return `/images/${relativePath.replace(/^\/+/, "").replace(/^images\//, "")}`;
}

export function relativeFromPublicUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed.startsWith("/images/")) return null;
  return trimmed.slice("/images/".length);
}

let tableReady: Promise<void> | null = null;
let hydratePromise: Promise<{ restored: number }> | null = null;

export async function ensureCmsMediaTable(): Promise<void> {
  if (!tableReady) {
    tableReady = execute(`
      CREATE TABLE IF NOT EXISTS cms_media (
        path VARCHAR(512) NOT NULL PRIMARY KEY,
        content_type VARCHAR(128) NOT NULL DEFAULT 'image/webp',
        bytes MEDIUMBLOB NOT NULL,
        byte_length INT NOT NULL DEFAULT 0,
        created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `).then(() => undefined);
  }
  await tableReady;
}

/** Persist uploaded bytes in MySQL so Hostinger redeploys cannot wipe them. */
export async function saveCmsMediaToDb(
  relativePath: string,
  bytes: Buffer,
  contentType: string,
): Promise<void> {
  await ensureCmsMediaTable();
  const normalized = relativePath.replace(/^\/+/, "").replace(/^images\//, "");
  await execute(
    `INSERT INTO cms_media (path, content_type, bytes, byte_length)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       content_type = VALUES(content_type),
       bytes = VALUES(bytes),
       byte_length = VALUES(byte_length),
       updated_at = CURRENT_TIMESTAMP(3)`,
    [normalized, contentType, bytes, bytes.length],
  );
}

export async function getCmsMediaFromDb(
  relativePath: string,
): Promise<{ contentType: string; bytes: Buffer } | null> {
  await ensureCmsMediaTable();
  const normalized = relativePath.replace(/^\/+/, "").replace(/^images\//, "");
  const row = await query<
    RowDataPacket & { content_type: string; bytes: Buffer }
  >(`SELECT content_type, bytes FROM cms_media WHERE path = ? LIMIT 1`, [
    normalized,
  ]);
  const first = row[0];
  if (!first?.bytes) return null;
  return {
    contentType: first.content_type || "application/octet-stream",
    bytes: Buffer.isBuffer(first.bytes)
      ? first.bytes
      : Buffer.from(first.bytes as unknown as ArrayBuffer),
  };
}

/**
 * After a clean Hostinger redeploy, restore any MySQL-backed CMS files
 * that are missing on disk so `/images/...` URLs keep working.
 */
export async function hydrateCmsMediaFromDb(): Promise<{ restored: number }> {
  if (hydratePromise) return hydratePromise;
  hydratePromise = (async () => {
    await ensureCmsMediaTable();
    const rows = await query<
      RowDataPacket & { path: string; content_type: string; bytes: Buffer }
    >(`SELECT path, content_type, bytes FROM cms_media`);
    const root = getCmsImagesRoot();
    let restored = 0;
    for (const row of rows) {
      const abs = path.join(root, row.path);
      try {
        await fs.access(abs);
        continue;
      } catch {
        // missing on disk — restore from DB
      }
      const bytes = Buffer.isBuffer(row.bytes)
        ? row.bytes
        : Buffer.from(row.bytes as unknown as ArrayBuffer);
      await fs.mkdir(path.dirname(abs), { recursive: true });
      await fs.writeFile(abs, bytes);
      restored += 1;
    }
    return { restored };
  })().catch((err) => {
    hydratePromise = null;
    throw err;
  });
  return hydratePromise;
}

/** Kick hydrate once when the DB pool is first used (non-blocking). */
export function scheduleCmsMediaHydrate(): void {
  void hydrateCmsMediaFromDb().catch(() => {
    // table may not exist yet on brand-new DBs; upload path creates it
  });
}

/** Ensure a single public image path exists on disk (restore from DB if needed). */
export async function ensureCmsMediaFileOnDisk(
  publicOrRelative: string,
): Promise<boolean> {
  const relative =
    relativeFromPublicUrl(publicOrRelative) ??
    publicOrRelative.replace(/^\/+/, "").replace(/^images\//, "");
  if (!relative) return false;
  const abs = path.join(getCmsImagesRoot(), relative);
  try {
    await fs.access(abs);
    return true;
  } catch {
    // fall through
  }
  const fromDb = await getCmsMediaFromDb(relative);
  if (!fromDb) return false;
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, fromDb.bytes);
  return true;
}

/** Touch pool so hydrate can run; exported for routes that need a warm DB. */
export function touchDbForMediaHydrate(): void {
  getDbPool();
  scheduleCmsMediaHydrate();
}
