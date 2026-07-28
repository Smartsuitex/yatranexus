import { createFileRoute } from "@tanstack/react-router";
import { InsuranceLandingPage } from "@/components/site/InsuranceLandingPage";
import { loadService, serviceNotFound, serviceRouteMeta, ServicePagePending } from "@/lib/service-route";

export const Route = createFileRoute("/services/insurance")({
  loader: () => loadService("insurance"),
  staleTime: 5 * 60 * 1000,
  pendingMs: 0,
  pendingComponent: ServicePagePending,
  head: ({ loaderData }) => (loaderData ? serviceRouteMeta(loaderData.service) : { meta: [] }),
  notFoundComponent: serviceNotFound,
  component: InsurancePage,
});

function InsurancePage() {
  const { service } = Route.useLoaderData();
  return <InsuranceLandingPage service={service} />;
}
