import { notFound } from "@tanstack/react-router";
import { ensureCmsMediaFileOnDisk, scheduleCmsMediaHydrate } from "@/lib/cms-media";
import { fetchPublicServiceBySlug, type PublicService } from "@/lib/public-cms";
import { brandSeoDescription, brandSeoTitle, buildPageSeo } from "@/lib/seo";
import { resolveServiceHero, type ServiceHeroSlug } from "@/lib/service-hero-images";
import { heroPreloadLink } from "@/lib/site-images";

const SERVICE_HERO_SLUGS = new Set<ServiceHeroSlug>([
  "hotels",
  "cabs",
  "visa",
  "insurance",
  "forex",
  "corporate",
  "flights",
]);

export function serviceRouteMeta(service: PublicService) {
  const path = `/services/${service.slug}`;
  const title = service.metaTitle ?? brandSeoTitle(service.title);
  const description =
    service.metaDescription ??
    brandSeoDescription(
      service.shortDescription?.trim() ||
        service.description?.trim() ||
        `${service.title} from Ahmedabad`,
    );

  const slug = service.slug as ServiceHeroSlug;
  const hero = SERVICE_HERO_SLUGS.has(slug)
    ? resolveServiceHero(
        slug,
        service.bannerUrl || service.contentBlocks.heroBannerUrl,
      )
    : null;
  const image =
    hero?.primary ||
    service.bannerUrl ||
    service.contentBlocks.heroBannerUrl ||
    undefined;
  const seo = buildPageSeo({
    path,
    title,
    description,
    image,
    keywords: `${service.title}, ${service.title} Ahmedabad, travel agency India, YatraNexus`,
  });
  const preload = hero?.primary ? heroPreloadLink(hero.primary) : null;
  return {
    ...seo,
    links: [...seo.links, ...(preload ? [preload] : [])],
  };
}

export async function loadService(slug: string) {
  scheduleCmsMediaHydrate();
  const service = await fetchPublicServiceBySlug(slug);
  if (!service) throw notFound();
  const banner =
    service.bannerUrl?.trim() ||
    service.contentBlocks.heroBannerUrl?.trim() ||
    "";
  if (banner.startsWith("/images/")) {
    await ensureCmsMediaFileOnDisk(banner).catch(() => false);
  }
  return { service };
}

export { ServicePagePending, serviceNotFound } from "@/lib/service-route-ui";
