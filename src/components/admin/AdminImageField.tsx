import { useRef, useState } from "react";
import { ImagePlus, Images, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { AdminField, adminInputClass } from "@/components/admin/AdminPageHeader";
import { MediaLibraryPicker } from "@/components/admin/MediaLibraryPicker";
import { uploadCmsImage, type CmsImageFolder } from "@/lib/image-upload";

type Props = {
  label: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
  folder: CmsImageFolder;
  required?: boolean;
};

export function AdminImageField({ label, hint, value, onChange, folder, required }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadCmsImage(file, folder);
      onChange(url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <AdminField
      label={label}
      hint={hint ?? "Upload a file or paste an image URL (Supabase Storage, CDN, or /images/...)."}
    >
      <div className="space-y-3">
        {value.trim() ? (
          <div className="relative inline-block">
            <img
              src={value.trim()}
              alt=""
              className="h-20 w-28 rounded-lg border border-border object-cover"
              onError={(e) => {
                e.currentTarget.classList.add("opacity-40");
              }}
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute -right-2 -top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/75 text-white shadow-md transition hover:bg-red-600"
              aria-label="Remove image"
              title="Remove image"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={(e) => void handleFile(e.target.files?.[0])}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted/50 disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ImagePlus className="h-4 w-4" />
            )}
            {uploading ? "Uploading…" : "Upload image"}
          </button>
          <button
            type="button"
            onClick={() => setLibraryOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted/50"
          >
            <Images className="h-4 w-4" />
            Choose from library
          </button>
        </div>

        <MediaLibraryPicker
          open={libraryOpen}
          onOpenChange={setLibraryOpen}
          onSelect={onChange}
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={adminInputClass}
          placeholder="https://… or /images/hero/…"
          required={required}
        />
      </div>
    </AdminField>
  );
}
