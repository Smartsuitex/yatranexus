import type { RowDataPacket } from "mysql2/promise";
import { execute, query, queryOne } from "@/lib/db-server";
import type { DestinationRow } from "@/lib/db-types";
import { mapDestinationRow, newId, toJson } from "./helpers";

export type DestinationUpsertPayload = Omit<DestinationRow, "created_at" | "updated_at"> & {
  id?: string;
};

function destinationParams(row: Omit<DestinationRow, "id" | "created_at" | "updated_at">) {
  return [
    row.slug,
    row.scope,
    row.name,
    row.region,
    row.image_url,
    row.blurb,
    toJson(row.highlights),
    row.is_active ? 1 : 0,
    row.sort_order,
  ];
}

export async function listDestinations(): Promise<DestinationRow[]> {
  const rows = await query<RowDataPacket>(
    "SELECT * FROM destinations ORDER BY scope, sort_order, name",
  );
  return rows.map(mapDestinationRow);
}

export async function listActiveDestinations(
  scope?: "domestic" | "international",
): Promise<DestinationRow[]> {
  if (scope) {
    const rows = await query<RowDataPacket>(
      "SELECT * FROM destinations WHERE is_active = 1 AND scope = ? ORDER BY sort_order, name",
      [scope],
    );
    return rows.map(mapDestinationRow);
  }
  const rows = await query<RowDataPacket>(
    "SELECT * FROM destinations WHERE is_active = 1 ORDER BY scope, sort_order, name",
  );
  return rows.map(mapDestinationRow);
}

export async function getDestinationBySlug(
  slug: string,
  scope: "domestic" | "international",
): Promise<DestinationRow | null> {
  const row = await queryOne<RowDataPacket>(
    "SELECT * FROM destinations WHERE slug = ? AND scope = ? LIMIT 1",
    [slug, scope],
  );
  return row ? mapDestinationRow(row) : null;
}

export async function upsertDestination(
  payload: DestinationUpsertPayload,
): Promise<DestinationRow> {
  if (payload.id) {
    await execute(
      `UPDATE destinations SET
        slug = ?, scope = ?, name = ?, region = ?, image_url = ?, blurb = ?,
        highlights = ?, is_active = ?, sort_order = ?
      WHERE id = ?`,
      [...destinationParams(payload), payload.id],
    );
    const row = await queryOne<RowDataPacket>("SELECT * FROM destinations WHERE id = ?", [
      payload.id,
    ]);
    if (!row) throw new Error("Destination not found after update");
    return mapDestinationRow(row);
  }

  const id = newId();
  await execute(
    `INSERT INTO destinations (
      id, slug, scope, name, region, image_url, blurb, highlights, is_active, sort_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, ...destinationParams(payload)],
  );
  const row = await queryOne<RowDataPacket>("SELECT * FROM destinations WHERE id = ?", [id]);
  if (!row) throw new Error("Destination not found after insert");
  return mapDestinationRow(row);
}

export async function deleteDestination(id: string): Promise<void> {
  await execute("DELETE FROM destinations WHERE id = ?", [id]);
}

/** Persist unique sequential sort numbers (1, 2, 3…) for the given order. */
export async function renumberDestinations(orderedIds: string[]): Promise<void> {
  for (let index = 0; index < orderedIds.length; index++) {
    await execute("UPDATE destinations SET sort_order = ? WHERE id = ?", [
      10_000 + index,
      orderedIds[index],
    ]);
  }
  for (let index = 0; index < orderedIds.length; index++) {
    await execute("UPDATE destinations SET sort_order = ? WHERE id = ?", [
      index + 1,
      orderedIds[index],
    ]);
  }
}
