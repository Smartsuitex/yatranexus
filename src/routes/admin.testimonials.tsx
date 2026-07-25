import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminImageField } from "@/components/admin/AdminImageField";
import {
  AdminEmpty,
  AdminErrorBanner,
  AdminField,
  AdminLoading,
  AdminPageHeader,
  AdminTable,
  adminInputClass,
} from "@/components/admin/AdminPageHeader";
import {
  AdminDialogStickyFooter,
  adminDialogContentClass,
  adminDialogFormClass,
  adminDialogHeaderClass,
} from "@/components/admin/AdminDialogStickyFooter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  deleteTestimonial,
  listTestimonials,
  renumberTestimonials,
  upsertTestimonial,
  type TestimonialRow,
} from "@/lib/admin-cms-api";

function clampRating(value: string | number) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 5;
  return Math.min(5, Math.max(1, Math.round(n)));
}

function nextSortNumber(items: TestimonialRow[]) {
  if (items.length === 0) return 1;
  return Math.max(...items.map((row) => Number(row.sort_order) || 0)) + 1;
}

function placeInOrder(items: TestimonialRow[], rowId: string | undefined, desiredSort: number) {
  const without = items.filter((row) => row.id !== rowId);
  const targetIndex = Math.max(0, Math.min(without.length, Math.round(desiredSort) - 1));
  return { without, targetIndex };
}

export const Route = createFileRoute("/admin/testimonials")({
  head: () => ({ meta: [{ title: "Testimonials | YatraNexus Admin" }] }),
  component: AdminTestimonialsPage,
});

const emptyForm = (sort_order = "1") => ({
  id: undefined as string | undefined,
  name: "",
  city: "",
  designation: "",
  review_text: "",
  rating: "5",
  photo_url: "",
  sort_order,
  is_active: true,
});

function AdminTestimonialsPage() {
  const [items, setItems] = useState<TestimonialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reorderingId, setReorderingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());

  const load = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    try {
      setItems(await listTestimonials());
    } catch (err) {
      setDbError(err instanceof Error ? err.message : "Could not load testimonials");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openNew() {
    setForm(emptyForm(String(nextSortNumber(items))));
    setShowForm(true);
  }

  function openEdit(row: TestimonialRow) {
    setForm({
      id: row.id,
      name: row.name,
      city: row.city ?? "",
      designation: row.designation ?? "",
      review_text: row.review_text,
      rating: String(row.rating),
      photo_url: row.photo_url ?? "",
      sort_order: String(row.sort_order),
      is_active: row.is_active,
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const desiredSort = Math.max(1, Number(form.sort_order) || items.length + 1);
      // Save content first; final unique order is applied by renumberTestimonials.
      const saved = await upsertTestimonial({
        id: form.id,
        name: form.name.trim(),
        city: form.city.trim() || null,
        designation: form.designation.trim() || null,
        review_text: form.review_text.trim(),
        rating: clampRating(form.rating),
        photo_url: form.photo_url.trim() || null,
        sort_order: 20_000,
        is_active: form.is_active,
      });

      const { without, targetIndex } = placeInOrder(items, saved.id, desiredSort);
      const orderedIds = [
        ...without.slice(0, targetIndex).map((row) => row.id),
        saved.id,
        ...without.slice(targetIndex).map((row) => row.id),
      ];
      await renumberTestimonials(orderedIds);

      toast.success("Testimonial saved");
      setShowForm(false);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function moveRow(row: TestimonialRow, direction: "up" | "down") {
    const index = items.findIndex((item) => item.id === row.id);
    if (index < 0) return;
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= items.length) return;

    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(swapIndex, 0, moved);

    setReorderingId(row.id);
    setItems(next.map((item, i) => ({ ...item, sort_order: i + 1 })));
    try {
      await renumberTestimonials(next.map((item) => item.id));
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update order");
      await load();
    } finally {
      setReorderingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete?")) return;
    try {
      await deleteTestimonial(id);
      const remaining = items.filter((row) => row.id !== id);
      if (remaining.length > 0) {
        await renumberTestimonials(remaining.map((row) => row.id));
      }
      toast.success("Deleted");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  const ratingValue = clampRating(form.rating);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Testimonials"
        description="Manage customer reviews. Use Sort number to choose who appears first and last on the site."
        actionLabel="Add testimonial"
        onAction={openNew}
      />
      {dbError && <AdminErrorBanner message={dbError} />}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className={`${adminDialogContentClass} sm:max-w-3xl`}>
          <DialogHeader className={adminDialogHeaderClass}>
            <DialogTitle className="font-display">
              {form.id ? "Edit testimonial" : "New testimonial"}
            </DialogTitle>
            <DialogDescription>
              {form.id
                ? "Update review details, rating, and display order."
                : "Add a customer review. Lower sort number = shown first."}
            </DialogDescription>
          </DialogHeader>
          <form id="admin-testimonial-form" onSubmit={handleSave} className={adminDialogFormClass}>
            <AdminField label="Name *">
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={adminInputClass} />
            </AdminField>
            <AdminField label="City">
              <input value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className={adminInputClass} />
            </AdminField>
            <AdminField label="Designation">
              <input value={form.designation} onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))} className={adminInputClass} />
            </AdminField>
            <AdminField label="Rating (1-5)">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1" role="group" aria-label="Star rating">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const filled = star <= ratingValue;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, rating: String(star) }))}
                        className="rounded-md p-1 hover:bg-muted"
                        aria-label={`${star} star${star === 1 ? "" : "s"}`}
                        aria-pressed={filled}
                      >
                        <Star
                          className={`h-5 w-5 ${filled ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                        />
                      </button>
                    );
                  })}
                </div>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={form.rating}
                  onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))}
                  className={`${adminInputClass} w-20`}
                />
              </div>
            </AdminField>
            <div className="md:col-span-2">
              <AdminField label="Review *">
                <textarea required rows={3} value={form.review_text} onChange={(e) => setForm((f) => ({ ...f, review_text: e.target.value }))} className={adminInputClass} />
              </AdminField>
            </div>
            <AdminImageField
              label="Photo"
              folder="testimonials"
              value={form.photo_url}
              onChange={(photo_url) => setForm((f) => ({ ...f, photo_url }))}
            />
            <AdminField
              label="Sort number *"
              hint="Unique order: 1 = first, 2 = second, and so on. Numbers are kept unique automatically."
            >
              <input
                required
                type="number"
                min={1}
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
            <label className="flex items-center gap-2 text-sm md:col-span-2">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))} />
              Active
            </label>
          </form>
          <AdminDialogStickyFooter
            formId="admin-testimonial-form"
            saving={saving}
            saveLabel="Save testimonial"
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
      {loading ? (
        <AdminLoading />
      ) : items.length === 0 ? (
        <AdminEmpty message="No testimonials yet." />
      ) : (
        <AdminTable>
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="px-4 py-3">Sort number</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, index) => {
              const stars = clampRating(row.rating);
              const busy = reorderingId === row.id;
              return (
                <tr key={row.id} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex min-w-8 items-center justify-center rounded-md bg-muted px-2 py-1 text-sm font-semibold tabular-nums text-foreground">
                        {row.sort_order}
                      </span>
                      <div className="flex flex-col">
                        <button
                          type="button"
                          disabled={busy || index === 0}
                          onClick={() => moveRow(row, "up")}
                          className="rounded p-0.5 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label="Move earlier (smaller sort number)"
                          title="Move up (show earlier)"
                        >
                          <ChevronUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={busy || index === items.length - 1}
                          onClick={() => moveRow(row, "down")}
                          className="rounded p-0.5 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label="Move later (larger sort number)"
                          title="Move down (show later)"
                        >
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{row.name}</td>
                  <td className="px-4 py-3">{row.city}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-0.5 text-amber-500" aria-label={`${stars} out of 5 stars`}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3.5 w-3.5 ${star <= stars ? "fill-current" : "fill-none opacity-30"}`}
                        />
                      ))}
                      <span className="ml-1.5 text-xs text-muted-foreground">{stars}/5</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(row)}
                        className="rounded-md p-1.5 hover:bg-muted"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(row.id)}
                        className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </AdminTable>
      )}
    </div>
  );
}
