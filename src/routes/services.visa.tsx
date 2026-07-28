import { createFileRoute } from "@tanstack/react-router";
import { VisaLandingPage } from "@/components/site/VisaLandingPage";
import { loadService, serviceNotFound, serviceRouteMeta, ServicePagePending } from "@/lib/service-route";

export const Route = createFileRoute("/services/visa")({
  loader: () => loadService("visa"),
  staleTime: 5 * 60 * 1000,
  pendingMs: 0,
  pendingComponent: ServicePagePending,
  head: ({ loaderData }) => (loaderData ? serviceRouteMeta(loaderData.service) : { meta: [] }),
  notFoundComponent: serviceNotFound,
  component: VisaPage,
});

function VisaPage() {
  const { service } = Route.useLoaderData();
  return <VisaLandingPage service={service} />;
}
