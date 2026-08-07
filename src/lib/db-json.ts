import type { Json } from "@/lib/db-types";
import { decodeHtmlEntities } from "@/lib/utils";

export function parseBool(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") return value === "1" || value.toLowerCase() === "true";
  return Boolean(value);
}

export function parseJson<T = Json>(value: unknown, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === "object") return value as T;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return fallback;
}

export function parseStringArray(value: unknown): string[] {
  const parsed = parseJson<unknown>(value, []);
  return Array.isArray(parsed)
    ? parsed.map((item) => decodeHtmlEntities(String(item)))
    : [];
}

export function toJson(value: unknown): string {
  return JSON.stringify(value ?? null);
}

export function toMysqlDatetime(iso: string | Date | null | undefined): string | null {
  if (!iso) return null;
  const d = iso instanceof Date ? iso : new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 23).replace("T", " ");
}

export function fromMysqlDatetime(value: unknown): string {
  if (!value) return new Date().toISOString();
  if (value instanceof Date) return value.toISOString();
  const s = String(value);
  if (s.includes("T")) return new Date(s).toISOString();
  return new Date(`${s}Z`.replace(" ", "T")).toISOString();
}

export function fromMysqlDate(value: unknown): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const s = String(value);
  return s.slice(0, 10);
}
