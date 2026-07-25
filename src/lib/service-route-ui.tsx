import { Loader2 } from "lucide-react";

export function ServicePagePending() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-cream">
      <Loader2 className="h-8 w-8 animate-spin text-[color:var(--brand-orange)]" />
    </div>
  );
}

export const serviceNotFound = () => (
  <div className="p-20 text-center">
    <h1 className="font-display text-3xl">Service not found</h1>
    <p className="mt-2 text-muted-foreground">This service page does not exist.</p>
  </div>
);
