import { createFileRoute } from "@tanstack/react-router";
import { ForexLandingPage } from "@/components/site/ForexLandingPage";
import { loadService, serviceNotFound, serviceRouteMeta, ServicePagePending } from "@/lib/service-route";

export const Route = createFileRoute("/services/forex")({
  loader: () => loadService("forex"),
  staleTime: 5 * 60 * 1000,
  pendingMs: 0,
  pendingComponent: ServicePagePending,
  head: ({ loaderData }) => ({ meta: loaderData ? serviceRouteMeta(loaderData.service) : [] }),
  notFoundComponent: serviceNotFound,
  component: ForexPage,
});

function ForexPage() {
  const { service } = Route.useLoaderData();
  return <ForexLandingPage service={service} />;
}
