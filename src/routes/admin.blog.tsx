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
  deleteBlogPost,
  linesToArray,
  listBlogPosts,
  slugify,
  upsertBlogPost,
  type BlogPostRow,
} from "@/lib/admin-cms-api";

export const Route = createFileRoute("/admin/blog")({
  head: () => ({ meta: [{ title: "Blog | YatraNexus Admin" }] }),
  component: AdminBlogPage,
});

const emptyForm = () => ({
  id: undefined as string | undefined,
  slug: "",
  title: "",
  excerpt: "",
  category: "",
  content: "",
  featured_image_url: "",
  read_minutes: "5",
  is_published: false,
  published_at: null as string | null,
});

function AdminBlogPage() {
  const [items, setItems] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm());

  const load = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    try {
      setItems(await listBlogPosts());
    } catch (err) {
      setDbError(err instanceof Error ? err.message : "Could not load blog posts");
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

  function openEdit(row: BlogPostRow) {
    let content = "";
    if (Array.isArray(row.content)) {
      content = (row.content as string[]).join("\n");
    } else if (typeof row.content === "string") {
      content = row.content;
    }

    setForm({
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt ?? "",
      category: row.category ?? "",
      content,
      featured_image_url: row.featured_image_url ?? "",
      read_minutes: String(row.read_minutes),
      is_published: row.is_published,
      published_at: row.published_at,
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const publishedAt =
        form.is_published
          ? form.published_at ?? new Date().toISOString()
          : null;

      await upsertBlogPost({
        id: form.id,
        slug: form.slug || slugify(form.title),
        title: form.title,
        excerpt: form.excerpt || null,
        category: form.category || null,
        content: linesToArray(form.content),
        featured_image_url: form.featured_image_url || null,
        read_minutes: Number(form.read_minutes) || 5,
        is_published: form.is_published,
        published_at: publishedAt,
      });
      toast.success("Blog post saved");
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
        title="Blog"
        description="Manage travel tips and destination articles."
        actionLabel="Add post"
        onAction={openNew}
      />
      {dbError && <AdminErrorBanner message={dbError} />}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className={`${adminDialogContentClass} sm:max-w-4xl`}>
          <DialogHeader className={adminDialogHeaderClass}>
            <DialogTitle className="font-display">
              {form.id ? "Edit blog post" : "New blog post"}
            </DialogTitle>
            <DialogDescription>
              {form.id
                ? "Update article content, category, and publish status."
                : "Create a travel tips or destination article."}
            </DialogDescription>
          </DialogHeader>
          <form id="admin-blog-form" onSubmit={handleSave} className={adminDialogFormClass}>
            <AdminField label="Title *">
              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    title: e.target.value,
                    slug: f.id ? f.slug : slugify(e.target.value),
                  }))
                }
                className={adminInputClass}
              />
            </AdminField>
            <AdminField label="Slug *">
              <input
                required
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
            <AdminField label="Category">
              <input
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
            <AdminField label="Read minutes">
              <input
                type="number"
                value={form.read_minutes}
                onChange={(e) => setForm((f) => ({ ...f, read_minutes: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
            <div className="md:col-span-2">
              <AdminField label="Excerpt">
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  className={adminInputClass}
                />
              </AdminField>
            </div>
            <div className="md:col-span-2">
              <AdminField label="Content" hint="One paragraph per line">
                <textarea
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  className={adminInputClass}
                />
              </AdminField>
            </div>
            <AdminImageField
              label="Featured image"
              folder="blog"
              value={form.featured_image_url}
              onChange={(featured_image_url) => setForm((f) => ({ ...f, featured_image_url }))}
            />
            <label className="flex items-center gap-2 text-sm self-end">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(e) => setForm((f) => ({ ...f, is_published: e.target.checked }))}
              />
              Published
            </label>
          </form>
          <AdminDialogStickyFooter
            formId="admin-blog-form"
            saving={saving}
            saveLabel="Save post"
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
      {loading ? (
        <AdminLoading />
      ) : items.length === 0 ? (
        <AdminEmpty message="No blog posts yet." />
      ) : (
        <AdminTable>
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3 font-medium">{row.title}</td>
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3">{row.is_published ? "Yes" : "Draft"}</td>
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
                          await deleteBlogPost(row.id);
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
