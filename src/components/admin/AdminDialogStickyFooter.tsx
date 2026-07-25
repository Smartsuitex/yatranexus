import { cn } from "@/lib/utils";
import { DialogFooter } from "@/components/ui/dialog";

type AdminDialogStickyFooterProps = {
  formId: string;
  saving?: boolean;
  saveLabel: string;
  onCancel: () => void;
  className?: string;
};

/** Pinned cancel/save bar for scrollable admin dialogs. */
export function AdminDialogStickyFooter({
  formId,
  saving = false,
  saveLabel,
  onCancel,
  className,
}: AdminDialogStickyFooterProps) {
  return (
    <DialogFooter
      className={cn(
        "shrink-0 gap-2 border-t border-border bg-background px-6 py-4 sm:gap-0",
        className,
      )}
    >
      <button
        type="button"
        onClick={onCancel}
        className="rounded-full border border-border px-5 py-2.5 text-sm"
      >
        Cancel
      </button>
      <button
        type="submit"
        form={formId}
        disabled={saving}
        className="rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
      >
        {saving ? "Saving…" : saveLabel}
      </button>
    </DialogFooter>
  );
}

/** Shared DialogContent classes: header + scroll body + sticky footer. */
export const adminDialogContentClass =
  "flex max-h-[min(90dvh,900px)] flex-col gap-0 overflow-hidden p-0";

export const adminDialogHeaderClass =
  "shrink-0 space-y-1.5 border-b border-border px-6 pb-4 pt-6 text-left";

export const adminDialogFormClass =
  "grid min-h-0 flex-1 gap-4 overflow-y-auto overscroll-contain px-6 py-4 md:grid-cols-2";
