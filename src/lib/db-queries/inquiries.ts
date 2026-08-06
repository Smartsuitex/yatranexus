import type { RowDataPacket } from "mysql2/promise";
import { execute, query, queryOne } from "@/lib/db-server";
import type { Inquiry, InquiryStatus } from "@/lib/db-types";
import { mapInquiryRow } from "./helpers";

export type InquiryFilters = {
  status?: InquiryStatus | "all";
  search?: string;
  service?: string;
  dateFrom?: string;
  dateTo?: string;
};

export async function listInquiries(filters: InquiryFilters = {}): Promise<Inquiry[]> {
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (filters.status && filters.status !== "all") {
    conditions.push("status = ?");
    params.push(filters.status);
  }
  if (filters.service && filters.service !== "all") {
    conditions.push("service_type = ?");
    params.push(filters.service);
  }
  if (filters.dateFrom) {
    conditions.push("created_at >= ?");
    params.push(`${filters.dateFrom} 00:00:00`);
  }
  if (filters.dateTo) {
    conditions.push("created_at <= ?");
    params.push(`${filters.dateTo} 23:59:59`);
  }
  if (filters.search?.trim()) {
    const term = `%${filters.search.trim()}%`;
    const idFragment = filters.search.trim().replace(/[^a-fA-F0-9-]/g, "");
    if (idFragment.length >= 4) {
      conditions.push(
        `(name LIKE ? OR phone LIKE ? OR email LIKE ? OR destination LIKE ? OR package_name LIKE ? OR id LIKE ?)`,
      );
      params.push(term, term, term, term, term, `%${idFragment}%`);
    } else {
      conditions.push(
        `(name LIKE ? OR phone LIKE ? OR email LIKE ? OR destination LIKE ? OR package_name LIKE ?)`,
      );
      params.push(term, term, term, term, term);
    }
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const rows = await query<RowDataPacket>(
    `SELECT * FROM inquiries ${where} ORDER BY created_at DESC LIMIT 500`,
    params,
  );
  return rows.map(mapInquiryRow);
}

export async function countInquiries(status?: InquiryStatus): Promise<number> {
  if (status) {
    const row = await queryOne<RowDataPacket & { count: number }>(
      "SELECT COUNT(*) AS count FROM inquiries WHERE status = ?",
      [status],
    );
    return Number(row?.count ?? 0);
  }
  const row = await queryOne<RowDataPacket & { count: number }>(
    "SELECT COUNT(*) AS count FROM inquiries",
  );
  return Number(row?.count ?? 0);
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  adminNotes?: string,
): Promise<void> {
  if (adminNotes !== undefined) {
    await execute("UPDATE inquiries SET status = ?, admin_notes = ? WHERE id = ?", [
      status,
      adminNotes,
      id,
    ]);
    return;
  }
  await execute("UPDATE inquiries SET status = ? WHERE id = ?", [status, id]);
}

export async function getRecentInquiries(limit = 8): Promise<Inquiry[]> {
  const rows = await query<RowDataPacket>(
    "SELECT * FROM inquiries ORDER BY created_at DESC LIMIT ?",
    [limit],
  );
  return rows.map(mapInquiryRow);
}
