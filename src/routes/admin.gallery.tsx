import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
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
  deleteGalleryImage,
  listGalleryImages,
  upsertGalleryImage,
  type GalleryRow,
} from "@/lib/admin-cms-api";

export const Route = createFileRoute("/admin/gallery")({
  head: () => ({ meta: [{ title: "Gallery | YatraNexus Admin" }] }),
  component: AdminGalleryPage,
});

const emptyForm = () => ({
  id: undefined as string | undefined,
  title: "",
  album: "Domestic",
  image_url: "",
  sort_order: "0",
  is_active: true,
});

function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm());

  const load = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    try {
      setItems(await listGalleryImages());
    } catch (err) {
      setDbError(err instanceof Error ? err.message : "Could not load gallery");
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

  function openEdit(row: GalleryRow) {
    setForm({
      id: row.id,
      title: row.title,
      album: row.album,
      image_url: row.image_url,
      sort_order: String(row.sort_order),
      is_active: row.is_active,
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await upsertGalleryImage({
        id: form.id,
        title: form.title,
        album: form.album,
        image_url: form.image_url,
        sort_order: Number(form.sort_order) || 0,
        is_active: form.is_active,
      });
      toast.success("Image saved");
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
        title="Gallery"
        description="Manage destination photos for the public gallery page."
        actionLabel="Add image"
        onAction={openNew}
      />
      {dbError && <AdminErrorBanner message={dbError} />}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className={`${adminDialogContentClass} sm:max-w-3xl`}>
          <DialogHeader className={adminDialogHeaderClass}>
            <DialogTitle className="font-display">
              {form.id ? "Edit gallery image" : "New gallery image"}
            </DialogTitle>
            <DialogDescription>
              {form.id
                ? "Update image title, album, and visibility."
                : "Add a photo to the public gallery page."}
            </DialogDescription>
          </DialogHeader>
          <form id="admin-gallery-form" onSubmit={handleSave} className={adminDialogFormClass}>
            <AdminField label="Title *">
              <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className={adminInputClass} />
            </AdminField>
            <AdminField label="Album">
              <select value={form.album} onChange={(e) => setForm((f) => ({ ...f, album: e.target.value }))} className={adminInputClass}>
                <option>Domestic</option>
                <option>International</option>
                <option>General</option>
              </select>
            </AdminField>
            <AdminImageField
              label="Gallery image *"
              folder="gallery"
              required
              value={form.image_url}
              onChange={(image_url) => setForm((f) => ({ ...f, image_url }))}
            />
            <AdminField label="Sort order">
              <input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))} className={adminInputClass} />
            </AdminField>
            <label className="flex items-center gap-2 text-sm md:col-span-2">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))} />
              Active
            </label>
          </form>
          <AdminDialogStickyFooter
            formId="admin-gallery-form"
            saving={saving}
            saveLabel="Save image"
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
      {loading ? (
        <AdminLoading />
      ) : items.length === 0 ? (
        <AdminEmpty message="No gallery images yet." />
      ) : (
        <AdminTable>
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="px-4 py-3">Preview</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Album</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3">
                  {row.image_url?.trim() ? (
                    <img
                      src={row.image_url.trim()}
                      alt=""
                      className="h-12 w-16 rounded object-cover"
                    />
                  ) : (
                    <div className="h-12 w-16 rounded bg-muted" aria-hidden />
                  )}
                </td>
                <td className="px-4 py-3 font-medium">{row.title}</td>
                <td className="px-4 py-3">{row.album}</td>
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
                          await deleteGalleryImage(row.id);
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
