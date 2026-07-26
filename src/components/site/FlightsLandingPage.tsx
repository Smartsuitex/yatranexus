"use client";

import { ArrowRight, Mail, Plane } from "lucide-react";
import { ServiceCmsExtras } from "@/components/site/ServiceCmsExtras";
import { ServiceCtaBanner } from "@/components/site/service-premium/ServiceCtaBanner";
import { ServicePageShell } from "@/components/site/service-premium/ServicePageShell";
import { ServiceHeroSection } from "@/components/site/service-premium/ServiceHeroSection";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import { useServiceInquiry } from "@/components/site/service-premium/ServiceInquiryDialog";
import { ServiceTrustFooter } from "@/components/site/service-premium/ServiceTrustFooter";
import { resolveCmsIcon } from "@/lib/cms-icons";
import { resolveCmsFeatureItems } from "@/lib/service-content-blocks";
import { resolveServiceHero } from "@/lib/service-hero-images";
import { SafeImage } from "@/components/site/SafeImage";
import {
  FLIGHTS_CTA,
  FLIGHTS_HERO,
  FLIGHTS_HERO_BADGES,
  FLIGHTS_TRUST_FOOTER,
  FLIGHTS_TRUST_STATS,
  FLIGHTS_WHY_BOOK,
  resolveFlightPopularDestinations,
  type FlightWhyIconTone,
} from "@/lib/flights-page-data";
import type { PublicService } from "@/lib/public-cms";

type Props = { service: PublicService };

const WHY_ICON_TONES: FlightWhyIconTone[] = [
  "purple",
  "pink",
  "orange",
  "blue",
  "green",
];

/** Capitalize each word (keeps short tokens like 24x7 / 30+ intact). */
function toTitleCase(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .map((word) => {
      if (!word) return word;
      if (/^\d|^\d*x\d|^\d*\+\d*$|×/i.test(word) || word.includes("+")) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function parseHeroTitle(heroTitle?: string) {
  const title = heroTitle?.trim();
  if (title?.includes(",")) {
    const commaIndex = title.indexOf(",");
    return {
      first: toTitleCase(title.slice(0, commaIndex).trim()) + ",",
      accent: toTitleCase(title.slice(commaIndex + 1).trim()),
    };
  }
  if (title) {
    const words = title.split(/\s+/);
    const mid = Math.ceil(words.length / 2);
    return {
      first: toTitleCase(words.slice(0, mid).join(" ")),
      accent: toTitleCase(words.slice(mid).join(" ")),
    };
  }
  return { first: FLIGHTS_HERO.titleFirst, accent: FLIGHTS_HERO.titleAccent };
}

function cleanTrustDetail(detail: string) {
  return detail
    .replace(/\bPartnered\b/gi, "")
    .replace(/\bDestinations\s+Worldwide\b/gi, "Destinations")
    .replace(/\s+/g, " ")
    .trim();
}

export function FlightsLandingPage({ service }: Props) {
  const hero = resolveServiceHero("flights", service.bannerUrl);
  const blocks = service.contentBlocks;
  const heroParts = parseHeroTitle(blocks.heroTitle);
  const whyBookItems =
    blocks.features && blocks.features.length > 0
      ? blocks.features.map((f, index) => ({
          icon: resolveCmsIcon(f.icon),
          iconTone: WHY_ICON_TONES[index % WHY_ICON_TONES.length],
          title: toTitleCase(f.title),
          detail: f.detail,
        }))
      : FLIGHTS_WHY_BOOK;

  const { openInquiry, dialog } = useServiceInquiry({
    defaultService: "flights",
    sourcePage: "/services/flights",
    dialogTitle: "Send Flight Inquiry",
    dialogDescription:
      "Share your route and dates — our expert will find the best fare for you.",
  });

  const destinations = resolveFlightPopularDestinations(blocks.catalogItems);
  const catalogTitle = blocks.catalogSectionTitle?.trim() || "Popular Destinations";
  const badges = resolveCmsFeatureItems(blocks.heroBadges, FLIGHTS_HERO_BADGES, 1);
  const trustStats = resolveCmsFeatureItems(blocks.trustItems, FLIGHTS_TRUST_STATS, 1).map(
    (item) => ({
      ...item,
      detail: item.detail ? cleanTrustDetail(item.detail) : item.detail,
    }),
  );
  const trustFooter = resolveCmsFeatureItems(blocks.trustFooter, FLIGHTS_TRUST_FOOTER, 1);
  const ctaTitle = blocks.ctaTitle?.trim() || FLIGHTS_CTA.title;
  const ctaSubtitle = blocks.ctaSubtitle?.trim() || FLIGHTS_CTA.subtitle;
  const ctaButton = blocks.ctaButtonLabel?.trim() || FLIGHTS_CTA.buttonLabel;

  return (
    <ServicePageShell modifier="flights">
      <ServiceHeroSection
        headingId="flights-hero-heading"
        imagePrimary={hero.primary}
        imageFallback={hero.fallback}
        titleFirst={heroParts.first}
        titleAccent={heroParts.accent}
        subtitle={service.description || FLIGHTS_HERO.subtitle}
        badges={badges}
        trustItems={trustStats}
        trustAriaLabel="Flight booking guarantees"
        trustColumns={4}
        heroVariant="light"
        compact
      />

      <section
        className="hotels-section hotels-section--alt flights-popular-section"
        aria-labelledby="flights-destinations-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceSectionHeading
            id="flights-destinations-heading"
            title={catalogTitle}
            subtitle={
              blocks.catalogSectionLead ??
              "Popular domestic and international flight destinations."
            }
          />

          <div className="flights-popular-dest-grid">
            {destinations.map((dest) => (
              <button
                key={dest.slug}
                type="button"
                onClick={() => openInquiry(`Flights to ${dest.name}`)}
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

      <section
        className="hotels-section hotels-section--alt flights-why-section"
        aria-labelledby="flights-why-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceSectionHeading
            id="flights-why-heading"
            title={
              <>
                Why book flights with{" "}
                <span className="text-brand-gradient">Yatra Nexus</span>?
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
                  <Icon className="h-8 w-8" strokeWidth={1.75} />
                </span>
                <div className="flights-why-card__content">
                  <h3 className="flights-why-card__title">{title}</h3>
                  {detail ? <p className="flights-why-card__detail">{detail}</p> : null}
                </div>
              </div>
            ))}
          </div>

          <div className="flights-cta-wrap">
            <ServiceCtaBanner
              headingId="flights-cta-heading"
              icon={Plane}
              title={ctaTitle}
              subtitle={ctaSubtitle}
              buttonLabel={ctaButton}
              buttonHint={FLIGHTS_CTA.buttonHint}
              buttonIcon={Mail}
              variant="brand"
              layout="pill"
              onAction={() => openInquiry()}
            />
          </div>
        </div>
      </section>

      <ServiceCmsExtras service={service} className="hotels-section hotels-section--alt" />

      <ServiceTrustFooter items={trustFooter} />
      {dialog}
    </ServicePageShell>
  );
}
