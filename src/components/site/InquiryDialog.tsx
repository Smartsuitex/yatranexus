"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { type InquiryFormProps } from "./InquiryForm";
import { SectionHeading } from "./SectionHeading";
import { InquiryFormDialog, inquiryCtaButtonClass } from "./InquiryFormDialog";

type InquiryDialogContextValue = {
  openDialog: () => void;
  buttonLabel: string;
};

const InquiryDialogContext = createContext<InquiryDialogContextValue | null>(null);

function useInquiryDialog() {
  const ctx = useContext(InquiryDialogContext);
  if (!ctx) {
    throw new Error("BookPackageButton must be used within InquiryDialogProvider");
  }
  return ctx;
}

type ProviderProps = InquiryFormProps & {
  children: ReactNode;
  buttonLabel?: string;
  dialogTitle?: string;
  dialogDescription?: string;
};

export function InquiryDialogProvider({
  children,
  buttonLabel = "Book Package",
  dialogTitle = "Customise This Package",
  dialogDescription = "Share your dates and preferences — our team will confirm availability and pricing.",
  ...formProps
}: ProviderProps) {
  const [open, setOpen] = useState(false);

  return (
    <InquiryDialogContext.Provider value={{ openDialog: () => setOpen(true), buttonLabel }}>
      {children}
      <InquiryFormDialog
        open={open}
        onOpenChange={setOpen}
        dialogTitle={dialogTitle}
        dialogDescription={dialogDescription}
        {...formProps}
      />
    </InquiryDialogContext.Provider>
  );
}

const buttonBase = inquiryCtaButtonClass;

export function BookPackageButton({
  className = "",
  label,
}: {
  className?: string;
  label?: string;
}) {
  const { openDialog, buttonLabel } = useInquiryDialog();
  return (
    <button type="button" onClick={openDialog} className={`${buttonBase} ${className}`}>
      {label ?? buttonLabel}
    </button>
  );
}

export function InquiryDialogCta({
  eyebrow = "Ready to book?",
  heading = "Customise This Package",
  subtitle = "Share your dates and preferences — our team will confirm availability and pricing.",
}: {
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
}) {
  return (
    <section className="scroll-mt-20 border-t border-border/60 bg-muted/30">
      <div className="page-section">
        <div className="mx-auto max-w-xl text-center">
          <SectionHeading eyebrow={eyebrow} title={heading} subtitle={subtitle} center />
          <BookPackageButton className="mt-8 w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
