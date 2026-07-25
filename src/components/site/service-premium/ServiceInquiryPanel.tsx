"use client";

import { Link } from "@tanstack/react-router";
import { InquiryForm, type InquiryFormProps } from "@/components/site/InquiryForm";

type Props = InquiryFormProps & {
  panelTitle: string;
  panelDescription?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  mobileButtonLabel?: string;
  className?: string;
};

export function ServiceInquiryPanel({
  panelTitle,
  panelDescription,
  mobileButtonLabel = "Send inquiry",
  className = "",
  defaultService,
  defaultDestination,
  ...formProps
}: Props) {
  const search: { service?: string; destination?: string } = {};
  if (defaultService) search.service = defaultService;
  if (defaultDestination) search.destination = defaultDestination;

  return (
    <>
      <div className={`sp-inquiry-panel hidden lg:block ${className}`.trim()}>
        <div className="sp-inquiry-panel__card">
          <h2 className="sp-inquiry-panel__title">{panelTitle}</h2>
          {panelDescription ? (
            <p className="sp-inquiry-panel__desc">{panelDescription}</p>
          ) : null}
          <InquiryForm
            {...formProps}
            defaultService={defaultService}
            defaultDestination={defaultDestination}
            compact
            title=""
            submitLabel={formProps.submitLabel ?? "Send Inquiry"}
          />
        </div>
      </div>

      <div className="sp-inquiry-panel-mobile lg:hidden">
        <Link
          to="/contact"
          search={search}
          hash="inquiry"
          className="hotels-hero__cta w-full justify-center"
        >
          {mobileButtonLabel}
        </Link>
      </div>
    </>
  );
}
