"use client";

import { ArrowRight, Luggage, Mail } from "lucide-react";
import { ServicePageShell } from "@/components/site/service-premium/ServicePageShell";
import { ServiceHeroSection } from "@/components/site/service-premium/ServiceHeroSection";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import { ServiceCtaBanner } from "@/components/site/service-premium/ServiceCtaBanner";
import { useSiteConfig } from "@/contexts/site-config";
import { resolveCmsIcon } from "@/lib/cms-icons";
import {
  ABOUT_CTA,
  ABOUT_HERO,
  ABOUT_HOW_IT_WORKS,
  ABOUT_MISSION_VISION,
  ABOUT_TRUST_STATS,
  ABOUT_VALUES,
  ABOUT_WHO_WE_ARE,
  ABOUT_WHAT_WE_OFFER,
  ABOUT_WHY_CHOOSE,
  resolveAboutHero,
  splitAboutParagraphs,
} from "@/lib/about-page-data";
import type { PublicHomepageSettings } from "@/lib/public-cms";

type Props = {
  homepage: PublicHomepageSettings;
};

const WHY_TONES = ["purple", "orange", "blue", "green", "purple", "orange"] as const;

export function AboutLandingPage({ homepage }: Props) {
  const site = useSiteConfig();
  const about = site.pageContent.about ?? {};
  const heroImages = resolveAboutHero(about.bannerUrl);
  const heroEyebrow = about.eyebrow?.trim() || ABOUT_HERO.eyebrow;
  const heroTitleFirst = about.titleFirst?.trim() || ABOUT_HERO.titleFirst;
  const heroTitleAccent = about.titleAccent?.trim() || ABOUT_HERO.titleAccent;
  const heroSubtitle = about.subtitle?.trim() || ABOUT_HERO.subtitle;
  const whoBody =
    about.whoWeAreBody?.trim() ||
    homepage.aboutContent ||
    ABOUT_WHO_WE_ARE.paragraphs.join("\n\n");
  const whoParagraphs = splitAboutParagraphs(whoBody);
  const missionVision = [
    {
      icon: ABOUT_MISSION_VISION[0].icon,
      title: about.missionTitle?.trim() || ABOUT_MISSION_VISION[0].title,
      detail: about.missionDetail?.trim() || ABOUT_MISSION_VISION[0].detail,
      accent: "purple" as const,
    },
    {
      icon: ABOUT_MISSION_VISION[1].icon,
      title: about.visionTitle?.trim() || ABOUT_MISSION_VISION[1].title,
      detail: about.visionDetail?.trim() || ABOUT_MISSION_VISION[1].detail,
      accent: "orange" as const,
    },
  ];
  const ctaTitle = about.ctaTitle?.trim() || ABOUT_CTA.title;
  const ctaSubtitle = about.ctaSubtitle?.trim() || ABOUT_CTA.subtitle;

  // Design needs all 6 items in one row (shared homepage why-choose is often shorter).
  const whyChoose = ABOUT_WHY_CHOOSE;

  const howSteps = ABOUT_HOW_IT_WORKS;

  const offerItems =
    about.offerItems && about.offerItems.length > 0
      ? about.offerItems.map((item, index) => {
          const fallback = ABOUT_WHAT_WE_OFFER[index % ABOUT_WHAT_WE_OFFER.length];
          return {
            icon: resolveCmsIcon(item.icon) ?? fallback.icon,
            title: item.title || fallback.title,
            detail: item.detail || fallback.detail,
            accent: item.accent ?? fallback.accent,
          };
        })
      : ABOUT_WHAT_WE_OFFER;

  const valueItems =
    about.valuesItems && about.valuesItems.length > 0
      ? about.valuesItems.map((item, index) => {
          const fallback = ABOUT_VALUES[index % ABOUT_VALUES.length];
          return {
            icon: resolveCmsIcon(item.icon) ?? fallback.icon,
            title: item.title || fallback.title,
            accent: item.accent ?? fallback.accent,
          };
        })
      : ABOUT_VALUES;

  return (
    <ServicePageShell modifier="about">
      <ServiceHeroSection
        headingId="about-hero-heading"
        imagePrimary={heroImages.primary}
        imageFallback={heroImages.fallback}
        titleFirst={heroTitleFirst}
        titleAccent={heroTitleAccent}
        subtitle={heroSubtitle}
        trustItems={ABOUT_TRUST_STATS}
        trustAriaLabel="Why travellers choose YatraNexus"
        trustColumns={4}
        heroVariant="light"
        titleStacked
        compact
      >
        <p className="about-hero__eyebrow">
          <span className="about-hero__eyebrow-line" aria-hidden="true" />
          {heroEyebrow}
        </p>
        <h1 id="about-hero-heading" className="hotels-hero__title hotels-hero__title--stacked">
          <span className="hotels-hero__title-line">{heroTitleFirst}</span>
          <span className="hotels-hero__title-accent text-brand-gradient">
            {heroTitleAccent}
          </span>
        </h1>
        <p className="hotels-hero__lead">{heroSubtitle}</p>
      </ServiceHeroSection>

      <section className="about-section" aria-labelledby="about-who-heading">
        <div className="about-section__inner">
          <div className="about-who">
            <div>
              <h2 id="about-who-heading" className="about-section__title">
                {about.whoWeAreTitle || ABOUT_WHO_WE_ARE.title}
              </h2>
              <div className="about-who__copy">
                {whoParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="about-mission-grid">
              {missionVision.map(({ icon: Icon, title, detail, accent }) => (
                <article
                  key={title}
                  className={`about-mission-card about-mission-card--${accent}`}
                >
                  <div className="about-mission-card__header">
                    <span className="about-mission-card__icon" aria-hidden="true">
                      <Icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>
                    <h3 className="about-mission-card__title">{title}</h3>
                  </div>
                  <span className="about-mission-card__rule" aria-hidden="true" />
                  <p className="about-mission-card__detail">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-section about-section--alt" aria-labelledby="about-offer-heading">
        <div className="about-section__inner about-section__inner--wide">
          <ServiceSectionHeading
            id="about-offer-heading"
            title={
              <>
                {(about.offerTitle || "What We Offer").split(" ").slice(0, -1).join(" ") ||
                  "What We"}{" "}
                <span className="text-brand-gradient">
                  {(about.offerTitle || "What We Offer").split(" ").slice(-1)[0]}
                </span>
              </>
            }
          />
          <div className="about-offer-grid mt-10">
            {offerItems.map(({ icon: Icon, title, detail, accent }) => (
              <article key={title} className="about-offer-card">
                <span
                  className={`about-offer-card__icon about-offer-card__icon--${accent}`}
                  aria-hidden="true"
                >
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <h3 className="about-offer-card__title">{title}</h3>
                <p className="about-offer-card__detail">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-why-heading">
        <div className="about-section__inner about-section__inner--wide">
          <ServiceSectionHeading
            id="about-why-heading"
            title={
              <>
                Why Choose <span className="text-brand-gradient">YatraNexus</span>?
              </>
            }
          />
          <div className="about-why-grid mt-10">
            {whyChoose.map(({ icon: Icon, title, detail }, index) => {
              const iconTone = WHY_TONES[index % WHY_TONES.length];
              return (
                <article key={title} className="about-why-card">
                  <span
                    className={`about-why-card__icon about-why-card__icon--${iconTone}`}
                    aria-hidden="true"
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <h3 className="about-why-card__title">{title}</h3>
                  {detail ? <p className="about-why-card__detail">{detail}</p> : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-section about-section--alt" aria-labelledby="about-values-heading">
        <div className="about-section__inner about-section__inner--wide">
          <ServiceSectionHeading
            id="about-values-heading"
            title={
              <>
                {(about.valuesTitle || "Our Values").split(" ").slice(0, -1).join(" ") || "Our"}{" "}
                <span className="text-brand-gradient">
                  {(about.valuesTitle || "Our Values").split(" ").slice(-1)[0]}
                </span>
              </>
            }
          />
          <div className="about-values-grid mt-10">
            {valueItems.map(({ icon: Icon, title, accent }) => (
              <article
                key={title}
                className={`about-value-card about-value-card--${accent}`}
              >
                <span className="about-value-card__icon" aria-hidden="true">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <p className="about-value-card__label">{title}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-how-heading">
        <div className="about-section__inner">
          <ServiceSectionHeading
            id="about-how-heading"
            title={
              <>
                How We <span className="text-brand-gradient">Work</span>
              </>
            }
          />
          <ol className="about-steps mt-10">
            {howSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className={`about-step about-step--${step.accent}`}
                >
                  <div className="about-step__card">
                    <div className="about-step__badge">
                      {String(step.n).padStart(2, "0")}
                    </div>
                    <span className="about-step__icon" aria-hidden="true">
                      <Icon className="h-7 w-7" strokeWidth={1.5} />
                    </span>
                    <h3 className="about-step__title">{step.title}</h3>
                    <p className="about-step__detail">{step.detail}</p>
                  </div>
                  {index < howSteps.length - 1 ? (
                    <span className="about-step__connector" aria-hidden="true">
                      <span className="about-step__connector-line" />
                      <ArrowRight className="about-step__connector-arrow" strokeWidth={2} />
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="about-cta" aria-labelledby="about-cta-heading">
        <div className="about-cta__banner-wrap">
          <ServiceCtaBanner
            headingId="about-cta-heading"
            icon={Luggage}
            title={ctaTitle}
            subtitle={ctaSubtitle}
            buttonLabel={ABOUT_CTA.buttonLabel}
            buttonHint={ABOUT_CTA.buttonHint}
            buttonIcon={Mail}
            variant="brand"
            layout="pill"
            href="/contact"
          />
        </div>
      </section>
    </ServicePageShell>
  );
}
