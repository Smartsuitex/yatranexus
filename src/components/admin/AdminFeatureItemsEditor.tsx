import { Plus, Trash2 } from "lucide-react";
import { AdminIconSelect } from "@/components/admin/AdminIconSelect";
import { adminInputClass } from "@/components/admin/AdminPageHeader";
import type { PageFeatureItem } from "@/lib/page-content";

const ACCENT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "purple", label: "Purple" },
  { value: "orange", label: "Orange" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
] as const;

type Props = {
  label: string;
  hint?: string;
  value: PageFeatureItem[];
  onChange: (items: PageFeatureItem[]) => void;
  /** Hide detail field for short title-only cards. */
  hideDetail?: boolean;
  showAccent?: boolean;
};

export function AdminFeatureItemsEditor({
  label,
  hint,
  value,
  onChange,
  hideDetail = false,
  showAccent = true,
}: Props) {
  function updateAt(index: number, patch: Partial<PageFeatureItem>) {
    onChange(value.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function addItem() {
    onChange([
      ...value,
      {
        icon: "Sparkles",
        title: "",
        detail: "",
        accent: "purple",
      },
    ]);
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    const [row] = next.splice(index, 1);
    next.splice(target, 0, row!);
    onChange(next);
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {hint ? <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p> : null}
      </div>

      {value.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-5 text-center text-sm text-muted-foreground">
          No items yet. Click “Add item” to create one.
        </p>
      ) : null}

      <div className="space-y-3">
        {value.map((item, index) => (
          <div
            key={`feature-${index}-${item.title}`}
            className="rounded-xl border border-border bg-muted/15 p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">
                Item {index + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40"
                >
                  Up
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === value.length - 1}
                  className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted disabled:opacity-40"
                >
                  Down
                </button>
                <button
                  type="button"
                  onClick={() => removeAt(index)}
                  className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                  aria-label={`Remove item ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <AdminIconSelect
                label="Icon"
                value={item.icon || "Sparkles"}
                onChange={(icon) => updateAt(index, { icon })}
              />
              {showAccent ? (
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium text-muted-foreground">Accent colour</span>
                  <select
                    value={item.accent ?? ""}
                    onChange={(e) =>
                      updateAt(index, {
                        accent: (e.target.value || undefined) as PageFeatureItem["accent"],
                      })
                    }
                    className={adminInputClass}
                  >
                    {ACCENT_OPTIONS.map((opt) => (
                      <option key={opt.value || "default"} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
              <label className="block space-y-1.5 sm:col-span-2">
                <span className="text-xs font-medium text-muted-foreground">Title</span>
                <input
                  value={item.title}
                  onChange={(e) => updateAt(index, { title: e.target.value })}
                  className={adminInputClass}
                  placeholder="e.g. Best Prices"
                />
              </label>
              {!hideDetail ? (
                <label className="block space-y-1.5 sm:col-span-2">
                  <span className="text-xs font-medium text-muted-foreground">Detail</span>
                  <textarea
                    rows={2}
                    value={item.detail}
                    onChange={(e) => updateAt(index, { detail: e.target.value })}
                    className={adminInputClass}
                    placeholder="Short supporting text"
                  />
                </label>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted/50"
      >
        <Plus className="h-4 w-4" />
        Add item
      </button>
    </div>
  );
}

export function cleanFeatureItems(items: PageFeatureItem[]): PageFeatureItem[] {
  return items
    .filter((item) => item.title.trim() || item.detail.trim())
    .map((item) => ({
      icon: item.icon?.trim() || "Sparkles",
      title: item.title.trim(),
      detail: item.detail.trim(),
      ...(item.accent ? { accent: item.accent } : {}),
      ...(item.image?.trim() ? { image: item.image.trim() } : {}),
    }));
}
