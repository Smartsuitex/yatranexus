"use client";

import { InquiryForm, type InquiryFormProps } from "./InquiryForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type InquiryFormDialogProps = InquiryFormProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dialogTitle: string;
  dialogDescription?: string;
  eyebrow?: string;
};

const mobileSheetClass =
  "flex max-h-[min(92dvh,100vh-2rem)] flex-col gap-0 overflow-hidden p-0 max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-auto max-sm:max-h-[94dvh] max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none max-sm:rounded-t-2xl sm:max-w-2xl";

export function InquiryFormDialog({
  open,
  onOpenChange,
  dialogTitle,
  dialogDescription,
  onSuccess,
  ...formProps
}: InquiryFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={mobileSheetClass}>
        <DialogHeader className="shrink-0 space-y-1 border-b border-border/60 px-5 pb-4 pr-14 pt-5 sm:px-6 sm:pr-14">
          <DialogTitle className="font-display text-xl sm:text-2xl">{dialogTitle}</DialogTitle>
          {dialogDescription ? (
            <DialogDescription>{dialogDescription}</DialogDescription>
          ) : null}
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto overflow-touch px-5 py-5 sm:px-6 sm:py-6">
          <InquiryForm
            {...formProps}
            title=""
            onSuccess={() => {
              onSuccess?.();
              onOpenChange(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const inquiryCtaButtonClass =
  "inline-flex w-full items-center justify-center rounded-full bg-brand-gradient px-8 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:shadow-glow sm:w-auto";
