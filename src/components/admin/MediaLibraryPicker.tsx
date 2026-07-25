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
import { MediaLibraryGrid, useFilteredMediaItems } from "@/components/admin/MediaLibraryGrid";
import {
  CMS_IMAGE_FOLDERS,
  CMS_IMAGE_FOLDER_LABELS,
  deleteCmsImage,
  listMediaLibrary,
  type MediaLibraryItem,
} from "@/lib/image-upload";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
  title?: string;
  description?: string;
};

export function MediaLibraryPicker({
  open,
  onOpenChange,
  onSelect,
  title = "Choose from media library",
  description = "Pick an image you have already uploaded.",
}: Props) {
  const [items, setItems] = useState<MediaLibraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [folderFilter, setFolderFilter] = useState("all");

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
    if (open) void load();
  }, [open, load]);

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
              {CMS_IMAGE_FOLDERS.map((folder) => (
                <option key={folder} value={folder}>
                  {CMS_IMAGE_FOLDER_LABELS[folder]}
                </option>
              ))}
            </select>
          </div>

          {error ? (
            <p className="shrink-0 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {error}
            </p>
          ) : null}

          <div className="max-h-[min(58dvh,560px)] min-h-[12rem] flex-1 overflow-y-auto overscroll-contain pr-1 [-webkit-overflow-scrolling:touch]">
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
                  ? "No uploaded images yet. Upload one first, then pick it here."
                  : "No images match your search."
              }
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
