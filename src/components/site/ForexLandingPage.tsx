"use client";

import { CreditCard, Mail } from "lucide-react";
import { ServiceCmsExtras } from "@/components/site/ServiceCmsExtras";
import { ServiceCtaBanner } from "@/components/site/service-premium/ServiceCtaBanner";
import { ServicePageShell } from "@/components/site/service-premium/ServicePageShell";
import { ServiceHeroSection } from "@/components/site/service-premium/ServiceHeroSection";
import { useServiceInquiry } from "@/components/site/service-premium/ServiceInquiryDialog";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import { resolveServiceHero } from "@/lib/service-hero-images";
import { SafeImage } from "@/components/site/SafeImage";
import {
  FOREX_CARD_TYPES,
  FOREX_CTA,
  FOREX_HERO,
  FOREX_HERO_BADGES,
  FOREX_TRUST_ROW,
} from "@/lib/forex-page-data";
import type { PublicService } from "@/lib/public-cms";

type Props = { service: PublicService };

export function ForexLandingPage({ service }: Props) {
  const hero = resolveServiceHero("forex", service.bannerUrl);
  const blocks = service.contentBlocks;
  const trustItems = [...FOREX_TRUST_ROW];
  const badges = [...FOREX_HERO_BADGES];
  const cardTypes = [...FOREX_CARD_TYPES];
  const catalogLead = "Multiple currency options to match your travel needs.";
  const { openInquiry, dialog } = useServiceInquiry({
    defaultService: "forex",
    sourcePage: "/services/forex",
    dialogTitle: "Send Forex Card Inquiry",
    dialogDescription:
      "Share your travel destination and currency needs — we'll get back with the best rates.",
  });

  return (
    <ServicePageShell modifier="forex">
      <ServiceHeroSection
        headingId="forex-hero-heading"
        imagePrimary={hero.primary}
        imageFallback={hero.fallback}
        titleFirst={FOREX_HERO.titleFirst}
        titleAccent={FOREX_HERO.titleAccent}
        titleStacked
        subtitle={FOREX_HERO.subtitle}
        badges={badges}
        trustItems={trustItems}
        trustAriaLabel="Forex service guarantees"
        trustColumns={5}
        heroVariant="light"
        compact
      />

      <section className="hotels-section" aria-labelledby="forex-cards-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceSectionHeading
            id="forex-cards-heading"
            title={
              <>
                Choose the Right{" "}
                <span className="text-brand-gradient">Forex Card</span> for Your Journey
              </>
            }
            subtitle={catalogLead}
          />

          <div className="sp-card-grid sp-card-grid--4 mt-8">
            {cardTypes.map((card) => (
              <article key={card.slug} className={`sp-plan-card sp-plan-card--${card.accent} forex-card`}>
                <h3 className="sp-plan-card__title">{card.title}</h3>
                <p className="sp-plan-card__tagline">{card.description}</p>
                {card.image ? (
                  <div className="sp-plan-card__media">
                    <SafeImage
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="sp-plan-card__img"
                    />
                  </div>
                ) : null}
                {card.features.length > 0 ? (
                  <ul className="sp-plan-card__features" role="list">
                    {card.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>


      <section className="hotels-section" aria-labelledby="forex-cta-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceCtaBanner
            headingId="forex-cta-heading"
            icon={CreditCard}
            title={blocks.ctaTitle ?? FOREX_CTA.title}
            subtitle={blocks.ctaSubtitle ?? FOREX_CTA.subtitle}
            buttonLabel={blocks.ctaButtonLabel ?? FOREX_CTA.buttonLabel}
            buttonHint={FOREX_CTA.buttonHint}
            buttonIcon={Mail}
            variant="brand"
            layout="pill"
            onAction={() => openInquiry()}
          />
        </div>
      </section>

      <ServiceCmsExtras service={service} className="hotels-section hotels-section--alt" />

      {dialog}
    </ServicePageShell>
  );
}
