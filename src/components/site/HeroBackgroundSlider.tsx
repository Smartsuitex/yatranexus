"use client";

import { useEffect, useMemo, useState } from "react";
import { resolveHeroBackground } from "@/lib/site-images";
import heroBackgroundFallback from "@/assets/hero-background.png";

type Slide = { image?: string; name?: string };

type Props = {
  slides: Slide[];
  /** Auto-rotate interval in milliseconds (default 10000 = 10 seconds). */
  intervalMs?: number;
};

export function HeroBackgroundSlider({ slides, intervalMs = 10_000 }: Props) {
  const images = useMemo(() => {
    const fromCms = slides
      .map((s) => resolveHeroBackground(s.image))
      .filter((src, index, arr) => src && arr.indexOf(src) === index);
    return fromCms.length > 0 ? fromCms : [heroBackgroundFallback];
  }, [slides]);

  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIndex(0);
  }, [images.join("|")]);

  useEffect(() => {
    if (images.length <= 1) return;
    const delay = Math.max(1000, intervalMs);
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, delay);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className="hero-premium__media">
      {images.map((src, i) => {
        const displaySrc = failed[src] ? heroBackgroundFallback : src;
        return (
          <img
            key={`${src}-${i}`}
            src={displaySrc}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
            onError={() => setFailed((prev) => ({ ...prev, [src]: true }))}
            className={`hero-premium__photo hero-premium__photo--slide${i === index ? " is-active" : ""}`}
          />
        );
      })}
      {images.length > 1 ? (
        <div className="hero-premium__dots" role="tablist" aria-label="Hero images">
          {images.map((_, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`hero-premium__dot${i === index ? " is-active" : ""}`}
              aria-label={`Show hero image ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
