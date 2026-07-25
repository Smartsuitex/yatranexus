"use client";

import { Briefcase, Check, Mail } from "lucide-react";
import { useCorporateProposal } from "@/components/site/CorporateProposalDialog";
import { ServiceCmsExtras } from "@/components/site/ServiceCmsExtras";
import { ServiceCtaBanner } from "@/components/site/service-premium/ServiceCtaBanner";
import { ServicePageShell } from "@/components/site/service-premium/ServicePageShell";
import { ServiceHeroSection } from "@/components/site/service-premium/ServiceHeroSection";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import { resolveCmsIcon } from "@/lib/cms-icons";
import {
  CORPORATE_CTA,
  CORPORATE_DETAILED,
  CORPORATE_HERO,
  CORPORATE_HERO_BULLETS,
  CORPORATE_SECTIONS,
  CORPORATE_SERVICE_RIBBON,
  CORPORATE_WHY_CHOOSE,
  CORPORATE_WHY_US_ROW,
} from "@/lib/corporate-page-data";
import { resolveServiceHero } from "@/lib/service-hero-images";
import { SafeImage } from "@/components/site/SafeImage";
import type { PublicService, PublicServiceFeature } from "@/lib/public-cms";

const ACCENTS = ["purple", "orange", "blue", "green"] as const;
const RIBBON_TONES = ["purple", "pink", "blue", "orange", "green", "blue"] as const;

function splitHeading(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) return { lead: title, accent: "" };
  return {
    lead: words.slice(0, -1).join(" "),
    accent: words[words.length - 1] ?? "",
  };
}

function mapFeatures(
  items: PublicServiceFeature[] | undefined,
  fallback: Array<{
    icon: ReturnType<typeof resolveCmsIcon>;
    title: string;
    detail?: string;
    image?: string;
  }>,
) {
  if (items && items.length > 0) {
    return items.map((f) => ({
      icon: resolveCmsIcon(f.icon),
      title: f.title,
      detail: f.detail,
      image: f.image?.trim() || "",
    }));
  }
  return fallback.map((s) => ({
    icon: s.icon,
    title: s.title,
    detail: s.detail ?? "",
    image: s.image ?? "",
  }));
}

function resolveDetailedPoints(
  item: PublicServiceFeature,
  fallbackPoints: string[],
): string[] {
  if (item.points && item.points.length > 0) return item.points;
  const lines = item.detail
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length > 1) return lines.slice(1);
  return fallbackPoints;
}

type Props = {
  service?: PublicService | null;
};

export function CorporateLandingPage({ service }: Props) {
  const blocks = service?.contentBlocks ?? {};
  const titleFirst = blocks.titleFirst ?? CORPORATE_HERO.titleFirst;
  const titleAccent = blocks.titleAccent ?? CORPORATE_HERO.titleAccent;
  const subtitle = service?.description?.trim() || CORPORATE_HERO.subtitle;
  const hero = resolveServiceHero("corporate", service?.bannerUrl);
  const heroBullets =
    blocks.heroBullets && blocks.heroBullets.length > 0
      ? blocks.heroBullets.map((b) => b.trim()).filter(Boolean)
      : CORPORATE_HERO_BULLETS;
  const serviceRibbon =
    blocks.features && blocks.features.length > 0
      ? blocks.features.map((f) => ({
          icon: resolveCmsIcon(f.icon),
          title:
            f.title.trim().toLowerCase() === "dedicated support"
              ? "Dedicated Account Manager"
              : f.title,
          detail: f.detail,
        }))
      : CORPORATE_SERVICE_RIBBON;
  const proposalTitle =
    blocks.proposalTitle?.trim() || "Request a Corporate Travel Proposal";

  const { openProposal, dialog } = useCorporateProposal({
    dialogTitle: proposalTitle,
    dialogDescription: blocks.proposalLead?.trim() || CORPORATE_SECTIONS.proposalLead,
  });

  const detailedTitle = blocks.detailedSectionTitle?.trim() || "Our Corporate Services";
  const { lead: detailedLead, accent: detailedAccent } = splitHeading(detailedTitle);

  const detailedRows =
    blocks.detailedServices && blocks.detailedServices.length > 0
      ? blocks.detailedServices.map((item, index) => {
          const fallback = CORPORATE_DETAILED[index % CORPORATE_DETAILED.length];
          return {
            title: item.title,
            detail: item.detail.split("\n")[0]?.trim() || item.detail,
            points: resolveDetailedPoints(item, fallback.points),
            image: item.image?.trim() || fallback.image,
            icon: resolveCmsIcon(item.icon),
            accent: (item.accent && ACCENTS.includes(item.accent)
              ? item.accent
              : ACCENTS[index % ACCENTS.length]) as (typeof ACCENTS)[number],
          };
        })
      : CORPORATE_DETAILED.map((item) => ({
          title: item.title,
          detail: item.detail,
          points: item.points,
          image: item.image,
          icon: item.icon,
          accent: item.accent,
        }));

  const whyChoose = mapFeatures(
    blocks.whyChoose,
    CORPORATE_WHY_CHOOSE.map((w) => ({
      icon: w.icon,
      title: w.title,
      detail: w.detail ?? "",
    })),
  );

  const whyUs = mapFeatures(
    blocks.whyUs,
    CORPORATE_WHY_US_ROW.map((w) => ({
      icon: w.icon,
      title: w.title,
      detail: w.detail ?? "",
    })),
  );
  const showWhyUs = Boolean(blocks.whyUs && blocks.whyUs.length > 0);

  const whyChooseTitle = blocks.whyChooseTitle?.trim() || "Why Choose YatraNexus?";
  const { lead: whyChooseLeadText, accent: whyChooseAccent } = splitHeading(whyChooseTitle);
  const whyUsTitle = blocks.whyUsTitle?.trim() || "Why partner with us";
  const { lead: whyUsLeadText, accent: whyUsAccent } = splitHeading(whyUsTitle);

  const ctaTitle = blocks.ctaTitle?.trim() || CORPORATE_CTA.title;
  const ctaSubtitle = blocks.ctaSubtitle?.trim() || CORPORATE_CTA.subtitle;
  const ctaButtonLabel = blocks.ctaButtonLabel?.trim() || CORPORATE_CTA.buttonLabel;

  return (
    <ServicePageShell modifier="corporate">
      <ServiceHeroSection
        headingId="corporate-hero-heading"
        imagePrimary={hero.primary}
        imageFallback={hero.fallback}
        titleFirst={titleFirst}
        titleAccent={titleAccent}
        subtitle={subtitle}
        badges={[]}
        compact
      >
        <h1 id="corporate-hero-heading" className="hotels-hero__title">
          <span>{titleFirst}</span>{" "}
          <span className="text-brand-gradient">{titleAccent}</span>
        </h1>
        <p className="hotels-hero__lead">{subtitle}</p>
        <ul className="corp-hero-bullets mt-5" role="list">
          {heroBullets.map((bullet) => (
            <li key={bullet} className="corp-hero-bullets__item">
              <span className="corp-hero-bullets__check" aria-hidden="true">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </ServiceHeroSection>

      <div className="corp-ribbon" role="region" aria-label="Corporate travel services">
        <div className="corp-ribbon__inner">
          {serviceRibbon.map(({ icon: Icon, title }, index) => (
            <div key={`${title}-${index}`} className="corp-ribbon__item">
              <span
                className={`corp-ribbon__icon corp-ribbon__icon--${RIBBON_TONES[index % RIBBON_TONES.length]}`}
                aria-hidden="true"
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <p className="corp-ribbon__title">{title}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="sp-light-section corp-detailed-section" aria-labelledby="corp-detailed-heading">
        <div className="corp-section-inner mx-auto max-w-7xl sm:px-6 lg:px-8">
          <ServiceSectionHeading
            id="corp-detailed-heading"
            title={
              detailedTitle === "Our Corporate Services" || !blocks.detailedSectionTitle?.trim() ? (
                <>
                  Our{" "}
                  <span className="corp-detailed-heading__accent corp-detailed-heading__accent--purple">
                    Corporate
                  </span>{" "}
                  <span className="corp-detailed-heading__accent corp-detailed-heading__accent--orange">
                    Services
                  </span>
                </>
              ) : detailedAccent ? (
                <>
                  {detailedLead}{" "}
                  <span className="text-brand-gradient">{detailedAccent}</span>
                </>
              ) : (
                detailedTitle
              )
            }
            subtitle={blocks.detailedLead ?? CORPORATE_SECTIONS.detailedLead}
          />
          <div className="corp-detailed-rows">
            {detailedRows.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={`${item.title}-${index}`} className="corp-detailed-card">
                  <div className="corp-detailed-card__media">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      width={960}
                      height={640}
                      className="corp-detailed-card__img"
                    />
                  </div>
                  <div className="corp-detailed-card__content">
                    <div className="corp-detailed-card__head">
                      <span
                        className={`corp-detailed-card__icon corp-detailed-card__icon--${item.accent}`}
                        aria-hidden="true"
                      >
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </span>
                      <h3 className="corp-detailed-card__title">{item.title}</h3>
                    </div>
                    <p className="corp-detailed-card__detail">{item.detail}</p>
                    {item.points?.length ? (
                      <ul className="corp-detailed-card__points">
                        {item.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sp-light-section corp-why-section" aria-labelledby="corp-why-heading">
        <div className="corp-section-inner mx-auto max-w-7xl sm:px-6 lg:px-8">
          <ServiceSectionHeading
            id="corp-why-heading"
            title={
              whyChooseAccent ? (
                <>
                  {whyChooseLeadText}{" "}
                  <span className="text-brand-gradient">{whyChooseAccent}</span>
                </>
              ) : (
                whyChooseTitle
              )
            }
            subtitle={blocks.whyChooseLead ?? CORPORATE_SECTIONS.whyChooseLead}
          />
          <div className="hotels-why-grid hotels-why-grid--4">
            {whyChoose.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="hotels-why-card">
                <span className="hotels-why-card__icon" aria-hidden="true">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </span>
                <h3 className="hotels-why-card__title">{title}</h3>
                {detail ? <p className="hotels-why-card__detail">{detail}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {showWhyUs ? (
        <section className="sp-light-section corp-why-section" aria-labelledby="corp-why-us-heading">
          <div className="corp-section-inner mx-auto max-w-7xl sm:px-6 lg:px-8">
            <ServiceSectionHeading
              id="corp-why-us-heading"
              title={
                whyUsAccent ? (
                  <>
                    {whyUsLeadText}{" "}
                    <span className="text-brand-gradient">{whyUsAccent}</span>
                  </>
                ) : (
                  whyUsTitle
                )
              }
              subtitle={blocks.whyUsLead}
            />
            <div className="hotels-why-grid hotels-why-grid--4">
              {whyUs.map(({ icon: Icon, title, detail }) => (
                <div key={title} className="hotels-why-card">
                  <span className="hotels-why-card__icon" aria-hidden="true">
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </span>
                  <h3 className="hotels-why-card__title">{title}</h3>
                  {detail ? <p className="hotels-why-card__detail">{detail}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="hotels-section corp-cta-section" aria-labelledby="corp-cta-heading">
        <div className="corp-section-inner mx-auto max-w-7xl sm:px-6 lg:px-8">
          <ServiceCtaBanner
            headingId="corp-cta-heading"
            icon={Briefcase}
            title={ctaTitle}
            subtitle={ctaSubtitle}
            buttonLabel={ctaButtonLabel}
            buttonHint={CORPORATE_CTA.buttonHint}
            buttonIcon={Mail}
            variant="brand"
            layout="pill"
            onAction={openProposal}
          />
        </div>
      </section>

      {service ? <ServiceCmsExtras service={service} className="hotels-section hotels-section--alt" /> : null}

      {dialog}
    </ServicePageShell>
  );
}
