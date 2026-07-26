"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ServiceIconItem } from "./types";
import { SafeImage, hasImageSrc } from "@/components/site/SafeImage";

type Props = {
  headingId: string;
  imagePrimary: string;
  imageFallback: string;
  titleFirst: string;
  titleAccent: ReactNode;
  subtitle: string;
  badges?: ServiceIconItem[];
  badgeColumns?: 2 | 4 | 5;
  cta?: ReactNode;
  children?: ReactNode;
  photoPosition?: "right" | "center";
  titleStacked?: boolean;
  compact?: boolean | "hub";
  variant?: "dark" | "light";
};

export function ServicePremiumHero({
  headingId,
  imagePrimary,
  imageFallback,
  titleFirst,
  titleAccent,
  subtitle,
  badges = [],
  badgeColumns = 4,
  cta,
  children,
  photoPosition = "right",
  titleStacked = false,
  compact = false,
  variant = "dark",
}: Props) {
  const [src, setSrc] = useState(imagePrimary);

  useEffect(() => {
    setSrc(imagePrimary);
  }, [imagePrimary]);

  const badgeClass =
    badgeColumns === 5
      ? "hotels-hero__badges hotels-hero__badges--5"
      : badgeColumns === 2
        ? "hotels-hero__badges hotels-hero__badges--2"
        : "hotels-hero__badges";

  const BADGE_TONES = ["purple", "pink", "orange", "blue", "green"] as const;
  const badgeLimit = badgeColumns === 5 ? 5 : badgeColumns === 2 ? 2 : 4;
  const heroBadges = badges.slice(0, badgeLimit);

  return (
    <section
      className={cn(
        "hotels-hero hero-premium relative w-full overflow-x-hidden",
        variant === "light" ? "hotels-hero--light" : "hotels-hero--premium",
        compact === "hub" && "hotels-hero--compact hotels-hero--compact-hub",
        compact === true && "hotels-hero--compact",
      )}
      aria-labelledby={headingId}
    >
      <div className="hero-premium__stage hotels-hero__stage">
        <div className="hero-premium__media hotels-hero__media" aria-hidden="true">
          <div className="hotels-hero__overlay" />
          <SafeImage
            src={hasImageSrc(src) ? src : imageFallback}
            alt=""
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={() => {
              if (hasImageSrc(imageFallback) && src !== imageFallback) {
                setSrc(imageFallback);
              }
            }}
            className={`hero-premium__photo hotels-hero__photo hotels-hero__photo--${photoPosition}`}
            fallbackClassName="bg-[color:var(--brand-navy-deep)]"
          />
        </div>

        <div
          className={cn(
            "hero-premium__inner relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
            compact === "hub"
              ? "py-5 sm:py-6 lg:py-8"
              : compact
                ? "py-6 sm:py-8 lg:py-10"
                : "py-10 sm:py-12 lg:py-14",
          )}
        >
          <div
            className={cn(
              "hotels-hero__content min-w-0",
              variant === "light" ? "max-w-3xl sm:max-w-4xl" : "max-w-xl",
            )}
          >
            {children ?? (
              <>
                <h1
                  id={headingId}
                  className={`hotels-hero__title${titleStacked ? " hotels-hero__title--stacked" : ""}`}
                >
                  {titleStacked ? (
                    <>
                      <span className="hotels-hero__title-line">{titleFirst}</span>
                      <span className="hotels-hero__title-accent text-brand-gradient">
                        {titleAccent}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{titleFirst}</span>{" "}
                      <span className="text-brand-gradient">{titleAccent}</span>
                    </>
                  )}
                </h1>
                <p className="hotels-hero__lead">{subtitle}</p>

                {heroBadges.length > 0 ? (
                  <ul className={badgeClass} role="list">
                    {heroBadges.map(({ icon: Icon, title, detail }, index) => (
                      <li key={title} className="hotels-hero__badge">
                        <span
                          className={`hotels-hero__badge-icon hotels-hero__badge-icon--${BADGE_TONES[index % BADGE_TONES.length]}`}
                          aria-hidden="true"
                        >
                          <Icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <span className="hotels-hero__badge-copy">
                          <span className="hotels-hero__badge-label">{title}</span>
                          {detail ? (
                            <span className="hotels-hero__badge-detail">{detail}</span>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {cta}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
