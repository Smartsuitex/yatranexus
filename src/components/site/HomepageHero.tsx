"use client";

import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Globe2,
  Headphones,
  Heart,
  Plane,
  Search,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { useSiteConfig } from "@/contexts/site-config";
import { resolveCmsIcon } from "@/lib/cms-icons";
import {
  resolveHeroSearchTarget,
  type HeroSearchDestination,
  type HeroSearchPackage,
} from "@/lib/hero-search";
import { MAX_HERO_SLIDES, DEFAULT_HOME_HERO_TAGLINE } from "@/lib/homepage-admin";
import { resolveHeroBackground } from "@/lib/site-images";
import { homeServiceLinkRoute, type HomeServiceLink } from "@/lib/nav-links";
import { SERVICES } from "@/lib/site-data";

type HeroSlideInput = { name?: string; tag?: string; image?: string; slug?: string };

type HeroSlide = { name: string; tag: string; image: string };

type HeroStat = { icon: LucideIcon; label: string; value: string };

type Props = {
  heroSlides: HeroSlideInput[];
  heroIntervalMs?: number;
  heroStats: HeroStat[];
  aboutTitle?: string;
  aboutLead?: string;
  onDestinationChange?: (value: string) => void;
  destination?: string;
  /** Packages + destinations used to resolve search → package/destination page. */
  searchPackages?: HeroSearchPackage[];
  searchDestinations?: HeroSearchDestination[];
  /** CMS featured services from /admin/homepage; falls back to static SERVICES. */
  serviceLinks?: HomeServiceLink[];
};

function normalizeHeroSlides(slides: HeroSlideInput[]): HeroSlide[] {
  const resolved = slides
    .slice(0, MAX_HERO_SLIDES)
    .map((slide) => ({
      name: slide.name?.trim() || "Featured destination",
      tag: slide.tag?.trim() || "Explore",
      image: resolveHeroBackground(slide.image),
    }))
    .filter((slide, index, arr) => slide.image && arr.findIndex((s) => s.image === slide.image) === index);

  if (resolved.length > 0) return resolved;

  return [];
}

function splitGradientTitle(title: string) {
  const trimmed = title.trim();
  if (!trimmed) {
    return { lead: "Your Journey,", accent: "Our Priority" };
  }

  // For the specific “Your Journey, Our Priority” headline,
  // color “Our Priority” as one piece (matches design copy).
  const phrase = "Our Priority";
  const idx = trimmed.toLowerCase().lastIndexOf(phrase.toLowerCase());
  if (idx !== -1) {
    const lead = trimmed.slice(0, idx).trimEnd();
    const accent = trimmed.slice(idx).trim();
    if (lead && accent) return { lead, accent };
  }

  const words = trimmed.split(/\s+/);
  if (words.length <= 1) return { lead: "", accent: trimmed };
  return { lead: words.slice(0, -1).join(" "), accent: words[words.length - 1] ?? "" };
}

export function HomepageHero({
  heroSlides,
  heroIntervalMs = 10_000,
  heroStats,
  aboutTitle = "Your Journey, Our Priority",
  aboutLead,
  onDestinationChange,
  destination = "",
  searchPackages = [],
  searchDestinations = [],
  serviceLinks,
}: Props) {
  const site = useSiteConfig();
  const navigate = useNavigate();
  const slides = useMemo(() => normalizeHeroSlides(heroSlides), [heroSlides]);
  const [slide, setSlide] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const iconServices = useMemo(() => {
    if (serviceLinks && serviceLinks.length > 0) return serviceLinks;
    return SERVICES.map((s) => ({
      slug: s.slug,
      title: s.title,
      icon: s.icon,
      kind: s.slug === "packages" ? ("packages" as const) : ("service" as const),
    }));
  }, [serviceLinks]);

  const heroTitle = splitGradientTitle(aboutTitle);
  const subtitle = aboutLead?.trim() || DEFAULT_HOME_HERO_TAGLINE;
  const current = slides[slide] ?? slides[0];
  const nextSlide =
    slides.length > 0 ? (slides[(slide + 1) % slides.length] ?? slides[0]) : undefined;

  useEffect(() => {
    setSlide(0);
  }, [slides]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const delay = Math.max(1000, heroIntervalMs);
    const id = window.setInterval(() => {
      setSlide((index) => (index + 1) % slides.length);
    }, delay);
    return () => window.clearInterval(id);
  }, [slides.length, heroIntervalMs]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = destination.trim();
    const target = resolveHeroSearchTarget(query, searchPackages, searchDestinations);

    if (target.kind === "package") {
      navigate({
        to: "/holiday-packages/package/$slug",
        params: { slug: target.slug },
      });
      return;
    }

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

    navigate({
      to: "/holiday-packages",
      search: { destination: target.query || undefined },
    });
  }

  function imageSrc(src: string) {
    if (!src || failedImages[src]) return "";
    return src;
  }

  return (
    <section className="relative isolate overflow-hidden bg-paper" aria-labelledby="hero-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-gradient-shift opacity-80"
        style={{
          backgroundImage: "var(--gradient-hero-atmosphere)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] animate-blob bg-[color:var(--brand-orange-soft)] opacity-70 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-24 h-[32rem] w-[32rem] animate-blob bg-[oklch(0.93_0.05_260)] opacity-70 blur-2xl"
        style={{ animationDelay: "-6s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 animate-blob bg-[oklch(0.94_0.05_200)] opacity-50 blur-3xl"
        style={{ animationDelay: "-3s" }}
      />

      <svg
        aria-hidden
        className="pointer-events-none absolute top-10 left-0 w-40 animate-drift-slow text-white/70"
        viewBox="0 0 120 50"
        fill="currentColor"
      >
        <ellipse cx="35" cy="30" rx="22" ry="14" />
        <ellipse cx="60" cy="22" rx="20" ry="16" />
        <ellipse cx="85" cy="30" rx="22" ry="13" />
      </svg>
      <svg
        aria-hidden
        className="pointer-events-none absolute top-40 left-0 w-28 animate-drift-slower text-white/60"
        style={{ animationDelay: "-30s" }}
        viewBox="0 0 120 50"
        fill="currentColor"
      >
        <ellipse cx="35" cy="30" rx="22" ry="14" />
        <ellipse cx="60" cy="22" rx="20" ry="16" />
        <ellipse cx="85" cy="30" rx="22" ry="13" />
      </svg>

      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1300 600"
        preserveAspectRatio="none"
      >
        <path
          d="M -40 320 Q 300 60, 620 220 T 1300 120"
          fill="none"
          stroke="oklch(0.70 0.17 47 / 0.35)"
          strokeWidth="2"
          strokeDasharray="6 10"
          className="animate-dash"
        />
        {[
          { cx: 140, cy: 180, d: "0s" },
          { cx: 420, cy: 110, d: "1.2s" },
          { cx: 780, cy: 200, d: "0.4s" },
          { cx: 1080, cy: 90, d: "2s" },
          { cx: 980, cy: 380, d: "1.6s" },
          { cx: 250, cy: 460, d: "0.8s" },
        ].map((point, index) => (
          <circle
            key={index}
            cx={point.cx}
            cy={point.cy}
            r="3"
            fill="oklch(0.70 0.17 47)"
            className="animate-twinkle"
            style={{ animationDelay: point.d, transformOrigin: `${point.cx}px ${point.cy}px` }}
          />
        ))}
      </svg>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute animate-fly-path text-[color:var(--brand-orange)] drop-shadow-sm">
          <Plane className="h-6 w-6 -rotate-45" strokeWidth={2.2} />
        </div>
      </div>

      <svg
        aria-hidden
        className="pointer-events-none absolute -right-24 top-24 hidden h-96 w-96 animate-spin-slow text-[color:var(--brand-navy)]/10 lg:block"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
      >
        <circle cx="100" cy="100" r="90" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="100" cy="100" r="70" strokeWidth="1" strokeDasharray="1 4" />
        <circle cx="100" cy="100" r="50" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pt-10 pb-16 sm:px-6 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--brand-orange)]/25 bg-white/80 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--brand-navy)] shadow-soft backdrop-blur sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--brand-orange)]" />
            {site.legalName}
          </span>

          <h1
            id="hero-heading"
            className="mt-6 font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-tight text-brand-gradient sm:text-6xl lg:text-[4.4rem]"
          >
            {heroTitle.lead ? <span className="block text-brand-gradient">{heroTitle.lead}</span> : null}
            {heroTitle.accent ? (
              <span className="block break-words text-brand-gradient">{heroTitle.accent}</span>
            ) : null}
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/75 sm:text-lg">
            {subtitle}
          </p>

          <form
            onSubmit={handleSearch}
            className="home-hero-search mt-7 flex max-w-xl items-center gap-1.5 rounded-full border border-border bg-white p-1 shadow-sm sm:gap-2 sm:p-1.5"
            role="search"
            aria-label="Search destinations"
          >
            <div className="flex min-w-0 flex-1 items-center gap-1.5 px-1 sm:gap-2">
              <Search className="ml-1.5 h-4 w-4 shrink-0 text-muted-foreground sm:ml-2.5" aria-hidden="true" />
              <label htmlFor="hero-destination" className="sr-only">
                Destination
              </label>
              <input
                id="hero-destination"
                type="search"
                name="destination"
                value={destination}
                onChange={(event) => onDestinationChange?.(event.target.value)}
                placeholder="Search destinations — Goa, Kerala, Rajasthan…"
                className="min-w-0 flex-1 bg-transparent px-1 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:px-2"
              />
            </div>
            <button
              type="submit"
              className="home-hero-search-btn shrink-0 rounded-full bg-[color:var(--brand-orange)] px-3.5 py-2 text-xs font-semibold text-white sm:px-5 sm:py-2.5"
            >
              Search
            </button>
          </form>

          <div className="home-hero-stats mt-8 grid max-w-xl grid-cols-2 gap-2.5 sm:flex sm:flex-nowrap sm:gap-4">
            {heroStats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="min-w-0 rounded-2xl border border-border bg-white/80 p-3 text-left shadow-soft backdrop-blur sm:flex-1 sm:p-4"
              >
                <Icon className="h-4 w-4 text-[color:var(--brand-orange)]" aria-hidden="true" />
                <div className="mt-1.5 font-display text-lg font-bold leading-tight text-[color:var(--brand-navy-deep)] sm:mt-2 sm:text-2xl">
                  {value}
                </div>
                <div className="mt-0.5 break-words text-[11px] leading-snug text-muted-foreground sm:text-xs">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          {slides.length > 1 && nextSlide && imageSrc(nextSlide.image) ? (
            <div
              aria-hidden
              className="absolute -left-4 -top-4 hidden h-56 w-44 rotate-[-6deg] overflow-hidden rounded-3xl border-4 border-white shadow-card sm:block"
            >
              <img
                src={imageSrc(nextSlide.image)}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-white bg-[color:var(--brand-navy-deep)]/10 shadow-card sm:aspect-[5/6]">
            {slides.map((item, index) =>
              imageSrc(item.image) ? (
                <img
                  key={`${item.image}-${index}`}
                  src={imageSrc(item.image)}
                  alt={item.name}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  onError={() => setFailedImages((prev) => ({ ...prev, [item.image]: true }))}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    index === slide ? "animate-kenburns opacity-100" : "opacity-0"
                  }`}
                />
              ) : null,
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--brand-navy-deep)]/80 via-transparent to-transparent" />

            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-navy-deep)] shadow-soft backdrop-blur">
              <Sun className="h-3.5 w-3.5 text-[color:var(--brand-orange)]" aria-hidden="true" />
              Now featuring
            </div>

            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/80">
                  {current?.tag || "Explore"}
                </div>
                <div className="mt-1 truncate font-display text-2xl font-bold sm:text-3xl">
                  {current?.name || "YatraNexus"}
                </div>
              </div>
              {slides.length > 1 ? (
                <div className="flex max-w-[9rem] flex-wrap justify-end gap-1.5 sm:max-w-none">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSlide(index)}
                      aria-label={`Show slide ${index + 1}`}
                      aria-current={index === slide}
                      className={`h-1.5 rounded-full transition-all ${
                        index === slide
                          ? "w-6 bg-[color:var(--brand-orange-glow)]"
                          : "w-1.5 bg-white/60 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>

        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="home-hero-services" role="navigation" aria-label="Popular services">
          {iconServices.map((service) => {
            const Icon = resolveCmsIcon(service.icon) ?? Globe2;
            const route = homeServiceLinkRoute(service);
            return (
              <Link key={service.slug} {...route} className="home-hero-service-link group">
                <span className="home-hero-service-link__icon">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />
                </span>
                <span className="home-hero-service-link__label">{service.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
