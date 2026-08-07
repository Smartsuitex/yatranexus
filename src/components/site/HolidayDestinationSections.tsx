import { CheckCircle2 } from "lucide-react";
import { FeaturedPackageCard } from "@/components/site/FeaturedPackageCard";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import type { PublicPackage } from "@/lib/public-cms";
import { toTitleCase, decodeHtmlEntities } from "@/lib/utils";

type Destination = {
  name: string;
  blurb: string;
  highlights: string[];
};

type Props = {
  dest: Destination;
  relatedPackages: PublicPackage[];
};

export function HolidayDestinationSections({ dest, relatedPackages }: Props) {
  const destName = toTitleCase(dest.name);

  return (
    <>
      <section className="about-section" aria-labelledby="holiday-highlights-heading">
        <div className="about-section__inner">
          <ServiceSectionHeading
            id="holiday-highlights-heading"
            title={
              <span className="holiday-dest-heading">
                {toTitleCase("Top experiences in")}{" "}
                <span className="text-brand-gradient">{destName}</span>
              </span>
            }
            subtitle={decodeHtmlEntities(dest.blurb)}
          />
          <ul className="mt-8 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 lg:grid-cols-3">
            {dest.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm shadow-soft"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand-orange)]" />
                <span className="min-w-0 break-words">{toTitleCase(h)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-section about-section--alt" aria-labelledby="holiday-packages-heading">
        <div className="about-section__inner">
          <ServiceSectionHeading
            id="holiday-packages-heading"
            title={
              <span className="holiday-dest-heading">
                {toTitleCase("All packages in")}{" "}
                <span className="text-brand-gradient">{destName}</span>
              </span>
            }
            subtitle="Browse curated itineraries — every package can be customised to your dates and budget."
          />
          {relatedPackages.length > 0 ? (
            <div className="holiday-featured-packages-row mt-8">
              {relatedPackages.map((p, index) => (
                <FeaturedPackageCard key={p.slug} pkg={p} priority={index < 2} />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center text-sm text-muted-foreground">
              No packages listed for {destName} yet. Send an inquiry and our team will craft a
              custom itinerary for you.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
