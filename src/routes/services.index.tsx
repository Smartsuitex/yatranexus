import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CmsPageHero } from "@/components/site/CmsPageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { InquiryForm } from "@/components/site/InquiryForm";
import { ServicePageShell } from "@/components/site/service-premium/ServicePageShell";
import { resolveCmsIcon } from "@/lib/cms-icons";
import { useSiteConfig } from "@/contexts/site-config";
import { publicNavLinkRoute } from "@/lib/nav-links";
import { DEFAULT_PAGE_CONTENT } from "@/lib/page-content";
import { SITE_IMAGES } from "@/lib/site-images";
import { fetchPublicNavLinks, fetchPublicServices } from "@/lib/public-cms";
import { brandSeoDescription, brandSeoTitle, buildPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  loader: async () => {
    const [services, navLinks] = await Promise.all([
      fetchPublicServices(),
      fetchPublicNavLinks(),
    ]);
    return { services, navLinks };
  },
  head: () =>
    buildPageSeo({
      path: "/services",
      title: brandSeoTitle("Flights, Hotels, Visa, Cabs & Forex"),
      description: brandSeoDescription(
        "Flights, hotels, holidays, cabs, visa, insurance, forex & corporate travel",
      ),
      keywords: "travel services Ahmedabad, flight booking, hotel booking, visa services India",
    }),
  component: ServicesHubPage,
});

function ServicesHubPage() {
  const { navLinks } = Route.useLoaderData();
  const site = useSiteConfig();
  const hero = site.pageContent.servicesIndex ?? DEFAULT_PAGE_CONTENT.servicesIndex ?? {};

  return (
    <ServicePageShell modifier="services">
      <Breadcrumbs items={[{ label: "Services" }]} />
      <CmsPageHero
        headingId="services-hub-heading"
        content={hero}
        fallback={DEFAULT_PAGE_CONTENT.servicesIndex ?? {}}
        imageFallback={SITE_IMAGES.hero.flights}
        variant="light"
        compact
      />

      <section className="page-section">
        <SectionHeading
          title="Browse services"
          subtitle="Tap any card to learn more and send an inquiry."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {navLinks.map((item) => {
            const Icon = resolveCmsIcon(item.icon);
            const route = publicNavLinkRoute(item);
            return (
              <Link
                key={item.to}
                {...route}
                className="group flex flex-col rounded-2xl border border-border/70 bg-card p-5 shadow-soft transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-glow"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white transition group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-[color:var(--brand-orange)]">
                  {item.title}
                </h2>
                {item.shortDescription ? (
                  <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                    {item.shortDescription}
                  </p>
                ) : null}
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">
                  View details <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/30">
        <div className="page-section">
          <div className="mx-auto max-w-xl">
            <SectionHeading
              title="Not sure where to start?"
              subtitle="Tell us your plan — we'll recommend the right services."
              center
            />
            <div className="mt-6">
              <InquiryForm sourcePage="/services" />
            </div>
          </div>
        </div>
      </section>
    </ServicePageShell>
  );
}
