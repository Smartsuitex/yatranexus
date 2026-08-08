import { useCallback, useEffect, useState } from "react";
import { Images } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { adminInputClass } from "@/components/admin/AdminPageHeader";
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

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
  /** Preferred upload folder when adding new images from this picker. */
  uploadFolder?: CmsImageFolder;
  title?: string;
  description?: string;
};

export function MediaLibraryPicker({
  open,
  onOpenChange,
  onSelect,
  uploadFolder = "packages",
  title = "Choose from media library",
  description = "Upload a new image or pick one you already uploaded.",
}: Props) {
  const [items, setItems] = useState<MediaLibraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [folderFilter, setFolderFilter] = useState("all");
  const [folder, setFolder] = useState<CmsImageFolder>(uploadFolder);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await listMediaLibrary());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load media library");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      setFolder(uploadFolder);
      void load();
    }
  }, [open, load, uploadFolder]);

  const filtered = useFilteredMediaItems(items, query, folderFilter);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[min(90dvh,900px)] flex-col gap-4 overflow-hidden sm:max-w-5xl">
        <DialogHeader className="shrink-0 pr-8">
          <DialogTitle className="flex items-center gap-2">
            <Images className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
          <div className="shrink-0 space-y-3 rounded-xl border border-border bg-muted/20 p-3">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <label className="block text-xs font-medium text-muted-foreground">
                Upload to folder
                <select
                  value={folder}
                  onChange={(e) => setFolder(e.target.value as CmsImageFolder)}
                  className={`${adminInputClass} mt-1`}
                >
                  {CMS_IMAGE_FOLDERS.map((entry) => (
                    <option key={entry} value={entry}>
                      {CMS_IMAGE_FOLDER_LABELS[entry]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <AdminMediaUploader
              folder={folder}
              multiple={false}
              showDropzone={false}
              buttonLabel="Select & upload image"
              onUploaded={(url) => {
                onSelect(url);
                onOpenChange(false);
              }}
              onBatchComplete={() => {
                void load();
              }}
            />
          </div>

          <div className="grid shrink-0 gap-3 sm:grid-cols-[1fr_12rem]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or folder…"
              className={adminInputClass}
            />
            <select
              value={folderFilter}
              onChange={(e) => setFolderFilter(e.target.value)}
              className={adminInputClass}
            >
              <option value="all">All folders</option>
              {CMS_IMAGE_FOLDERS.map((entry) => (
                <option key={entry} value={entry}>
                  {CMS_IMAGE_FOLDER_LABELS[entry]}
                </option>
              ))}
            </select>
          </div>

          {error ? (
            <p className="shrink-0 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {error}
            </p>
          ) : null}

          <div className="max-h-[min(50dvh,480px)] min-h-[12rem] flex-1 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch]">
            <MediaLibraryGrid
              items={filtered}
              loading={loading}
              onSelect={(item) => {
                onSelect(item.url);
                onOpenChange(false);
              }}
              onDelete={async (item) => {
                await deleteCmsImage(item.path);
                setItems((current) => current.filter((entry) => entry.path !== item.path));
              }}
              emptyMessage={
                items.length === 0
                  ? "No images yet. Use Select & upload image above to add one."
                  : "No images match your search."
              }
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
