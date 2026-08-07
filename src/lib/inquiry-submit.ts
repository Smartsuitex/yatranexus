import { randomUUID } from "node:crypto";
import { execute, queryOne } from "@/lib/db-server";
import { toJson } from "@/lib/db-queries/helpers";
import type { RowDataPacket } from "mysql2/promise";
import { mapInquiryRow } from "@/lib/db-queries/helpers";
import type { Inquiry } from "@/lib/db-types";
import { isTravelDateAllowed } from "@/lib/travel-date";

export type SubmitInquiryInput = {
  service_type: string;
  name: string;
  phone: string;
  email?: string | null;
  subject?: string | null;
  destination?: string | null;
  travel_date?: string | null;
  travelers?: number | null;
  message?: string | null;
  package_name?: string | null;
  source_page?: string | null;
  selected_inclusions?: string[] | null;
  selected_exclusions?: string[] | null;
  existing_inquiry_id?: string | null;
};

export type SubmitInquiryResult = {
  ok: boolean;
  alreadySubmitted?: boolean;
  inquiryId?: string;
  updated?: boolean;
};

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.slice(-10);
}

function trimOrNull(value: string | null | undefined, max?: number): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return max ? trimmed.slice(0, max) : trimmed;
}

function parseTravelDate(value: string | null | undefined): string | null {
  const trimmed = trimOrNull(value ?? null);
  if (!trimmed) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return null;
  if (!isTravelDateAllowed(trimmed)) {
    throw new Error("Travel date must be today or a future date.");
  }
  return trimmed;
}

export async function submitInquiryRecord(
  input: SubmitInquiryInput,
): Promise<SubmitInquiryResult> {
  const name = input.name.trim();
  const phone = input.phone.trim();
  const phoneNorm = normalizePhone(phone);

  if (name.length < 1 || phone.length < 5) {
    throw new Error("Invalid inquiry payload");
  }

  const travelDate = parseTravelDate(input.travel_date);
  const serviceType = input.service_type.trim();
  const packageName = trimOrNull(input.package_name, 160);
  const sourcePage = trimOrNull(input.source_page, 120);
  const destination = trimOrNull(input.destination, 120);

  // Duplicate within 5 minutes
  const duplicate = await queryOne<RowDataPacket>(
    `SELECT * FROM inquiries
     WHERE phone_normalized = ?
       AND LOWER(TRIM(name)) = LOWER(?)
       AND COALESCE(package_name, '') = COALESCE(?, '')
       AND COALESCE(source_page, '') = COALESCE(?, '')
       AND COALESCE(destination, '') = COALESCE(?, '')
       AND COALESCE(service_type, '') = COALESCE(?, '')
       AND created_at > DATE_SUB(NOW(3), INTERVAL 5 MINUTE)
     ORDER BY created_at DESC
     LIMIT 1`,
    [phoneNorm, name, packageName, sourcePage, destination, serviceType],
  );

  if (duplicate) {
    return {
      ok: true,
      alreadySubmitted: true,
      inquiryId: String(duplicate.id),
      updated: false,
    };
  }

  let existing: Inquiry | null = null;

  if (input.existing_inquiry_id) {
    const row = await queryOne<RowDataPacket>(
      `SELECT * FROM inquiries
       WHERE id = ? AND phone_normalized = ? AND status IN ('new', 'contacted', 'quoted')
       LIMIT 1`,
      [input.existing_inquiry_id, phoneNorm],
    );
    if (row) existing = mapInquiryRow(row);
  }

  if (!existing) {
    const row = await queryOne<RowDataPacket>(
      `SELECT * FROM inquiries
       WHERE phone_normalized = ? AND status IN ('new', 'contacted', 'quoted')
       ORDER BY updated_at DESC
       LIMIT 1`,
      [phoneNorm],
    );
    if (row) existing = mapInquiryRow(row);
  }

  const email = trimOrNull(input.email, 255);
  const subject = trimOrNull(input.subject, 200);
  const message = trimOrNull(input.message, 2000);
  const inclusions =
    input.selected_inclusions && input.selected_inclusions.length > 0
      ? input.selected_inclusions
      : null;
  const exclusions =
    input.selected_exclusions && input.selected_exclusions.length > 0
      ? input.selected_exclusions
      : null;

  if (existing) {
    const snapshot = {
      package_name: existing.package_name,
      destination: existing.destination,
      service_type: existing.service_type,
      source_page: existing.source_page,
      message: existing.message,
      travel_date: existing.travel_date,
      travelers: existing.travelers,
      saved_at: existing.updated_at,
    };
    const history = [...(existing.booking_history ?? []), snapshot];

    await execute(
      `UPDATE inquiries SET
        name = ?, phone = ?, email = ?, subject = ?, destination = ?,
        travel_date = ?, travelers = ?, message = ?, package_name = ?,
        source_page = ?, service_type = ?, selected_inclusions = ?,
        selected_exclusions = ?, booking_history = ?, phone_normalized = ?,
        status = CASE WHEN status = 'quoted' THEN 'new' ELSE status END,
        updated_at = NOW(3)
      WHERE id = ?`,
      [
        name,
        phone,
        email,
        subject,
        destination,
        travelDate,
        input.travelers ?? null,
        message,
        packageName,
        sourcePage,
        serviceType,
        inclusions ? toJson(inclusions) : null,
        exclusions ? toJson(exclusions) : null,
        toJson(history),
        phoneNorm,
        existing.id,
      ],
    );

    return {
      ok: true,
      alreadySubmitted: false,
      inquiryId: existing.id,
      updated: true,
    };
  }

  const id = randomUUID();
  await execute(
    `INSERT INTO inquiries (
      id, service_type, name, phone, email, subject, destination, travel_date,
      travelers, message, package_name, source_page, selected_inclusions,
      selected_exclusions, phone_normalized, booking_history, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
    [
      id,
      serviceType,
      name,
      phone,
      email,
      subject,
      destination,
      travelDate,
      input.travelers ?? null,
      message,
      packageName,
      sourcePage,
      inclusions ? toJson(inclusions) : null,
      exclusions ? toJson(exclusions) : null,
      phoneNorm,
      toJson([]),
    ],
  );

  return {
    ok: true,
    alreadySubmitted: false,
    inquiryId: id,
    updated: false,
  };
}
