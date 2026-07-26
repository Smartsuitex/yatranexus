import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Search, Trash2, X } from "lucide-react";
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
  arrayToLines,
  deleteDestination,
  linesToArray,
  listDestinations,
  renumberDestinations,
  slugify,
  upsertDestination,
  type DestinationRow,
} from "@/lib/admin-cms-api";

export const Route = createFileRoute("/admin/destinations")({
  head: () => ({ meta: [{ title: "Destinations | YatraNexus Admin" }] }),
  component: AdminDestinationsPage,
});

type FormState = {
  id?: string;
  slug: string;
  scope: "domestic" | "international";
  name: string;
  region: string;
  image_url: string;
  blurb: string;
  highlights: string;
  is_active: boolean;
  sort_order: string;
};

const emptyForm = (): FormState => ({
  slug: "",
  scope: "domestic",
  name: "",
  region: "",
  image_url: "",
  blurb: "",
  highlights: "",
  is_active: true,
  sort_order: "0",
});

function rowToForm(row: DestinationRow): FormState {
  return {
    id: row.id,
    slug: row.slug,
    scope: row.scope,
    name: row.name,
    region: row.region,
    image_url: row.image_url,
    blurb: row.blurb ?? "",
    highlights: arrayToLines(row.highlights),
    is_active: row.is_active,
    sort_order: String(row.sort_order),
  };
}

function nextSortOrder(items: DestinationRow[], scope: FormState["scope"]) {
  const scoped = items.filter((row) => row.scope === scope);
  if (scoped.length === 0) return 1;
  return Math.max(...scoped.map((row) => Number(row.sort_order) || 0)) + 1;
}

function AdminDestinationsPage() {
  const [items, setItems] = useState<DestinationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [reorderingId, setReorderingId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [scopeFilter, setScopeFilter] = useState<"all" | "domestic" | "international">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "hidden">("all");

  const hasActiveFilters =
    Boolean(searchQuery.trim()) || scopeFilter !== "all" || statusFilter !== "all";

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((row) => {
      if (scopeFilter !== "all" && row.scope !== scopeFilter) return false;
      if (statusFilter === "active" && !row.is_active) return false;
      if (statusFilter === "hidden" && row.is_active) return false;
      if (!q) return true;
      return [row.name, row.slug, row.region, row.scope, row.blurb ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [items, searchQuery, scopeFilter, statusFilter]);

  function applySearch() {
    setSearchQuery(searchInput.trim());
  }

  function clearFilters() {
    setSearchInput("");
    setSearchQuery("");
    setScopeFilter("all");
    setStatusFilter("all");
  }

  const load = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    try {
      setItems(await listDestinations());
    } catch (err) {
      setDbError(err instanceof Error ? err.message : "Could not load destinations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openNew() {
    setForm({
      ...emptyForm(),
      sort_order: String(nextSortOrder(items, "domestic")),
    });
    setShowForm(true);
  }

  function openEdit(row: DestinationRow) {
    setForm(rowToForm(row));
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const desiredSort = Math.max(
        1,
        Number(form.sort_order) || nextSortOrder(items, form.scope),
      );
      await upsertDestination({
        id: form.id,
        slug: form.slug || slugify(form.name),
        scope: form.scope,
        name: form.name,
        region: form.region,
        image_url: form.image_url,
        blurb: form.blurb || null,
        highlights: linesToArray(form.highlights),
        is_active: form.is_active,
        sort_order: desiredSort,
      });
      toast.success("Destination saved");
      setShowForm(false);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function moveRow(row: DestinationRow, direction: "up" | "down") {
    const scoped = items.filter((item) => item.scope === row.scope);
    const index = scoped.findIndex((item) => item.id === row.id);
    if (index < 0) return;
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= scoped.length) return;

    const nextScoped = [...scoped];
    const [moved] = nextScoped.splice(index, 1);
    nextScoped.splice(swapIndex, 0, moved);

    setReorderingId(row.id);
    setItems((prev) => {
      const others = prev.filter((item) => item.scope !== row.scope);
      const renumbered = nextScoped.map((item, i) => ({ ...item, sort_order: i + 1 }));
      return [...others, ...renumbered].sort((a, b) => {
        if (a.scope !== b.scope) return a.scope.localeCompare(b.scope);
        return (a.sort_order || 0) - (b.sort_order || 0) || a.name.localeCompare(b.name);
      });
    });

    try {
      await renumberDestinations(nextScoped.map((item) => item.id));
      await load();
      toast.success("Order updated — website list will follow this order");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update order");
      await load();
    } finally {
      setReorderingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this destination?")) return;
    try {
      const row = items.find((item) => item.id === id);
      await deleteDestination(id);
      if (row) {
        const remaining = items.filter((item) => item.scope === row.scope && item.id !== id);
        if (remaining.length > 0) {
          await renumberDestinations(remaining.map((item) => item.id));
        }
      }
      toast.success("Deleted");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Destinations"
        description="Reorder with ↑↓ — lower number shows first on Holiday Packages. Create destinations before linking them to packages."
        actionLabel="Add destination"
        onAction={openNew}
      />
      {dbError && <AdminErrorBanner message={dbError} />}

      <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search name, slug, region…"
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
          Showing {filteredItems.length} of {items.length} destination
          {items.length === 1 ? "" : "s"}. Use ↑↓ to reorder within Domestic or International.
        </p>
      ) : null}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className={`${adminDialogContentClass} sm:max-w-3xl`}>
          <DialogHeader className={adminDialogHeaderClass}>
            <DialogTitle className="font-display">
              {form.id ? "Edit destination" : "New destination"}
            </DialogTitle>
            <DialogDescription>
              {form.id
                ? "Update destination details, image, and highlights."
                : "Add a domestic or international destination for the website."}
            </DialogDescription>
          </DialogHeader>
          <form id="admin-destination-form" onSubmit={handleSave} className={adminDialogFormClass}>
            <AdminField label="Name *">
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    name: e.target.value,
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
            <AdminField label="Scope *">
              <select
                value={form.scope}
                onChange={(e) => {
                  const scope = e.target.value as "domestic" | "international";
                  setForm((f) => ({
                    ...f,
                    scope,
                    sort_order: f.id ? f.sort_order : String(nextSortOrder(items, scope)),
                  }));
                }}
                className={adminInputClass}
              >
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </AdminField>
            <AdminField label="Region *">
              <input
                required
                value={form.region}
                onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))}
                className={adminInputClass}
                placeholder="North India"
              />
            </AdminField>
            <div className="md:col-span-2">
              <AdminImageField
                label="Destination image *"
                folder="destinations"
                required
                value={form.image_url}
                onChange={(image_url) => setForm((f) => ({ ...f, image_url }))}
              />
            </div>
            <div className="md:col-span-2">
              <AdminField label="Blurb">
                <textarea
                  rows={3}
                  value={form.blurb}
                  onChange={(e) => setForm((f) => ({ ...f, blurb: e.target.value }))}
                  className={adminInputClass}
                />
              </AdminField>
            </div>
            <AdminField label="Highlights (one per line)">
              <textarea
                rows={4}
                value={form.highlights}
                onChange={(e) => setForm((f) => ({ ...f, highlights: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
            <AdminField label="Sort order" hint="Lower number = shown first on the website">
              <input
                type="number"
                min={1}
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
                className={adminInputClass}
              />
            </AdminField>
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
            formId="admin-destination-form"
            saving={saving}
            saveLabel="Save destination"
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>
      {loading ? (
        <AdminLoading />
      ) : items.length === 0 ? (
        <AdminEmpty message="No destinations in database yet. Run the CMS migration or add one manually." />
      ) : filteredItems.length === 0 ? (
        <AdminEmpty message="No destinations match your search or filters." />
      ) : (
        <div className="max-h-[min(70vh,720px)] overflow-y-auto">
          <AdminTable>
            <thead className="sticky top-0 z-10 bg-card">
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Scope</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((row) => {
                const scoped = items.filter((item) => item.scope === row.scope);
                const scopedIndex = scoped.findIndex((item) => item.id === row.id);
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
                            disabled={busy || scopedIndex <= 0}
                            onClick={() => moveRow(row, "up")}
                            className="rounded p-0.5 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="Move up (show earlier)"
                            title="Move up"
                          >
                            <ChevronUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={busy || scopedIndex >= scoped.length - 1}
                            onClick={() => moveRow(row, "down")}
                            className="rounded p-0.5 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-30"
                            aria-label="Move down (show later)"
                            title="Move down"
                          >
                            <ChevronDown className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">{row.scope}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.region}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${row.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
                      >
                        {row.is_active ? "Active" : "Hidden"}
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
        </div>
      )}
    </div>
  );
}
