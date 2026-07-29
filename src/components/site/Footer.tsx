"use client";

import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useSiteConfig } from "@/contexts/site-config";
import { COMPANY } from "@/lib/site-data";
import { DEFAULT_PAGE_CONTENT } from "@/lib/page-content";
import { FooterBrandColumn, FooterContactColumn } from "./footer/FooterBrandColumn";
import { FooterDecor } from "./footer/FooterDecor";
import {
  FooterLinkColumn,
  FooterServicesColumns,
} from "./footer/FooterLinkColumn";
import { FooterWave } from "./footer/FooterWave";
import {
  buildFooterServiceLinks,
  COMPANY_LINKS,
  FOOTER_BRAND_COPY,
  FOOTER_COLORS,
  splitServiceColumns,
  type FooterNavItem,
} from "./footer/footer-data";

const DEFAULT_BOTTOM: FooterNavItem[] = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms", to: "/terms" },
  { label: "Cancellation Policy", to: "/terms" },
  { label: "Cookies", to: "/privacy-policy" },
];

export function Footer() {
  const site = useSiteConfig();
  const year = new Date().getFullYear();

  const description =
    site.footerText?.trim() && !/craft thoughtful journeys/i.test(site.footerText)
      ? site.footerText.trim()
      : FOOTER_BRAND_COPY;

  const serviceLinks = useMemo(() => {
    const explore = site.pageContent.navigation?.exploreLinks;
    const links =
      explore && explore.length > 0
        ? explore.map(
            (item): FooterNavItem => ({
              label: item.label,
              to: item.to,
              href: item.href,
              params: item.params,
            }),
          )
        : buildFooterServiceLinks(site.navLinks);

    return links.filter(
      (l) =>
        l.to !== "/services" && l.label.trim().toLowerCase() !== "all services",
    );
  }, [site.pageContent.navigation?.exploreLinks, site.navLinks]);
  const { left: serviceLeft, right: serviceRight } = useMemo(
    () => splitServiceColumns(serviceLinks),
    [serviceLinks],
  );

  const companyLinks = useMemo(
    () =>
      (site.pageContent.navigation?.companyLinks ??
        DEFAULT_PAGE_CONTENT.navigation?.companyLinks ??
        COMPANY_LINKS) as FooterNavItem[],
    [site.pageContent.navigation?.companyLinks],
  );

  const bottomLinks = useMemo(
    () =>
      (site.pageContent.navigation?.bottomLinks ??
        DEFAULT_PAGE_CONTENT.navigation?.bottomLinks ??
        DEFAULT_BOTTOM) as FooterNavItem[],
    [site.pageContent.navigation?.bottomLinks],
  );

  return (
    <footer className="site-footer relative overflow-hidden" style={{ color: FOOTER_COLORS.purple }}>
      <div className="site-footer__atmosphere" aria-hidden="true">
        <div className="site-footer__atmosphere-shift" />
        <div className="site-footer__blob site-footer__blob--orange" />
        <div className="site-footer__blob site-footer__blob--lavender" />
        <div className="site-footer__blob site-footer__blob--mint" />
      </div>

      <FooterWave />

      <div className="relative">
        <FooterDecor />

        <div className="relative z-[1] mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-6">
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-6 lg:flex lg:flex-row lg:items-start lg:justify-between lg:gap-5 xl:gap-6">
            <div className="col-span-2 shrink-0 sm:col-span-1 lg:max-w-[14rem] xl:max-w-[15rem]">
              <FooterBrandColumn description={description} />
            </div>

            <div className="shrink-0">
              <FooterServicesColumns left={serviceLeft} right={serviceRight} />
            </div>

            <div className="shrink-0">
              <FooterLinkColumn title="Company" items={companyLinks} />
            </div>

            <div className="col-span-2 min-w-0 shrink-0 sm:col-span-1 lg:col-auto lg:max-w-[16rem] xl:max-w-[17rem]">
              <FooterContactColumn
                legalName={site.legalName || COMPANY.legalName}
                address={site.address || COMPANY.address}
                phone={site.phone || COMPANY.phone}
                phoneRaw={site.phoneRaw || COMPANY.phoneRaw}
                email={site.email || COMPANY.email}
                socialLinks={site.socialLinks ?? {}}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[1] border-t" style={{ borderColor: FOOTER_COLORS.border }}>
        <div className="mx-auto flex max-w-6xl flex-row flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3 text-left text-[11px] sm:px-6 sm:text-[12px] lg:grid lg:grid-cols-3 lg:gap-3 lg:px-8 lg:py-3">
          <p className="min-w-0 shrink" style={{ color: `${FOOTER_COLORS.purple}C7` }}>
            © {year} YatraNexus Ventures LLP.
            <span className="hidden sm:inline"> All Rights Reserved.</span>
          </p>

          <p className="hidden text-center sm:block lg:text-center" style={{ color: `${FOOTER_COLORS.purple}C7` }}>
            Made with <span aria-hidden="true">❤️</span> for Travellers
          </p>

          <nav
            className="flex min-w-0 flex-wrap items-center justify-end gap-x-2 gap-y-1"
            aria-label="Legal"
          >
            {bottomLinks.map((item, index) => (
              <span key={item.label} className="inline-flex items-center gap-2">
                {index > 0 ? (
                  <span
                    className="text-[10px]"
                    style={{ color: `${FOOTER_COLORS.purple}55` }}
                    aria-hidden="true"
                  >
                    •
                  </span>
                ) : null}
                {item.href ? (
                  <a
                    href={item.href}
                    className="transition-colors hover:text-[#F47C20]"
                    style={{ color: `${FOOTER_COLORS.purple}C7` }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.to ?? "/"}
                    className="transition-colors hover:text-[#F47C20]"
                    style={{ color: `${FOOTER_COLORS.purple}C7` }}
                  >
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
