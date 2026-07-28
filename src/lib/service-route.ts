import { notFound } from "@tanstack/react-router";
import { fetchPublicServiceBySlug, type PublicService } from "@/lib/public-cms";
import { buildPageSeo } from "@/lib/seo";

export function serviceRouteMeta(service: PublicService) {
  const path = `/services/${service.slug}`;
  const title = service.metaTitle ?? `${service.title} in Ahmedabad | YatraNexus`;
  const description =
    service.metaDescription ??
    service.shortDescription ??
    service.description ??
    `Book ${service.title} with YatraNexus — trusted travel experts in Ahmedabad.`;

  return buildPageSeo({
    path,
    title,
    description,
    image: service.bannerUrl || service.contentBlocks.heroBannerUrl || undefined,
    keywords: `${service.title}, ${service.title} Ahmedabad, travel agency India, YatraNexus`,
  });
}

export async function loadService(slug: string) {
  const service = await fetchPublicServiceBySlug(slug);
  if (!service) throw notFound();
  return { service };
}

export { ServicePagePending, serviceNotFound } from "@/lib/service-route-ui";
