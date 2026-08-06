import type { RowDataPacket } from "mysql2/promise";
import { parseJson } from "@/lib/db-json";
import { execute, query, queryOne } from "@/lib/db-server";
import type { Json, ServiceRow } from "@/lib/db-types";
import { mapServiceRow, newId, toJson } from "./helpers";

export type ServiceUpsertPayload = Omit<ServiceRow, "created_at" | "updated_at"> & {
  id?: string;
};

function serviceParams(row: Omit<ServiceRow, "id" | "created_at" | "updated_at">) {
  return [
    row.slug,
    row.title,
    row.short_description,
    row.description,
    row.banner_url,
    row.icon,
    toJson(row.gallery_urls),
    toJson(row.inclusions),
    toJson(row.exclusions),
    toJson(row.faqs),
    toJson(row.content_blocks),
    row.is_active ? 1 : 0,
    row.sort_order,
    row.meta_title,
    row.meta_description,
  ];
}

export async function listServices(): Promise<ServiceRow[]> {
  const rows = await query<RowDataPacket>("SELECT * FROM services ORDER BY sort_order, title");
  return rows.map(mapServiceRow);
}

export async function listActiveServices(): Promise<ServiceRow[]> {
  const rows = await query<RowDataPacket>(
    "SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order, title",
  );
  return rows.map(mapServiceRow);
}

export async function getServiceBySlug(slug: string): Promise<ServiceRow | null> {
  const row = await queryOne<RowDataPacket>("SELECT * FROM services WHERE slug = ? LIMIT 1", [
    slug,
  ]);
  return row ? mapServiceRow(row) : null;
}

export async function getServiceBySlugPartial(slug: string): Promise<{
  id: string;
  content_blocks: Json;
  banner_url: string | null;
} | null> {
  const row = await queryOne<RowDataPacket>(
    "SELECT id, content_blocks, banner_url FROM services WHERE slug = ? LIMIT 1",
    [slug],
  );
  if (!row) return null;
  return {
    id: String(row.id),
    content_blocks: parseJson(row.content_blocks, {}),
    banner_url: row.banner_url ?? null,
  };
}

export async function upsertService(payload: ServiceUpsertPayload): Promise<ServiceRow> {
  if (payload.id) {
    const { id, ...rest } = payload;
    await execute(
      `UPDATE services SET
        slug = ?, title = ?, short_description = ?, description = ?, banner_url = ?,
        icon = ?, gallery_urls = ?, inclusions = ?, exclusions = ?, faqs = ?,
        content_blocks = ?, is_active = ?, sort_order = ?, meta_title = ?, meta_description = ?
      WHERE id = ?`,
      [...serviceParams(rest), id],
    );
    const row = await queryOne<RowDataPacket>("SELECT * FROM services WHERE id = ?", [id]);
    if (!row) throw new Error("Service not found after update");
    return mapServiceRow(row);
  }

  const id = newId();
  await execute(
    `INSERT INTO services (
      id, slug, title, short_description, description, banner_url, icon,
      gallery_urls, inclusions, exclusions, faqs, content_blocks,
      is_active, sort_order, meta_title, meta_description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, ...serviceParams(payload)],
  );
  const row = await queryOne<RowDataPacket>("SELECT * FROM services WHERE id = ?", [id]);
  if (!row) throw new Error("Service not found after insert");
  return mapServiceRow(row);
}

export async function deleteService(id: string): Promise<void> {
  await execute("DELETE FROM services WHERE id = ?", [id]);
}
