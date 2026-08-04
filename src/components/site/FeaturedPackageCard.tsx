import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PackagePriceLabel } from "@/components/site/PackagePriceLabel";
import { SafeImage } from "@/components/site/SafeImage";
import { resolvePackageImage } from "@/lib/package-images";
import type { PublicPackage } from "@/lib/public-cms";

function packagePrimaryDestination(pkg: PublicPackage) {
  return pkg.destination.split(",")[0]?.trim() || pkg.title;
}

function formatPackagePrice(amount: string) {
  const trimmed = amount.trim();
  if (!trimmed) return "₹ —";
  if (/[₹Rs]/i.test(trimmed)) return trimmed.replace(/^rs\.?\s*/i, "₹ ");
  return `₹ ${trimmed}`;
}

/** Same card UI as homepage “Featured Holiday Plans”. */
export function FeaturedPackageCard({ pkg }: { pkg: PublicPackage }) {
  const [imageSrc, setImageSrc] = useState(pkg.image);
  const fallback = resolvePackageImage(pkg.slug, packagePrimaryDestination(pkg));

  useEffect(() => {
    setImageSrc(pkg.image);
  }, [pkg.image]);

  return (
    <Link
      to="/holiday-packages/package/$slug"
      params={{ slug: pkg.slug }}
      className="home-featured-package-card group"
      aria-label={`View ${pkg.title} package`}
    >
      <div className="home-featured-package-card__media">
        <SafeImage
          src={imageSrc}
          alt=""
          loading="lazy"
          className="home-featured-package-card__img"
          onError={() => {
            setImageSrc((prev) =>
              fallback && prev !== fallback ? fallback : prev,
            );
          }}
        />
        <span className="home-featured-package-card__duration">
          {pkg.nights}N - {pkg.days}D
        </span>
      </div>
      <div className="home-featured-package-card__body">
        <p className="home-featured-package-card__location">
          {packagePrimaryDestination(pkg)}
        </p>
        <h3 className="home-featured-package-card__title">{pkg.title}</h3>
        <div className="home-featured-package-card__footer">
          <div className="home-featured-package-card__price-block">
            <span className="home-featured-package-card__price-label">Starting From</span>
            <PackagePriceLabel
              amount={formatPackagePrice(pkg.fromPrice)}
              prefix="none"
              perPerson={false}
              variant="inline"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
