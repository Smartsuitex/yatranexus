import { createFileRoute } from "@tanstack/react-router";
import { ContactLandingPage } from "@/components/site/ContactLandingPage";
import { resolveContactHero } from "@/lib/contact-page-data";
import { buildPageSeo } from "@/lib/seo";
import { heroPreloadLink } from "@/lib/site-images";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    destination: typeof search.destination === "string" ? search.destination : "",
    service: typeof search.service === "string" ? search.service : "",
  }),
  head: () => {
    const hero = resolveContactHero();
    const preload = heroPreloadLink(hero.primary);
    const seo = buildPageSeo({
      path: "/contact",
      title: "Contact YatraNexus – Call, WhatsApp or Email Us",
      description:
        "Reach YatraNexus by call, WhatsApp or email for flights, hotels, holidays, visa, insurance & corporate travel enquiries. Real experts respond fast.",
      keywords: "contact travel agency Ahmedabad, YatraNexus phone, book holiday India",
      image: hero.primary,
    });
    return {
      meta: seo.meta,
      links: [...seo.links, ...(preload ? [preload] : [])],
      scripts: seo.scripts,
    };
  },
  component: ContactPage,
});

function ContactPage() {
  const { destination, service } = Route.useSearch();
  return (
    <ContactLandingPage
      defaultDestination={destination}
      defaultService={service || "general"}
    />
  );
}
