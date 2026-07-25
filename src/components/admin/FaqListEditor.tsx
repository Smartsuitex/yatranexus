import { Plus, Trash2 } from "lucide-react";
import { AdminField, adminInputClass } from "@/components/admin/AdminPageHeader";

export type FaqItem = { q: string; a: string };

export function parseFaqsJson(json: string): FaqItem[] {
  try {
    const parsed = JSON.parse(json || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => {
      const row = item as Partial<FaqItem>;
      return {
        q: String(row.q ?? ""),
        a: String(row.a ?? ""),
      };
    });
  } catch {
    return [];
  }
}

export function faqsToEditorJson(items: FaqItem[]): string {
  return JSON.stringify(items, null, 2);
}

/** Strip empty rows before saving to the database. */
export function cleanFaqsForSave(items: FaqItem[]): FaqItem[] {
  return items
    .filter((item) => item.q.trim() || item.a.trim())
    .map((item) => ({
      q: item.q.trim(),
      a: item.a.trim(),
    }));
}

export function faqsToJson(items: FaqItem[]): string {
  return JSON.stringify(cleanFaqsForSave(items), null, 2);
}

type Props = {
  value: string;
  onChange: (json: string) => void;
};

export function FaqListEditor({ value, onChange }: Props) {
  const items = parseFaqsJson(value);

  function update(next: FaqItem[]) {
    onChange(faqsToEditorJson(next));
  }

  function updateItem(index: number, patch: Partial<FaqItem>) {
    update(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  function addItem() {
    update([...items, { q: "", a: "" }]);
  }

  function removeItem(index: number) {
    update(items.filter((_, i) => i !== index));
  }

  return (
    <AdminField
      label="Service FAQs"
      hint="Questions and answers shown on this service page. Leave empty if not needed."
    >
      <div className="space-y-3">
        {items.length === 0 && (
          <p className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-6 text-center text-sm text-muted-foreground">
            No FAQs yet. Click “Add FAQ” to add one.
          </p>
        )}
        {items.map((item, index) => (
          <div key={`faq-${index}`} className="rounded-xl border border-border bg-muted/20 p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-orange)]">
                FAQ {index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                aria-label={`Remove FAQ ${index + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Question</label>
                <input
                  value={item.q}
                  onChange={(e) => updateItem(index, { q: e.target.value })}
                  placeholder="e.g. How long does visa processing take?"
                  className={`${adminInputClass} mt-1`}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Answer</label>
                <textarea
                  rows={2}
                  value={item.a}
                  onChange={(e) => updateItem(index, { a: e.target.value })}
                  placeholder="Write a clear answer for your customer…"
                  className={`${adminInputClass} mt-1`}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50"
        >
          <Plus className="h-4 w-4" />
          Add FAQ
        </button>
      </div>
    </AdminField>
  );
}
