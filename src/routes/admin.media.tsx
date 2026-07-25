import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import {
  AdminCard,
  AdminErrorBanner,
  AdminField,
  AdminLoading,
  AdminPageHeader,
  adminInputClass,
} from "@/components/admin/AdminPageHeader";
import { MediaLibraryGrid, useFilteredMediaItems } from "@/components/admin/MediaLibraryGrid";
import {
  CMS_IMAGE_FOLDERS,
  CMS_IMAGE_FOLDER_LABELS,
  deleteCmsImage,
  listMediaLibrary,
  uploadCmsImage,
  type CmsImageFolder,
  type MediaLibraryItem,
} from "@/lib/image-upload";

export const Route = createFileRoute("/admin/media")({
  head: () => ({ meta: [{ title: "Media Library | YatraNexus Admin" }] }),
  component: AdminMediaPage,
});

function AdminMediaPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<MediaLibraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
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

  async function handleUpload(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      await uploadCmsImage(file, uploadFolder);
      toast.success("Image uploaded");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleDelete(item: MediaLibraryItem) {
    await deleteCmsImage(item.path);
    setItems((current) => current.filter((entry) => entry.path !== item.path));
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Media library"
        description="Browse, upload, copy, and reuse images stored in Supabase."
      />

      {dbError ? <AdminErrorBanner message={dbError} /> : null}

      <AdminCard>
        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto] md:items-end">
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

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={(e) => void handleUpload(e.target.files?.[0])}
          />

          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ImagePlus className="h-4 w-4" />
            )}
            {uploading ? "Uploading…" : "Upload image"}
          </button>
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
                ? "No uploaded images yet. Use Upload image above to add your first file."
                : "No images match your filters."
            }
          />
        )}
      </AdminCard>
    </div>
  );
}
