import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { fetchPublicServiceBySlug } from "@/lib/public-cms";

function ServicePagePending() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[color:var(--brand-orange)]" />
    </div>
  );
}

export const Route = createFileRoute("/services/$slug")({
  beforeLoad: ({ params }) => {
    if (params.slug === "packages") {
      throw redirect({ to: "/holiday-packages" });
    }
    if (params.slug === "corporate") {
      throw redirect({ to: "/corporate" });
    }
  },
  loader: async ({ params }) => {
    const service = await fetchPublicServiceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  staleTime: 5 * 60 * 1000,
  pendingMs: 0,
  pendingComponent: ServicePagePending,
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title:
              loaderData.service.metaTitle ??
              `${loaderData.service.title} | YatraNexus`,
          },
          {
            name: "description",
            content:
              loaderData.service.metaDescription ??
              loaderData.service.shortDescription ??
              loaderData.service.description,
          },
          {
            property: "og:title",
            content: `${loaderData.service.title} | YatraNexus`,
          },
          {
            property: "og:description",
            content: loaderData.service.shortDescription ?? loaderData.service.description,
          },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="p-20 text-center">
      <h1 className="font-display text-3xl">Service not found</h1>
      <p className="mt-2 text-muted-foreground">This service page does not exist.</p>
    </div>
  ),
  component: ServiceSlugPage,
});

function ServiceSlugPage() {
  const { service } = Route.useLoaderData();
  return <ServiceDetailPage service={service} />;
}
