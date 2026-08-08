import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import {
  AdminCard,
  AdminErrorBanner,
  AdminField,
  AdminLoading,
  AdminPageHeader,
  adminInputClass,
} from "@/components/admin/AdminPageHeader";
import { AdminMediaUploader } from "@/components/admin/AdminMediaUploader";
import { MediaLibraryGrid, useFilteredMediaItems } from "@/components/admin/MediaLibraryGrid";
import {
  CMS_IMAGE_FOLDERS,
  CMS_IMAGE_FOLDER_LABELS,
  deleteCmsImage,
  listMediaLibrary,
  type CmsImageFolder,
  type MediaLibraryItem,
} from "@/lib/image-upload";

export const Route = createFileRoute("/admin/media")({
  head: () => ({ meta: [{ title: "Media Library | YatraNexus Admin" }] }),
  component: AdminMediaPage,
});

function AdminMediaPage() {
  const [items, setItems] = useState<MediaLibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [folderFilter, setFolderFilter] = useState("all");
  const [uploadFolder, setUploadFolder] = useState<CmsImageFolder>("packages");

  const load = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    try {
      setItems(await listMediaLibrary());
    } catch (err) {
      setDbError(err instanceof Error ? err.message : "Could not load media library");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useFilteredMediaItems(items, query, folderFilter);

  async function handleDelete(item: MediaLibraryItem) {
    await deleteCmsImage(item.path);
    setItems((current) => current.filter((entry) => entry.path !== item.path));
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Media library"
        description="Select images from your device or drag & drop to upload. Then copy URLs or reuse them in packages, destinations, and services."
      />

      {dbError ? <AdminErrorBanner message={dbError} /> : null}

      <AdminCard>
        <div className="space-y-4">
          <AdminField label="Upload to folder">
            <select
              value={uploadFolder}
              onChange={(e) => setUploadFolder(e.target.value as CmsImageFolder)}
              className={adminInputClass}
            >
              {CMS_IMAGE_FOLDERS.map((folder) => (
                <option key={folder} value={folder}>
                  {CMS_IMAGE_FOLDER_LABELS[folder]}
                </option>
              ))}
            </select>
          </AdminField>

          <AdminMediaUploader
            folder={uploadFolder}
            multiple
            buttonLabel="Select & upload images"
            onBatchComplete={() => {
              void load();
            }}
          />
        </div>
      </AdminCard>

      <AdminCard>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="grid flex-1 gap-3 sm:grid-cols-[1fr_12rem]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search images…"
              className={adminInputClass}
            />
            <select
              value={folderFilter}
              onChange={(e) => setFolderFilter(e.target.value)}
              className={adminInputClass}
            >
              <option value="all">All folders</option>
              {CMS_IMAGE_FOLDERS.map((folder) => (
                <option key={folder} value={folder}>
                  {CMS_IMAGE_FOLDER_LABELS[folder]}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => void load()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted/50 disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {loading && items.length === 0 ? (
          <AdminLoading />
        ) : (
          <MediaLibraryGrid
            items={filtered}
            onDelete={handleDelete}
            emptyMessage={
              items.length === 0
                ? "No uploaded images yet. Select images above to add your first files."
                : "No images match your filters."
            }
          />
        )}
      </AdminCard>
    </div>
  );
}
