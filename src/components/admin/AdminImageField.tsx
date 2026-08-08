import { useState } from "react";
import { Images, X } from "lucide-react";
import { AdminField, adminInputClass } from "@/components/admin/AdminPageHeader";
import { AdminMediaUploader } from "@/components/admin/AdminMediaUploader";
import { MediaLibraryPicker } from "@/components/admin/MediaLibraryPicker";
import type { CmsImageFolder } from "@/lib/image-upload";

type Props = {
  label: string;
  hint?: string;
  value: string;
  onChange: (url: string) => void;
  folder: CmsImageFolder;
  required?: boolean;
};

export function AdminImageField({ label, hint, value, onChange, folder, required }: Props) {
  const [libraryOpen, setLibraryOpen] = useState(false);

  return (
    <AdminField
      label={label}
      hint={
        hint ??
        "Select an image from your device or library. JPEG/PNG/WebP are saved as optimized WebP."
      }
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
          <AdminMediaUploader
            folder={folder}
            multiple={false}
            showDropzone={false}
            buttonLabel="Select & upload"
            onUploaded={onChange}
          />
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
          uploadFolder={folder}
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
