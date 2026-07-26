import type { ReactNode } from "react";
import { cn, toTitleCase } from "@/lib/utils";
import { ServicePremiumHero } from "@/components/site/service-premium/ServicePremiumHero";
import type { PageHeroContent } from "@/lib/page-content";

type Props = {
  headingId: string;
  content: PageHeroContent;
  fallback: PageHeroContent;
  imageFallback?: string;
  children?: ReactNode;
  /** Text-only hero without background image (legacy list pages). */
  simple?: boolean;
  compact?: boolean;
  /** Background hero style — use light for service-style pages. */
  variant?: "dark" | "light";
};

export function CmsPageHero({
  headingId,
  content,
  fallback,
  imageFallback,
  children,
  simple,
  compact,
  variant = "dark",
}: Props) {
  const eyebrow = toTitleCase(content.eyebrow ?? fallback.eyebrow ?? "");
  const titleFirst = toTitleCase(content.titleFirst ?? fallback.titleFirst ?? "");
  const titleAccent = toTitleCase(content.titleAccent ?? fallback.titleAccent ?? "");
  const subtitle = content.subtitle ?? fallback.subtitle ?? "";
  const banner = content.bannerUrl?.trim() || fallback.bannerUrl || imageFallback || "";

  if (simple) {
    return (
      <section className={cn("page-hero-light", compact && "page-hero-light--compact")}>
        <div className="page-hero">
          {eyebrow ? <span className="page-hero-light__eyebrow">{eyebrow}</span> : null}
          <h1 className="page-hero-title" id={headingId}>
            {titleFirst}
            {titleAccent ? (
              <>
                {" "}
                <span className="text-brand-gradient">{titleAccent}</span>
              </>
            ) : null}
          </h1>
          {subtitle ? <p className="page-hero-light__lead">{subtitle}</p> : null}
          {children}
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "service-hero-block",
        variant === "light" && "service-hero-block--light",
      )}
      aria-labelledby={headingId}
    >
      <ServicePremiumHero
        headingId={headingId}
        imagePrimary={banner}
        imageFallback={imageFallback || banner}
        titleFirst=""
        titleAccent=""
        subtitle=""
        photoPosition="center"
        compact={compact}
        variant={variant}
      >
        {eyebrow ? (
          <p className="about-hero__eyebrow">
            <span className="about-hero__eyebrow-line" aria-hidden="true" />
            {eyebrow}
          </p>
        ) : null}
        <h1 id={headingId} className="hotels-hero__title">
          <span>{titleFirst}</span>
          {titleAccent ? (
            <>
              {" "}
              <span className="text-brand-gradient">{titleAccent}</span>
            </>
          ) : null}
        </h1>
        {subtitle ? <p className="hotels-hero__lead">{subtitle}</p> : null}
        {children}
      </ServicePremiumHero>
    </section>
  );
}
