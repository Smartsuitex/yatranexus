import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { useSiteConfig } from "@/contexts/site-config";
import { buildWhatsappHref } from "@/lib/site-links";
import { publicNavLinkRoute } from "@/lib/nav-links";
import { DEFAULT_PAGE_CONTENT, type SiteNavLink } from "@/lib/page-content";

export function Header() {
  const site = useSiteConfig();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const serviceLinks = site.navLinks.filter((l) => l.to !== "/corporate");
  const whatsappHref = buildWhatsappHref(
    site.whatsappBase,
    site.whatsappPreset || "Hi YatraNexus, I'd like to plan a trip.",
  );

  const headerLinks = useMemo(() => {
    const links =
      site.pageContent.navigation?.headerLinks ??
      DEFAULT_PAGE_CONTENT.navigation?.headerLinks ??
      [];
    return links.filter((l) => (l.to || l.href) && !/services/i.test(l.label));
  }, [site.pageContent.navigation?.headerLinks]);

  /** Insert Services dropdown after Corporate (or after Home if Corporate missing). */
  const servicesInsertIndex = useMemo(() => {
    const corpIdx = headerLinks.findIndex((l) => /corporate/i.test(l.label));
    if (corpIdx >= 0) return corpIdx + 1;
    const homeIdx = headerLinks.findIndex((l) => l.to === "/" || /home/i.test(l.label));
    return homeIdx >= 0 ? homeIdx + 1 : 1;
  }, [headerLinks]);

  function closeMenu() {
    setOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    closeMenu();
    // Close when navigating between pages.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- pathname is the trigger
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function NavItem({
    item,
    onClick,
    className = "text-sm font-medium text-foreground/80 transition-colors hover:text-primary data-[status=active]:text-primary",
  }: {
    item: SiteNavLink;
    onClick?: () => void;
    className?: string;
  }) {
    if (item.href) {
      return (
        <a href={item.href} onClick={onClick} className={className}>
          {item.label}
        </a>
      );
    }
    if (!item.to) return null;
    return (
      <Link
        to={item.to}
        params={item.params as never}
        activeOptions={item.to === "/" ? { exact: true } : undefined}
        onClick={onClick}
        className={className}
      >
        {item.label}
      </Link>
    );
  }

  function ServicesDropdown() {
    return (
      <div className="group relative">
        <Link
          to="/services"
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-primary data-[status=active]:text-primary"
        >
          Services
          <ChevronDown className="h-3.5 w-3.5 opacity-60" />
        </Link>
        <div className="invisible absolute left-0 top-full z-50 min-w-[220px] pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
          <div className="rounded-xl border border-border/70 bg-background p-2 shadow-soft">
            {serviceLinks.map((svc) => {
              const route = publicNavLinkRoute(svc);
              return (
                <Link
                  key={svc.to}
                  {...route}
                  className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-accent/10 hover:text-primary"
                >
                  {svc.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="relative z-[60] mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Logo />
        <nav className="hidden lg:flex items-center gap-6">
          {headerLinks.map((item, index) => (
            <span key={`${item.label}-${item.to ?? item.href}`} className="contents">
              {index === servicesInsertIndex ? <ServicesDropdown /> : null}
              <NavItem item={item} />
            </span>
          ))}
          {servicesInsertIndex >= headerLinks.length ? <ServicesDropdown /> : null}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${site.phoneRaw}`}
            className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary"
          >
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground/70 hover:text-primary"
          >
            WhatsApp
          </a>
          <Link
            to="/contact"
            hash="inquiry"
            className="rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:shadow-glow"
          >
            Plan My Trip
          </Link>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="lg:hidden inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2.5 text-foreground"
          onClick={() => (open ? closeMenu() : setOpen(true))}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[55] bg-black/40 lg:hidden"
            onClick={closeMenu}
          />
          <div className="relative z-[60] lg:hidden border-t border-border/60 bg-background max-h-[calc(100dvh-3.5rem)] overflow-y-auto overflow-touch">
            <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              {headerLinks.map((item, index) => (
                <span key={`m-${item.label}-${item.to ?? item.href}`} className="contents">
                  {index === servicesInsertIndex ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setServicesOpen((v) => !v)}
                        aria-expanded={servicesOpen}
                        className="flex min-h-11 items-center justify-between py-3 text-sm font-medium text-foreground/80"
                      >
                        Services
                        <ChevronDown
                          className={`h-4 w-4 transition ${servicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {servicesOpen ? (
                        <div className="mb-2 ml-3 flex flex-col border-l border-border/60 pl-3">
                          <Link
                            to="/services"
                            onClick={closeMenu}
                            className="py-2 text-sm font-medium text-primary"
                          >
                            All services
                          </Link>
                          {serviceLinks.map((svc) => {
                            const route = publicNavLinkRoute(svc);
                            return (
                              <Link
                                key={svc.to}
                                {...route}
                                onClick={closeMenu}
                                className="min-h-10 py-2.5 text-sm text-foreground/70 hover:text-primary"
                              >
                                {svc.title}
                              </Link>
                            );
                          })}
                        </div>
                      ) : null}
                    </>
                  ) : null}
                  <div className="flex min-h-11 items-center py-3">
                    <NavItem item={item} onClick={closeMenu} />
                  </div>
                </span>
              ))}
              {servicesInsertIndex >= headerLinks.length ? (
                <>
                  <button
                    type="button"
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-expanded={servicesOpen}
                    className="flex min-h-11 items-center justify-between py-3 text-sm font-medium text-foreground/80"
                  >
                    Services
                    <ChevronDown
                      className={`h-4 w-4 transition ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {servicesOpen ? (
                    <div className="mb-2 ml-3 flex flex-col border-l border-border/60 pl-3">
                      <Link
                        to="/services"
                        onClick={closeMenu}
                        className="py-2 text-sm font-medium text-primary"
                      >
                        All services
                      </Link>
                      {serviceLinks.map((svc) => {
                        const route = publicNavLinkRoute(svc);
                        return (
                          <Link
                            key={svc.to}
                            {...route}
                            onClick={closeMenu}
                            className="min-h-10 py-2.5 text-sm text-foreground/70 hover:text-primary"
                          >
                            {svc.title}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </>
              ) : null}
              <a
                href={`tel:${site.phoneRaw}`}
                onClick={closeMenu}
                className="flex min-h-11 items-center gap-2 py-3 text-sm font-medium text-foreground/80"
              >
                <Phone className="h-4 w-4 shrink-0" /> {site.phone}
              </a>
              <Link
                to="/contact"
                hash="inquiry"
                onClick={closeMenu}
                className="mt-2 rounded-full bg-brand-gradient px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Plan My Trip
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="mt-2 py-2 text-center text-sm font-medium text-primary"
              >
                Or chat on WhatsApp
              </a>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
