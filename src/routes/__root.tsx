import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { BackToTop } from "@/components/site/BackToTop";
import { SiteConfigContext, useSiteConfig } from "@/contexts/site-config";
import { fetchPublicHomepageSettings, fetchPublicNavLinks, fetchPublicServices, fetchPublicSiteSettings } from "@/lib/public-cms";
import { TOUR_TYPES } from "@/lib/site-data";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-brand-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-soft"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent/10"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700;800;900&family=Epilogue:wght@400;500;600;700&display=swap";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async () => {
    const [siteSettings, navLinks, services, homepage] = await Promise.all([
      fetchPublicSiteSettings(),
      fetchPublicNavLinks(),
      fetchPublicServices(),
      fetchPublicHomepageSettings(),
    ]);
    const tourTypes =
      homepage.tourTypes.length > 0
        ? homepage.tourTypes.map((t) => ({ slug: t.slug, name: t.name }))
        : TOUR_TYPES.map((t) => ({ slug: t.slug, name: t.name }));
    return {
      siteSettings: {
        ...siteSettings,
        navLinks,
        inquiryServices: services
          .filter((s) => s.slug !== "packages")
          .map((s) => ({ slug: s.slug, title: s.title })),
        tourTypes,
      },
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title:
          loaderData?.siteSettings.seoTitle ??
          "YatraNexus — Flights, Hotels, Holidays, Visa & Cabs",
      },
      {
        name: "description",
        content:
          loaderData?.siteSettings.seoDescription ??
          "YatraNexus Ventures LLP — flights, hotels, holiday packages, cabs, visa, travel insurance and forex. Your Journey, Our Priority.",
      },
      { name: "author", content: "YatraNexus" },
      {
        property: "og:title",
        content:
          loaderData?.siteSettings.seoTitle ?? "YatraNexus — Your Journey, Our Priority",
      },
      {
        property: "og:description",
        content:
          loaderData?.siteSettings.seoDescription ??
          "Plan your next trip with India's friendliest travel partner — flights, hotels, holidays, visa, insurance & forex.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Preload only — stylesheet is injected non-blocking in RootShell.
      { rel: "preload", as: "style", href: GOOGLE_FONTS_HREF },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href=${JSON.stringify(GOOGLE_FONTS_HREF)};l.media='print';l.onload=function(){this.media='all'};document.head.appendChild(l);})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function FaviconLink() {
  const { faviconUrl } = useSiteConfig();

  useEffect(() => {
    if (!faviconUrl) return;
    const links = document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="apple-touch-icon"]');
    links.forEach((link) => {
      link.href = faviconUrl;
    });
  }, [faviconUrl]);

  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { siteSettings } = Route.useLoaderData();
  const isAdminRoute = useRouterState({
    select: (s) => s.location.pathname.startsWith("/admin"),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SiteConfigContext.Provider value={siteSettings}>
        <FaviconLink />
        {isAdminRoute ? (
          <Outlet />
        ) : (
          <div className="flex min-h-screen flex-col overflow-x-clip">
            <Header />
            <main className="flex-1 overflow-x-clip bg-cream max-lg:pb-[calc(8rem+env(safe-area-inset-bottom,0px))]">
              <Outlet />
            </main>
            <Footer />
          </div>
        )}
        {!isAdminRoute && (
          <>
            <WhatsAppFab />
            <BackToTop />
          </>
        )}
        <Toaster richColors position="top-center" />
      </SiteConfigContext.Provider>
    </QueryClientProvider>
  );
}
