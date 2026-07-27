"use client";

import { Link } from "@tanstack/react-router";
import type { FooterNavItem } from "./footer-data";
import { FOOTER_COLORS } from "./footer-data";

type FooterLinkListProps = {
  title?: string;
  items: FooterNavItem[];
};

function FooterNavLink({ item }: { item: FooterNavItem }) {
  const className =
    "inline-block text-[13px] leading-snug transition-colors duration-200 hover:text-[#F47C20]";
  const style = { color: `${FOOTER_COLORS.purple}D9` };

  if (item.href) {
    return (
      <a href={item.href} className={className} style={style}>
        {item.label}
      </a>
    );
  }

  if (item.to === "/holiday-packages/tour/$type" && item.params?.type) {
    return (
      <Link
        to="/holiday-packages/tour/$type"
        params={{ type: item.params.type }}
        className={className}
        style={style}
      >
        {item.label}
      </Link>
    );
  }

  if (item.to === "/services/$slug" && item.params?.slug) {
    return (
      <Link
        to="/services/$slug"
        params={{ slug: item.params.slug }}
        className={className}
        style={style}
      >
        {item.label}
      </Link>
    );
  }

  switch (item.to) {
    case "/services":
      return (
        <Link to="/services" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/services/cabs":
      return (
        <Link to="/services/cabs" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/holiday-packages/domestic":
      return (
        <Link to="/holiday-packages/domestic" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/holiday-packages/international":
      return (
        <Link
          to="/holiday-packages/international"
          className={className}
          style={style}
        >
          {item.label}
        </Link>
      );
    case "/corporate":
      return (
        <Link to="/corporate" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/holiday-packages":
      return (
        <Link to="/holiday-packages" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/services/visa":
      return (
        <Link to="/services/visa" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/services/insurance":
      return (
        <Link to="/services/insurance" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/services/flights":
      return (
        <Link to="/services/flights" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/services/hotels":
      return (
        <Link to="/services/hotels" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/services/forex":
      return (
        <Link to="/services/forex" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/about":
      return (
        <Link to="/about" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/contact":
      return (
        <Link to="/contact" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/blog":
      return (
        <Link to="/blog" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/faq":
      return (
        <Link to="/faq" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/privacy-policy":
      return (
        <Link to="/privacy-policy" className={className} style={style}>
          {item.label}
        </Link>
      );
    case "/terms":
      return (
        <Link to="/terms" className={className} style={style}>
          {item.label}
        </Link>
      );
    default:
      return (
        <Link to="/" className={className} style={style}>
          {item.label}
        </Link>
      );
  }
}

export function FooterLinkColumn({ title, items }: FooterLinkListProps) {
  return (
    <div className="text-center sm:text-left">
      {title ? (
        <h3
          className="font-display text-base font-bold tracking-tight"
          style={{ color: FOOTER_COLORS.purple }}
        >
          {title}
        </h3>
      ) : null}
      <ul className={title ? "mt-2.5 space-y-1.5" : "space-y-1.5"}>
        {items.map((item) => (
          <li key={`${item.label}-${item.to ?? item.href}`}>
            <div className="inline-block transition-transform hover:translate-x-1">
              <FooterNavLink item={item} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Services as one titled block with two compact link columns. */
export function FooterServicesColumns({
  left,
  right,
}: {
  left: FooterNavItem[];
  right: FooterNavItem[];
}) {
  return (
    <div className="text-center sm:text-left">
      <h3
        className="font-display text-base font-bold tracking-tight"
        style={{ color: FOOTER_COLORS.purple }}
      >
        Services
      </h3>
      <div className="mt-2.5 grid grid-cols-1 gap-x-5 gap-y-0 min-[400px]:grid-cols-2 sm:gap-x-6">
        <ul className="space-y-2 sm:space-y-1.5">
          {left.map((item) => (
            <li key={`${item.label}-${item.to ?? item.href}`}>
              <div className="inline-block transition-transform hover:translate-x-1">
                <FooterNavLink item={item} />
              </div>
            </li>
          ))}
        </ul>
        <ul className="mt-2 space-y-2 min-[400px]:mt-0 sm:space-y-1.5">
          {right.map((item) => (
            <li key={`${item.label}-${item.to ?? item.href}`}>
              <div className="inline-block transition-transform hover:translate-x-1">
                <FooterNavLink item={item} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
