"use client";

import { Briefcase, Car, Mail, Users } from "lucide-react";
import { ServiceCmsExtras } from "@/components/site/ServiceCmsExtras";
import { ServiceCtaBanner } from "@/components/site/service-premium/ServiceCtaBanner";
import { ServicePageShell } from "@/components/site/service-premium/ServicePageShell";
import { ServiceHeroSection } from "@/components/site/service-premium/ServiceHeroSection";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import { useServiceInquiry } from "@/components/site/service-premium/ServiceInquiryDialog";
import {
  CABS_CTA,
  CABS_HERO,
  CABS_HERO_BADGES,
  CABS_TRUST_ROW,
  resolveCabCategories,
} from "@/lib/cabs-page-data";
import { SafeImage, hasImageSrc } from "@/components/site/SafeImage";
import { resolveServiceHero } from "@/lib/service-hero-images";
import type { PublicService } from "@/lib/public-cms";

type Props = { service: PublicService };

export function CabsLandingPage({ service }: Props) {
  const hero = resolveServiceHero("cabs", service.bannerUrl);
  const blocks = service.contentBlocks;
  const badges = [...CABS_HERO_BADGES];
  const trustItems = [...CABS_TRUST_ROW];
  const categories = resolveCabCategories(blocks.catalogItems);
  const { openInquiry, dialog } = useServiceInquiry({
    defaultService: "cabs",
    sourcePage: "/services/cabs",
    dialogTitle: "Send Cab Inquiry",
    dialogDescription:
      "Share your route, dates and vehicle preference — our team will call you back.",
  });

  return (
    <ServicePageShell modifier="cabs">
      <ServiceHeroSection
        headingId="cabs-hero-heading"
        imagePrimary={hero.primary}
        imageFallback={hero.fallback}
        titleFirst={CABS_HERO.titleFirst}
        titleAccent={CABS_HERO.titleAccent}
        titleStacked
        subtitle={CABS_HERO.subtitle}
        badges={badges}
        trustItems={trustItems}
        trustAriaLabel="Cab booking guarantees"
        trustColumns={4}
        heroVariant="light"
        compact
      />

      <section className="hotels-section hotels-section--alt" aria-labelledby="cabs-categories-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceSectionHeading
            id="cabs-categories-heading"
            title={
              <>
                Our <span className="text-brand-gradient">Cab Categories</span>
              </>
            }
            subtitle={
              blocks.catalogSectionLead ??
              "Choose the right vehicle for your route, group size and luggage."
            }
          />

          <div className="sp-card-grid sp-card-grid--4 mt-8">
            {categories.map((cab) => (
              <article
                key={cab.slug}
                className={`sp-plan-card sp-plan-card--${cab.accent} cabs-plan-card`}
              >
                {hasImageSrc(cab.image) ? (
                  <div className="sp-plan-card__media">
                    <SafeImage
                      src={cab.image}
                      alt={cab.title}
                      loading="lazy"
                      className="sp-plan-card__img"
                    />
                  </div>
                ) : (
                  <div className="sp-plan-card__media cabs-plan-card__media--empty">
                    <Car className="h-10 w-10" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                )}
                <h3 className="sp-plan-card__title">{cab.title}</h3>
                {cab.seats || cab.bags ? (
                  <div className="cabs-plan-card__specs">
                    {cab.seats ? (
                      <span className="cabs-plan-card__spec">
                        <Users className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        {cab.seats}
                      </span>
                    ) : null}
                    {cab.bags ? (
                      <span className="cabs-plan-card__spec">
                        <Briefcase className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                        {cab.bags}
                      </span>
                    ) : null}
                  </div>
                ) : null}
                <p className="cabs-plan-card__desc">{cab.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hotels-section hotels-section--alt" aria-labelledby="cabs-cta-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceCtaBanner
            headingId="cabs-cta-heading"
            icon={Car}
            title={blocks.ctaTitle ?? CABS_CTA.title}
            subtitle={blocks.ctaSubtitle ?? CABS_CTA.subtitle}
            buttonLabel={blocks.ctaButtonLabel ?? CABS_CTA.buttonLabel}
            buttonHint={CABS_CTA.buttonHint}
            buttonIcon={Mail}
            variant="brand"
            layout="pill"
            onAction={() => openInquiry()}
          />
        </div>
      </section>

      <ServiceCmsExtras service={service} className="hotels-section" />

      {dialog}
    </ServicePageShell>
  );
}
