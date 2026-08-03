import { createFileRoute } from "@tanstack/react-router";
import { ContactLandingPage } from "@/components/site/ContactLandingPage";
import { brandSeoDescription, brandSeoTitle, buildPageSeo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    destination: typeof search.destination === "string" ? search.destination : "",
    service: typeof search.service === "string" ? search.service : "",
  }),
  head: () =>
    buildPageSeo({
      path: "/contact",
      title: brandSeoTitle("Contact, Call, Email & WhatsApp"),
      description: brandSeoDescription(
        "Holidays, flights, hotels, visa & corporate travel enquiries",
      ),
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
