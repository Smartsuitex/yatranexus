import { createFileRoute } from "@tanstack/react-router";
import { fetchPublicDestinations } from "@/lib/public-cms";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { DestinationCard } from "@/components/site/DestinationCard";
import { HolidayPageHero } from "@/components/site/HolidayPageHero";
import { InquirySection } from "@/components/site/InquirySection";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import { useSiteConfig } from "@/contexts/site-config";
import { DEFAULT_PAGE_CONTENT } from "@/lib/page-content";
import {
  HOLIDAY_DOMESTIC_HERO,
  resolveHolidayHubHero,
} from "@/lib/holiday-packages-page-data";
import { buildPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/holiday-packages/domestic/")({
  loader: async () => {
    const destinations = await fetchPublicDestinations("domestic");
    return { destinations };
  },
  head: () =>
    buildPageSeo({
      path: "/holiday-packages/domestic",
      title: "Domestic Holiday Packages India — Goa, Kerala, Kashmir | YatraNexus",
      description:
        "Domestic holiday packages across India — Goa, Kerala, Rajasthan, Kashmir, Himachal and more. Custom tours from YatraNexus Ahmedabad.",
      keywords: "domestic holiday packages India, India tour packages, Kashmir Kerala Goa packages",
    }),
  component: DomesticIndex,
});

function DomesticIndex() {
  const { destinations } = Route.useLoaderData();
  const site = useSiteConfig();
  const cmsHero = site.pageContent.holidayDomestic ?? DEFAULT_PAGE_CONTENT.holidayDomestic ?? {};
  const hero = resolveHolidayHubHero(cmsHero.bannerUrl);

  return (
    <div className="holiday-packages-page">
      <Breadcrumbs
        items={[
          { label: "Holiday packages", to: "/holiday-packages" },
          { label: "Domestic holidays" },
        ]}
      />
      <HolidayPageHero
        headingId="holiday-domestic-hero-heading"
        eyebrow={cmsHero.eyebrow || HOLIDAY_DOMESTIC_HERO.eyebrow}
        titleFirst={cmsHero.titleFirst || HOLIDAY_DOMESTIC_HERO.titleFirst}
        titleAccent={cmsHero.titleAccent || HOLIDAY_DOMESTIC_HERO.titleAccent}
        subtitle={cmsHero.subtitle || HOLIDAY_DOMESTIC_HERO.subtitle}
        imagePrimary={hero.primary}
        imageFallback={hero.fallback}
        compact
      />
      <section className="about-section" aria-labelledby="holiday-states-heading">
        <div className="about-section__inner">
          <ServiceSectionHeading
            id="holiday-states-heading"
            title={
              <>
                Choose Your <span className="text-brand-gradient">Destination</span>
              </>
            }
            subtitle="Every state card opens highlights and sample packages you can customise."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {destinations.map((d) => (
              <DestinationCard
                key={d.slug}
                d={d}
                to="/holiday-packages/domestic/$state"
                params={{ state: d.slug }}
              />
            ))}
          </div>
        </div>
      </section>

      <InquirySection
        heading="Plan A Domestic Holiday"
        subtitle="Not sure which state to pick? Tell us your dates and budget — we'll suggest the best options."
        defaultService="packages"
        hideServiceSelect
        sourcePage="/holiday-packages/domestic"
      />
    </div>
  );
}
