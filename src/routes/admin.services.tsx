import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AdminImageField } from "@/components/admin/AdminImageField";
import { AdminIconSelect } from "@/components/admin/AdminIconSelect";
import { FaqListEditor, cleanFaqsForSave, parseFaqsJson } from "@/components/admin/FaqListEditor";
import {
  ServiceContentEditor,
  cleanServiceContentForSave,
  parseServiceContentJson,
} from "@/components/admin/ServiceContentEditor";
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
  arrayToLines,
  deleteService,
  linesToArray,
  listServices,
  slugify,
  upsertService,
  type ServiceRow,
} from "@/lib/admin-cms-api";
import { cabsCatalogDefaults } from "@/lib/cabs-page-data";
import { forexCatalogDefaults } from "@/lib/forex-page-data";

export const Route = createFileRoute("/admin/services")({
  head: () => ({ meta: [{ title: "Services | YatraNexus Admin" }] }),
  component: AdminServicesPage,
});

type FormState = {
  id?: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  banner_url: string;
  icon: string;
  meta_title: string;
  meta_description: string;
  inclusions: string;
  exclusions: string;
  faqs_json: string;
  content_blocks_json: string;
  is_active: boolean;
  sort_order: string;
};

const emptyForm = (): FormState => ({
  slug: "",
  title: "",
  short_description: "",
  description: "",
  banner_url: "",
  icon: "Sparkles",
  meta_title: "",
  meta_description: "",
  inclusions: "",
  exclusions: "",
  faqs_json: "[]",
  content_blocks_json: "{}",
  is_active: true,
  sort_order: "0",
});

function AdminServicesPage() {
  const [items, setItems] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    try {
      setItems(await listServices());
    } catch (err) {
      setDbError(err instanceof Error ? err.message : "Could not load services");
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

  function openEdit(row: ServiceRow) {
    const blocks =
      row.content_blocks && typeof row.content_blocks === "object"
        ? { ...(row.content_blocks as Record<string, unknown>) }
        : {};
    const layoutFromSlug: Record<string, string> = {
      flights: "flights",
      hotels: "hotels",
      cabs: "cabs",
      insurance: "insurance",
      forex: "forex",
      visa: "visa",
      corporate: "corporate",
      packages: "holiday",
    };
    if (layoutFromSlug[row.slug]) {
      blocks.layout = layoutFromSlug[row.slug];
    }

    // Ensure Forex / Cabs catalog rows exist so Admin image upload fields are visible.
    const catalog = Array.isArray(blocks.catalogItems) ? blocks.catalogItems : [];
    if (catalog.length === 0) {
      if (row.slug === "forex") {
        blocks.catalogItems = forexCatalogDefaults();
        if (!blocks.catalogSectionTitle) {
          blocks.catalogSectionTitle = "Choose The Right Forex Card For Your Journey";
        }
        if (!blocks.catalogSectionLead) {
          blocks.catalogSectionLead = "Multiple currency options to match your travel needs.";
        }
      } else if (row.slug === "cabs") {
        blocks.catalogItems = cabsCatalogDefaults();
      }
    }

    setForm({
      id: row.id,
      slug: row.slug,
      title: row.title,
      short_description: row.short_description ?? "",
      description: row.description ?? "",
      banner_url: row.banner_url ?? "",
      icon: row.icon ?? "",
      meta_title: row.meta_title ?? "",
      meta_description: row.meta_description ?? "",
      inclusions: arrayToLines(row.inclusions),
      exclusions: arrayToLines(row.exclusions),
      faqs_json: JSON.stringify(row.faqs ?? [], null, 2),
      content_blocks_json: JSON.stringify(blocks, null, 2),
      is_active: row.is_active,
      sort_order: String(row.sort_order),
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const faqs = cleanFaqsForSave(parseFaqsJson(form.faqs_json || "[]"));
      const content_blocks = cleanServiceContentForSave(
        parseServiceContentJson(form.content_blocks_json || "{}"),
      );
      await upsertService({
        id: form.id,
        slug: form.slug || slugify(form.title),
        title: form.title,
        short_description: form.short_description || null,
        description: form.description || null,
        banner_url: form.banner_url || null,
        icon: form.icon || null,
        meta_title: form.meta_title || null,
        meta_description: form.meta_description || null,
        inclusions: linesToArray(form.inclusions),
        exclusions: linesToArray(form.exclusions),
        faqs,
        content_blocks,
        is_active: form.is_active,
        sort_order: Number(form.sort_order) || 0,
      });
      toast.success("Service saved");
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const row = items.find((item) => item.id === id);
    if (row?.slug === "packages" || row?.slug === "corporate") {
      toast.error(
        row.slug === "packages"
          ? "Holiday Packages cannot be deleted — edit or hide it instead."
          : "Corporate Travel cannot be deleted — edit or hide it instead.",
      );
      return;
    }
    if (!confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      toast.success("Deleted");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Services"
        description="Manage all service pages: Flights, Hotels, Cabs, Holiday Packages, Visa, Insurance, Forex, and Corporate Travel. Package listings stay under Holiday Packages; this list controls each service page hero, card text, and SEO."
        actionLabel="Add service"
        onAction={openNew}
      />
      {dbError && <AdminErrorBanner message={dbError} />}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className={`${adminDialogContentClass} sm:max-w-4xl`}>
          <DialogHeader className={adminDialogHeaderClass}>
            <DialogTitle className="font-display">
              {form.id ? "Edit service" : "New service"}
            </DialogTitle>
            <DialogDescription>
              {form.slug === "packages"
                ? "Updates the Holiday Packages hub at /holiday-packages and its card on the Services page."
                : form.slug === "corporate"
                  ? "Updates the Corporate & MICE page at /corporate and its card on the Services page."
                  : form.id
                    ? "Update service page content, banner, and FAQs."
                    : "Add a new flight, hotel, visa, or other service page."}
            </DialogDescription>
          </DialogHeader>
          <form id="admin-service-form" onSubmit={handleSave} className={adminDialogFormClass}>
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
            <AdminField
              label="Slug *"
              hint={
                form.slug === "packages"
                  ? "Keep as packages — links to /holiday-packages"
                  : form.slug === "corporate"
                    ? "Keep as corporate — links to /corporate"
                    : undefined
              }
            >
              <input
                required
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className={adminInputClass}
                readOnly={form.slug === "packages" || form.slug === "corporate"}
              />
            </AdminField>
            <AdminField label="Short description" hint="One line shown on service cards and listings">
              <input
                value={form.short_description}
                onChange={(e) => setForm((f) => ({ ...f, short_description: e.target.value }))}
                className={adminInputClass}
                placeholder="e.g. Best fares on domestic & international flights"
              />
            </AdminField>
            <AdminIconSelect
              label="Service icon"
              hint="Icon shown in navigation and service cards"
              value={form.icon}
              onChange={(icon) => setForm((f) => ({ ...f, icon }))}
            />
            <div className="md:col-span-2">
              <AdminField label="Full description" hint="Main paragraph on the service page hero">
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className={adminInputClass}
                  placeholder="Describe this service in plain language for your customers…"
                />
              </AdminField>
            </div>
            <AdminImageField
              label="Service hero section image"
              hint={
                form.slug === "packages"
                  ? "Hero background on /holiday-packages (Holiday Packages hub). Upload here to replace the default."
                  : form.slug === "corporate"
                    ? "Hero background on /corporate. Upload here to replace the default."
                    : "Hero background on this service page. Upload or choose from library to replace the default."
              }
              folder="services"
              value={form.banner_url}
              onChange={(banner_url) => setForm((f) => ({ ...f, banner_url }))}
            />
            <AdminField label="Sort order">
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
            <AdminField label="SEO title" hint="Browser tab / Google title">
              <input
                value={form.meta_title}
                onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))}
                className={adminInputClass}
                placeholder={`${form.title || "Service"} | YatraNexus`}
              />
            </AdminField>
            <AdminField label="SEO description" hint="Meta description for search engines">
              <textarea
                rows={2}
                value={form.meta_description}
                onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
            <AdminField label="Inclusions" hint="One benefit per line — shown on the public service page">
              <textarea
                rows={3}
                value={form.inclusions}
                onChange={(e) => setForm((f) => ({ ...f, inclusions: e.target.value }))}
                className={adminInputClass}
                placeholder={"Airport transfers\nDaily breakfast\nSightseeing"}
              />
            </AdminField>
            <AdminField label="Exclusions" hint="One item per line — shown on the public service page">
              <textarea
                rows={3}
                value={form.exclusions}
                onChange={(e) => setForm((f) => ({ ...f, exclusions: e.target.value }))}
                className={adminInputClass}
                placeholder={"Personal expenses\nOptional activities"}
              />
            </AdminField>
            <ServiceContentEditor
              value={form.content_blocks_json}
              onChange={(content_blocks_json) => setForm((f) => ({ ...f, content_blocks_json }))}
            />
            <div className="md:col-span-2">
              <FaqListEditor
                value={form.faqs_json}
                onChange={(faqs_json) => setForm((f) => ({ ...f, faqs_json }))}
              />
            </div>
            <label className="flex items-center gap-2 text-sm md:col-span-2">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
              />
              Active
            </label>
          </form>
          <AdminDialogStickyFooter
            formId="admin-service-form"
            saving={saving}
            saveLabel="Save service"
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
      {loading ? (
        <AdminLoading />
      ) : items.length === 0 ? (
        <AdminEmpty message="No services in database yet." />
      ) : (
        <AdminTable>
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3 font-medium">{row.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.slug}</td>
                <td className="px-4 py-3">{row.is_active ? "Active" : "Hidden"}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => openEdit(row)} className="rounded-md p-1.5 hover:bg-muted">
                      <Pencil className="h-4 w-4" />
                    </button>
                    {row.slug !== "packages" && row.slug !== "corporate" && (
                      <button type="button" onClick={() => handleDelete(row.id)} className="rounded-md p-1.5 text-red-600 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
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
