import { createFileRoute } from "@tanstack/react-router";
import { CorporateLandingPage } from "@/components/site/CorporateLandingPage";
import { fetchPublicServiceBySlug } from "@/lib/public-cms";
import { resolveServiceHero } from "@/lib/service-hero-images";
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
    return {
      meta: [
        {
          title: service?.metaTitle ?? "Corporate & MICE Travel — YatraNexus",
        },
        {
          name: "description",
          content:
            service?.metaDescription ??
            "Business travel, MICE, crew bookings, GST invoicing and dedicated account management for companies.",
        },
        {
          property: "og:title",
          content: `${service?.title ?? "Corporate Travel"} | YatraNexus`,
        },
        {
          property: "og:description",
          content:
            service?.metaDescription ??
            service?.shortDescription ??
            "Your outsourced travel desk for business trips and group events.",
        },
      ],
      links: preload ? [preload] : [],
    };
  },
  component: CorporatePage,
});

function CorporatePage() {
  const { service } = Route.useLoaderData();
  return <CorporateLandingPage service={service} />;
}
