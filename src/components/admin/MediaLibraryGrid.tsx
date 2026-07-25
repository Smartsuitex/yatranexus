import { useMemo, useState } from "react";
import { Check, Copy, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import {
  CMS_IMAGE_FOLDER_LABELS,
  type MediaLibraryItem,
} from "@/lib/image-upload";
import { cn } from "@/lib/utils";

type Props = {
  items: MediaLibraryItem[];
  loading?: boolean;
  selectedUrl?: string;
  onSelect?: (item: MediaLibraryItem) => void;
  onDelete?: (item: MediaLibraryItem) => void | Promise<void>;
  emptyMessage?: string;
};

export function MediaLibraryGrid({
  items,
  loading = false,
  selectedUrl,
  onSelect,
  onDelete,
  emptyMessage = "No uploaded images yet.",
}: Props) {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deletingPath, setDeletingPath] = useState<string | null>(null);

  async function copyUrl(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      toast.success("URL copied");
      window.setTimeout(() => setCopiedUrl((current) => (current === url ? null : current)), 2000);
    } catch {
      toast.error("Could not copy URL");
    }
  }

  async function handleDelete(item: MediaLibraryItem) {
    if (!onDelete) return;
    if (!confirm(`Delete "${item.name}" from storage? This cannot be undone.`)) return;
    setDeletingPath(item.path);
    try {
      await onDelete(item);
      toast.success("Image deleted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingPath(null);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => {
        const isSelected = selectedUrl === item.url;
        const isDeleting = deletingPath === item.path;

        return (
          <article
            key={item.path}
            className={cn(
              "group overflow-hidden rounded-xl border bg-card shadow-soft transition",
              isSelected ? "border-primary ring-2 ring-primary/30" : "border-border",
            )}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/30">
              <button
                type="button"
                onClick={() => onSelect?.(item)}
                disabled={!onSelect}
                className={cn(
                  "block h-full w-full",
                  onSelect ? "cursor-pointer" : "cursor-default",
                )}
              >
                <img
                  src={item.url}
                  alt=""
                  className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </button>

              {onDelete ? (
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={(e) => {
                    e.stopPropagation();
                    void handleDelete(item);
                  }}
                  className="absolute right-2 top-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white shadow-md transition hover:bg-red-600 disabled:opacity-50"
                  aria-label={`Delete ${item.name}`}
                  title="Delete image"
                >
                  {isDeleting ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  )}
                </button>
              ) : isSelected ? (
                <span className="absolute right-2 top-2 rounded-full bg-primary p-1 text-primary-foreground shadow">
                  <Check className="h-3.5 w-3.5" />
                </span>
              ) : null}

              {isSelected && onDelete ? (
                <span className="absolute left-2 top-2 rounded-full bg-primary p-1 text-primary-foreground shadow">
                  <Check className="h-3.5 w-3.5" />
                </span>
              ) : null}
            </div>

            <div className="space-y-2 p-3">
              <div className="min-w-0">
                <p className="truncate text-xs font-medium" title={item.name}>
                  {item.name}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {CMS_IMAGE_FOLDER_LABELS[item.folder as keyof typeof CMS_IMAGE_FOLDER_LABELS] ??
                    item.folder}
                </p>
              </div>

              <button
                type="button"
                onClick={() => void copyUrl(item.url)}
                className="inline-flex w-full items-center justify-center gap-1 rounded-md border border-border px-2 py-1.5 text-[11px] font-medium hover:bg-muted/50"
              >
                {copiedUrl === item.url ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                Copy URL
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function useFilteredMediaItems(
  items: MediaLibraryItem[],
  query: string,
  folderFilter: string,
) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (folderFilter !== "all" && item.folder !== folderFilter) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.folder.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q)
      );
    });
  }, [items, query, folderFilter]);
}
