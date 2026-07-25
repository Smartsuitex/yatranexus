import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  to,
  accent = "default",
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
  hint?: string;
  to?: string;
  accent?: "default" | "primary" | "warning";
}) {
  const card = (
    <div
      className={cn(
        "rounded-2xl border bg-card p-5 shadow-soft transition",
        to && "hover:-translate-y-0.5 hover:shadow-md",
        accent === "primary" && "border-primary/30 bg-primary/[0.04]",
        accent === "warning" && "border-amber-200/80 bg-amber-50/50",
        accent === "default" && "border-border",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 font-display text-3xl font-bold text-foreground">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white",
            accent === "warning" ? "bg-amber-500" : "bg-brand-gradient",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {card}
      </Link>
    );
  }

  return card;
}
