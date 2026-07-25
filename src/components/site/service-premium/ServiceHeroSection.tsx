import type { ReactNode } from "react";
import { ServicePremiumHero } from "@/components/site/service-premium/ServicePremiumHero";
import { ServiceTrustBar } from "@/components/site/service-premium/ServiceTrustBar";
import type { ServiceIconItem } from "@/components/site/service-premium/types";

type HeroProps = {
  headingId: string;
  imagePrimary: string;
  imageFallback: string;
  titleFirst?: string;
  titleAccent?: ReactNode;
  subtitle?: string;
  badges?: ServiceIconItem[];
  badgeColumns?: 2 | 4 | 5;
  cta?: ReactNode;
  photoPosition?: "right" | "center";
  titleStacked?: boolean;
  compact?: boolean | "hub";
  children?: ReactNode;
  variant?: "dark" | "light";
};

type Props = HeroProps & {
  trustItems?: ServiceIconItem[];
  trustAriaLabel?: string;
  trustColumns?: 4 | 5;
  heroVariant?: "dark" | "light";
};

export function ServiceHeroSection({
  trustItems,
  trustAriaLabel = "Service guarantees",
  trustColumns = 5,
  heroVariant = "dark",
  ...heroProps
}: Props) {
  return (
    <section
      className={`service-hero-block${heroVariant === "light" ? " service-hero-block--light" : ""}`.trim()}
      aria-labelledby={heroProps.headingId}
    >
      <ServicePremiumHero {...heroProps} variant={heroVariant} />
      {trustItems && trustItems.length > 0 ? (
        <ServiceTrustBar items={trustItems} ariaLabel={trustAriaLabel} columns={trustColumns} />
      ) : null}
    </section>
  );
}
