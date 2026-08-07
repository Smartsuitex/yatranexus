/** Calendar date helpers for inquiry travel_date (YYYY-MM-DD). */

const BUSINESS_TZ = "Asia/Kolkata";

/** Today's date in India business timezone as YYYY-MM-DD. */
export function todayTravelDateValue(timeZone: string = BUSINESS_TZ): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** True when value is empty or a YYYY-MM-DD on/after today (IST). */
export function isTravelDateAllowed(value: string | null | undefined): boolean {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return false;
  return trimmed >= todayTravelDateValue();
}
