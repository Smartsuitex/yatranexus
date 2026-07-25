"use client";

import { ArrowRight, Bell, Mail } from "lucide-react";
import { ServiceCmsExtras } from "@/components/site/ServiceCmsExtras";
import { ServiceCtaBanner } from "@/components/site/service-premium/ServiceCtaBanner";
import { ServicePageShell } from "@/components/site/service-premium/ServicePageShell";
import { ServiceHeroSection } from "@/components/site/service-premium/ServiceHeroSection";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import { useServiceInquiry } from "@/components/site/service-premium/ServiceInquiryDialog";
import { ServiceTrustFooter } from "@/components/site/service-premium/ServiceTrustFooter";
import { resolveCmsIcon } from "@/lib/cms-icons";
import { resolveCmsFeatureItems } from "@/lib/service-content-blocks";
import { SafeImage } from "@/components/site/SafeImage";
import {
  HOTELS_CTA,
  HOTELS_HERO,
  HOTELS_HERO_BADGES,
  HOTELS_POPULAR_DESTINATIONS,
  HOTELS_TRUST_FOOTER,
  HOTELS_TRUST_STATS,
  HOTELS_WHY_BOOK,
  type HotelsWhyIconTone,
} from "@/lib/hotels-page-data";
import { resolveServiceHero } from "@/lib/service-hero-images";
import type { PublicService } from "@/lib/public-cms";

type Props = { service: PublicService };

const WHY_ICON_TONES: HotelsWhyIconTone[] = ["purple", "pink", "orange", "blue", "green"];

function parseHeroTitle(heroTitle?: string) {
  const title = heroTitle?.trim();
  if (title?.includes(",")) {
    const commaIndex = title.indexOf(",");
    return {
      first: title.slice(0, commaIndex + 1).trim(),
      accent: title.slice(commaIndex + 1).trim(),
    };
  }
  return { first: HOTELS_HERO.titleFirst, accent: HOTELS_HERO.titleAccent };
}

export function HotelsLandingPage({ service }: Props) {
  const hero = resolveServiceHero("hotels", service.bannerUrl);
  const blocks = service.contentBlocks;
  const heroParts = parseHeroTitle(blocks.heroTitle);
  const whyBookItems =
    blocks.features && blocks.features.length > 0
      ? blocks.features.map((f, index) => ({
          icon: resolveCmsIcon(f.icon),
          iconTone: WHY_ICON_TONES[index % WHY_ICON_TONES.length],
          title: f.title,
          detail: f.detail,
        }))
      : HOTELS_WHY_BOOK;

  const { openInquiry, dialog } = useServiceInquiry({
    defaultService: "hotels",
    sourcePage: "/services/hotels",
    dialogTitle: "Send Hotel Inquiry",
    dialogDescription: "Share your dates, destination and budget — our hotel expert will call you back.",
  });

  const destinations = HOTELS_POPULAR_DESTINATIONS;
  const catalogTitle = blocks.catalogSectionTitle?.trim() || "Popular Destinations";
  const badges = resolveCmsFeatureItems(blocks.heroBadges, HOTELS_HERO_BADGES, 1);
  const trustStats = resolveCmsFeatureItems(blocks.trustItems, HOTELS_TRUST_STATS, 1)
    .filter((item) => !/^trusted by$/i.test(item.title.trim()))
    .map((item) =>
      /^best deals$/i.test(item.title.trim())
        ? { ...item, detail: "On 10,000+ Hotels" }
        : item,
    );
  const trustFooter = resolveCmsFeatureItems(blocks.trustFooter, HOTELS_TRUST_FOOTER, 1);

  return (
    <ServicePageShell modifier="hotels">
      <ServiceHeroSection
        headingId="hotels-hero-heading"
        imagePrimary={hero.primary}
        imageFallback={hero.fallback}
        titleFirst={heroParts.first}
        titleAccent={heroParts.accent}
        subtitle={service.description || HOTELS_HERO.subtitle}
        badges={badges}
        trustItems={trustStats}
        trustAriaLabel="Hotel booking guarantees"
        trustColumns={4}
        heroVariant="light"
        compact
      />

      <section className="hotels-section hotels-section--alt flights-popular-section" aria-labelledby="hotels-destinations-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceSectionHeading
            id="hotels-destinations-heading"
            title={catalogTitle}
            subtitle={
              blocks.catalogSectionLead ??
              "Popular domestic and international hotel destinations."
            }
          />

          <div className="flights-popular-dest-grid">
            {destinations.map((dest) => (
              <button
                key={dest.slug}
                type="button"
                onClick={() => openInquiry(dest.name)}
                className="hotels-dest-card hotels-dest-card--compact-row"
              >
                <SafeImage
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  className="hotels-dest-card__img"
                />
                <div className="hotels-dest-card__overlay">
                  <h3 className="hotels-dest-card__name">{dest.name}</h3>
                  {dest.priceLabel ? (
                    <p className="hotels-dest-card__price">{dest.priceLabel}</p>
                  ) : null}
                  <span className="hotels-dest-card__arrow" aria-hidden="true">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="hotels-section hotels-section--alt flights-why-section" aria-labelledby="hotels-why-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceSectionHeading
            id="hotels-why-heading"
            title={
              <>
                Why book hotels with <span className="text-brand-gradient">Yatra Nexus</span>?
              </>
            }
          />
          <div className={`flights-why-grid flights-why-grid--count-${whyBookItems.length}`}>
            {whyBookItems.map(({ icon: Icon, title, detail, iconTone }) => (
              <div key={title} className="flights-why-card">
                <span
                  className={`flights-why-card__icon flights-why-card__icon--${iconTone}`}
                  aria-hidden="true"
                >
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </span>
                <div className="flights-why-card__content">
                  <h3 className="flights-why-card__title">{title}</h3>
                  {detail ? <p className="flights-why-card__detail">{detail}</p> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hotels-section" aria-labelledby="hotels-cta-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceCtaBanner
            headingId="hotels-cta-heading"
            icon={Bell}
            title={blocks.ctaTitle ?? HOTELS_CTA.title}
            subtitle={blocks.ctaSubtitle ?? HOTELS_CTA.subtitle}
            buttonLabel={blocks.ctaButtonLabel ?? HOTELS_CTA.buttonLabel}
            buttonHint={HOTELS_CTA.buttonHint}
            buttonIcon={Mail}
            variant="brand"
            layout="pill"
            onAction={() => openInquiry()}
          />
        </div>
      </section>

      <ServiceCmsExtras service={service} className="hotels-section hotels-section--alt" />

      <ServiceTrustFooter items={trustFooter} ariaLabel="Inquiry process guarantees" />

      {dialog}
    </ServicePageShell>
  );
}
