"use client";

import { Mail, ShieldCheck } from "lucide-react";
import { ServiceCmsExtras } from "@/components/site/ServiceCmsExtras";
import { ServiceCtaBanner } from "@/components/site/service-premium/ServiceCtaBanner";
import { resolveCmsIcon } from "@/lib/cms-icons";
import { ServicePageShell } from "@/components/site/service-premium/ServicePageShell";
import { ServiceHeroSection } from "@/components/site/service-premium/ServiceHeroSection";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import { useServiceInquiry } from "@/components/site/service-premium/ServiceInquiryDialog";
import { ServiceTrustFooter } from "@/components/site/service-premium/ServiceTrustFooter";
import { resolveServiceHero } from "@/lib/service-hero-images";
import { resolveCmsFeatureItems } from "@/lib/service-content-blocks";
import {
  INSURANCE_COVERAGE_ITEMS,
  INSURANCE_COVERAGE_LEAD,
  INSURANCE_CTA,
  INSURANCE_HERO,
  INSURANCE_HERO_BADGES,
  INSURANCE_PLANS,
  INSURANCE_PLANS_NOTE,
  INSURANCE_TRUST_STATS,
  INSURANCE_TRUST_FOOTER,
} from "@/lib/insurance-page-data";
import type { PublicService } from "@/lib/public-cms";

type Props = { service: PublicService };

export function InsuranceLandingPage({ service }: Props) {
  const hero = resolveServiceHero("insurance", service.bannerUrl);
  const blocks = service.contentBlocks;
  const trustStats = [...INSURANCE_TRUST_STATS];
  const badges = [...INSURANCE_HERO_BADGES];
  const trustFooter = resolveCmsFeatureItems(blocks.trustFooter, INSURANCE_TRUST_FOOTER, 1);
  const coverageItems = [...INSURANCE_COVERAGE_ITEMS];
  const plans =
    blocks.catalogItems && blocks.catalogItems.length > 0
      ? blocks.catalogItems.map((item, index) => ({
          slug: `cms-${index}`,
          title: item.title,
          tagline: item.detail.split("\n")[0] ?? item.detail,
          features: item.detail
            .split("\n")
            .slice(1)
            .map((line) => line.trim())
            .filter(Boolean),
          accent: (item.accent ??
            (["purple", "orange", "blue", "green"] as const)[index % 4]) as
            | "purple"
            | "orange"
            | "blue"
            | "green",
          icon: resolveCmsIcon(item.icon),
        }))
      : INSURANCE_PLANS;
  const { openInquiry, dialog } = useServiceInquiry({
    defaultService: "insurance",
    sourcePage: "/services/insurance",
    dialogTitle: "Insurance Inquiry",
    dialogDescription: "Share your destination and travel dates — we'll recommend the right plan.",
  });

  return (
    <ServicePageShell modifier="insurance">
      <ServiceHeroSection
        headingId="insurance-hero-heading"
        imagePrimary={hero.primary}
        imageFallback={hero.fallback}
        titleFirst={INSURANCE_HERO.titleFirst}
        titleAccent={INSURANCE_HERO.titleAccent}
        titleStacked
        subtitle={INSURANCE_HERO.subtitle}
        badges={badges}
        trustItems={trustStats}
        trustAriaLabel="Insurance service guarantees"
        trustColumns={4}
        heroVariant="light"
        compact
      />

      <section
        className="hotels-section hotels-section--alt flights-why-section"
        aria-labelledby="insurance-coverage-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceSectionHeading
            id="insurance-coverage-heading"
            title={
              <>
                Coverage That{" "}
                <span className="text-brand-gradient">Travels With You</span>
              </>
            }
            subtitle={INSURANCE_COVERAGE_LEAD}
          />
          <div className="flights-why-grid flights-why-grid--count-4">
            {coverageItems.map(({ icon: Icon, title, detail }, index) => {
              const iconTone = (["purple", "pink", "orange", "blue"] as const)[index % 4];
              return (
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
              );
            })}
          </div>
        </div>
      </section>

      <section className="hotels-section" aria-labelledby="insurance-plans-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceSectionHeading
            id="insurance-plans-heading"
            title={
              <>
                Our <span className="text-brand-gradient">Insurance Plans</span>
              </>
            }
            subtitle={
              blocks.catalogSectionLead ?? "Choose the plan that suits your travel needs."
            }
          />

          <div className="sp-card-grid sp-card-grid--4 mt-8">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <article
                  key={plan.slug}
                  className={`sp-plan-card sp-plan-card--${plan.accent}`}
                >
                  <span className="sp-plan-card__icon" aria-hidden="true">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="sp-plan-card__title">{plan.title}</h3>
                  <p className="sp-plan-card__tagline">{plan.tagline}</p>
                  {plan.features.length > 0 ? (
                    <ul className="sp-plan-card__features" role="list">
                      {plan.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              );
            })}
          </div>

          <p className="sp-plans-note mt-6 flex items-start gap-2 text-sm text-[color:var(--muted-foreground)]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand-orange)]" />
            {INSURANCE_PLANS_NOTE}
          </p>
        </div>
      </section>

      <section className="hotels-section hotels-section--alt" aria-labelledby="insurance-cta-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceCtaBanner
            headingId="insurance-cta-heading"
            icon={ShieldCheck}
            title={blocks.ctaTitle ?? INSURANCE_CTA.title}
            subtitle={blocks.ctaSubtitle ?? INSURANCE_CTA.subtitle}
            buttonLabel={blocks.ctaButtonLabel ?? INSURANCE_CTA.buttonLabel}
            buttonHint={INSURANCE_CTA.buttonHint}
            buttonIcon={Mail}
            variant="brand"
            layout="pill"
            onAction={() => openInquiry()}
          />
        </div>
      </section>

      <ServiceCmsExtras service={service} className="hotels-section" />

      <ServiceTrustFooter
        items={trustFooter}
        ariaLabel="Insurance guarantees"
        columns={5}
      />

      {dialog}
    </ServicePageShell>
  );
}
