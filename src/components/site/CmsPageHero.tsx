import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ServicePremiumHero } from "@/components/site/service-premium/ServicePremiumHero";
import type { PageHeroContent } from "@/lib/page-content";

type Props = {
  headingId: string;
  content: PageHeroContent;
  fallback: PageHeroContent;
  imageFallback?: string;
  children?: ReactNode;
  simple?: boolean;
  compact?: boolean;
};

export function CmsPageHero({
  headingId,
  content,
  fallback,
  imageFallback,
  children,
  simple,
  compact,
}: Props) {
  const eyebrow = content.eyebrow ?? fallback.eyebrow ?? "";
  const titleFirst = content.titleFirst ?? fallback.titleFirst ?? "";
  const titleAccent = content.titleAccent ?? fallback.titleAccent ?? "";
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
    <ServicePremiumHero
      headingId={headingId}
      imagePrimary={banner}
      imageFallback={imageFallback || banner}
      titleFirst=""
      titleAccent=""
      subtitle=""
      photoPosition="center"
      compact={compact}
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
  );
}
