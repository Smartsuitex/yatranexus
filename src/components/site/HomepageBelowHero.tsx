import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Headphones,
  MessageCircle,
  Plane,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { resolveCmsIcon } from "@/lib/cms-icons";
import { useSiteConfig } from "@/contexts/site-config";
import { buildWhatsappHref } from "@/lib/site-links";
import {
  nextCorporateBannerFallback,
  resolveCorporateBanner,
} from "@/lib/site-images";
import { FeaturedPackageCard } from "@/components/site/FeaturedPackageCard";
import { SafeImage } from "@/components/site/SafeImage";
import type {
  PublicDestination,
  PublicPackage,
} from "@/lib/public-cms";

const HOME_HOW_IT_WORKS_ICONS = [MessageCircle, Headphones, Plane] as const;

function splitBrandTitle(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return { lead: title.trim(), accent: "" };
  return {
    lead: words.slice(0, -1).join(" "),
    accent: words[words.length - 1] ?? "",
  };
}

function DomesticDestinationsGrid({
  destinations,
  prices,
  taglines,
}: {
  destinations: PublicDestination[];
  prices?: Record<string, string>;
  taglines?: Record<string, string>;
}) {
  return (
    <div className="home-domestic-dest-row mt-8">
      {destinations.map((d) => {
        const price = prices?.[d.slug]?.trim();
        const rawTagline = taglines?.[d.slug]?.trim() || "";
        const tagline =
          rawTagline && !/^india$/i.test(rawTagline) ? rawTagline : "";
        return (
          <Link
            key={d.slug}
            to="/holiday-packages/domestic/$state"
            params={{ state: d.slug }}
            className="home-domestic-dest-card group"
            aria-label={`View all ${d.name} holiday packages`}
          >
            <div className="home-domestic-dest-card__media">
              <SafeImage
                src={d.image}
                alt={d.name}
                loading="lazy"
                className="home-domestic-dest-card__img"
              />
            </div>
            <div className="home-domestic-dest-card__body">
              {tagline ? (
                <p className="home-domestic-dest-card__region">{tagline}</p>
              ) : null}
              <h3 className="home-domestic-dest-card__name">{d.name}</h3>
              {price ? (
                <p className="mt-1 text-xs font-semibold text-[color:var(--brand-orange)]">
                  From {price}
                </p>
              ) : null}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export type HomepageBelowHeroProps = {
  featuredPackages: PublicPackage[];
  featuredDestinations: PublicDestination[];
  whyChooseUs: { icon?: string; title: string; detail: string }[];
  tourTypes: { slug: string; name: string; image: string }[];
  howItWorks: { n: number; title: string; detail: string }[];
  testimonials: {
    id?: string;
    name: string;
    city: string;
    text: string;
    rating?: number;
    photoUrl?: string;
    sortOrder?: number;
  }[];
};

export function HomepageBelowHero({
  featuredPackages,
  featuredDestinations,
  whyChooseUs,
  tourTypes,
  howItWorks,
  testimonials,
}: HomepageBelowHeroProps) {
  const site = useSiteConfig();
  const orderedTestimonials = [...testimonials].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name.localeCompare(b.name),
  );
  const homeChrome = site.pageContent.homepage ?? {};
  const domesticDestinations = featuredDestinations.slice(0, 10);
  const homeFeaturedPackages = featuredPackages.slice(0, 5);
  const corporateBannerPrimary = resolveCorporateBanner(homeChrome.corporateBannerUrl);
  const [corporateBannerSrc, setCorporateBannerSrc] = useState(corporateBannerPrimary);
  const [corporateBannerHidden, setCorporateBannerHidden] = useState(false);
  const corporateWhatsappMessage =
    site.corporateWhatsappMessage?.trim() ||
    "Hi YatraNexus, I'd like to discuss corporate travel for my company.";
  const chrome = {
    tourTypesEyebrow: homeChrome.tourTypesEyebrow?.trim() || "Hand-picked for you",
    tourTypesTitle: homeChrome.tourTypesTitle?.trim() || "Tour Type Packages",
    tourTypesLead:
      homeChrome.tourTypesLead?.trim() ||
      "Browse by the kind of trip you're dreaming about — adventure, family, honeymoon and more.",
    featuredEyebrow: homeChrome.featuredEyebrow?.trim() || "Bestsellers",
    featuredTitle: homeChrome.featuredTitle?.trim() || "Featured Holiday Plans",
    domesticEyebrow: homeChrome.domesticEyebrow?.trim() || "Incredible India",
    domesticTitle: homeChrome.domesticTitle?.trim() || "Domestic Destinations",
    whyChooseEyebrow: homeChrome.whyChooseEyebrow?.trim() || "Why choose us",
    whyChooseTitle:
      homeChrome.whyChooseTitle?.trim() ||
      "Travel with people who actually pick up the phone.",
    whyChooseLead:
      homeChrome.whyChooseLead?.trim() ||
      "YatraNexus is built around one promise - every traveller deserves a real expert, not a chatbot. From a weekend Goa break to a multi-country honeymoon, we plan, book and stay with you end-to-end.",
    howItWorksEyebrow: homeChrome.howItWorksEyebrow?.trim() || "3 Simple Steps",
    howItWorksTitle: homeChrome.howItWorksTitle?.trim() || "How It Works",
    howItWorksLead:
      homeChrome.howItWorksLead?.trim() ||
      "From a quick WhatsApp hello to a fully booked trip – here's how easy it is.",
    testimonialsEyebrow: homeChrome.testimonialsEyebrow?.trim() || "Loved by travellers",
    testimonialsTitle: homeChrome.testimonialsTitle?.trim() || "Happy Customers",
    testimonialsLead:
      homeChrome.testimonialsLead?.trim() ||
      "Real stories from real trips planned by our team.",
  };
  const tourTypesHeading = splitBrandTitle(chrome.tourTypesTitle);
  const featuredHeading = splitBrandTitle(chrome.featuredTitle);
  const domesticHeading = splitBrandTitle(chrome.domesticTitle);
  const whyChooseHeading = splitBrandTitle(chrome.whyChooseTitle);
  const howItWorksHeading = splitBrandTitle(chrome.howItWorksTitle);
  const testimonialsHeading = splitBrandTitle(chrome.testimonialsTitle);

  useEffect(() => {
    setCorporateBannerSrc(corporateBannerPrimary);
    setCorporateBannerHidden(false);
  }, [corporateBannerPrimary]);

  return (
    <>
      {tourTypes.length > 0 ? (
        <section className="home-section home-section--cream" aria-labelledby="tour-type-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="home-section__header home-section__header--center">
              <p className="home-tour-type-eyebrow">
                <span className="home-tour-type-eyebrow__line" aria-hidden="true" />
                {chrome.tourTypesEyebrow}
                <span className="home-tour-type-eyebrow__line" aria-hidden="true" />
              </p>
              <h2 id="tour-type-heading" className="home-section__title mt-3">
                {tourTypesHeading.accent ? (
                  <>
                    {tourTypesHeading.lead}{" "}
                    <span className="text-brand-gradient">{tourTypesHeading.accent}</span>
                  </>
                ) : (
                  chrome.tourTypesTitle
                )}
              </h2>
              <p className="home-section__lead">{chrome.tourTypesLead}</p>
            </div>
            <div className="home-tour-type-row mt-8">
              {tourTypes.slice(0, 6).map((tour) => (
                <Link
                  key={tour.slug || tour.name}
                  to="/holiday-packages/tour/$type"
                  params={{ type: tour.slug || tour.name.toLowerCase().replace(/\s+/g, "-") }}
                  className="home-tour-type-card group"
                  aria-label={`Browse ${tour.name} holiday packages`}
                >
                  <SafeImage
                    src={tour.image}
                    alt=""
                    loading="lazy"
                    className="home-tour-type-card__img"
                  />
                  <div className="home-tour-type-card__overlay" aria-hidden="true" />
                  <div className="home-tour-type-card__label">{tour.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {homeFeaturedPackages.length > 0 ? (
        <section
          className="home-section home-featured-packages home-section--cream"
          aria-labelledby="featured-packages-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="home-section__header home-section__header--center">
              <p className="home-tour-type-eyebrow">
                <span className="home-tour-type-eyebrow__line" aria-hidden="true" />
                {chrome.featuredEyebrow}
                <span className="home-tour-type-eyebrow__line" aria-hidden="true" />
              </p>
              <h2 id="featured-packages-heading" className="home-section__title mt-3">
                {featuredHeading.accent ? (
                  <>
                    {featuredHeading.lead}{" "}
                    <span className="text-brand-gradient">{featuredHeading.accent}</span>
                  </>
                ) : (
                  chrome.featuredTitle
                )}
              </h2>
            </div>

            <div className="home-featured-packages-row mt-8">
              {homeFeaturedPackages.map((pkg) => (
                <FeaturedPackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        className="home-section home-domestic-destinations home-section--cream"
        aria-labelledby="domestic-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="home-section__header home-section__header--center">
            <p className="home-tour-type-eyebrow">
              <span className="home-tour-type-eyebrow__line" aria-hidden="true" />
              {chrome.domesticEyebrow}
              <span className="home-tour-type-eyebrow__line" aria-hidden="true" />
            </p>
            <h2 id="domestic-heading" className="home-section__title mt-3">
              {domesticHeading.accent ? (
                <>
                  {domesticHeading.lead}{" "}
                  <span className="text-brand-gradient">{domesticHeading.accent}</span>
                </>
              ) : (
                chrome.domesticTitle
              )}
            </h2>
          </div>

          <DomesticDestinationsGrid
            destinations={domesticDestinations}
            prices={homeChrome.destinationPrices}
            taglines={homeChrome.destinationTaglines}
          />
        </div>
      </section>

      {whyChooseUs.length > 0 ? (
        <section className="home-section home-section--cream" aria-labelledby="why-choose-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="home-why-choose">
              <div className="home-why-choose__intro">
                <p className="home-why-choose__eyebrow">
                  <span className="home-why-choose__eyebrow-line" aria-hidden="true" />
                  {chrome.whyChooseEyebrow}
                </p>
                <h2 id="why-choose-heading" className="home-why-choose__title">
                  {whyChooseHeading.accent ? (
                    <>
                      {whyChooseHeading.lead}{" "}
                      <span className="text-brand-gradient">{whyChooseHeading.accent}</span>
                    </>
                  ) : (
                    chrome.whyChooseTitle
                  )}
                </h2>
                <p className="home-why-choose__lead">{chrome.whyChooseLead}</p>
                <Link to="/" hash="inquiry" className="home-why-choose__cta">
                  Start planning
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="home-why-choose__grid">
              {whyChooseUs.map((item) => {
                const Icon = resolveCmsIcon(item.icon);
                return (
                  <article key={item.title} className="home-why-choose__card">
                    <span className="home-why-choose__icon">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="home-why-choose__card-title">{item.title}</h3>
                      {item.detail ? (
                        <p className="home-why-choose__card-detail">{item.detail}</p>
                      ) : null}
                    </div>
                  </article>
                );
              })}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {!corporateBannerHidden && corporateBannerSrc ? (
        <section className="home-corporate-banner home-section home-section--cream" aria-labelledby="corporate-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="corporate-heading" className="sr-only">
              Corporate and MICE travel simplified for your business
            </h2>
            <div className="home-corporate-banner__frame">
              <SafeImage
                src={corporateBannerSrc}
                alt=""
                loading="lazy"
                onError={() => {
                  const next = nextCorporateBannerFallback(corporateBannerSrc);
                  if (next) setCorporateBannerSrc(next);
                  else setCorporateBannerHidden(true);
                }}
                className="home-corporate-banner__img"
              />
              <Link
                to="/corporate"
                className="home-corporate-banner__hit home-corporate-banner__hit--plans"
                aria-label="Explore corporate plans"
              />
              <a
                href={buildWhatsappHref(site.whatsappBase, corporateWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="home-corporate-banner__hit home-corporate-banner__hit--whatsapp"
                aria-label="Talk on WhatsApp about corporate travel"
              />
            </div>
          </div>
        </section>
      ) : null}

      {howItWorks.length > 0 ? (
        <section
          className="home-section home-how-it-works home-section--cream"
          aria-labelledby="how-it-works-heading"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="home-how-it-works__header">
              <p className="home-how-it-works__eyebrow">
                <span className="home-how-it-works__eyebrow-line" aria-hidden="true" />
                {chrome.howItWorksEyebrow}
              </p>
              <h2 id="how-it-works-heading" className="home-how-it-works__title">
                {howItWorksHeading.accent ? (
                  <>
                    {howItWorksHeading.lead}{" "}
                    <span className="text-brand-gradient">{howItWorksHeading.accent}</span>
                  </>
                ) : (
                  chrome.howItWorksTitle
                )}
              </h2>
              <p className="home-how-it-works__lead">{chrome.howItWorksLead}</p>
            </div>
            <ol className="home-how-it-works__grid">
              {howItWorks.slice(0, 3).map((step, index) => {
                const Icon = HOME_HOW_IT_WORKS_ICONS[index] ?? MessageCircle;
                return (
                  <li key={step.title} className="home-how-it-works__card">
                    <span className="home-how-it-works__step-badge">
                      Step {step.n}
                    </span>
                    <span className="home-how-it-works__icon" aria-hidden="true">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="home-how-it-works__card-title">{step.title}</h3>
                    <p className="home-how-it-works__card-detail">{step.detail}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      ) : null}

      <section
        className="home-section home-happy-customers home-section--cream"
        aria-labelledby="testimonials-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="home-happy-customers__header">
            <p className="home-happy-customers__eyebrow">
              <span className="home-happy-customers__eyebrow-line" aria-hidden="true" />
              {chrome.testimonialsEyebrow}
              <span className="home-happy-customers__eyebrow-line" aria-hidden="true" />
            </p>
            <h2 id="testimonials-heading" className="home-happy-customers__title">
              {testimonialsHeading.accent ? (
                <>
                  {testimonialsHeading.lead}{" "}
                  <span className="text-brand-gradient">{testimonialsHeading.accent}</span>
                </>
              ) : (
                chrome.testimonialsTitle
              )}
            </h2>
            <p className="home-happy-customers__lead">{chrome.testimonialsLead}</p>
          </div>

          <div className="home-happy-customers__grid">
            {orderedTestimonials.slice(0, 6).map((t, index) => (
              <article key={t.id ?? `${t.name}-${t.city}-${index}`} className="home-happy-customers__card">
                <span className="home-happy-customers__quote" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="home-happy-customers__text">{t.text}</p>
                <div className="home-happy-customers__footer">
                  <div className="min-w-0">
                    <p className="home-happy-customers__name">{t.name}</p>
                    <p className="home-happy-customers__city">{t.city}</p>
                  </div>
                  <div
                    className="home-happy-customers__stars"
                    aria-label={`${Math.min(5, Math.max(1, Number(t.rating) || 5))} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => {
                      const filled = i < Math.min(5, Math.max(1, Number(t.rating) || 5));
                      return (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${filled ? "fill-current" : "fill-none opacity-35"}`}
                          aria-hidden="true"
                        />
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
