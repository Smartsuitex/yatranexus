import { createFileRoute } from "@tanstack/react-router";
import { ContactLandingPage } from "@/components/site/ContactLandingPage";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    destination: typeof search.destination === "string" ? search.destination : "",
    service: typeof search.service === "string" ? search.service : "",
  }),
  head: () => ({
    meta: [
      { title: "Contact YatraNexus — Plan your trip" },
      {
        name: "description",
        content:
          "Get in touch with YatraNexus for holidays, flights, hotels, visa and corporate travel. Call, email or WhatsApp our travel desk.",
      },
      { property: "og:title", content: "Contact YatraNexus" },
      { property: "og:description", content: "Reach our travel team anytime." },
    ],
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
