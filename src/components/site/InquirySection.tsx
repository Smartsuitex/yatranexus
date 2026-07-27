"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { type InquiryFormProps } from "./InquiryForm";
import { InquiryFormDialog, inquiryCtaButtonClass } from "./InquiryFormDialog";
import { SectionHeading } from "./SectionHeading";

type Props = InquiryFormProps & {
  id?: string;
  eyebrow?: string;
  heading?: string;
  subtitle?: string;
  buttonLabel?: string;
  dialogTitle?: string;
  dialogDescription?: string;
};

export function InquirySection({
  id = "inquiry",
  eyebrow = "Ready to book?",
  heading = "Send us an inquiry",
  subtitle = "Share your dates and preferences — our travel expert will call you back the same day.",
  buttonLabel,
  dialogTitle,
  dialogDescription,
  ...formProps
}: Props) {
  const [open, setOpen] = useState(false);
  const isPackageBooking =
    formProps.defaultService === "packages" || Boolean(formProps.packageName);
  const resolvedButtonLabel =
    buttonLabel ?? formProps.submitLabel ?? (isPackageBooking ? "Book Package" : "Send inquiry");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const openFromHash = () => {
      if (window.location.hash === `#${id}`) {
        setOpen(true);
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [id]);

  return (
    <section id={id} className="scroll-mt-20 border-t border-border/60 bg-muted/30">
      <div className="page-section">
        <div className="mx-auto max-w-xl text-center">
          <SectionHeading eyebrow={eyebrow} title={heading} subtitle={subtitle} center />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`mt-8 ${inquiryCtaButtonClass}`}
          >
            {resolvedButtonLabel}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <InquiryFormDialog
        open={open}
        onOpenChange={setOpen}
        eyebrow={eyebrow}
        dialogTitle={dialogTitle ?? heading}
        dialogDescription={dialogDescription ?? subtitle}
        {...formProps}
      />
    </section>
  );
}
