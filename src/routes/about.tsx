import { createFileRoute } from "@tanstack/react-router";
import { AboutLandingPage } from "@/components/site/AboutLandingPage";
import { fetchPublicHomepageSettings } from "@/lib/public-cms";
import { brandSeoDescription, brandSeoTitle, buildPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const homepage = await fetchPublicHomepageSettings();
    return { homepage };
  },
  head: () =>
    buildPageSeo({
      path: "/about",
      title: brandSeoTitle("Travel Agency in Ahmedabad"),
      description: brandSeoDescription(
        "Flights, hotels, holidays, visa, insurance, forex & corporate travel",
      ),
      keywords: "about YatraNexus, travel agency Ahmedabad, YatraNexus Ventures LLP",
    }),
  component: AboutPage,
});

function AboutPage() {
  const { homepage } = Route.useLoaderData();
  return <AboutLandingPage homepage={homepage} />;
}
