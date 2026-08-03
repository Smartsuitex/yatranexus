import { createFileRoute } from "@tanstack/react-router";
import { CorporateLandingPage } from "@/components/site/CorporateLandingPage";
import { fetchPublicServiceBySlug } from "@/lib/public-cms";
import { resolveServiceHero } from "@/lib/service-hero-images";
import { brandSeoDescription, brandSeoTitle, buildPageSeo } from "@/lib/seo";
import { heroPreloadLink, SITE_IMAGES } from "@/lib/site-images";

export const Route = createFileRoute("/corporate")({
  loader: async () => {
    const service = await fetchPublicServiceBySlug("corporate");
    return { service };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    const hero = resolveServiceHero(
      "corporate",
      service?.bannerUrl || service?.contentBlocks?.heroBannerUrl,
    );
    const preload = heroPreloadLink(hero.primary || SITE_IMAGES.hero.corporate);
    const seo = buildPageSeo({
      path: "/corporate",
      title: service?.metaTitle ?? brandSeoTitle("Corporate Travel, MICE & Business Trips"),
      description:
        service?.metaDescription ??
        brandSeoDescription("Corporate travel, MICE, crew bookings & GST invoicing"),
      image: hero.primary || SITE_IMAGES.hero.corporate,
      keywords: "corporate travel Ahmedabad, MICE travel India, business travel management",
    });
    return {
      meta: seo.meta,
      links: [...seo.links, ...(preload ? [preload] : [])],
      scripts: seo.scripts,
    };
  },
  component: CorporatePage,
});

function CorporatePage() {
  const { service } = Route.useLoaderData();
  return <CorporateLandingPage service={service} />;
}
