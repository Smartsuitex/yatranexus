"use client";

import { ChevronRight, Clock, Mail, Stamp } from "lucide-react";
import { ServiceCmsExtras } from "@/components/site/ServiceCmsExtras";
import { ServiceCtaBanner } from "@/components/site/service-premium/ServiceCtaBanner";
import { ServicePageShell } from "@/components/site/service-premium/ServicePageShell";
import { ServiceHeroSection } from "@/components/site/service-premium/ServiceHeroSection";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import { useServiceInquiry } from "@/components/site/service-premium/ServiceInquiryDialog";
import { ServiceTrustFooter } from "@/components/site/service-premium/ServiceTrustFooter";
import { resolveServiceHero } from "@/lib/service-hero-images";
import {
  resolveCmsFeatureItems,
  resolveVisaTableRows,
} from "@/lib/service-content-blocks";
import {
  VISA_CTA,
  VISA_DEFAULT_STEPS,
  VISA_HERO,
  VISA_HERO_BADGES,
  VISA_TABLE_SUBTITLE,
  VISA_TRUST_FOOTER,
  VISA_TRUST_STATS,
  VISA_WHY_ITEMS,
} from "@/lib/visa-page-data";
import type { PublicService } from "@/lib/public-cms";

type Props = { service: PublicService };

export function VisaLandingPage({ service }: Props) {
  const hero = resolveServiceHero("visa", service.bannerUrl);
  const blocks = service.contentBlocks;
  const badges = resolveCmsFeatureItems(blocks.heroBadges, VISA_HERO_BADGES, 1)
    .filter((item) => !/end-to-end|safe\s*&\s*secure/i.test(`${item.title} ${item.detail}`))
    .slice(0, 4);
  const trustStats = resolveCmsFeatureItems(blocks.trustItems, VISA_TRUST_STATS, 1)
    .filter((item) => !/end-to-end|safe\s*&\s*secure/i.test(`${item.title} ${item.detail}`))
    .slice(0, 4);
  const whyItems = resolveCmsFeatureItems(blocks.features, VISA_WHY_ITEMS, 1);
  const trustFooter = resolveCmsFeatureItems(blocks.trustFooter, VISA_TRUST_FOOTER, 1);
  const tableRows = resolveVisaTableRows(blocks.visaCountries);
  const steps = [...VISA_DEFAULT_STEPS];
  const { openInquiry, dialog } = useServiceInquiry({
    defaultService: "visa",
    sourcePage: "/services/visa",
    dialogTitle: "Send Visa Inquiry",
    dialogDescription: "Tell us your destination and travel purpose — our visa expert will guide you.",
  });

  return (
    <ServicePageShell modifier="visa">
      <ServiceHeroSection
        headingId="visa-hero-heading"
        imagePrimary={hero.primary}
        imageFallback={hero.fallback}
        titleFirst={VISA_HERO.titleFirst}
        titleAccent={VISA_HERO.titleAccent}
        titleStacked
        subtitle={VISA_HERO.subtitle}
        badges={badges}
        badgeColumns={4}
        trustItems={trustStats}
        trustAriaLabel="Visa service guarantees"
        trustColumns={4}
        heroVariant="light"
        compact
      />

      <section className="hotels-section hotels-section--alt" aria-labelledby="visa-why-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceSectionHeading
            id="visa-why-heading"
            title={
              <>
                Why choose our <span className="text-brand-gradient">Visa Services</span>?
              </>
            }
            subtitle="Expert guidance, secure handling and support from application to approval."
          />
          <div className="hotels-why-grid hotels-why-grid--5">
            {whyItems.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="hotels-why-card">
                <span className="hotels-why-card__icon" aria-hidden="true">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="hotels-why-card__title">{title}</h3>
                {detail ? <p className="hotels-why-card__detail">{detail}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hotels-section" aria-labelledby="visa-steps-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceSectionHeading
            id="visa-steps-heading"
            title={
              <>
                How the <span className="text-brand-gradient">Visa Process</span> Works
              </>
            }
            subtitle="A simple, transparent step-by-step journey."
          />
          <ol className="visa-process mt-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={`${step.n}-${step.title}`} className="visa-process__item">
                  <article className={`visa-process__card visa-process__card--${step.tone}`}>
                    <div className="visa-process__wave" aria-hidden="true">
                      <span className="visa-process__num">
                        {String(step.n).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="visa-process__icon" aria-hidden="true">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="visa-process__title">{step.title}</h3>
                    {step.detail ? (
                      <p className="visa-process__detail">{step.detail}</p>
                    ) : null}
                    <p className="visa-process__duration">
                      <Clock className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                      <span>{step.duration}</span>
                    </p>
                  </article>
                  {index < steps.length - 1 ? (
                    <span className="visa-process__arrow" aria-hidden="true">
                      <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="hotels-section hotels-section--alt" aria-labelledby="visa-table-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceSectionHeading
            id="visa-table-heading"
            title={
              <>
                Our <span className="text-brand-gradient">Visa Services</span>
              </>
            }
            subtitle={blocks.sectionTitle ?? VISA_TABLE_SUBTITLE}
          />

          <div className="visa-services-cards mt-8 lg:hidden">
            {tableRows.map((row) => (
              <article key={row.country} className="visa-services-card">
                <h3 className="visa-services-card__country">{row.country}</h3>
                <dl className="visa-services-card__list">
                  <div>
                    <dt>Tourist Visa</dt>
                    <dd>{row.touristVisa}</dd>
                  </div>
                  <div>
                    <dt>Business Visa</dt>
                    <dd>{row.businessVisa}</dd>
                  </div>
                  <div>
                    <dt>Processing Time</dt>
                    <dd>{row.processingTime}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="sp-visa-table-wrap mt-8 hidden lg:block">
            <table className="sp-visa-table">
              <thead>
                <tr>
                  <th scope="col">Country</th>
                  <th scope="col">Tourist Visa</th>
                  <th scope="col">Business Visa</th>
                  <th scope="col" className="sp-visa-table__time-col">
                    Processing Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.country}>
                    <td className="sp-visa-table__country">{row.country}</td>
                    <td>{row.touristVisa}</td>
                    <td>{row.businessVisa}</td>
                    <td className="sp-visa-table__time">{row.processingTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="visa-services-note mt-4 text-center text-xs text-muted-foreground sm:text-sm">
            Processing times are indicative and may vary by embassy workload, season and applicant profile.
          </p>
        </div>
      </section>

      <section className="hotels-section" aria-labelledby="visa-cta-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceCtaBanner
            headingId="visa-cta-heading"
            icon={Stamp}
            title={service.contentBlocks.ctaTitle ?? VISA_CTA.title}
            subtitle={service.contentBlocks.ctaSubtitle ?? VISA_CTA.subtitle}
            buttonLabel={service.contentBlocks.ctaButtonLabel ?? VISA_CTA.buttonLabel}
            buttonHint={VISA_CTA.buttonHint}
            buttonIcon={Mail}
            variant="brand"
            layout="pill"
            onAction={() => openInquiry()}
          />
        </div>
      </section>

      <ServiceCmsExtras service={service} className="hotels-section hotels-section--alt" />

      <ServiceTrustFooter items={trustFooter} ariaLabel="Visa process guarantees" />

      {dialog}
    </ServicePageShell>
  );
}
