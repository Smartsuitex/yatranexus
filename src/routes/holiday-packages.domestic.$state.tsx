import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { HolidayDestinationSections } from "@/components/site/HolidayDestinationSections";
import { HolidayPageHero } from "@/components/site/HolidayPageHero";
import { InquirySection } from "@/components/site/InquirySection";
import { PackagePriceLabel } from "@/components/site/PackagePriceLabel";
import { resolveDestinationHero } from "@/lib/holiday-packages-page-data";
import { heroPreloadLink } from "@/lib/site-images";
import {
  fetchPackagesForDestination,
  fetchPublicDestinationBySlug,
  formatHolidayPrice,
  lowestPackagePriceLabel,
  toPublicPackageCard,
} from "@/lib/public-cms";
import { brandSeoDescription, brandSeoTitle, breadcrumbJsonLd, buildPageSeo, mergeSeoHead } from "@/lib/seo";
import { toTitleCase } from "@/lib/utils";

export const Route = createFileRoute("/holiday-packages/domestic/$state")({
  staleTime: 5 * 60 * 1000,
  loader: async ({ params }) => {
    const dest = await fetchPublicDestinationBySlug(params.state, "domestic");
    if (!dest) throw notFound();
    const relatedPackages = (
      await fetchPackagesForDestination({
        name: dest.name,
        slug: dest.slug,
        scope: "domestic",
      })
    ).map(toPublicPackageCard);
    return { dest, relatedPackages };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const { dest } = loaderData;
    const path = `/holiday-packages/domestic/${dest.slug}`;
    const hero = resolveDestinationHero(dest.image);
    const preload = heroPreloadLink(hero.primary);
    const seo = mergeSeoHead(
      buildPageSeo({
        path,
        title: brandSeoTitle(`${dest.name} Holiday Packages & Tours`),
        description: brandSeoDescription(
          dest.blurb?.trim() || `${dest.name} holiday packages & custom tours`,
        ),
        image: hero.primary || dest.image,
        keywords: `${dest.name} holiday packages, ${dest.name} tour package, ${dest.name} trip from Ahmedabad`,
      }),
      {
        jsonLd: [
          breadcrumbJsonLd([
            { name: "Holiday Packages", path: "/holiday-packages" },
            { name: "Domestic", path: "/holiday-packages/domestic" },
            { name: dest.name, path },
          ]),
        ],
      },
    );
    return {
      meta: seo.meta,
      links: [...seo.links, ...(preload ? [preload] : [])],
      scripts: seo.scripts,
    };
  },
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
  const startingFrom = lowestPackagePriceLabel(relatedPackages);

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
      >
        {startingFrom ? (
          <p className="holiday-hero-starting-price mt-4">
            <PackagePriceLabel
              amount={formatHolidayPrice(startingFrom)}
              prefix="starting"
              perPerson={false}
              variant="inline"
            />
          </p>
        ) : null}
      </HolidayPageHero>
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
