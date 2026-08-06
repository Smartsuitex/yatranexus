import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  MessageSquare,
  Package,
  Plane,
  Inbox,
  Loader2,
  MapPin,
  Home,
  Settings,
  ArrowRight,
  ExternalLink,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { StatCard } from "@/components/admin/StatCard";
import { InquiryStatusBadge } from "@/components/admin/InquiryStatusBadge";
import { fetchDashboardStats, fetchRecentInquiries } from "@/lib/admin-api";
import { formatInquiryRef, groupInquiriesByCustomer } from "@/lib/inquiry-dedupe";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import type { Inquiry } from "@/lib/db-types";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Dashboard | YatraNexus Admin" }],
  }),
  component: AdminDashboardPage,
});

type QuickAction = {
  to: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

const QUICK_ACTIONS: QuickAction[] = [
  {
    to: "/admin/inquiries",
    label: "Customer inquiries",
    description: "Review and respond to leads",
    icon: MessageSquare,
  },
  {
    to: "/admin/packages",
    label: "Holiday packages",
    description: "Add or edit tour itineraries",
    icon: Package,
  },
  {
    to: "/admin/destinations",
    label: "Destinations",
    description: "Domestic & international states",
    icon: MapPin,
  },
  {
    to: "/admin/services",
    label: "Services",
    description: "Flights, hotels, visa & more",
    icon: Plane,
  },
  {
    to: "/admin/homepage",
    label: "Homepage",
    description: "Hero, featured content & CTA",
    icon: Home,
  },
  {
    to: "/admin/settings",
    label: "Site settings",
    description: "Phone, email, social & footer",
    icon: Settings,
  },
];

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function AdminDashboardPage() {
  const { session } = useAdminAuth();
  const [stats, setStats] = useState<Awaited<ReturnType<typeof fetchDashboardStats>> | null>(null);
  const [recent, setRecent] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const displayName = useMemo(() => {
    const email = session?.email ?? "";
    const local = email.split("@")[0] ?? "Admin";
    return local.charAt(0).toUpperCase() + local.slice(1);
  }, [session?.email]);

  const recentGroups = useMemo(() => groupInquiriesByCustomer(recent).slice(0, 6), [recent]);

  useEffect(() => {
    async function load() {
      try {
        const [statsData, recentData] = await Promise.all([
          fetchDashboardStats(),
          fetchRecentInquiries(12),
        ]);
        setStats(statsData);
        setRecent(recentData);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not load dashboard");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const contentTotal =
    (stats?.packages ?? 0) +
    (stats?.services ?? 0) +
    (stats?.destinations ?? 0) +
    (stats?.blogs ?? 0) +
    (stats?.testimonials ?? 0) +
    (stats?.faqs ?? 0) +
    (stats?.gallery ?? 0);

  return (
    <div className="space-y-8 pb-4">
      {/* Welcome hero */}
      <section className="relative overflow-hidden rounded-2xl bg-brand-gradient px-6 py-8 text-white shadow-soft sm:px-8 sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[color:var(--brand-orange)]/25 blur-3xl"
        />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
              Admin home
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Welcome back, {displayName}
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">
              Manage customer inquiries, holiday packages, and everything on your public website —
              all in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/inquiries"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[color:var(--brand-navy-deep)] shadow-soft transition hover:brightness-95"
            >
              <Inbox className="h-4 w-4" />
              {stats?.newInquiries ? `${stats.newInquiries} pending leads` : "View inquiries"}
            </Link>
            <Link
              to="/admin/packages"
              className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <Plus className="h-4 w-4" /> Add package
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <ExternalLink className="h-4 w-4" /> View website
            </a>
          </div>
        </div>
      </section>

      {/* Lead stats */}
      <section>
        <h2 className="mb-4 font-display text-lg font-semibold">Leads overview</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Pending inquiries"
            value={stats?.newInquiries ?? 0}
            icon={Inbox}
            hint="Awaiting your response"
            to="/admin/inquiries"
            accent={stats?.newInquiries ? "warning" : "default"}
          />
          <StatCard
            label="Total inquiries"
            value={stats?.inquiries ?? 0}
            icon={MessageSquare}
            hint="All time"
            to="/admin/inquiries"
          />
          <StatCard
            label="Holiday packages"
            value={stats?.packages ?? 0}
            icon={Package}
            hint="Published in CMS"
            to="/admin/packages"
          />
          <StatCard
            label="Destinations"
            value={stats?.destinations ?? 0}
            icon={MapPin}
            hint="Domestic & international"
            to="/admin/destinations"
          />
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        {/* Recent inquiries */}
        <section className="rounded-2xl border border-border bg-card shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <h2 className="font-display text-lg font-semibold">Recent inquiries</h2>
              <p className="text-xs text-muted-foreground">Latest customer leads from the website</p>
            </div>
            <Link
              to="/admin/inquiries"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {recentGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                <MessageSquare className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="mt-4 text-sm font-medium text-foreground">No inquiries yet</p>
              <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                When customers submit the inquiry form on your website, they will appear here
                instantly.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border/70">
              {recentGroups.map(({ primary: row }) => {
                const initial = row.name.trim().charAt(0).toUpperCase() || "?";
                const status = row.status ?? "new";
                return (
                  <li key={row.id}>
                    <Link
                      to="/admin/inquiries"
                      className="flex items-start gap-4 px-5 py-4 transition hover:bg-muted/40"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
                        {initial}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold">{row.name}</span>
                          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                            {formatInquiryRef(row.id)}
                          </span>
                          <InquiryStatusBadge status={status} />
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {row.phone}
                          {row.package_name ? ` · ${row.package_name}` : ""}
                          {row.destination ? ` · ${row.destination}` : ""}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatRelativeTime(row.updated_at ?? row.created_at)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Sidebar column */}
        <div className="space-y-6">
          {/* Quick actions */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="font-display text-lg font-semibold">Quick actions</h2>
            <p className="mt-1 text-xs text-muted-foreground">Jump to common admin tasks</p>
            <ul className="mt-4 space-y-2">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <li key={action.to}>
                    <Link
                      to={action.to}
                      className="flex items-center gap-3 rounded-xl border border-border/70 px-3 py-3 transition hover:border-primary/40 hover:bg-muted/30"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">{action.label}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {action.description}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Content snapshot */}
          <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h2 className="font-display text-lg font-semibold">Website content</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {contentTotal} items across CMS modules
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              <ContentStat label="Services" value={stats?.services ?? 0} to="/admin/services" />
              <ContentStat label="Blog posts" value={stats?.blogs ?? 0} to="/admin/blog" />
              <ContentStat label="Testimonials" value={stats?.testimonials ?? 0} to="/admin/testimonials" />
              <ContentStat label="FAQs" value={stats?.faqs ?? 0} to="/admin/faqs" />
              <ContentStat label="Gallery" value={stats?.gallery ?? 0} to="/admin/gallery" />
              <ContentStat label="Packages" value={stats?.packages ?? 0} to="/admin/packages" />
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}

function ContentStat({
  label,
  value,
  to,
}: {
  label: string;
  value: number;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-xl border border-border/60 bg-muted/20 px-3 py-3 transition hover:border-primary/30 hover:bg-muted/40"
    >
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-display text-2xl font-bold">{value}</dd>
    </Link>
  );
}
