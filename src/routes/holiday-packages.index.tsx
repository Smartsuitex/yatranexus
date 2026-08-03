import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Search, ArrowRight } from "lucide-react";
import { DestinationCard } from "@/components/site/DestinationCard";
import { HolidayPageHero } from "@/components/site/HolidayPageHero";
import { OverlayImageCard } from "@/components/site/OverlayImageCard";
import { PackagePriceLabel } from "@/components/site/PackagePriceLabel";
import { SafeImage } from "@/components/site/SafeImage";
import {
  HOLIDAY_HUB_HERO,
  resolveHolidayHubContent,
  resolveHolidayHubHero,
} from "@/lib/holiday-packages-page-data";
import {
  resolveHeroSearchTarget,
  toHeroSearchDestinations,
  toHeroSearchPackages,
} from "@/lib/hero-search";
import { buildPageSeo } from "@/lib/seo";
import {
  HOLIDAY_THEMES,
  TOUR_TYPES,
  whatsappLink,
} from "@/lib/site-data";
import {
  fetchPublicDestinations,
  fetchPublicHomepageSettings,
  fetchPublicPackages,
  fetchPublicServiceBySlug,
  filterPackagesByHolidayTheme,
  resolveShowInternational,
  type PublicDestination,
  type PublicPackage,
} from "@/lib/public-cms";

export const Route = createFileRoute("/holiday-packages/")({
  staleTime: 0,
  validateSearch: (search: Record<string, unknown>): { destination?: string } => ({
    destination:
      typeof search.destination === "string" && search.destination.trim()
        ? search.destination.trim()
        : undefined,
  }),
  loader: async () => {
    const showInternational = await resolveShowInternational();
    const [packages, domesticStates, internationalDestinations, homepage, packagesService] =
      await Promise.all([
        fetchPublicPackages(),
        fetchPublicDestinations("domestic"),
        showInternational ? fetchPublicDestinations("international") : Promise.resolve([]),
        fetchPublicHomepageSettings(),
        fetchPublicServiceBySlug("packages"),
      ]);

    const featuredSlugs = homepage.featuredPackageSlugs;
    const featuredPackages =
      featuredSlugs.length > 0
        ? featuredSlugs
            .map((slug) => packages.find((p) => p.slug === slug))
            .filter((p): p is PublicPackage => p != null)
        : packages.filter((p) => p.isFeatured).length > 0
          ? packages.filter((p) => p.isFeatured)
          : packages.slice(0, 6);

    const hub = resolveHolidayHubContent(packagesService);

    return {
      packages: featuredPackages,
      allPackages: packages,
      domesticStates,
      internationalDestinations,
      showInternational,
      tourTypes: homepage.tourTypes.length > 0 ? homepage.tourTypes : TOUR_TYPES,
      holidayThemes: homepage.holidayThemes.length > 0 ? homepage.holidayThemes : HOLIDAY_THEMES,
      hubHero: {
        eyebrow: hub.eyebrow,
        titleFirst: hub.titleFirst,
        titleAccent: hub.titleAccent,
        subtitle:
          hub.subtitle !== HOLIDAY_HUB_HERO.subtitle
            ? hub.subtitle
            : showInternational
              ? "Browse curated holidays across Indian states and 100+ international destinations — or tell us your dream trip and we'll build it for you."
              : "Browse curated holidays across Indian states — or tell us your dream trip and we'll build it for you.",
        bannerUrl: packagesService?.bannerUrl ?? "",
      },
    };
  },
  head: ({ loaderData }) =>
    buildPageSeo({
      path: "/holiday-packages",
      title: loaderData?.showInternational
        ? "YatraNexus — Holiday Packages, Domestic & International"
        : "YatraNexus — Holiday Packages, Kashmir, Kerala & Goa",
      description: loaderData?.showInternational
        ? "YatraNexus Ventures LLP. Your Journey, Our Priority. Domestic & international holiday packages — handled by real travel experts on WhatsApp."
        : "YatraNexus Ventures LLP. Your Journey, Our Priority. Kashmir, Kerala, Goa, Rajasthan, Himachal & more — handled by real travel experts on WhatsApp.",
      keywords:
        "holiday packages India, Kashmir tour package, Kerala honeymoon package, domestic tour packages Ahmedabad",
    }),
  component: HolidayPackagesHub,
});

const ALL = "All";

function HolidayPackagesHub() {
  const {
    packages,
    allPackages,
    domesticStates,
    internationalDestinations,
    showInternational,
    tourTypes,
    holidayThemes,
    hubHero,
  } = Route.useLoaderData();
  const navigate = useNavigate();
  const { destination: destinationSearch } = Route.useSearch();
  const [query, setQuery] = useState(destinationSearch ?? "");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [domesticRegion, setDomesticRegion] = useState<string>(ALL);
  const [intlRegion, setIntlRegion] = useState<string>(ALL);

  useEffect(() => {
    if (destinationSearch) setQuery(destinationSearch);
  }, [destinationSearch]);

  const searchPackages = useMemo(() => toHeroSearchPackages(allPackages), [allPackages]);
  const searchDestinations = useMemo(
    () => toHeroSearchDestinations(domesticStates, internationalDestinations),
    [domesticStates, internationalDestinations],
  );

  function handleHeroSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = resolveHeroSearchTarget(query, searchPackages, searchDestinations);

    if (target.kind === "destination") {
      if (target.scope === "international") {
        navigate({
          to: "/holiday-packages/international/$country",
          params: { country: target.slug },
        });
      } else {
        navigate({
          to: "/holiday-packages/domestic/$state",
          params: { state: target.slug },
        });
      }
      return;
    }

    if (target.kind === "package") {
      navigate({
        to: "/holiday-packages/package/$slug",
        params: { slug: target.slug },
      });
      return;
    }

    // Keep filtering on this page when there is no strong match.
    setSelectedTheme(null);
  }

  const domesticRegions = useMemo(
    () => [ALL, ...Array.from(new Set(domesticStates.map((s) => s.region)))],
    [domesticStates],
  );
  const intlRegions = useMemo(
    () => [ALL, ...Array.from(new Set(internationalDestinations.map((s) => s.region)))],
    [internationalDestinations],
  );

  const q = query.trim().toLowerCase();

  const filteredDomestic = useMemo(
    () => filterDestinations(domesticStates, domesticRegion, q),
    [domesticStates, domesticRegion, q],
  );

  const filteredInternational = useMemo(
    () => filterDestinations(internationalDestinations, intlRegion, q),
    [internationalDestinations, intlRegion, q],
  );

  const intlByRegion = useMemo(() => groupByRegion(filteredInternational), [filteredInternational]);

  const themePackages = useMemo(
    () => filterPackagesByHolidayTheme(allPackages, selectedTheme),
    [allPackages, selectedTheme],
  );

  const displayedPackages = selectedTheme ? themePackages : packages;
  const hero = resolveHolidayHubHero(hubHero.bannerUrl);

  function selectTheme(theme: string) {
    setSelectedTheme((current) => (current === theme ? null : theme));
    // Theme filter should not also restrict destination search.
    setQuery("");
    requestAnimationFrame(() => {
      document.getElementById("featured")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <div className="holiday-packages-page">
      <HolidayPageHero
        headingId="holiday-hub-hero-heading"
        eyebrow={hubHero.eyebrow}
        titleFirst={hubHero.titleFirst}
        titleAccent={hubHero.titleAccent}
        subtitle={hubHero.subtitle}
        imagePrimary={hero.primary}
        imageFallback={hero.fallback}
        compact
      >
        <form
          onSubmit={handleHeroSearch}
          className="mx-auto mt-4 flex max-w-2xl flex-col gap-2 rounded-2xl border border-border bg-white/90 p-2 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:p-1.5"
          role="search"
          aria-label="Search destinations"
        >
          <div className="flex min-w-0 flex-1 items-center gap-1.5 px-1 sm:gap-2">
            <Search className="ml-1.5 h-4 w-4 shrink-0 text-muted-foreground sm:ml-2.5" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations — Goa, Kerala…"
              className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:px-2 sm:py-1.5"
            />
          </div>
          <button
            type="submit"
            className="home-hero-search-btn w-full shrink-0 rounded-xl bg-[color:var(--brand-orange)] px-3.5 py-2.5 text-xs font-semibold text-white sm:w-auto sm:rounded-full sm:px-5 sm:py-2.5"
          >
            Search
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="#domestic"
            className="rounded-full border border-border bg-white/80 px-3.5 py-1 text-xs font-medium text-foreground transition hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
          >
            Domestic (India)
          </a>
          {showInternational && (
            <a
              href="#international"
              className="rounded-full border border-border bg-white/80 px-3.5 py-1 text-xs font-medium text-foreground transition hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
            >
              International
            </a>
          )}
          <a
            href="#featured"
            className="rounded-full border border-border bg-white/80 px-3.5 py-1 text-xs font-medium text-foreground transition hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
          >
            Featured packages
          </a>
        </div>
      </HolidayPageHero>

      {/* TOUR TYPES */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <h2 className="font-display text-lg font-semibold text-brand-gradient sm:text-xl">
            Browse By Tour Type
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-6">
            {tourTypes.map((t) => (
              <Link
                key={t.slug}
                to="/holiday-packages/tour/$type"
                params={{ type: t.slug }}
                className="group relative aspect-square overflow-hidden rounded-2xl shadow-soft transition hover:-translate-y-1 hover:shadow-card"
              >
                <SafeImage
                  src={t.image}
                  alt={t.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--brand-navy-deep)]/85 via-[color:var(--brand-navy-deep)]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-2 text-center sm:p-3">
                  <div className="font-display text-xs font-semibold text-white transition-colors group-hover:text-[color:var(--brand-orange-glow)] sm:text-sm">
                    {t.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {holidayThemes.map((theme) => {
              const active = selectedTheme === theme;
              return (
                <button
                  key={theme}
                  type="button"
                  onClick={() => selectTheme(theme)}
                  aria-pressed={active}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                    active
                      ? "border-[color:var(--brand-orange)] bg-[color:var(--brand-orange)] text-white shadow-soft"
                      : "border-border bg-[color:var(--brand-cream)] text-foreground hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
                  }`}
                >
                  {theme}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* DOMESTIC DESTINATIONS */}
      <section id="domestic" className="scroll-mt-24 bg-cream-gradient">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--brand-orange)] sm:text-xs">
                <span className="h-px w-8 bg-[color:var(--brand-orange)]/60" /> Incredible India
              </span>
              <h2 className="mt-4 font-display text-[1.75rem] font-extrabold tracking-tight text-brand-gradient sm:text-4xl lg:text-5xl">
                Domestic Destinations
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                Pick an Indian state to explore highlights, sample itineraries and curated packages.
              </p>
            </div>
            <Link
              to="/holiday-packages/domestic"
              className="shrink-0 self-start whitespace-nowrap text-xs font-semibold text-[color:var(--brand-orange)] hover:underline sm:self-auto sm:text-sm"
            >
              View all →
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {domesticRegions.map((r) => {
              const active = r === domesticRegion;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setDomesticRegion(r)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition sm:text-sm ${active ? "border-[color:var(--brand-orange)] bg-[color:var(--brand-orange)] text-white shadow-soft" : "border-border bg-white text-foreground hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"}`}
                >
                  {r}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
            {filteredDomestic.map((d) => (
              <DestinationCard
                key={d.slug}
                d={d}
                to="/holiday-packages/domestic/$state"
                params={{ state: d.slug }}
              />
            ))}
            {filteredDomestic.length === 0 && <EmptyFilterMessage />}
          </div>
        </div>
      </section>

      {/* INTERNATIONAL DESTINATIONS */}
      {showInternational && (
        <section id="international" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--brand-orange)] sm:text-xs">
                  <span className="h-px w-8 bg-[color:var(--brand-orange)]/60" /> Beyond borders
                </span>
                <h2 className="mt-4 font-display text-[1.75rem] font-extrabold tracking-tight text-brand-gradient sm:text-4xl lg:text-5xl">
                  International Destinations
                </h2>
                <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
                  From honeymoons in Bali to family fun in Dubai — explore by region.
                </p>
              </div>
              <Link
                to="/holiday-packages/international"
                className="shrink-0 self-start whitespace-nowrap text-xs font-semibold text-[color:var(--brand-orange)] hover:underline sm:self-auto sm:text-sm"
              >
                View all →
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {intlRegions.map((r) => {
                const active = r === intlRegion;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setIntlRegion(r)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-medium transition sm:text-sm ${active ? "border-[color:var(--brand-orange)] bg-[color:var(--brand-orange)] text-white shadow-soft" : "border-border bg-white text-foreground hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"}`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>

            <div className="mt-12 space-y-14">
              {Object.entries(intlByRegion).map(([region, list]) => (
                <div key={region}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                    <h3 className="font-display text-lg font-semibold text-[color:var(--brand-navy-deep)] sm:text-xl">
                      {region}
                    </h3>
                    <span className="text-xs text-muted-foreground">{list.length} destinations</span>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
                    {list.map((d) => (
                      <DestinationCard
                        key={d.slug}
                        d={d}
                        to="/holiday-packages/international/$country"
                        params={{ country: d.slug }}
                      />
                    ))}
                  </div>
                </div>
              ))}
              {Object.keys(intlByRegion).length === 0 && <EmptyFilterMessage />}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED / THEME PACKAGES */}
      <section id="featured" className="scroll-mt-24 bg-cream-gradient">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl text-center sm:mx-auto">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--brand-orange)] sm:text-xs">
              <span className="h-px w-8 bg-[color:var(--brand-orange)]/60" />{" "}
              {selectedTheme ? "Theme filter" : "Most loved"}
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-brand-gradient sm:text-4xl lg:text-5xl">
              {selectedTheme ? `${selectedTheme} Packages` : "Featured Packages"}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {selectedTheme
                ? `Showing packages that match “${selectedTheme}”. Click the theme again to clear.`
                : "Ready-to-book itineraries our customers love. All packages are fully customisable."}
            </p>
            {selectedTheme ? (
              <button
                type="button"
                onClick={() => setSelectedTheme(null)}
                className="mt-4 text-sm font-semibold text-[color:var(--brand-orange)] hover:underline"
              >
                Clear theme filter
              </button>
            ) : null}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {displayedPackages.map((p) => (
              <OverlayImageCard
                key={p.slug}
                to="/holiday-packages/package/$slug"
                params={{ slug: p.slug }}
                image={p.image}
                aspect="wide"
              >
                <p className="home-dest-card__tagline">
                  {p.destination} · {p.nights}N / {p.days}D
                </p>
                <h3 className="home-dest-card__name">{p.title}</h3>
                <PackagePriceLabel amount={p.fromPrice} />
              </OverlayImageCard>
            ))}
            {displayedPackages.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-dashed border-border bg-white p-8 text-center text-sm text-muted-foreground">
                No packages match “{selectedTheme}” yet. Try another theme or{" "}
                <button
                  type="button"
                  onClick={() => setSelectedTheme(null)}
                  className="font-semibold text-[color:var(--brand-orange)] hover:underline"
                >
                  clear the filter
                </button>
                .
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="holiday-hub-cta-section">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="holiday-hub-cta">
            <h2 className="holiday-hub-cta__title">
              Can't Find Your Dream Destination?
            </h2>
            <p className="holiday-hub-cta__lead">
              Tell us where you'd like to go — our travel experts will build a custom itinerary for
              you, free of cost.
            </p>
            <a
              href={whatsappLink("Hi YatraNexus, I'd like a custom holiday itinerary.")}
              target="_blank"
              rel="noopener noreferrer"
              className="holiday-hub-cta__btn"
            >
              Request custom itinerary <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function filterDestinations(destinations: PublicDestination[], region: string, q: string) {
  return destinations.filter((d) => {
    const matchRegion = region === ALL || d.region === region;
    const matchQ =
      !q || d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q);
    return matchRegion && matchQ;
  });
}

function groupByRegion(destinations: PublicDestination[]) {
  const grouped: Record<string, PublicDestination[]> = {};
  for (const c of destinations) {
    (grouped[c.region] ||= []).push(c);
  }
  return grouped;
}

function EmptyFilterMessage() {
  return (
    <div className="col-span-full rounded-2xl border border-dashed border-border bg-white p-8 text-center text-sm text-muted-foreground">
      No destinations match this filter — try another region or clear the search.
    </div>
  );
}
