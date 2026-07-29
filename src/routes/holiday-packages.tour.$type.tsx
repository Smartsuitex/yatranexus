import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { HolidayPageHero } from "@/components/site/HolidayPageHero";
import { InquirySection } from "@/components/site/InquirySection";
import { OverlayImageCard } from "@/components/site/OverlayImageCard";
import { PackagePriceLabel } from "@/components/site/PackagePriceLabel";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import { resolveDestinationHero } from "@/lib/holiday-packages-page-data";
import {
  fetchPackagesForTourType,
  fetchPublicHomepageSettings,
} from "@/lib/public-cms";
import { breadcrumbJsonLd, buildPageSeo, mergeSeoHead } from "@/lib/seo";
import { TOUR_TYPES } from "@/lib/site-data";
import { toTitleCase } from "@/lib/utils";

export const Route = createFileRoute("/holiday-packages/tour/$type")({
  staleTime: 0,
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
        title: `${tour.name} Holiday Packages India | YatraNexus`,
        description: `Browse ${tour.name.toLowerCase()} holiday packages with YatraNexus. Custom itineraries planned by travel experts in Ahmedabad.`,
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
              <>
                {toTitleCase(tour.name)}{" "}
                <span className="text-brand-gradient">Holiday Plans</span>
              </>
            }
            subtitle="Browse matching packages — every itinerary can be tailored to your group and budget."
          />
          {relatedPackages.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {relatedPackages.map((pkg) => (
                <OverlayImageCard
                  key={pkg.slug}
                  to="/holiday-packages/package/$slug"
                  params={{ slug: pkg.slug }}
                  image={pkg.image}
                  aspect="wide"
                >
                  <p className="home-dest-card__tagline">
                    {pkg.nights}N / {pkg.days}D · {pkg.destination}
                  </p>
                  <h3 className="home-dest-card__name">{pkg.title}</h3>
                  <PackagePriceLabel amount={pkg.fromPrice} />
                </OverlayImageCard>
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
