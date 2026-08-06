import type { RowDataPacket } from "mysql2/promise";
import { execute, query, queryOne } from "@/lib/db-server";
import type { GalleryRow } from "@/lib/db-types";
import { mapGalleryRow, newId } from "./helpers";

export type GalleryUpsertPayload = Omit<GalleryRow, "created_at"> & { id?: string };

function galleryParams(row: Omit<GalleryRow, "id" | "created_at">) {
  return [row.title, row.album, row.image_url, row.sort_order, row.is_active ? 1 : 0];
}

export async function listGalleryImages(): Promise<GalleryRow[]> {
  const rows = await query<RowDataPacket>(
    "SELECT * FROM gallery_images ORDER BY sort_order, title",
  );
  return rows.map(mapGalleryRow);
}

export async function listActiveGalleryImages(): Promise<GalleryRow[]> {
  const rows = await query<RowDataPacket>(
    "SELECT * FROM gallery_images WHERE is_active = 1 ORDER BY sort_order, title",
  );
  return rows.map(mapGalleryRow);
}

export async function upsertGalleryImage(payload: GalleryUpsertPayload): Promise<GalleryRow> {
  if (payload.id) {
    await execute(
      `UPDATE gallery_images SET title = ?, album = ?, image_url = ?, sort_order = ?, is_active = ?
      WHERE id = ?`,
      [...galleryParams(payload), payload.id],
    );
    const row = await queryOne<RowDataPacket>("SELECT * FROM gallery_images WHERE id = ?", [
      payload.id,
    ]);
    if (!row) throw new Error("Gallery image not found after update");
    return mapGalleryRow(row);
  }

  const id = newId();
  await execute(
    `INSERT INTO gallery_images (id, title, album, image_url, sort_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [id, ...galleryParams(payload)],
  );
  const row = await queryOne<RowDataPacket>("SELECT * FROM gallery_images WHERE id = ?", [id]);
  if (!row) throw new Error("Gallery image not found after insert");
  return mapGalleryRow(row);
}

export async function deleteGalleryImage(id: string): Promise<void> {
  await execute("DELETE FROM gallery_images WHERE id = ?", [id]);
}
