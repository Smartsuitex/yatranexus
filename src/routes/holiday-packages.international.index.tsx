import { createFileRoute, redirect } from "@tanstack/react-router";
import { fetchPublicDestinations, resolveShowInternational } from "@/lib/public-cms";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { DestinationCard } from "@/components/site/DestinationCard";
import { HolidayPageHero } from "@/components/site/HolidayPageHero";
import { InquirySection } from "@/components/site/InquirySection";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import { useSiteConfig } from "@/contexts/site-config";
import { DEFAULT_PAGE_CONTENT } from "@/lib/page-content";
import {
  HOLIDAY_INTERNATIONAL_HERO,
  resolveHolidayHubHero,
} from "@/lib/holiday-packages-page-data";

export const Route = createFileRoute("/holiday-packages/international/")({
  loader: async () => {
    const showInternational = await resolveShowInternational();
    if (!showInternational) {
      throw redirect({ to: "/holiday-packages/domestic" });
    }
    const destinations = await fetchPublicDestinations("international");
    return { destinations };
  },
  head: () => ({
    meta: [
      { title: "International Holiday Packages — YatraNexus" },
      {
        name: "description",
        content:
          "International holiday packages — Dubai, Bali, Thailand, Maldives, Singapore, Europe, Turkey and more.",
      },
      { property: "og:title", content: "International Holiday Packages | YatraNexus" },
      {
        property: "og:description",
        content: "Explore the world with curated packages from YatraNexus.",
      },
    ],
  }),
  component: IntlIndex,
});

function IntlIndex() {
  const { destinations } = Route.useLoaderData();
  const site = useSiteConfig();
  const cmsHero =
    site.pageContent.holidayInternational ?? DEFAULT_PAGE_CONTENT.holidayInternational ?? {};
  const hero = resolveHolidayHubHero(cmsHero.bannerUrl);

  return (
    <div className="holiday-packages-page">
      <Breadcrumbs
        items={[
          { label: "Holiday packages", to: "/holiday-packages" },
          { label: "International holidays" },
        ]}
      />
      <HolidayPageHero
        headingId="holiday-intl-hero-heading"
        eyebrow={cmsHero.eyebrow || HOLIDAY_INTERNATIONAL_HERO.eyebrow}
        titleFirst={cmsHero.titleFirst || HOLIDAY_INTERNATIONAL_HERO.titleFirst}
        titleAccent={cmsHero.titleAccent || HOLIDAY_INTERNATIONAL_HERO.titleAccent}
        subtitle={cmsHero.subtitle || HOLIDAY_INTERNATIONAL_HERO.subtitle}
        imagePrimary={hero.primary}
        imageFallback={hero.fallback}
        compact="hub"
      />
      <section className="about-section" aria-labelledby="holiday-intl-dest-heading">
        <div className="about-section__inner">
          <ServiceSectionHeading
            id="holiday-intl-dest-heading"
            title={
              <>
                Popular <span className="text-brand-gradient">destinations</span>
              </>
            }
            subtitle="Explore curated packages and request a personalised quote for any country."
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d) => (
              <DestinationCard
                key={d.slug}
                d={d}
                to="/holiday-packages/international/$country"
                params={{ country: d.slug }}
              />
            ))}
          </div>
        </div>
      </section>

      <InquirySection
        heading="Plan an international holiday"
        subtitle="Share your dream destination and travel dates — our team will build options for you."
        defaultService="packages"
        hideServiceSelect
        sourcePage="/holiday-packages/international"
      />
    </div>
  );
}
