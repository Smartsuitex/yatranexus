import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { HolidayDestinationSections } from "@/components/site/HolidayDestinationSections";
import { HolidayPageHero } from "@/components/site/HolidayPageHero";
import { InquirySection } from "@/components/site/InquirySection";
import { resolveDestinationHero } from "@/lib/holiday-packages-page-data";
import {
  fetchPackagesForDestination,
  fetchPublicDestinationBySlug,
  resolveShowInternational,
} from "@/lib/public-cms";
import { breadcrumbJsonLd, buildPageSeo, mergeSeoHead } from "@/lib/seo";
import { toTitleCase } from "@/lib/utils";

export const Route = createFileRoute("/holiday-packages/international/$country")({
  staleTime: 0,
  loader: async ({ params }) => {
    const showInternational = await resolveShowInternational();
    if (!showInternational) {
      throw redirect({ to: "/holiday-packages/domestic" });
    }
    const dest = await fetchPublicDestinationBySlug(params.country, "international");
    if (!dest) throw notFound();
    const relatedPackages = await fetchPackagesForDestination({
      name: dest.name.split(",")[0] ?? dest.name,
      slug: dest.slug,
      scope: "international",
    });
    return { dest, relatedPackages };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { dest } = loaderData;
    const path = `/holiday-packages/international/${dest.slug}`;
    return mergeSeoHead(
      buildPageSeo({
        path,
        title: `${dest.name} Holiday Packages | YatraNexus`,
        description: `${dest.name} packages: ${dest.blurb}. Book international holidays with YatraNexus.`,
        image: dest.image,
        keywords: `${dest.name} holiday packages, ${dest.name} tour from India`,
      }),
      {
        jsonLd: [
          breadcrumbJsonLd([
            { name: "Holiday Packages", path: "/holiday-packages" },
            { name: "International", path: "/holiday-packages/international" },
            { name: dest.name, path },
          ]),
        ],
      },
    );
  },
  notFoundComponent: () => (
    <div className="p-20 text-center">
      <h1 className="font-display text-3xl">Destination not found</h1>
      <Link
        to="/holiday-packages/international"
        className="mt-4 inline-block text-[color:var(--brand-orange)]"
      >
        ← Back to all destinations
      </Link>
    </div>
  ),
  component: CountryPage,
});

function CountryPage() {
  const { dest, relatedPackages } = Route.useLoaderData();
  const hero = resolveDestinationHero(dest.image);

  return (
    <div className="holiday-packages-page">
      <Breadcrumbs
        items={[
          { label: "Holiday packages", to: "/holiday-packages" },
          { label: "International holidays", to: "/holiday-packages/international" },
          { label: dest.name },
        ]}
      />
      <HolidayPageHero
        headingId="holiday-country-hero-heading"
        eyebrow={dest.region}
        titleFirst=""
        titleAccent={dest.name}
        subtitle={dest.blurb}
        imagePrimary={hero.primary}
        imageFallback={hero.fallback}
      />
      <HolidayDestinationSections dest={dest} relatedPackages={relatedPackages} />
      <InquirySection
        heading={`Plan Your ${toTitleCase(dest.name)} Trip`}
        subtitle="Tell us your dates, group size and budget — our team will share a custom itinerary."
        defaultService="packages"
        hideServiceSelect
        defaultDestination={dest.name.split(",")[0]}
        packageName={`${dest.name} Custom Package`}
        sourcePage={`/holiday-packages/international/${dest.slug}`}
      />
    </div>
  );
}
