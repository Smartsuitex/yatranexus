import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
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
  deleteFaq,
  listFaqs,
  upsertFaq,
  type FaqRow,
} from "@/lib/admin-cms-api";

export const Route = createFileRoute("/admin/faqs")({
  head: () => ({ meta: [{ title: "FAQs | YatraNexus Admin" }] }),
  component: AdminFaqsPage,
});

const emptyForm = () => ({
  id: undefined as string | undefined,
  question: "",
  answer: "",
  category: "General",
  sort_order: "0",
  is_active: true,
});

function AdminFaqsPage() {
  const [items, setItems] = useState<FaqRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm());

  const load = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    try {
      setItems(await listFaqs());
    } catch (err) {
      setDbError(err instanceof Error ? err.message : "Could not load FAQs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openNew() {
    setForm(emptyForm());
    setShowForm(true);
  }

  function openEdit(row: FaqRow) {
    setForm({
      id: row.id,
      question: row.question,
      answer: row.answer,
      category: row.category ?? "General",
      sort_order: String(row.sort_order),
      is_active: row.is_active,
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await upsertFaq({
        id: form.id,
        question: form.question,
        answer: form.answer,
        category: form.category || null,
        sort_order: Number(form.sort_order) || 0,
        is_active: form.is_active,
      });
      toast.success("FAQ saved");
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="FAQs"
        description="Manage frequently asked questions."
        actionLabel="Add FAQ"
        onAction={openNew}
      />
      {dbError && <AdminErrorBanner message={dbError} />}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className={`${adminDialogContentClass} sm:max-w-2xl`}>
          <DialogHeader className={adminDialogHeaderClass}>
            <DialogTitle className="font-display">
              {form.id ? "Edit FAQ" : "New FAQ"}
            </DialogTitle>
            <DialogDescription>
              {form.id
                ? "Update question, answer, and category."
                : "Add a frequently asked question for the website."}
            </DialogDescription>
          </DialogHeader>
          <form id="admin-faq-form" onSubmit={handleSave} className={adminDialogFormClass}>
            <AdminField label="Category">
              <input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className={adminInputClass} />
            </AdminField>
            <AdminField label="Sort order">
              <input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))} className={adminInputClass} />
            </AdminField>
            <div className="md:col-span-2">
              <AdminField label="Question *">
                <input required value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))} className={adminInputClass} />
              </AdminField>
            </div>
            <div className="md:col-span-2">
              <AdminField label="Answer *">
                <textarea required rows={4} value={form.answer} onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))} className={adminInputClass} />
              </AdminField>
            </div>
            <label className="flex items-center gap-2 text-sm md:col-span-2">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))} />
              Active
            </label>
          </form>
          <AdminDialogStickyFooter
            formId="admin-faq-form"
            saving={saving}
            saveLabel="Save FAQ"
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
      {loading ? (
        <AdminLoading />
      ) : items.length === 0 ? (
        <AdminEmpty message="No FAQs yet." />
      ) : (
        <AdminTable>
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="px-4 py-3">Question</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3 font-medium max-w-md truncate">{row.question}</td>
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => openEdit(row)} className="rounded-md p-1.5 hover:bg-muted">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!confirm("Delete?")) return;
                        try {
                          await deleteFaq(row.id);
                          toast.success("Deleted");
                          load();
                        } catch (err) {
                          toast.error(err instanceof Error ? err.message : "Delete failed");
                        }
                      }}
                      className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      )}
    </div>
  );
}
