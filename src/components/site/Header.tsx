import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { useSiteConfig } from "@/contexts/site-config";
import { publicNavLinkRoute } from "@/lib/nav-links";
import { DEFAULT_PAGE_CONTENT, type SiteNavLink } from "@/lib/page-content";

const HEADER_LINKS: SiteNavLink[] = [
  { label: "Home", to: "/" },
  { label: "Corporate Travel", to: "/corporate" },
  { label: "Holiday Packages", to: "/holiday-packages" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

export function Header() {
  const site = useSiteConfig();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const [barHeight, setBarHeight] = useState(60);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const serviceLinks = site.navLinks.filter((l) => l.to !== "/corporate");

  const headerLinks = useMemo(() => {
    const fromCms =
      site.pageContent.navigation?.headerLinks ??
      DEFAULT_PAGE_CONTENT.navigation?.headerLinks ??
      [];

    return HEADER_LINKS.map((fallback) => {
      const match = fromCms.find(
        (l) =>
          l.to === fallback.to ||
          (fallback.to === "/" && /home/i.test(l.label)) ||
          (fallback.to === "/corporate" && /corporate/i.test(l.label)) ||
          (fallback.to === "/holiday-packages" && /holiday/i.test(l.label)) ||
          (fallback.to === "/about" && /about/i.test(l.label)) ||
          (fallback.to === "/contact" && /contact/i.test(l.label)),
      );
      return match?.label ? { ...fallback, label: match.label } : fallback;
    });
  }, [site.pageContent.navigation?.headerLinks]);

  function closeMenu() {
    setOpen(false);
    setServicesOpen(false);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    closeMenu();
    // Close when navigating between pages.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- pathname is the trigger
  }, [pathname]);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const update = () => setBarHeight(Math.round(el.getBoundingClientRect().height));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    // Do NOT set overflow:hidden / position:fixed on body — that jumps the page
    // to the top when the menu opens from the footer (or any scrolled position).
    // Freeze background scroll with event prevention instead.
    const menuRoot = document.getElementById("site-mobile-nav-root");

    function isInsideMenu(target: EventTarget | null) {
      return target instanceof Node && !!menuRoot?.contains(target);
    }

    function onTouchMove(event: TouchEvent) {
      if (!isInsideMenu(event.target)) event.preventDefault();
    }

    function onWheel(event: WheelEvent) {
      if (!isInsideMenu(event.target)) event.preventDefault();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }

    document.documentElement.classList.add("nav-menu-open");
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.classList.remove("nav-menu-open");
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("wheel", onWheel);
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

  const beforeServices = useMemo(
    () =>
      headerLinks.filter(
        (l) =>
          l.to === "/" ||
          l.to === "/corporate" ||
          l.to === "/holiday-packages" ||
          /home|corporate|holiday/i.test(l.label),
      ),
    [headerLinks],
  );

  const afterServices = useMemo(
    () =>
      headerLinks.filter(
        (l) =>
          l.to === "/about" ||
          l.to === "/contact" ||
          /about|contact/i.test(l.label),
      ),
    [headerLinks],
  );

  const mobileMenu =
    open && mounted
      ? createPortal(
          <div id="site-mobile-nav-root" className="contents lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[55] bg-black/40"
              onClick={closeMenu}
            />
            {/* Keep a fixed header strip so the X stays usable over the overlay */}
            <div
              className="fixed inset-x-0 top-0 z-[60] border-b border-border/60 bg-background/95 backdrop-blur-md"
              style={{ height: barHeight }}
            >
              <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 lg:px-8">
                <div className="min-w-0 max-w-[calc(100%-3.25rem)] shrink">
                  <Logo />
                </div>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md p-2.5 text-foreground"
                  onClick={closeMenu}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div
              className="site-mobile-nav fixed inset-x-0 z-[60] overflow-y-auto overscroll-contain border-t border-border/60 bg-background shadow-soft"
              style={{
                top: barHeight,
                maxHeight: `calc(100dvh - ${barHeight}px)`,
              }}
            >
              <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                {beforeServices.map((item) => (
                  <div
                    key={`m-${item.label}-${item.to ?? item.href}`}
                    className="flex min-h-11 items-center py-3"
                  >
                    <NavItem item={item} onClick={closeMenu} />
                  </div>
                ))}
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
                {afterServices.map((item) => (
                  <div
                    key={`m-${item.label}-${item.to ?? item.href}`}
                    className="flex min-h-11 items-center py-3"
                  >
                    <NavItem item={item} onClick={closeMenu} />
                  </div>
                ))}
                <Link
                  to="/contact"
                  hash="inquiry"
                  search={{ destination: "", service: "" }}
                  onClick={closeMenu}
                  className="mt-2 rounded-full bg-brand-gradient px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  Plan My Trip
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div
        ref={barRef}
        className="relative z-[60] mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-8"
      >
        <div className="min-w-0 max-w-[calc(100%-3.25rem)] shrink">
          <Logo />
        </div>
        <nav className="hidden items-center gap-6 lg:flex">
          {beforeServices.map((item) => (
            <NavItem key={`${item.label}-${item.to ?? item.href}`} item={item} />
          ))}
          <ServicesDropdown />
          {afterServices.map((item) => (
            <NavItem key={`${item.label}-${item.to ?? item.href}`} item={item} />
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/contact"
            hash="inquiry"
            search={{ destination: "", service: "" }}
            className="rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:shadow-glow"
          >
            Plan My Trip
          </Link>
        </div>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md p-2.5 text-foreground lg:hidden"
          onClick={() => (open ? closeMenu() : setOpen(true))}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenu}
    </header>
  );
}
