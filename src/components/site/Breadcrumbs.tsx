import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = {
  label: string;
  /** Route path, e.g. "/holiday-packages" or "/holiday-packages/domestic/$state" */
  to?: string;
  /** Params for dynamic routes, e.g. { state: "rajasthan" } */
  params?: Record<string, string>;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-3 pb-1 lg:px-8">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        <li>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const canLink = Boolean(item.to) && !isLast;

          return (
            <li key={`${item.label}-${i}`} className="inline-flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-50" />
              {canLink ? (
                // Dynamic breadcrumb targets vary by page; cast keeps the shared helper flexible.
                <Link
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  to={item.to as any}
                  params={item.params}
                  className="text-muted-foreground transition-colors hover:text-primary hover:underline hover:underline-offset-2"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="max-w-[min(100%,18rem)] break-words font-medium text-foreground sm:max-w-none"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
