"use client";

import { useState, type ReactNode } from "react";
import { InquiryFormDialog } from "@/components/site/InquiryFormDialog";

type InquiryDefaults = {
  defaultService: string;
  defaultDestination?: string;
  hideServiceSelect?: boolean;
  sourcePage: string;
  dialogTitle: string;
  dialogDescription: string;
};

type Props = InquiryDefaults & {
  children: (open: (destination?: string) => void) => ReactNode;
};

export function useServiceInquiry(defaults: InquiryDefaults) {
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState("");

  const openInquiry = (dest = "") => {
    setDestination(dest);
    setOpen(true);
  };

  const dialog = (
    <InquiryFormDialog
      open={open}
      onOpenChange={setOpen}
      dialogTitle={defaults.dialogTitle}
      dialogDescription={defaults.dialogDescription}
      defaultService={defaults.defaultService}
      defaultDestination={destination || defaults.defaultDestination}
      hideServiceSelect={defaults.hideServiceSelect ?? true}
      sourcePage={defaults.sourcePage}
    />
  );

  return { openInquiry, dialog };
}
