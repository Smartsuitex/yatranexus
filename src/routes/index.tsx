import { resolveHomeHeroTagline } from "@/lib/homepage-admin";
import { toHeroSearchDestinations, toHeroSearchPackages } from "@/lib/hero-search";
import { heroPreloadLink, resolveHeroBackground } from "@/lib/site-images";
import { buildPageSeo, HOME_SEO_DESCRIPTION, HOME_SEO_TITLE } from "@/lib/seo";
import { lazy, Suspense, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Compass,
  Headphones,
  Hotel,
  type LucideIcon,
} from "lucide-react";
import {
  WHY_CHOOSE_US,
  DOMESTIC_STATES,
} from "@/lib/site-data";
import { HomepageHero } from "@/components/site/HomepageHero";
import { HeroDestinationMarquee } from "@/components/site/HeroDestinationMarquee";
import { type HomeServiceLink } from "@/lib/nav-links";
import {
  fetchPublicDestinations,
  fetchPublicHomepageSettings,
  fetchPublicPackages,
  fetchPublicServices,
  fetchPublicSiteSettings,
  fetchPublicTestimonials,
  resolveShowInternational,
  type PublicDestination,
  type PublicService,
} from "@/lib/public-cms";

const HomepageBelowHero = lazy(() =>
  import("@/components/site/HomepageBelowHero").then((m) => ({
    default: m.HomepageBelowHero,
  })),
);

function buildHomeServices(
  services: PublicService[],
  featuredSlugs: string[],
): HomeServiceLink[] {
  const packagesLink: HomeServiceLink = {
    slug: "packages",
    title: "Holiday Packages",
    icon: "Palmtree",
    kind: "packages",
  };

  if (featuredSlugs.length === 0) {
    return [
      ...services.slice(0, 6).map((s) => ({
        slug: s.slug,
        title: s.title,
        icon: s.icon,
        kind: "service" as const,
      })),
      packagesLink,
    ];
  }

  return featuredSlugs
    .map((slug) => {
      if (slug === "packages") return packagesLink;
      const service = services.find((s) => s.slug === slug);
      if (!service) return null;
      return {
        slug: service.slug,
        title: service.title,
        icon: service.icon,
        kind: "service" as const,
      };
    })
    .filter((item): item is HomeServiceLink => item != null);
}

export const Route = createFileRoute("/")({
  staleTime: 0,
  loader: async () => {
    const [packages, testimonials, homepage, services, destinations, marqueeDestinations, showInternational, siteSettings] =
      await Promise.all([
      fetchPublicPackages(),
      fetchPublicTestimonials(),
      fetchPublicHomepageSettings(),
      fetchPublicServices(),
      fetchPublicDestinations("domestic"),
      fetchPublicDestinations("all"),
      resolveShowInternational(),
      fetchPublicSiteSettings(),
    ]);

    const internationalDestinations = showInternational
      ? marqueeDestinations.filter(
          (d) => !destinations.some((domestic) => domestic.slug === d.slug),
        )
      : [];
    const searchPackages = toHeroSearchPackages(packages);
    const searchDestinations = toHeroSearchDestinations(
      destinations,
      internationalDestinations,
    );

    const featuredSlugs = homepage.featuredPackageSlugs;
    let featuredPackages =
      featuredSlugs.length > 0
        ? packages.filter((p) => featuredSlugs.includes(p.slug)).slice(0, 10)
        : packages.slice(0, 10);
    if (featuredPackages.length === 0) {
      featuredPackages = packages.slice(0, 10);
    }

    const baseWhyChooseUs =
      homepage.whyChooseUs.length > 0 ? homepage.whyChooseUs : WHY_CHOOSE_US;
    const whyChooseUs = showInternational
      ? baseWhyChooseUs
      : baseWhyChooseUs.map((item) =>
          item.title === "100+ destinations"
            ? {
                ...item,
                detail: "Domestic expertise across India — from Kashmir to Kerala and beyond.",
              }
            : item,
        );

    const visibleTestimonials = (
      showInternational
        ? testimonials
        : testimonials.filter((t) => !/international/i.test(t.text))
    ).slice().sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));

    let featuredDestinations: PublicDestination[] =
      homepage.featuredDestinationSlugs.length > 0
        ? homepage.featuredDestinationSlugs
            .map((slug) => destinations.find((d) => d.slug === slug))
            .filter((d): d is PublicDestination => d != null)
        : destinations.slice(0, 5);

    // Homepage Domestic Destinations: first row (featured) + second row extras.
    const HOME_DEST_SECOND_ROW = [
      "madhya-pradesh",
      "gujarat",
      "sikkim",
      "assam",
      "uttarakhand",
    ] as const;
    const firstRow = featuredDestinations
      .filter((d) => !(HOME_DEST_SECOND_ROW as readonly string[]).includes(d.slug))
      .slice(0, 5);
    const paddedFirstRow =
      firstRow.length >= 5
        ? firstRow
        : [
            ...firstRow,
            ...destinations.filter(
              (d) =>
                !firstRow.some((f) => f.slug === d.slug) &&
                !(HOME_DEST_SECOND_ROW as readonly string[]).includes(d.slug),
            ),
          ].slice(0, 5);
    const secondRow = HOME_DEST_SECOND_ROW.map((slug) => {
      const fromCms = destinations.find((d) => d.slug === slug);
      if (fromCms) return fromCms;
      const fromStatic = DOMESTIC_STATES.find((d) => d.slug === slug);
      return fromStatic
        ? {
            slug: fromStatic.slug,
            name: fromStatic.name,
            region: fromStatic.region,
            image: fromStatic.image,
            blurb: fromStatic.blurb,
            highlights: fromStatic.highlights,
          }
        : null;
    }).filter((d): d is PublicDestination => d != null);
    featuredDestinations = [...paddedFirstRow, ...secondRow];
    if (featuredDestinations.length === 0) {
      featuredDestinations = destinations.slice(0, 10);
    }

    const featuredServiceSlugs = homepage.featuredServiceSlugs;
    let featuredServices =
      featuredServiceSlugs.length > 0
        ? featuredServiceSlugs
            .map((slug) => services.find((s) => s.slug === slug))
            .filter((s): s is PublicService => s != null)
        : services.slice(0, 8);
    if (featuredServices.length === 0) {
      featuredServices = services.slice(0, 8);
    }

    return {
      featuredPackages,
      testimonials: visibleTestimonials,
      whyChooseUs,
      stats: homepage.stats,
      ctaTitle: homepage.ctaTitle || "Ready to plan your next trip?",
      ctaSubtitle:
        homepage.ctaSubtitle ||
        "Share your dates and budget — our expert will call you back the same day.",
      heroSlides: homepage.heroSlides,
      heroIntervalMs: homepage.heroIntervalMs,
      homeServices: buildHomeServices(services, featuredServiceSlugs),
      featuredServices,
      marqueeDestinations,
      featuredDestinations,
      tourTypes: homepage.tourTypes,
      howItWorks: homepage.howItWorks,
      // Home Hero content should match the design copy.
      // (Falls back from legacy CMS values if they still contain the old text.)
      aboutTitle:
        !homepage.aboutTitle || /Plan trips that feel unforgettable/i.test(homepage.aboutTitle)
          ? "Your Journey, Our Priority"
          : homepage.aboutTitle,
      aboutLead: resolveHomeHeroTagline(
        homepage.aboutContent,
        siteSettings.tagline,
      ),
      seoTitle: siteSettings.seoTitle,
      seoDescription: siteSettings.seoDescription,
      searchPackages,
      searchDestinations,
    };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.seoTitle?.trim() || HOME_SEO_TITLE;
    const description =
      loaderData?.seoDescription?.trim() || HOME_SEO_DESCRIPTION;
    const firstSlideImage = loaderData?.heroSlides?.[0]?.image;
    const preload = heroPreloadLink(resolveHeroBackground(firstSlideImage));
    const seo = buildPageSeo({
      path: "/",
      title,
      description,
      image: firstSlideImage || undefined,
      keywords:
        "travel agency Ahmedabad, holiday packages India, Kashmir tour, Kerala tour, flight booking Ahmedabad, visa services",
    });
    return {
      meta: seo.meta,
      links: [...seo.links, ...(preload ? [preload] : [])],
      scripts: seo.scripts,
    };
  },
  component: Home,
});

const HOME_HERO_STAT_ICONS: LucideIcon[] = [Compass, Hotel, Headphones];

const HOME_HERO_STATS: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Compass, label: "Destinations", value: "100+" },
  { icon: Hotel, label: "Hotels", value: "5,000+" },
  { icon: Headphones, label: "Support", value: "24×7" },
];

function buildHeroStats(
  stats: { label: string; value: string }[],
): { icon: LucideIcon; label: string; value: string }[] {
  const fromCms = stats
    .map((s) => ({
      label: s.label?.trim() ?? "",
      value: s.value?.trim() ?? "",
    }))
    .filter((s) => s.label || s.value);
  if (fromCms.length === 0) return HOME_HERO_STATS;
  return fromCms.map((s, index) => ({
    icon: HOME_HERO_STAT_ICONS[index % HOME_HERO_STAT_ICONS.length],
    label: s.label || s.value,
    value: s.value || s.label,
  }));
}

function Home() {
  const {
    testimonials,
    stats,
    heroSlides,
    heroIntervalMs,
    featuredPackages,
    featuredDestinations,
    aboutLead,
    aboutTitle,
    whyChooseUs,
    tourTypes,
    howItWorks,
    marqueeDestinations,
    homeServices,
    searchPackages,
    searchDestinations,
  } = Route.useLoaderData();
  const [heroDestination, setHeroDestination] = useState("");

  const heroStats = buildHeroStats(stats);

  return (
    <div className="home-page bg-paper">
      <HomepageHero
        heroSlides={heroSlides}
        heroIntervalMs={heroIntervalMs}
        heroStats={heroStats}
        aboutTitle={aboutTitle}
        aboutLead={aboutLead}
        destination={heroDestination}
        onDestinationChange={setHeroDestination}
        searchPackages={searchPackages}
        searchDestinations={searchDestinations}
        serviceLinks={homeServices}
      />
      <HeroDestinationMarquee destinations={marqueeDestinations} />
      <Suspense fallback={<div className="min-h-[40vh]" aria-hidden />}>
        <HomepageBelowHero
          featuredPackages={featuredPackages}
          featuredDestinations={featuredDestinations}
          whyChooseUs={whyChooseUs}
          tourTypes={tourTypes}
          howItWorks={howItWorks}
          testimonials={testimonials}
        />
      </Suspense>
    </div>
  );
}
