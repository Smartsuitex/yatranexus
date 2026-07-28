import { createFileRoute } from "@tanstack/react-router";
import { AboutLandingPage } from "@/components/site/AboutLandingPage";
import { fetchPublicHomepageSettings } from "@/lib/public-cms";
import { buildPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const homepage = await fetchPublicHomepageSettings();
    return { homepage };
  },
  head: () =>
    buildPageSeo({
      path: "/about",
      title: "About YatraNexus — Travel Agency in Ahmedabad",
      description:
        "Learn about YatraNexus Ventures LLP — Ahmedabad's trusted travel partner for flights, hotels, holiday packages, visa, insurance, forex and corporate travel across India.",
      keywords: "about YatraNexus, travel agency Ahmedabad, YatraNexus Ventures LLP",
    }),
  component: AboutPage,
});

function AboutPage() {
  const { homepage } = Route.useLoaderData();
  return <AboutLandingPage homepage={homepage} />;
}
