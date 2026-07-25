import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import {
  BookPackageButton,
  InquiryDialogCta,
  InquiryDialogProvider,
} from "@/components/site/InquiryDialog";
import { HolidayPageHero } from "@/components/site/HolidayPageHero";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import { CheckCircle2 } from "lucide-react";
import { PackagePriceLabel } from "@/components/site/PackagePriceLabel";
import { resolveDestinationHero } from "@/lib/holiday-packages-page-data";
import {
  fetchPublicDestinations,
  fetchPublicPackageBySlug,
  packageMatchesDestination,
} from "@/lib/public-cms";

export const Route = createFileRoute("/holiday-packages/package/$slug")({
  staleTime: 0,
  loader: async ({ params }) => {
    const pkg = await fetchPublicPackageBySlug(params.slug);
    if (!pkg) throw notFound();

    const scope = pkg.scope === "international" ? "international" : "domestic";
    const destinations = await fetchPublicDestinations(scope);
    const dest =
      destinations.find((d) => packageMatchesDestination(pkg, d)) ??
      destinations.find(
        (d) =>
          d.name.toLowerCase() === pkg.destination.toLowerCase() ||
          pkg.destination.toLowerCase().includes(d.name.toLowerCase()) ||
          d.name.toLowerCase().includes(pkg.destination.toLowerCase().split(",")[0] ?? ""),
      );

    return { pkg, dest };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title:
              loaderData.pkg.metaTitle ??
              `${loaderData.pkg.title} — ${loaderData.pkg.fromPrice} | YatraNexus`,
          },
          {
            name: "description",
            content:
              loaderData.pkg.metaDescription ??
              loaderData.pkg.overview ??
              `${loaderData.pkg.nights} nights / ${loaderData.pkg.days} days in ${loaderData.pkg.destination}.`,
          },
          { property: "og:title", content: `${loaderData.pkg.title} | YatraNexus` },
          { property: "og:image", content: loaderData.pkg.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="p-20 text-center">
      <h1 className="font-display text-3xl">Package not found</h1>
      <Link to="/holiday-packages" className="mt-4 inline-block text-[color:var(--brand-orange)]">
        ← Browse all packages
      </Link>
    </div>
  ),
  component: PackagePage,
});

function PackagePage() {
  const { pkg, dest } = Route.useLoaderData();
  const hero = resolveDestinationHero(pkg.image);
  const overview =
    pkg.overview?.trim() ||
    pkg.metaDescription?.trim() ||
    `${pkg.nights} nights / ${pkg.days} days in ${pkg.destination} — fully customisable with our travel experts.`;
  const highlights =
    pkg.highlights && pkg.highlights.length > 0 ? pkg.highlights : pkg.inclusions;

  const inquiryProps = {
    defaultService: "packages" as const,
    hideServiceSelect: true,
    defaultDestination: pkg.destination,
    packageName: pkg.title,
    sourcePage: `/holiday-packages/package/${pkg.slug}`,
  };

  const destinationCrumb = dest
    ? pkg.scope === "international"
      ? {
          label: dest.name,
          to: "/holiday-packages/international/$country",
          params: { country: dest.slug },
        }
      : {
          label: dest.name,
          to: "/holiday-packages/domestic/$state",
          params: { state: dest.slug },
        }
    : {
        label: pkg.destination,
        to:
          pkg.scope === "international"
            ? "/holiday-packages/international"
            : "/holiday-packages/domestic",
      };

  return (
    <InquiryDialogProvider
      buttonLabel="Book Package"
      dialogTitle="Customise this package"
      dialogDescription="Share your dates and preferences — our team will confirm availability and pricing."
      {...inquiryProps}
    >
      <div className="holiday-packages-page">
        <Breadcrumbs
          items={[
            { label: "Holiday packages", to: "/holiday-packages" },
            destinationCrumb,
            { label: pkg.title },
          ]}
        />
        <HolidayPageHero
          headingId="holiday-package-hero-heading"
          eyebrow={`${pkg.nights}N / ${pkg.days}D · ${pkg.destination}`}
          titleFirst={pkg.title}
          subtitle={
            <>
              <PackagePriceLabel amount={pkg.fromPrice} prefix="from" variant="inline" /> — fully
              customisable with our travel experts.
            </>
          }
          imagePrimary={hero.primary}
          imageFallback={hero.fallback}
        >
          <BookPackageButton className="hotels-hero__cta mt-6" />
        </HolidayPageHero>

        <section className="about-section package-detail-content" aria-labelledby="package-overview-heading">
          <div className="about-section__inner package-detail-stack">
            <div className="package-detail-block">
              <div className="package-full-card" aria-labelledby="package-overview-heading">
                <ServiceSectionHeading
                  id="package-overview-heading"
                  title={
                    <>
                      Package <span className="text-brand-gradient">overview</span>
                    </>
                  }
                />
                <div className="package-full-card__body">
                  {overview
                    .split(/(?<=\.)\s+(?=[A-Z])/)
                    .filter(Boolean)
                    .map((para) => (
                      <p key={para.slice(0, 48)} className="package-overview-panel__text">
                        {para.trim()}
                      </p>
                    ))}
                </div>
              </div>
            </div>

            {highlights.length > 0 && (
              <div className="package-detail-block">
                <ServiceSectionHeading
                  id="package-highlights-heading"
                  title={
                    <>
                      Package <span className="text-brand-gradient">highlights</span>
                    </>
                  }
                />
                <ul className="package-highlights-grid">
                  {highlights.map((item) => (
                    <li key={item} className="package-highlight-card">
                      <CheckCircle2 className="package-highlight-card__icon" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="package-detail-block">
              <ServiceSectionHeading
                id="package-itinerary-heading"
                title={
                  <>
                    Day-wise <span className="text-brand-gradient">itinerary</span>
                  </>
                }
                subtitle={`${pkg.days} days / ${pkg.nights} nights in ${pkg.destination}.`}
              />
              <ol className="package-itinerary-list">
                {pkg.itinerary.map((day) => (
                  <li key={day.day} className="package-itinerary-card">
                    <div className="package-itinerary-card__day">Day {day.day}</div>
                    <h3 className="package-itinerary-card__title">{day.title}</h3>
                    <p className="package-itinerary-card__detail">{day.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <InquiryDialogCta subtitle="Share your dates and preferences — our team will confirm availability and pricing." />
      </div>
    </InquiryDialogProvider>
  );
}
