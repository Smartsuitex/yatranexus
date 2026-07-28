import { createFileRoute } from "@tanstack/react-router";
import { FlightsLandingPage } from "@/components/site/FlightsLandingPage";
import { loadService, serviceNotFound, serviceRouteMeta, ServicePagePending } from "@/lib/service-route";

export const Route = createFileRoute("/services/flights")({
  loader: () => loadService("flights"),
  staleTime: 5 * 60 * 1000,
  pendingMs: 0,
  pendingComponent: ServicePagePending,
  head: ({ loaderData }) => (loaderData ? serviceRouteMeta(loaderData.service) : { meta: [] }),
  notFoundComponent: serviceNotFound,
  component: FlightsPage,
});

function FlightsPage() {
  const { service } = Route.useLoaderData();
  return <FlightsLandingPage service={service} />;
}
