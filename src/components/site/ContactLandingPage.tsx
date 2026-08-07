"use client";

import { useEffect, useRef } from "react";
import { Luggage, Mail } from "lucide-react";
import { InquiryForm } from "@/components/site/InquiryForm";
import { ServicePageShell } from "@/components/site/service-premium/ServicePageShell";
import { ServiceHeroSection } from "@/components/site/service-premium/ServiceHeroSection";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import { ServiceCtaBanner } from "@/components/site/service-premium/ServiceCtaBanner";
import { useSiteConfig } from "@/contexts/site-config";
import { lookupCmsIcon } from "@/lib/cms-icons";
import {
  CONTACT_CTA,
  CONTACT_FORM,
  CONTACT_HERO,
  CONTACT_HERO_BADGES,
  CONTACT_METHODS,
  CONTACT_PROMISES,
  CONTACT_TRUST_FOOTER,
  CONTACT_TRUST_STATS,
  resolveContactHero,
} from "@/lib/contact-page-data";
import { ServiceTrustFooter } from "@/components/site/service-premium/ServiceTrustFooter";
import { buildWhatsappHref } from "@/lib/site-links";

type Props = {
  defaultDestination?: string;
  defaultService?: string;
};

const PROMISE_TONES = ["purple", "pink", "orange", "blue"] as const;

export function ContactLandingPage({
  defaultDestination = "",
  defaultService = "general",
}: Props) {
  const site = useSiteConfig();
  const contact = site.pageContent.contact ?? {};
  const formRef = useRef<HTMLDivElement>(null);
  const heroImages = resolveContactHero(contact.bannerUrl);
  const heroEyebrow = contact.eyebrow?.trim() || CONTACT_HERO.eyebrow;
  const heroTitleFirst = contact.titleFirst?.trim() || CONTACT_HERO.titleFirst;
  const heroTitleAccent = contact.titleAccent?.trim() || CONTACT_HERO.titleAccent;
  const heroSubtitle = contact.subtitle?.trim() || CONTACT_HERO.subtitle;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const scrollToForm = () => {
      if (window.location.hash === "#inquiry") {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    scrollToForm();
    window.addEventListener("hashchange", scrollToForm);
    return () => window.removeEventListener("hashchange", scrollToForm);
  }, []);

  const formTitle = contact.formTitle || CONTACT_FORM.title;
  const formSubtitle = contact.formSubtitle || CONTACT_FORM.subtitle;
  const formNote = contact.formNote || CONTACT_FORM.note;
  const ctaTitle = contact.ctaTitle?.trim() || CONTACT_CTA.title;
  const ctaSubtitle = contact.ctaSubtitle?.trim() || CONTACT_CTA.subtitle;
  const promises =
    contact.promises && contact.promises.length > 0
      ? contact.promises.map((item, index) => {
          const fallback =
            CONTACT_PROMISES.find((p) => p.title === item.title) ??
            CONTACT_PROMISES[index % CONTACT_PROMISES.length];
          return {
            icon: lookupCmsIcon(item.icon) ?? fallback.icon,
            title: item.title,
            detail: item.detail,
          };
        })
      : CONTACT_PROMISES;

  const whatsappHref = buildWhatsappHref(
    site.whatsappBase,
    site.whatsappPreset || "Hi YatraNexus, I'd like to plan a trip.",
  );

  function methodDetail(kind: (typeof CONTACT_METHODS)[number]["kind"]): string {
    switch (kind) {
      case "whatsapp":
        return `Quick chat · ${site.phone}`;
      case "phone":
        return site.phone;
      case "email":
        return site.email;
      case "address":
        return site.address;
      case "hours":
        return site.businessHours || "Mon–Sat, 9:00 AM – 7:00 PM IST";
      default:
        return "";
    }
  }

  function methodHref(kind: (typeof CONTACT_METHODS)[number]["kind"]): string | undefined {
    switch (kind) {
      case "whatsapp":
        return whatsappHref;
      case "phone":
        return `tel:${site.phoneRaw}`;
      case "email":
        return `mailto:${site.email}`;
      default:
        return undefined;
    }
  }

  const visibleMethods = CONTACT_METHODS.filter(
    (method) => method.kind !== "hours" || Boolean(site.businessHours),
  );

  const badges = CONTACT_HERO_BADGES;
  const trustItems = CONTACT_TRUST_STATS.map((item) => {
    const title = item.title?.trim() ?? "";
    const detail = item.detail?.trim() ?? "";
    const oneLine = [title, detail].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
    return {
      ...item,
      title: oneLine || title,
      detail: "",
    };
  });

  function scrollToInquiry() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "#inquiry");
    }
  }

  return (
    <ServicePageShell modifier="contact">
      <ServiceHeroSection
        headingId="contact-hero-heading"
        imagePrimary={heroImages.primary}
        imageFallback={heroImages.fallback}
        titleFirst={heroTitleFirst}
        titleAccent={heroTitleAccent}
        subtitle={heroSubtitle}
        badges={badges}
        trustItems={trustItems}
        trustAriaLabel="Ways we can help"
        trustColumns={4}
        heroVariant="light"
        titleStacked
        compact
      >
        <p className="about-hero__eyebrow">
          <span className="about-hero__eyebrow-line" aria-hidden="true" />
          {heroEyebrow}
        </p>
        <h1 id="contact-hero-heading" className="hotels-hero__title hotels-hero__title--stacked">
          <span className="hotels-hero__title-line">{heroTitleFirst}</span>
          <span className="hotels-hero__title-accent text-brand-gradient">
            {heroTitleAccent}
          </span>
        </h1>
        <p className="hotels-hero__lead">{heroSubtitle}</p>
      </ServiceHeroSection>

      <section className="about-section" aria-labelledby="contact-main-heading">
        <div className="about-section__inner">
          <div className="contact-split">
            <div>
              <h2 id="contact-main-heading" className="about-section__title">
                Ways to <span className="text-brand-gradient">Reach Us</span>
              </h2>
              <p className="contact-split__lead">
                Pick the channel that works best — we're here to help you plan with confidence.
              </p>
              <div className="contact-methods">
                {visibleMethods.map(({ icon: Icon, title, accent, kind }) => {
                  const detail = methodDetail(kind);
                  const href = methodHref(kind);
                  const content = (
                    <>
                      <span
                        className={`contact-method-card__icon contact-method-card__icon--${accent}`}
                        aria-hidden="true"
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <p className="contact-method-card__title">{title}</p>
                        <p className="contact-method-card__detail">{detail}</p>
                      </div>
                    </>
                  );

                  if (href) {
                    const external = kind === "whatsapp";
                    return (
                      <a
                        key={kind}
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="contact-method-card"
                      >
                        {content}
                      </a>
                    );
                  }

                  return (
                    <div key={kind} className="contact-method-card contact-method-card--static">
                      {content}
                    </div>
                  );
                })}
              </div>

              {site.mapEmbedUrl ? (
                <div className="contact-map">
                  <iframe
                    title="Office location"
                    src={site.mapEmbedUrl}
                    className="contact-map__frame"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : null}
            </div>

            <div id="inquiry" ref={formRef} className="contact-form-panel scroll-mt-24">
              <div className="contact-form-panel__heading">
                <h2 id="contact-inquiry-heading" className="about-section__title">
                  {(formTitle || "Send an Inquiry").split(" ").slice(0, -1).join(" ") || "Send an"}{" "}
                  <span className="text-brand-gradient">
                    {(formTitle || "Send an Inquiry").split(" ").slice(-1)[0]}
                  </span>
                </h2>
                <p className="contact-split__lead">{formSubtitle}</p>
              </div>
              <div className="contact-form-panel__fields">
                <InquiryForm
                  sourcePage="/contact"
                  showSubject
                  title=""
                  defaultService={defaultService}
                  defaultDestination={defaultDestination}
                  submitLabel="Send Inquiry"
                />
                <p className="contact-form-panel__note">{formNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="about-section about-section--alt flights-why-section"
        aria-labelledby="contact-promise-heading"
      >
        <div className="about-section__inner">
          <ServiceSectionHeading
            id="contact-promise-heading"
            title={
              <>
                Why <span className="text-brand-gradient">Contact Us</span>
              </>
            }
            subtitle="Fast, friendly support from real travel experts — not automated replies."
          />
          <div className="contact-promise-grid mt-10">
            {promises.map(({ icon: Icon, title, detail }, index) => {
              const iconTone = PROMISE_TONES[index % PROMISE_TONES.length];
              return (
                <div key={title} className="contact-promise-card">
                  <span
                    className={`contact-promise-card__icon contact-promise-card__icon--${iconTone}`}
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <div className="contact-promise-card__content">
                    <h3 className="contact-promise-card__title">{title}</h3>
                    {detail ? <p className="contact-promise-card__detail">{detail}</p> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-cta" aria-labelledby="contact-cta-heading">
        <div className="about-cta__banner-wrap">
          <ServiceCtaBanner
            headingId="contact-cta-heading"
            icon={Luggage}
            title={ctaTitle}
            subtitle={ctaSubtitle}
            buttonLabel={CONTACT_CTA.buttonLabel}
            buttonHint={CONTACT_CTA.buttonHint}
            buttonIcon={Mail}
            variant="brand"
            layout="pill"
            onAction={scrollToInquiry}
          />
        </div>
      </section>

      <ServiceTrustFooter items={CONTACT_TRUST_FOOTER} ariaLabel="Inquiry process guarantees" />
    </ServicePageShell>
  );
}
