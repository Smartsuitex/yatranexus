import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { HolidayDestinationSections } from "@/components/site/HolidayDestinationSections";
import { HolidayPageHero } from "@/components/site/HolidayPageHero";
import { InquirySection } from "@/components/site/InquirySection";
import { resolveDestinationHero } from "@/lib/holiday-packages-page-data";
import {
  fetchPackagesForDestination,
  fetchPublicDestinationBySlug,
} from "@/lib/public-cms";
import { toTitleCase } from "@/lib/utils";

export const Route = createFileRoute("/holiday-packages/domestic/$state")({
  staleTime: 0,
  loader: async ({ params }) => {
    const dest = await fetchPublicDestinationBySlug(params.state, "domestic");
    if (!dest) throw notFound();
    const relatedPackages = await fetchPackagesForDestination({
      name: dest.name,
      slug: dest.slug,
      scope: "domestic",
    });
    return { dest, relatedPackages };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.dest.name} Holiday Packages — YatraNexus` },
          {
            name: "description",
            content: `${loaderData.dest.name} packages: ${loaderData.dest.blurb}`,
          },
          { property: "og:title", content: `${loaderData.dest.name} Packages | YatraNexus` },
          { property: "og:description", content: loaderData.dest.blurb },
          { property: "og:image", content: loaderData.dest.image },
        ]
      : [],
  }),
  errorComponent: () => <div className="p-10 text-center">Failed to load destination.</div>,
  notFoundComponent: () => (
    <div className="p-20 text-center">
      <h1 className="font-display text-3xl">Destination not found</h1>
      <Link
        to="/holiday-packages/domestic"
        className="mt-4 inline-block text-[color:var(--brand-orange)]"
      >
        ← Back to all states
      </Link>
    </div>
  ),
  component: StatePage,
});

function StatePage() {
  const { dest, relatedPackages } = Route.useLoaderData();
  const hero = resolveDestinationHero(dest.image);

  return (
    <div className="holiday-packages-page holiday-packages-page--state-hero">
      <Breadcrumbs
        items={[
          { label: "Holiday packages", to: "/holiday-packages" },
          { label: "Domestic holidays", to: "/holiday-packages/domestic" },
          { label: dest.name },
        ]}
      />
      <HolidayPageHero
        headingId="holiday-state-hero-heading"
        eyebrow="Domestic"
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
        defaultDestination={dest.name}
        packageName={`${dest.name} Custom Package`}
        sourcePage={`/holiday-packages/domestic/${dest.slug}`}
      />
    </div>
  );
}
