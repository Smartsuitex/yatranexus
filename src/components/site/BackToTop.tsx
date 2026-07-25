"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="mobile-fab-stack fixed right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-soft backdrop-blur transition hover:bg-accent/10 sm:right-5 lg:bottom-8 lg:right-24"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
