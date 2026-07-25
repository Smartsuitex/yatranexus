"use client";

import { useState } from "react";
import { CorporateProposalForm } from "@/components/site/CorporateProposalForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dialogTitle: string;
  dialogDescription?: string;
};

type SectionProps = {
  dialogTitle: string;
  dialogDescription?: string;
  buttonLabel?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Hide the orange trigger button (dialog still opens via controlled state). */
  hideTrigger?: boolean;
};

const mobileSheetClass =
  "corp-proposal-dialog flex max-h-[min(92dvh,100vh-2rem)] flex-col gap-0 overflow-hidden p-0 max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-auto max-sm:max-h-[94dvh] max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-b-none max-sm:rounded-t-2xl sm:max-w-2xl";

export function CorporateProposalDialog({
  open,
  onOpenChange,
  dialogTitle,
  dialogDescription,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={mobileSheetClass}>
        <DialogHeader className="shrink-0 space-y-1 border-b border-border/60 px-5 pb-4 pr-14 pt-5 sm:px-6 sm:pr-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-orange)]">
            Corporate inquiry
          </p>
          <DialogTitle className="font-display text-xl sm:text-2xl">{dialogTitle}</DialogTitle>
          {dialogDescription ? (
            <DialogDescription>{dialogDescription}</DialogDescription>
          ) : null}
        </DialogHeader>
        <div className="min-h-0 flex-1 overflow-y-auto overflow-touch px-5 py-5 sm:px-6 sm:py-6">
          <CorporateProposalForm onSuccess={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function CorporateProposalSection({
  dialogTitle,
  dialogDescription,
  buttonLabel = "Request Corporate Travel Proposal",
  open: controlledOpen,
  onOpenChange,
  hideTrigger = false,
}: SectionProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  function setOpen(next: boolean) {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }

  return (
    <>
      {!hideTrigger ? (
        <div className="corp-proposal-cta">
          <button type="button" className="corp-proposal-form__open" onClick={() => setOpen(true)}>
            {buttonLabel}
          </button>
        </div>
      ) : null}

      <CorporateProposalDialog
        open={open}
        onOpenChange={setOpen}
        dialogTitle={dialogTitle}
        dialogDescription={dialogDescription}
      />
    </>
  );
}

export function useCorporateProposal(defaults: {
  dialogTitle: string;
  dialogDescription?: string;
}) {
  const [open, setOpen] = useState(false);

  const openProposal = () => setOpen(true);

  const dialog = (
    <CorporateProposalDialog
      open={open}
      onOpenChange={setOpen}
      dialogTitle={defaults.dialogTitle}
      dialogDescription={defaults.dialogDescription}
    />
  );

  return { openProposal, dialog };
}
