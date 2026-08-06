import type { RowDataPacket } from "mysql2/promise";
import { execute, query, queryOne } from "@/lib/db-server";
import type { PackageRow } from "@/lib/db-types";
import { mapPackageRow, newId, toJson } from "./helpers";

export type PackageUpsertPayload = Omit<PackageRow, "created_at" | "updated_at"> & {
  id?: string;
};

function packageParams(row: Omit<PackageRow, "id" | "created_at" | "updated_at">) {
  return [
    row.slug,
    row.title,
    row.destination,
    row.scope,
    row.nights,
    row.days,
    row.from_price,
    row.discount_price,
    row.package_code,
    row.image_url,
    toJson(row.gallery_urls),
    toJson(row.inclusions),
    toJson(row.exclusions),
    toJson(row.itinerary),
    row.is_active ? 1 : 0,
    row.is_featured ? 1 : 0,
    row.meta_title,
    row.meta_description,
    row.sort_order,
  ];
}

export async function listPackages(): Promise<PackageRow[]> {
  const rows = await query<RowDataPacket>("SELECT * FROM packages ORDER BY sort_order, title");
  return rows.map(mapPackageRow);
}

export async function listActivePackages(): Promise<PackageRow[]> {
  const rows = await query<RowDataPacket>(
    "SELECT * FROM packages WHERE is_active = 1 ORDER BY sort_order, title",
  );
  return rows.map(mapPackageRow);
}

/**
 * List columns only — skips itinerary / gallery / inclusions JSON for home & listing pages.
 */
export async function listActivePackagesSummary(): Promise<PackageRow[]> {
  const rows = await query<RowDataPacket>(
    `SELECT
      id, slug, title, destination, scope, nights, days,
      from_price, discount_price, package_code, image_url,
      is_active, is_featured, meta_title, meta_description, sort_order,
      created_at, updated_at
    FROM packages
    WHERE is_active = 1
    ORDER BY sort_order, title`,
  );
  return rows.map((row) =>
    mapPackageRow({
      ...row,
      gallery_urls: null,
      inclusions: null,
      exclusions: null,
      itinerary: null,
    }),
  );
}

export async function getPackageBySlug(slug: string): Promise<PackageRow | null> {
  const row = await queryOne<RowDataPacket>("SELECT * FROM packages WHERE slug = ? LIMIT 1", [
    slug,
  ]);
  return row ? mapPackageRow(row) : null;
}

export async function upsertPackage(payload: PackageUpsertPayload): Promise<PackageRow> {
  if (payload.id) {
    const { id, ...rest } = payload;
    await execute(
      `UPDATE packages SET
        slug = ?, title = ?, destination = ?, scope = ?, nights = ?, days = ?,
        from_price = ?, discount_price = ?, package_code = ?, image_url = ?,
        gallery_urls = ?, inclusions = ?, exclusions = ?, itinerary = ?,
        is_active = ?, is_featured = ?, meta_title = ?, meta_description = ?,
        sort_order = ?
      WHERE id = ?`,
      [...packageParams(rest), id],
    );
    const row = await queryOne<RowDataPacket>("SELECT * FROM packages WHERE id = ?", [id]);
    if (!row) throw new Error("Package not found after update");
    return mapPackageRow(row);
  }

  const id = newId();
  await execute(
    `INSERT INTO packages (
      id, slug, title, destination, scope, nights, days, from_price, discount_price,
      package_code, image_url, gallery_urls, inclusions, exclusions, itinerary,
      is_active, is_featured, meta_title, meta_description, sort_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, ...packageParams(payload)],
  );
  const row = await queryOne<RowDataPacket>("SELECT * FROM packages WHERE id = ?", [id]);
  if (!row) throw new Error("Package not found after insert");
  return mapPackageRow(row);
}

export async function deletePackage(id: string): Promise<void> {
  await execute("DELETE FROM packages WHERE id = ?", [id]);
}
