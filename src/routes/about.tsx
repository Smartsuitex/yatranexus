import { createFileRoute } from "@tanstack/react-router";
import { AboutLandingPage } from "@/components/site/AboutLandingPage";
import { fetchPublicHomepageSettings } from "@/lib/public-cms";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const homepage = await fetchPublicHomepageSettings();
    return { homepage };
  },
  head: () => ({
    meta: [
      { title: "About YatraNexus — Your Journey, Our Priority" },
      {
        name: "description",
        content:
          "Learn about YatraNexus — India's friendly travel partner for flights, hotels, holidays, visa, insurance, forex and corporate travel.",
      },
      { property: "og:title", content: "About YatraNexus" },
      {
        property: "og:description",
        content: "Real travel experts — trips planned end-to-end across India and the world.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { homepage } = Route.useLoaderData();
  return <AboutLandingPage homepage={homepage} />;
}
