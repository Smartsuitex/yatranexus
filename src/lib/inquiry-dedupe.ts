import type { Inquiry } from "@/integrations/supabase/types";

/** Normalize phone for comparison (last 10 digits). */
export function normalizeInquiryPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 ? digits.slice(-10) : digits;
}

/** Short human-readable inquiry reference from UUID. */
export function formatInquiryRef(id: string): string {
  return id.replace(/-/g, "").slice(0, 8).toUpperCase();
}

export type BookingHistoryEntry = {
  package_name?: string | null;
  destination?: string | null;
  service_type?: string | null;
  source_page?: string | null;
  message?: string | null;
  travel_date?: string | null;
  travelers?: number | null;
  saved_at?: string;
};

export function parseBookingHistory(raw: unknown): BookingHistoryEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((item): item is BookingHistoryEntry => item !== null && typeof item === "object");
}

export type InquiryDedupeFields = {
  name: string;
  phone: string;
  package_name?: string | null;
  source_page?: string | null;
  destination?: string | null;
  service_type?: string | null;
};

export function inquiryDedupeKey(fields: InquiryDedupeFields): string {
  return [
    normalizeInquiryPhone(fields.phone),
    fields.name.trim().toLowerCase(),
    (fields.package_name ?? "").trim().toLowerCase(),
    (fields.source_page ?? "").trim().toLowerCase(),
    (fields.destination ?? "").trim().toLowerCase(),
    (fields.service_type ?? "").trim().toLowerCase(),
  ].join("|");
}

/** Window in which repeat submissions are treated as duplicates. */
export const INQUIRY_DEDUPE_WINDOW_MS = 5 * 60 * 1000;

export function isDuplicateInquiry(
  candidate: InquiryDedupeFields,
  existing: InquiryDedupeFields & { created_at: string },
  now = Date.now(),
): boolean {
  if (inquiryDedupeKey(candidate) !== inquiryDedupeKey(existing)) return false;
  const created = new Date(existing.created_at).getTime();
  return now - created <= INQUIRY_DEDUPE_WINDOW_MS;
}

/** Collapse near-duplicate rows in admin list (keeps the newest per key). */
export function dedupeInquiryRowsForAdmin(rows: Inquiry[]): {
  rows: Inquiry[];
  hiddenCount: number;
} {
  const kept: Inquiry[] = [];
  let hiddenCount = 0;

  for (const row of rows) {
    const key = inquiryDedupeKey(row);
    const duplicateIdx = kept.findIndex((existing) => {
      if (inquiryDedupeKey(existing) !== key) return false;
      return (
        Math.abs(new Date(existing.created_at).getTime() - new Date(row.created_at).getTime()) <=
        INQUIRY_DEDUPE_WINDOW_MS
      );
    });

    if (duplicateIdx >= 0) {
      hiddenCount++;
      if (new Date(row.created_at) > new Date(kept[duplicateIdx].created_at)) {
        kept[duplicateIdx] = row;
      }
      continue;
    }

    kept.push(row);
  }

  return {
    rows: kept.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ),
    hiddenCount,
  };
}

export type CustomerInquiryGroup = {
  phoneKey: string;
  primary: Inquiry;
  related: Inquiry[];
  bookingCount: number;
};

/** One admin card per customer phone — latest inquiry is the main record. */
export function groupInquiriesByCustomer(rows: Inquiry[]): CustomerInquiryGroup[] {
  const map = new Map<string, Inquiry[]>();

  for (const row of rows) {
    const key =
      (row as Inquiry & { phone_normalized?: string | null }).phone_normalized ??
      normalizeInquiryPhone(row.phone);
    const list = map.get(key) ?? [];
    list.push(row);
    map.set(key, list);
  }

  return [...map.values()]
    .map((inquiries) => {
      const sorted = [...inquiries].sort(
        (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );
      const primary = sorted[0];
      const related = sorted.slice(1);
      const historyLen = parseBookingHistory(
        (primary as Inquiry & { booking_history?: unknown }).booking_history,
      ).length;
      const bookingCount = historyLen + 1 + related.length;
      return {
        phoneKey: normalizeInquiryPhone(primary.phone),
        primary,
        related,
        bookingCount,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.primary.updated_at).getTime() - new Date(a.primary.updated_at).getTime(),
    );
}

export const INQUIRY_ID_STORAGE_KEY = "yn_inquiry_id";
export const INQUIRY_PHONE_STORAGE_KEY = "yn_inquiry_phone";

export function readStoredInquiryId(phone: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  const storedPhone = window.localStorage.getItem(INQUIRY_PHONE_STORAGE_KEY);
  const storedId = window.localStorage.getItem(INQUIRY_ID_STORAGE_KEY);
  if (!storedId || !storedPhone) return undefined;
  if (normalizeInquiryPhone(storedPhone) !== normalizeInquiryPhone(phone)) return undefined;
  return storedId;
}

export function storeInquiryId(id: string, phone: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(INQUIRY_ID_STORAGE_KEY, id);
  window.localStorage.setItem(INQUIRY_PHONE_STORAGE_KEY, phone);
}
