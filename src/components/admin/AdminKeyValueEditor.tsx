import { Plus, Trash2 } from "lucide-react";
import { adminInputClass } from "@/components/admin/AdminPageHeader";

export type KeyValueRow = { key: string; value: string };

export function recordToRows(record: Record<string, string> | undefined): KeyValueRow[] {
  if (!record) return [];
  return Object.entries(record).map(([key, value]) => ({ key, value }));
}

export function rowsToRecord(rows: KeyValueRow[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const row of rows) {
    const key = row.key.trim().toLowerCase().replace(/\s+/g, "-");
    const value = row.value.trim();
    if (!key || !value) continue;
    out[key] = value;
  }
  return out;
}

type Props = {
  label: string;
  hint?: string;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  value: KeyValueRow[];
  onChange: (rows: KeyValueRow[]) => void;
};

export function AdminKeyValueEditor({
  label,
  hint,
  keyPlaceholder = "slug (e.g. goa)",
  valuePlaceholder = "Value",
  value,
  onChange,
}: Props) {
  function updateAt(index: number, patch: Partial<KeyValueRow>) {
    onChange(value.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function addRow() {
    onChange([...value, { key: "", value: "" }]);
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
      </div>

      {value.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-5 text-center text-sm text-muted-foreground">
          No entries yet. Click “Add entry” to create one.
        </p>
      ) : null}

      <div className="space-y-2">
        {value.map((row, index) => (
          <div
            key={`kv-${index}`}
            className="grid gap-2 rounded-xl border border-border bg-muted/15 p-3 sm:grid-cols-[1fr_1fr_auto]"
          >
            <input
              value={row.key}
              onChange={(e) => updateAt(index, { key: e.target.value })}
              className={adminInputClass}
              placeholder={keyPlaceholder}
              aria-label={`Key ${index + 1}`}
            />
            <input
              value={row.value}
              onChange={(e) => updateAt(index, { value: e.target.value })}
              className={adminInputClass}
              placeholder={valuePlaceholder}
              aria-label={`Value ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeAt(index)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-red-600 hover:bg-red-50"
              aria-label={`Remove entry ${index + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted/50"
      >
        <Plus className="h-4 w-4" />
        Add entry
      </button>
    </div>
  );
}
