import { Link, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  Plane,
  FileText,
  Image,
  Images,
  Star,
  HelpCircle,
  Home,
  MapPin,
  Settings,
  LogOut,
  FileStack,
  MoreVertical,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AdminRoute =
  | "/admin"
  | "/admin/inquiries"
  | "/admin/packages"
  | "/admin/destinations"
  | "/admin/services"
  | "/admin/blog"
  | "/admin/gallery"
  | "/admin/media"
  | "/admin/testimonials"
  | "/admin/faqs"
  | "/admin/homepage"
  | "/admin/pages"
  | "/admin/settings";

type NavItem = {
  label: string;
  icon: LucideIcon;
  to: AdminRoute;
  exact?: boolean;
};

const NAV: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { to: "/admin/packages", label: "Holiday Packages", icon: Package },
  { to: "/admin/destinations", label: "Destinations", icon: MapPin },
  { to: "/admin/services", label: "Services", icon: Plane },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/gallery", label: "Gallery", icon: Image },
  { to: "/admin/media", label: "Media library", icon: Images },
  { to: "/admin/testimonials", label: "Testimonials", icon: Star },
  { to: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { to: "/admin/homepage", label: "Homepage", icon: Home },
  { to: "/admin/pages", label: "Page content", icon: FileStack },
  { to: "/admin/settings", label: "Site settings", icon: Settings },
];

type Props = {
  onSignOut: () => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

export function AdminSidebar({ onSignOut, collapsed, onToggleCollapsed }: Props) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        "relative flex h-full max-h-[100dvh] shrink-0 flex-col overflow-hidden border-r text-white transition-[width] duration-300 ease-out",
        collapsed ? "w-[4.5rem]" : "w-64",
      )}
      style={{
        background:
          "linear-gradient(180deg, #2D235F 0%, #241c4f 55%, #1e1742 100%)",
        borderColor: "rgba(216, 100, 23, 0.28)",
      }}
    >
      <div
        className={cn(
          "flex items-start gap-2 border-b px-3 py-4",
          collapsed ? "flex-col items-center px-2" : "px-4",
        )}
        style={{ borderColor: "rgba(216, 100, 23, 0.22)" }}
      >
        <div className={cn("min-w-0 flex-1", collapsed && "w-full text-center")}>
          <Link
            to="/admin"
            className={cn(
              "font-display font-bold tracking-tight",
              collapsed ? "text-sm" : "text-xl",
            )}
            title="YatraNexus Admin"
          >
            {collapsed ? (
              <>
                <span className="text-white">Y</span>
                <span style={{ color: "#E57828" }}>N</span>
              </>
            ) : (
              <>
                Yatra<span style={{ color: "#E57828" }}>Nexus</span>
              </>
            )}
          </Link>
          {!collapsed ? (
            <p className="mt-1 text-xs text-white/55">Admin panel</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onToggleCollapsed}
          className={cn(
            "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white",
            collapsed && "mt-1",
          )}
          aria-label={collapsed ? "Show sidebar" : "Auto-hide sidebar"}
          title={collapsed ? "Show sidebar" : "Auto-hide sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" style={{ color: "#E57828" }} />
          ) : (
            <MoreVertical className="h-5 w-5" style={{ color: "#E57828" }} />
          )}
        </button>
      </div>

      <nav className="min-h-0 flex-1 space-y-0.5 overflow-y-auto overscroll-y-contain px-2 py-3">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              title={item.label}
              className={cn(
                "flex items-center rounded-xl text-sm font-medium transition",
                collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5",
                active
                  ? "text-white shadow-soft"
                  : "text-white/70 hover:bg-white/8 hover:text-white",
              )}
              style={
                active
                  ? {
                      background:
                        "linear-gradient(135deg, #D86417 0%, #E57828 100%)",
                    }
                  : undefined
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed ? <span className="truncate">{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>

      <div
        className="shrink-0 space-y-1 border-t p-2"
        style={{ borderColor: "rgba(216, 100, 23, 0.22)" }}
      >
        <Link
          to="/"
          title="View website"
          className={cn(
            "flex items-center rounded-xl text-sm text-white/70 transition hover:bg-white/8 hover:text-white",
            collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5",
          )}
        >
          <Home className="h-4 w-4" />
          {!collapsed ? <span>View website</span> : null}
        </Link>
        <button
          type="button"
          onClick={onSignOut}
          title="Sign out"
          className={cn(
            "flex w-full items-center rounded-xl text-sm text-white/70 transition hover:bg-white/8 hover:text-white",
            collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5",
          )}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed ? <span>Sign out</span> : null}
        </button>
      </div>
    </aside>
  );
}
