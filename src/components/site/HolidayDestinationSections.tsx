import { CheckCircle2 } from "lucide-react";
import { OverlayImageCard } from "@/components/site/OverlayImageCard";
import { PackagePriceLabel } from "@/components/site/PackagePriceLabel";
import { ServiceSectionHeading } from "@/components/site/service-premium/ServiceSectionHeading";
import type { PublicPackage } from "@/lib/public-cms";
import { toTitleCase } from "@/lib/utils";

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
              <>
                {toTitleCase("Top experiences in")}{" "}
                <span className="text-brand-gradient">{destName}</span>
              </>
            }
            subtitle={dest.blurb}
          />
          <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {dest.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 text-sm shadow-soft"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--brand-orange)]" />
                {toTitleCase(h)}
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
              <>
                {toTitleCase("All packages in")}{" "}
                <span className="text-brand-gradient">{destName}</span>
              </>
            }
            subtitle="Browse curated itineraries — every package can be customised to your dates and budget."
          />
          {relatedPackages.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
              {relatedPackages.map((p) => (
                <OverlayImageCard
                  key={p.slug}
                  to="/holiday-packages/package/$slug"
                  params={{ slug: p.slug }}
                  image={p.image}
                  aspect="wide"
                >
                  <p className="home-dest-card__tagline">
                    {p.nights}N / {p.days}D
                  </p>
                  <h3 className="home-dest-card__name">{p.title}</h3>
                  <PackagePriceLabel amount={p.fromPrice} />
                </OverlayImageCard>
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
