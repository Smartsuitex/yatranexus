import { notFound } from "@tanstack/react-router";
import { fetchPublicServiceBySlug, type PublicService } from "@/lib/public-cms";

export function serviceRouteMeta(service: PublicService) {
  return [
    {
      title: service.metaTitle ?? `${service.title} | YatraNexus`,
    },
    {
      name: "description",
      content: service.metaDescription ?? service.shortDescription ?? service.description,
    },
    {
      property: "og:title",
      content: `${service.title} | YatraNexus`,
    },
    {
      property: "og:description",
      content: service.shortDescription ?? service.description,
    },
  ];
}

export async function loadService(slug: string) {
  const service = await fetchPublicServiceBySlug(slug);
  if (!service) throw notFound();
  return { service };
}

export { ServicePagePending, serviceNotFound } from "@/lib/service-route-ui";
