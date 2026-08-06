import type { RowDataPacket } from "mysql2/promise";
import { execute, query, queryOne } from "@/lib/db-server";
import type { BlogPostRow } from "@/lib/db-types";
import { mapBlogRow, newId, toJson, toMysqlDatetime } from "./helpers";

export type BlogPostUpsertPayload = Omit<BlogPostRow, "created_at" | "updated_at"> & {
  id?: string;
};

function blogParams(row: Omit<BlogPostRow, "id" | "created_at" | "updated_at">) {
  return [
    row.slug,
    row.title,
    row.excerpt,
    row.category,
    toJson(row.content),
    row.featured_image_url,
    toJson(row.tags),
    row.read_minutes,
    row.is_published ? 1 : 0,
    toMysqlDatetime(row.published_at),
    row.meta_title,
    row.meta_description,
  ];
}

export async function listBlogPosts(): Promise<BlogPostRow[]> {
  const rows = await query<RowDataPacket>("SELECT * FROM blog_posts ORDER BY created_at DESC");
  return rows.map(mapBlogRow);
}

export async function listPublishedBlogPosts(): Promise<BlogPostRow[]> {
  const rows = await query<RowDataPacket>(
    "SELECT * FROM blog_posts WHERE is_published = 1 ORDER BY published_at DESC",
  );
  return rows.map(mapBlogRow);
}

export async function upsertBlogPost(payload: BlogPostUpsertPayload): Promise<BlogPostRow> {
  if (payload.id) {
    await execute(
      `UPDATE blog_posts SET
        slug = ?, title = ?, excerpt = ?, category = ?, content = ?,
        featured_image_url = ?, tags = ?, read_minutes = ?, is_published = ?,
        published_at = ?, meta_title = ?, meta_description = ?
      WHERE id = ?`,
      [...blogParams(payload), payload.id],
    );
    const row = await queryOne<RowDataPacket>("SELECT * FROM blog_posts WHERE id = ?", [
      payload.id,
    ]);
    if (!row) throw new Error("Blog post not found after update");
    return mapBlogRow(row);
  }

  const id = newId();
  await execute(
    `INSERT INTO blog_posts (
      id, slug, title, excerpt, category, content, featured_image_url, tags,
      read_minutes, is_published, published_at, meta_title, meta_description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, ...blogParams(payload)],
  );
  const row = await queryOne<RowDataPacket>("SELECT * FROM blog_posts WHERE id = ?", [id]);
  if (!row) throw new Error("Blog post not found after insert");
  return mapBlogRow(row);
}

export async function deleteBlogPost(id: string): Promise<void> {
  await execute("DELETE FROM blog_posts WHERE id = ?", [id]);
}
