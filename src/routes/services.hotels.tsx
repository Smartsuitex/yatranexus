import { createFileRoute } from "@tanstack/react-router";
import { HotelsLandingPage } from "@/components/site/HotelsLandingPage";
import { loadService, serviceNotFound, serviceRouteMeta, ServicePagePending } from "@/lib/service-route";

export const Route = createFileRoute("/services/hotels")({
  loader: () => loadService("hotels"),
  staleTime: 5 * 60 * 1000,
  pendingMs: 0,
  pendingComponent: ServicePagePending,
  head: ({ loaderData }) => ({ meta: loaderData ? serviceRouteMeta(loaderData.service) : [] }),
  notFoundComponent: serviceNotFound,
  component: HotelsPage,
});

function HotelsPage() {
  const { service } = Route.useLoaderData();
  return <HotelsLandingPage service={service} />;
}
