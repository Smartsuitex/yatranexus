"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

function FlightsCtaDecoArt() {
  return (
    <svg
      className="hotels-cta-banner__deco-art"
      viewBox="0 0 88 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 24C6 15 16 12 19 20C22 28 11 31 7 25"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="3.5 3.5"
      />
      <path
        d="M19 20C24 18 30 17 36 17"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeDasharray="3.5 3.5"
      />
      <path
        d="M36 17L58 8L50 18L62 21L50 24L58 34L36 17Z"
        fill="white"
      />
    </svg>
  );
}

type Props = {
  headingId?: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  buttonLabel?: string;
  buttonHint?: string;
  buttonIcon?: LucideIcon;
  onAction?: () => void;
  /** Prefer this for contact redirects — no dialog. */
  href?: string;
  search?: { service?: string; destination?: string };
  /** Custom action control. Replaces the default button. */
  actionSlot?: ReactNode;
  variant?: "purple" | "orange" | "brand";
  layout?: "default" | "flights" | "pill";
  hideButton?: boolean;
};

export function ServiceCtaBanner({
  headingId,
  icon: Icon,
  title,
  subtitle,
  buttonLabel,
  buttonHint,
  buttonIcon: ButtonIcon,
  onAction,
  href,
  search,
  actionSlot,
  variant = "purple",
  layout = "default",
  hideButton = false,
}: Props) {
  const variantClass =
    variant === "orange"
      ? "hotels-cta-banner--orange"
      : variant === "brand"
        ? "hotels-cta-banner--brand"
        : "";
  const isPill = layout === "flights" || layout === "pill";
  const layoutClass = isPill ? "hotels-cta-banner--flights" : "";
  const resolvedLabel = buttonLabel?.trim() || "";

  const buttonInner = (
    <>
      {ButtonIcon ? (
        isPill ? (
          <span className="hotels-cta-banner__btn-icon" aria-hidden="true">
            <ButtonIcon className="h-4 w-4" strokeWidth={1.75} />
          </span>
        ) : (
          <ButtonIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
        )
      ) : null}
      <span className="hotels-cta-banner__btn-text">
        <span className="hotels-cta-banner__btn-label">{resolvedLabel}</span>
        {buttonHint ? <span className="hotels-cta-banner__btn-hint">{buttonHint}</span> : null}
      </span>
    </>
  );

  const defaultButton =
    !hideButton && !actionSlot && resolvedLabel ? (
      href ? (
        <Link
          to={href}
          search={search}
          hash="inquiry"
          className="hotels-cta-banner__btn"
        >
          {buttonInner}
        </Link>
      ) : onAction ? (
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onAction();
          }}
          className="hotels-cta-banner__btn"
        >
          {buttonInner}
        </button>
      ) : null
    ) : null;

  const action = actionSlot ?? defaultButton;

  return (
    <div className={`hotels-cta-banner ${variantClass} ${layoutClass}`.trim()}>
      <div className="hotels-cta-banner__copy">
        <span className="hotels-cta-banner__icon" aria-hidden="true">
          <Icon className={isPill ? "h-9 w-9" : "h-5 w-5"} strokeWidth={1.5} />
        </span>
        <div>
          {headingId ? (
            <h2 id={headingId} className="hotels-cta-banner__title">
              {title}
            </h2>
          ) : (
            <p className="hotels-cta-banner__title">{title}</p>
          )}
          <p className="hotels-cta-banner__subtitle">{subtitle}</p>
        </div>
      </div>
      {action ? (
        isPill ? (
          <div className="hotels-cta-banner__actions">
            {action}
            <span className="hotels-cta-banner__deco" aria-hidden="true">
              <FlightsCtaDecoArt />
            </span>
          </div>
        ) : (
          action
        )
      ) : null}
    </div>
  );
}
