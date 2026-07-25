"use client";

import { MessageSquarePlus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { InquiryForm, type InquiryFormProps } from "./InquiryForm";

type Props = InquiryFormProps & {
  sidebarTitle?: string;
  floatingLabel?: string;
};

export function InquiryPanel({ sidebarTitle, floatingLabel = "Get a quote", ...formProps }: Props) {
  return (
    <>
      <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <InquiryForm {...formProps} title={sidebarTitle ?? formProps.title} compact />
        </div>
      </aside>

      <Link
        to="/contact"
        hash="inquiry"
        search={{
          ...(formProps.defaultService ? { service: formProps.defaultService } : {}),
          ...(formProps.defaultDestination
            ? { destination: formProps.defaultDestination }
            : {}),
        }}
        aria-label={floatingLabel}
        className="mobile-fab-safe fixed left-4 z-50 flex max-w-[calc(100vw-5.5rem)] items-center gap-2 rounded-full bg-brand-gradient px-3.5 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02] sm:left-5 sm:px-4 lg:hidden"
      >
        <MessageSquarePlus className="h-5 w-5 shrink-0" />
        <span className="truncate max-[380px]:sr-only">{floatingLabel}</span>
        <span className="hidden max-[380px]:inline">Quote</span>
      </Link>
    </>
  );
}
