import { createFileRoute } from "@tanstack/react-router";
import { ContactLandingPage } from "@/components/site/ContactLandingPage";
import { buildPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    destination: typeof search.destination === "string" ? search.destination : "",
    service: typeof search.service === "string" ? search.service : "",
  }),
  head: () =>
    buildPageSeo({
      path: "/contact",
      title: "Contact YatraNexus — Travel Desk in Ahmedabad",
      description:
        "Contact YatraNexus in Ahmedabad for holiday packages, flights, hotels, visa and corporate travel. Call, email or WhatsApp our travel experts today.",
      keywords: "contact travel agency Ahmedabad, YatraNexus phone, book holiday India",
    }),
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
