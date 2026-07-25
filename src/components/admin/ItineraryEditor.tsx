import { Plus, Trash2 } from "lucide-react";
import { AdminField, adminInputClass } from "@/components/admin/AdminPageHeader";

export type ItineraryDay = {
  day: number;
  title: string;
  detail: string;
};

export function parseItineraryJson(json: string): ItineraryDay[] {
  try {
    const parsed = JSON.parse(json || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item, index) => {
      const row = item as Partial<ItineraryDay>;
      return {
        day: Number(row.day) || index + 1,
        title: String(row.title ?? ""),
        detail: String(row.detail ?? ""),
      };
    });
  } catch {
    return [];
  }
}

export function itineraryToJson(days: ItineraryDay[]): string {
  const cleaned = days
    .filter((d) => d.title.trim() || d.detail.trim())
    .map((d, index) => ({
      day: d.day || index + 1,
      title: d.title.trim(),
      detail: d.detail.trim(),
    }));
  return JSON.stringify(cleaned, null, 2);
}

/** Keeps every row in the editor, including empty placeholders after sync. */
function daysToEditorJson(days: ItineraryDay[]): string {
  return JSON.stringify(
    days.map((d, index) => ({
      day: d.day || index + 1,
      title: d.title,
      detail: d.detail,
    })),
    null,
    2,
  );
}

export function buildItineraryEditorJson(
  dayCount: number,
  existing: ItineraryDay[] = [],
): string {
  return daysToEditorJson(buildItineraryForDayCount(dayCount, existing));
}

export function buildItineraryForDayCount(
  dayCount: number,
  existing: ItineraryDay[] = [],
): ItineraryDay[] {
  const count = Math.max(1, Math.min(Math.floor(dayCount) || 1, 31));
  return Array.from({ length: count }, (_, index) => {
    const prev = existing[index];
    return prev
      ? { ...prev, day: index + 1 }
      : { day: index + 1, title: "", detail: "" };
  });
}

type Props = {
  value: string;
  onChange: (json: string) => void;
  tripDays?: number;
};

export function ItineraryEditor({ value, onChange, tripDays }: Props) {
  const days = parseItineraryJson(value);
  const targetDays = Math.max(1, Math.floor(tripDays ?? 0) || days.length || 1);

  function updateDays(next: ItineraryDay[]) {
    onChange(daysToEditorJson(next));
  }

  function syncFromTripDays() {
    updateDays(buildItineraryForDayCount(targetDays, days));
  }

  function updateDay(index: number, patch: Partial<ItineraryDay>) {
    updateDays(days.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  }

  function addDay() {
    updateDays([...days, { day: days.length + 1, title: "", detail: "" }]);
  }

  function removeDay(index: number) {
    updateDays(
      days
        .filter((_, i) => i !== index)
        .map((d, i) => ({ ...d, day: i + 1 })),
    );
  }

  const dayCountMismatch = days.length !== targetDays;

  return (
    <AdminField
      label="Day-wise itinerary"
      hint="Add each day with a title and description. Shown on the package page under “Day-wise itinerary”."
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={syncFromTripDays}
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--brand-orange)]/40 bg-[color:var(--brand-orange)]/10 px-4 py-2 text-sm font-medium text-[color:var(--brand-navy)] hover:bg-[color:var(--brand-orange)]/15"
        >
          Sync days from Nights/Days ({targetDays} {targetDays === 1 ? "day" : "days"})
        </button>
        {dayCountMismatch && (
          <span className="text-xs text-muted-foreground">
            Itinerary has {days.length} {days.length === 1 ? "day" : "days"} — package is set to{" "}
            {targetDays}.
          </span>
        )}
      </div>
      <div className="space-y-3">
        {days.length === 0 && (
          <p className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
            No days yet. Click “Add day” to build the itinerary.
          </p>
        )}
        {days.map((day, index) => (
          <div
            key={`itinerary-${index}`}
            className="rounded-xl border border-border bg-muted/20 p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">
                Day {day.day}
              </span>
              <button
                type="button"
                onClick={() => removeDay(index)}
                className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                aria-label={`Remove day ${day.day}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Day number</label>
                <input
                  type="number"
                  min={1}
                  value={day.day}
                  onChange={(e) =>
                    updateDay(index, { day: Number(e.target.value) || index + 1 })
                  }
                  className={`${adminInputClass} mt-1`}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Title *</label>
                <input
                  value={day.title}
                  onChange={(e) => updateDay(index, { title: e.target.value })}
                  placeholder="e.g. Arrival & Baga Beach"
                  className={`${adminInputClass} mt-1`}
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <textarea
                rows={2}
                value={day.detail}
                onChange={(e) => updateDay(index, { detail: e.target.value })}
                placeholder="What happens on this day…"
                className={`${adminInputClass} mt-1`}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addDay}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
        >
          <Plus className="h-4 w-4" />
          Add day
        </button>
      </div>
    </AdminField>
  );
}
