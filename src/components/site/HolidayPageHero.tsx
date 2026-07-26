"use client";

import type { ReactNode } from "react";
import { ServicePremiumHero } from "@/components/site/service-premium/ServicePremiumHero";
import type { ServiceIconItem } from "@/components/site/service-premium/types";
import { HOLIDAY_HERO_BADGES } from "@/lib/service-premium-trust";
import { toTitleCase } from "@/lib/utils";

type Props = {
  headingId: string;
  eyebrow: string;
  titleFirst: string;
  titleAccent?: string;
  subtitle?: ReactNode;
  imagePrimary: string;
  imageFallback: string;
  photoPosition?: "right" | "center";
  children?: ReactNode;
  /** true = compact destination hero; "hub" = shorter listing-page hero */
  compact?: boolean | "hub";
  badges?: ServiceIconItem[];
};

export function HolidayPageHero({
  headingId,
  eyebrow,
  titleFirst,
  titleAccent = "",
  subtitle,
  imagePrimary,
  imageFallback,
  photoPosition = "center",
  children,
  compact = true,
  badges = HOLIDAY_HERO_BADGES,
}: Props) {
  return (
    <section className="service-hero-block service-hero-block--light" aria-labelledby={headingId}>
      <ServicePremiumHero
        headingId={headingId}
        imagePrimary={imagePrimary}
        imageFallback={imageFallback}
        titleFirst=""
        titleAccent=""
        subtitle=""
        photoPosition={photoPosition}
        compact={compact}
        badges={badges}
        variant="light"
      >
        <p className="about-hero__eyebrow">
          <span className="about-hero__eyebrow-line" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 id={headingId} className="hotels-hero__title text-brand-gradient">
          {titleFirst ? <span>{toTitleCase(titleFirst)}</span> : null}
          {titleAccent ? (
            <>
              {titleFirst ? " " : null}
              <span>{toTitleCase(titleAccent)}</span>
            </>
          ) : null}
        </h1>
        {subtitle ? <p className="hotels-hero__lead">{subtitle}</p> : null}
        {children}
      </ServicePremiumHero>
    </section>
  );
}
