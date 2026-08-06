import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FeaturedPackageCard } from "@/components/site/FeaturedPackageCard";
import { HolidayPageHero } from "@/components/site/HolidayPageHero";
import { InquirySection } from "@/components/site/InquirySection";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import { resolveDestinationHero } from "@/lib/holiday-packages-page-data";
import {
  fetchPackagesForTourType,
  fetchPublicHomepageSettings,
} from "@/lib/public-cms";
import {
  brandSeoDescription,
  brandSeoTitle,
  breadcrumbJsonLd,
  buildPageSeo,
  mergeSeoHead,
} from "@/lib/seo";
import { TOUR_TYPES } from "@/lib/site-data";
import { toTitleCase } from "@/lib/utils";

export const Route = createFileRoute("/holiday-packages/tour/$type")({
  staleTime: 5 * 60 * 1000,
  loader: async ({ params }) => {
    const slug = params.type.trim().toLowerCase();
    const homepage = await fetchPublicHomepageSettings();
    const catalog = homepage.tourTypes.length > 0 ? homepage.tourTypes : TOUR_TYPES;
    const tour = catalog.find((t) => t.slug.trim().toLowerCase() === slug);
    if (!tour) throw notFound();

    const relatedPackages = await fetchPackagesForTourType(tour);
    return { tour, relatedPackages };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { tour } = loaderData;
    const path = `/holiday-packages/tour/${tour.slug}`;
    return mergeSeoHead(
      buildPageSeo({
        path,
        title: brandSeoTitle(`${tour.name} Holiday Packages`),
        description: brandSeoDescription(
          `${tour.name} holiday packages & custom itineraries across India`,
        ),
        image: tour.image,
        keywords: `${tour.name} packages, ${tour.name} tour India, YatraNexus`,
      }),
      {
        jsonLd: [
          breadcrumbJsonLd([
            { name: "Holiday Packages", path: "/holiday-packages" },
            { name: tour.name, path },
          ]),
        ],
      },
    );
  },
  errorComponent: () => <div className="p-10 text-center">Failed to load tour type.</div>,
  notFoundComponent: () => (
    <div className="p-20 text-center">
      <h1 className="font-display text-3xl">Tour type not found</h1>
      <Link to="/holiday-packages" className="mt-4 inline-block text-[color:var(--brand-orange)]">
        ← Back to holiday packages
      </Link>
    </div>
  ),
  component: TourTypePage,
});

function TourTypePage() {
  const { tour, relatedPackages } = Route.useLoaderData();
  const hero = resolveDestinationHero(tour.image);

  return (
    <div className="holiday-packages-page">
      <Breadcrumbs
        items={[
          { label: "Holiday packages", to: "/holiday-packages" },
          { label: `${tour.name} packages` },
        ]}
      />
      <HolidayPageHero
        headingId="holiday-tour-type-hero-heading"
        eyebrow="Tour type"
        titleFirst={tour.name}
        titleAccent="Packages"
        subtitle={`Hand-picked ${tour.name.toLowerCase()} holidays — customise dates, hotels and experiences with a real travel expert.`}
        imagePrimary={hero.primary}
        imageFallback={hero.fallback}
      />

      <section className="about-section about-section--alt" aria-labelledby="tour-type-packages-heading">
        <div className="about-section__inner">
          <ServiceSectionHeading
            id="tour-type-packages-heading"
            title={
              <span className="holiday-dest-heading">
                {toTitleCase(tour.name)}{" "}
                <span className="text-brand-gradient">Holiday Plans</span>
              </span>
            }
            subtitle="Browse matching packages — every itinerary can be tailored to your group and budget."
          />
          {relatedPackages.length > 0 ? (
            <div className="holiday-featured-packages-row mt-8">
              {relatedPackages.map((pkg) => (
                <FeaturedPackageCard key={pkg.slug} pkg={pkg} />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center text-sm text-muted-foreground">
              No {tour.name.toLowerCase()} packages listed yet. Send an inquiry and our team will
              craft a custom itinerary for you.
            </p>
          )}
        </div>
      </section>

      <InquirySection
        heading={`Plan Your ${toTitleCase(tour.name)} Trip`}
        subtitle="Tell us your dates, group size and budget — our team will share a custom itinerary."
        defaultService="packages"
        hideServiceSelect
        packageName={`${tour.name} Custom Package`}
        sourcePage={`/holiday-packages/tour/${tour.slug}`}
      />
    </div>
  );
}
