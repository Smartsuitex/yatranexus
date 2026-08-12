import { createFileRoute } from "@tanstack/react-router";
import { AboutLandingPage } from "@/components/site/AboutLandingPage";
import { resolveAboutHero } from "@/lib/about-page-data";
import { fetchPublicHomepageSettings } from "@/lib/public-cms";
import { buildPageSeo } from "@/lib/seo";
import { heroPreloadLink } from "@/lib/site-images";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const homepage = await fetchPublicHomepageSettings();
    return { homepage };
  },
  head: () => {
    const hero = resolveAboutHero();
    const preload = heroPreloadLink(hero.primary);
    const seo = buildPageSeo({
      path: "/about",
      title: "About YatraNexus – Your Trusted Travel Partner",
      description:
        "YatraNexus is a travel partner built on one idea — every traveller deserves a real expert, not a chatbot. Discover our mission, values & how we work.",
      keywords: "about YatraNexus, travel agency Ahmedabad, YatraNexus Ventures LLP",
      image: hero.primary,
    });
    return {
      meta: seo.meta,
      links: [...seo.links, ...(preload ? [preload] : [])],
      scripts: seo.scripts,
    };
  },
  component: AboutPage,
});

function AboutPage() {
  const { homepage } = Route.useLoaderData();
  return <AboutLandingPage homepage={homepage} />;
}
