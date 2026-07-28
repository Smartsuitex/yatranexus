import { createFileRoute } from "@tanstack/react-router";
import { CabsLandingPage } from "@/components/site/CabsLandingPage";
import { loadService, serviceNotFound, serviceRouteMeta, ServicePagePending } from "@/lib/service-route";

export const Route = createFileRoute("/services/cabs")({
  loader: () => loadService("cabs"),
  staleTime: 5 * 60 * 1000,
  pendingMs: 0,
  pendingComponent: ServicePagePending,
  head: ({ loaderData }) => (loaderData ? serviceRouteMeta(loaderData.service) : { meta: [] }),
  notFoundComponent: serviceNotFound,
  component: CabsPage,
});

function CabsPage() {
  const { service } = Route.useLoaderData();
  return <CabsLandingPage service={service} />;
}
