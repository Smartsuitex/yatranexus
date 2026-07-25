import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { AdminImageField } from "@/components/admin/AdminImageField";
import { AdminDestinationSelect } from "@/components/admin/AdminDestinationSelect";
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
  deletePackage,
  linesToArray,
  listPackages,
  listDestinations,
  slugify,
  upsertPackage,
  type DestinationRow,
  type PackageRow,
} from "@/lib/admin-cms-api";
import { ItineraryEditor, itineraryToJson, parseItineraryJson, buildItineraryEditorJson } from "@/components/admin/ItineraryEditor";

export const Route = createFileRoute("/admin/packages")({
  head: () => ({ meta: [{ title: "Holiday Packages | YatraNexus Admin" }] }),
  component: AdminPackagesPage,
});

type FormState = {
  id?: string;
  slug: string;
  title: string;
  destination: string;
  scope: "domestic" | "international";
  nights: string;
  days: string;
  from_price: string;
  discount_price: string;
  image_url: string;
  overview: string;
  inclusions: string;
  exclusions: string;
  itinerary_json: string;
  is_active: boolean;
  is_featured: boolean;
  sort_order: string;
};

const emptyForm = (): FormState => ({
  slug: "",
  title: "",
  destination: "",
  scope: "domestic",
  nights: "3",
  days: "4",
  from_price: "",
  discount_price: "",
  image_url: "",
  overview: "",
  inclusions: "",
  exclusions: "",
  itinerary_json: "[]",
  is_active: true,
  is_featured: false,
  sort_order: "0",
});

function rowToForm(row: PackageRow): FormState {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    destination: row.destination,
    scope: row.scope,
    nights: String(row.nights),
    days: String(row.days),
    from_price: row.from_price,
    discount_price: row.discount_price ?? "",
    image_url: row.image_url ?? "",
    overview: row.meta_description ?? "",
    inclusions: arrayToLines(row.inclusions),
    exclusions: arrayToLines(row.exclusions),
    itinerary_json: JSON.stringify(row.itinerary ?? [], null, 2),
    is_active: row.is_active,
    is_featured: row.is_featured,
    sort_order: String(row.sort_order),
  };
}

function destinationsForScope(
  destinations: DestinationRow[],
  scope: FormState["scope"],
): DestinationRow[] {
  return destinations
    .filter((d) => d.scope === scope)
    .sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name));
}

function pickDefaultDestination(
  destinations: DestinationRow[],
  scope: FormState["scope"],
): string {
  return destinationsForScope(destinations, scope).find((d) => d.is_active)?.name ?? "";
}

function AdminPackagesPage() {
  const [items, setItems] = useState<PackageRow[]>([]);
  const [destinations, setDestinations] = useState<DestinationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [scopeFilter, setScopeFilter] = useState<"all" | "domestic" | "international">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "hidden">("all");
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "featured" | "not-featured">("all");
  const [destinationFilter, setDestinationFilter] = useState("all");

  const scopedFormDestinations = useMemo(
    () => destinationsForScope(destinations, form.scope),
    [destinations, form.scope],
  );

  const destinationOptions = useMemo(() => {
    const options = scopedFormDestinations.map((d) => ({
      value: d.name,
      label: d.is_active ? d.name : `${d.name} (hidden)`,
    }));
    const current = form.destination.trim();
    if (current && !options.some((o) => o.value === current)) {
      options.unshift({ value: current, label: `${current} (legacy — add in Destinations)` });
    }
    return options;
  }, [scopedFormDestinations, form.destination]);

  const destinationFilterOptions = useMemo(() => {
    const names = new Set<string>();
    for (const row of items) {
      if (row.destination?.trim()) names.add(row.destination.trim());
    }
    for (const dest of destinations) {
      if (dest.name?.trim()) names.add(dest.name.trim());
    }
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }, [items, destinations]);

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    scopeFilter !== "all" ||
    statusFilter !== "all" ||
    featuredFilter !== "all" ||
    destinationFilter !== "all";

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((row) => {
      if (scopeFilter !== "all" && row.scope !== scopeFilter) return false;
      if (statusFilter === "active" && !row.is_active) return false;
      if (statusFilter === "hidden" && row.is_active) return false;
      if (featuredFilter === "featured" && !row.is_featured) return false;
      if (featuredFilter === "not-featured" && row.is_featured) return false;
      if (destinationFilter !== "all" && row.destination !== destinationFilter) return false;
      if (!q) return true;
      return [row.title, row.destination, row.slug, row.from_price, row.discount_price ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [items, searchQuery, scopeFilter, statusFilter, featuredFilter, destinationFilter]);

  function applySearch() {
    setSearchQuery(searchInput.trim());
  }

  function clearFilters() {
    setSearchInput("");
    setSearchQuery("");
    setScopeFilter("all");
    setStatusFilter("all");
    setFeaturedFilter("all");
    setDestinationFilter("all");
  }

  const load = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    try {
      const [packages, destRows] = await Promise.all([listPackages(), listDestinations()]);
      setItems(packages);
      setDestinations(destRows);
    } catch (err) {
      setDbError(err instanceof Error ? err.message : "Could not load packages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openNew() {
    const nights = 3;
    const days = 4;
    const scope: FormState["scope"] = "domestic";
    setForm({
      ...emptyForm(),
      scope,
      destination: pickDefaultDestination(destinations, scope),
      nights: String(nights),
      days: String(days),
      itinerary_json: buildItineraryEditorJson(days),
    });
    setShowForm(true);
  }

  function handleScopeChange(scope: FormState["scope"]) {
    setForm((f) => {
      const scoped = destinationsForScope(destinations, scope);
      const stillValid = scoped.some((d) => d.name === f.destination);
      return {
        ...f,
        scope,
        destination: stillValid ? f.destination : pickDefaultDestination(destinations, scope),
      };
    });
  }

  function openEdit(row: PackageRow) {
    setForm(rowToForm(row));
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.destination.trim()) {
      toast.error("Select a destination from Admin → Destinations first.");
      return;
    }
    setSaving(true);
    try {
      const itinerary = JSON.parse(
        itineraryToJson(parseItineraryJson(form.itinerary_json)),
      );
      await upsertPackage({
        id: form.id,
        slug: form.slug || slugify(form.title),
        title: form.title.trim(),
        destination: form.destination.trim(),
        scope: form.scope,
        nights: Number(form.nights) || 0,
        days: Number(form.days) || 1,
        from_price: form.from_price.trim(),
        discount_price: form.discount_price.trim() || null,
        image_url: form.image_url.trim() || null,
        meta_description: form.overview.trim() || null,
        inclusions: linesToArray(form.inclusions),
        exclusions: linesToArray(form.exclusions),
        itinerary,
        is_active: form.is_active,
        is_featured: form.is_featured,
        sort_order: Number(form.sort_order) || 0,
      });
      toast.success(form.id ? "Package updated" : "Package created");
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this package?")) return;
    try {
      await deletePackage(id);
      toast.success("Package deleted");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Holiday Packages"
        description="Manage tour packages. Create destinations in Admin → Destinations first, then pick them here."
        actionLabel="Add package"
        onAction={openNew}
      />

      {dbError && (
        <AdminErrorBanner
          message={`${dbError}. Run the Phase 2 migration (20260626140000_phase2_cms_schema.sql) in Supabase SQL Editor.`}
        />
      )}

      <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search title, destination, slug, price…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applySearch();
              }
            }}
            className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm"
          />
        </div>
        <button
          type="button"
          onClick={applySearch}
          className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-soft"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
        <select
          value={scopeFilter}
          onChange={(e) => setScopeFilter(e.target.value as typeof scopeFilter)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          aria-label="Filter by scope"
        >
          <option value="all">All scopes</option>
          <option value="domestic">Domestic</option>
          <option value="international">International</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="hidden">Hidden</option>
        </select>
        <select
          value={featuredFilter}
          onChange={(e) => setFeaturedFilter(e.target.value as typeof featuredFilter)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          aria-label="Filter by featured"
        >
          <option value="all">All packages</option>
          <option value="featured">Featured only</option>
          <option value="not-featured">Not featured</option>
        </select>
        <select
          value={destinationFilter}
          onChange={(e) => setDestinationFilter(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          aria-label="Filter by destination"
        >
          <option value="all">All destinations</option>
          {destinationFilterOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm hover:bg-muted/50"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        ) : null}
      </div>

      {!loading && items.length > 0 ? (
        <p className="text-sm text-muted-foreground">
          Showing {filteredItems.length} of {items.length} package{items.length === 1 ? "" : "s"}
        </p>
      ) : null}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className={`${adminDialogContentClass} sm:max-w-4xl`}>
          <DialogHeader className={adminDialogHeaderClass}>
            <DialogTitle className="font-display">
              {form.id ? "Edit package" : "New package"}
            </DialogTitle>
            <DialogDescription>
              {form.id
                ? "Update package details, pricing, and itinerary."
                : "Create a new holiday package for the website."}
            </DialogDescription>
          </DialogHeader>
          <form id="admin-package-form" onSubmit={handleSave} className={adminDialogFormClass}>
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
            <AdminField label="Scope" hint="Must match the destination scope">
              <select
                value={form.scope}
                onChange={(e) => handleScopeChange(e.target.value as FormState["scope"])}
                className={adminInputClass}
              >
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </AdminField>
            <AdminField
              label="Destination *"
              hint={
                scopedFormDestinations.length === 0
                  ? undefined
                  : "Linked to Admin → Destinations"
              }
            >
              {scopedFormDestinations.length === 0 ? (
                <div className="space-y-2 rounded-md border border-dashed border-amber-300 bg-amber-50/80 px-3 py-2.5 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
                  <p>
                    No {form.scope} destinations yet. Create one in{" "}
                    <Link to="/admin/destinations" className="font-medium underline">
                      Admin → Destinations
                    </Link>{" "}
                    first.
                  </p>
                </div>
              ) : (
                <AdminDestinationSelect
                  value={form.destination}
                  onChange={(destination) => setForm((f) => ({ ...f, destination }))}
                  options={destinationOptions}
                  placeholder="Select destination…"
                />
              )}
            </AdminField>
            <AdminField label="Nights">
              <input
                type="number"
                min={0}
                value={form.nights}
                onChange={(e) => setForm((f) => ({ ...f, nights: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
            <AdminField label="Days" hint="Used by “Sync days from Nights/Days” for itinerary rows">
              <input
                type="number"
                min={1}
                value={form.days}
                onChange={(e) => setForm((f) => ({ ...f, days: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
            <AdminField label="From price *">
              <input
                required
                value={form.from_price}
                onChange={(e) => setForm((f) => ({ ...f, from_price: e.target.value }))}
                className={adminInputClass}
                placeholder="₹ 12,999"
              />
            </AdminField>
            <AdminField label="Discount price">
              <input
                value={form.discount_price}
                onChange={(e) => setForm((f) => ({ ...f, discount_price: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
            <AdminImageField
              label="Package image"
              folder="packages"
              value={form.image_url}
              onChange={(image_url) => setForm((f) => ({ ...f, image_url }))}
            />
            <div className="md:col-span-2">
              <AdminField
                label="Overview"
                hint="Shown on the package page. Saved to the database and used on the website."
              >
                <textarea
                  rows={3}
                  value={form.overview}
                  onChange={(e) => setForm((f) => ({ ...f, overview: e.target.value }))}
                  className={adminInputClass}
                  placeholder="Short package description for travellers…"
                />
              </AdminField>
            </div>
            <AdminField label="Sort order">
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
            <AdminField label="Inclusions" hint="One item per line">
              <textarea
                rows={4}
                value={form.inclusions}
                onChange={(e) => setForm((f) => ({ ...f, inclusions: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
            <AdminField label="Exclusions" hint="One item per line">
              <textarea
                rows={4}
                value={form.exclusions}
                onChange={(e) => setForm((f) => ({ ...f, exclusions: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
            <div className="md:col-span-2">
              <ItineraryEditor
                value={form.itinerary_json}
                onChange={(itinerary_json) => setForm((f) => ({ ...f, itinerary_json }))}
                tripDays={Number(form.days) || 1}
              />
            </div>
            <div className="flex flex-wrap gap-4 md:col-span-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                />
                Active
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))}
                />
                Featured
              </label>
            </div>
          </form>
          <AdminDialogStickyFooter
            formId="admin-package-form"
            saving={saving}
            saveLabel="Save package"
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>

      {loading ? (
        <AdminLoading />
      ) : items.length === 0 ? (
        <AdminEmpty message="No packages yet. Add your first holiday package." />
      ) : filteredItems.length === 0 ? (
        <AdminEmpty message="No packages match your search or filters." />
      ) : (
        <AdminTable>
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Scope</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((row) => (
              <tr key={row.id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3 font-medium">
                  {row.title}
                  {row.is_featured ? (
                    <span className="ml-2 rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-800">
                      Featured
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{row.destination}</td>
                <td className="px-4 py-3 capitalize text-muted-foreground">{row.scope}</td>
                <td className="px-4 py-3">{row.from_price}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${row.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
                  >
                    {row.is_active ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => openEdit(row)} className="rounded-md p-1.5 hover:bg-muted">
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
            ))}
          </tbody>
        </AdminTable>
      )}
    </div>
  );
}
