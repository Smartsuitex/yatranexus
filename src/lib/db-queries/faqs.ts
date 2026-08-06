import type { RowDataPacket } from "mysql2/promise";
import { execute, query, queryOne } from "@/lib/db-server";
import type { FaqRow } from "@/lib/db-types";
import { mapFaqRow, newId } from "./helpers";

export type FaqUpsertPayload = Omit<FaqRow, "created_at"> & { id?: string };

function faqParams(row: Omit<FaqRow, "id" | "created_at">) {
  return [row.question, row.answer, row.category, row.sort_order, row.is_active ? 1 : 0];
}

export async function listFaqs(): Promise<FaqRow[]> {
  const rows = await query<RowDataPacket>("SELECT * FROM faqs ORDER BY sort_order, question");
  return rows.map(mapFaqRow);
}

export async function listActiveFaqs(): Promise<FaqRow[]> {
  const rows = await query<RowDataPacket>(
    "SELECT * FROM faqs WHERE is_active = 1 ORDER BY sort_order, question",
  );
  return rows.map(mapFaqRow);
}

export async function upsertFaq(payload: FaqUpsertPayload): Promise<FaqRow> {
  if (payload.id) {
    await execute(
      `UPDATE faqs SET question = ?, answer = ?, category = ?, sort_order = ?, is_active = ?
      WHERE id = ?`,
      [...faqParams(payload), payload.id],
    );
    const row = await queryOne<RowDataPacket>("SELECT * FROM faqs WHERE id = ?", [payload.id]);
    if (!row) throw new Error("FAQ not found after update");
    return mapFaqRow(row);
  }

  const id = newId();
  await execute(
    "INSERT INTO faqs (id, question, answer, category, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?)",
    [id, ...faqParams(payload)],
  );
  const row = await queryOne<RowDataPacket>("SELECT * FROM faqs WHERE id = ?", [id]);
  if (!row) throw new Error("FAQ not found after insert");
  return mapFaqRow(row);
}

export async function deleteFaq(id: string): Promise<void> {
  await execute("DELETE FROM faqs WHERE id = ?", [id]);
}
