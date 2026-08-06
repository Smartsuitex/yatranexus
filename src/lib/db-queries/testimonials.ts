import type { RowDataPacket } from "mysql2/promise";
import { execute, query, queryOne } from "@/lib/db-server";
import type { TestimonialRow } from "@/lib/db-types";
import { mapTestimonialRow, newId } from "./helpers";

export type TestimonialUpsertPayload = Omit<TestimonialRow, "created_at"> & { id?: string };

function testimonialParams(row: Omit<TestimonialRow, "id" | "created_at">) {
  return [
    row.name,
    row.city,
    row.designation,
    row.review_text,
    row.rating,
    row.photo_url,
    row.is_active ? 1 : 0,
    row.sort_order,
  ];
}

export async function listTestimonials(): Promise<TestimonialRow[]> {
  const rows = await query<RowDataPacket>("SELECT * FROM testimonials ORDER BY sort_order, name");
  return rows.map(mapTestimonialRow);
}

export async function listActiveTestimonials(): Promise<TestimonialRow[]> {
  const rows = await query<RowDataPacket>(
    "SELECT * FROM testimonials WHERE is_active = 1 ORDER BY sort_order, name",
  );
  return rows.map(mapTestimonialRow);
}

export async function upsertTestimonial(
  payload: TestimonialUpsertPayload,
): Promise<TestimonialRow> {
  if (payload.id) {
    const { id, ...rest } = payload;
    await execute(
      `UPDATE testimonials SET
        name = ?, city = ?, designation = ?, review_text = ?, rating = ?,
        photo_url = ?, is_active = ?, sort_order = ?
      WHERE id = ?`,
      [...testimonialParams(rest), id],
    );
    const row = await queryOne<RowDataPacket>("SELECT * FROM testimonials WHERE id = ?", [id]);
    if (!row) throw new Error("Testimonial not found after update");
    return mapTestimonialRow(row);
  }

  const id = newId();
  await execute(
    `INSERT INTO testimonials (
      id, name, city, designation, review_text, rating, photo_url, is_active, sort_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, ...testimonialParams(payload)],
  );
  const row = await queryOne<RowDataPacket>("SELECT * FROM testimonials WHERE id = ?", [id]);
  if (!row) throw new Error("Testimonial not found after insert");
  return mapTestimonialRow(row);
}

/** Persist unique sequential sort numbers (1, 2, 3…) for the given order. */
export async function renumberTestimonials(orderedIds: string[]): Promise<void> {
  for (let index = 0; index < orderedIds.length; index++) {
    await execute("UPDATE testimonials SET sort_order = ? WHERE id = ?", [
      10_000 + index,
      orderedIds[index],
    ]);
  }
  for (let index = 0; index < orderedIds.length; index++) {
    await execute("UPDATE testimonials SET sort_order = ? WHERE id = ?", [
      index + 1,
      orderedIds[index],
    ]);
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  await execute("DELETE FROM testimonials WHERE id = ?", [id]);
}
