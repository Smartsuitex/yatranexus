import { useRef, useState, type DragEvent, type ReactNode } from "react";
import { ImagePlus, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { uploadCmsImage, type CmsImageFolder } from "@/lib/image-upload";

type Props = {
  folder: CmsImageFolder;
  /** Allow selecting multiple files at once. Default true. */
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  /** Called after each successful upload with the public URL. */
  onUploaded?: (url: string) => void;
  /** Called once after a batch finishes (success count). */
  onBatchComplete?: (uploadedUrls: string[]) => void;
  buttonLabel?: string;
  showDropzone?: boolean;
  children?: ReactNode;
};

async function uploadOne(file: File, folder: CmsImageFolder): Promise<string> {
  return uploadCmsImage(file, folder);
}

export function AdminMediaUploader({
  folder,
  multiple = true,
  disabled = false,
  className,
  onUploaded,
  onBatchComplete,
  buttonLabel = "Upload images",
  showDropzone = true,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const busy = disabled || uploading;

  async function handleFiles(fileList: FileList | File[] | null | undefined) {
    const files = [...(fileList ?? [])].filter((f) => f.type.startsWith("image/"));
    if (!files.length) {
      toast.error("Please choose an image file (JPEG, PNG, WebP, GIF, or SVG).");
      return;
    }

    setUploading(true);
    const uploaded: string[] = [];
    let failed = 0;

    try {
      for (const file of files) {
        try {
          const url = await uploadOne(file, folder);
          uploaded.push(url);
          onUploaded?.(url);
        } catch {
          failed += 1;
        }
      }

      if (uploaded.length && !failed) {
        toast.success(
          uploaded.length === 1
            ? "Image uploaded"
            : `${uploaded.length} images uploaded`,
        );
      } else if (uploaded.length && failed) {
        toast.warning(`${uploaded.length} uploaded, ${failed} failed`);
      } else {
        toast.error("Upload failed");
      }

      if (uploaded.length) onBatchComplete?.(uploaded);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    if (busy) return;
    void handleFiles(e.dataTransfer.files);
  }

  return (
    <div className={cn("space-y-3", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => void handleFiles(e.target.files)}
      />

      {showDropzone ? (
        <div
          onDragEnter={(e) => {
            e.preventDefault();
            if (!busy) setDragOver(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            if (!busy) setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragOver(false);
          }}
          onDrop={onDrop}
          className={cn(
            "rounded-2xl border border-dashed px-4 py-6 text-center transition",
            dragOver
              ? "border-[color:var(--brand-orange)] bg-[color:var(--brand-orange)]/5"
              : "border-border bg-muted/20",
            busy && "opacity-60",
          )}
        >
          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-2 text-sm font-medium text-foreground">
            Drag & drop images here
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            or select from your device{multiple ? " (multiple allowed)" : ""}
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ImagePlus className="h-4 w-4" />
            )}
            {uploading ? "Uploading…" : buttonLabel}
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="h-4 w-4" />
          )}
          {uploading ? "Uploading…" : buttonLabel}
        </button>
      )}
    </div>
  );
}
