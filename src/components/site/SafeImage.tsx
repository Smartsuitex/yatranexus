"use client";

import {
  useEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type SyntheticEvent,
} from "react";
import { cn } from "@/lib/utils";

/** True when `src` is a non-empty URL (avoids React empty-string `src` warning). */
export function hasImageSrc(src: string | null | undefined): src is string {
  return Boolean(src?.trim());
}

type SafeImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string | null;
  /** Extra classes on the placeholder when `src` is empty. */
  fallbackClassName?: string;
  /** Show animated skeleton until the image finishes loading. Default true. */
  showSkeleton?: boolean;
};

/**
 * Renders an `<img>` only when `src` is non-empty.
 * Empty/missing URLs get a neutral placeholder. While a real image loads,
 * an animated skeleton is shown (used across holiday-packages cards/heroes).
 * LCP heroes (`fetchPriority="high"` / `loading="eager"`) skip the skeleton
 * so the browser can paint the image immediately.
 */
export function SafeImage({
  src,
  alt = "",
  className,
  fallbackClassName,
  showSkeleton = true,
  onLoad,
  onError,
  loading,
  fetchPriority,
  ...rest
}: SafeImageProps) {
  const resolved = typeof src === "string" ? src.trim() : "";
  const imgRef = useRef<HTMLImageElement>(null);
  const isLcp =
    fetchPriority === "high" || loading === "eager" || showSkeleton === false;
  const [loaded, setLoaded] = useState(isLcp);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
    if (isLcp) {
      setLoaded(true);
      return;
    }
    setLoaded(false);
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [resolved, isLcp]);

  if (!resolved || failed) {
    return (
      <div
        className={cn(
          "safe-image-skeleton",
          className,
          fallbackClassName ??
            "bg-gradient-to-br from-[color:var(--brand-navy-deep)]/15 via-[color:var(--brand-cream)] to-[color:var(--brand-orange)]/10",
        )}
        aria-hidden={alt ? undefined : true}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
      />
    );
  }

  const showPlaceholder = showSkeleton && !isLcp && !loaded;

  return (
    <>
      {showPlaceholder ? (
        <span
          className={cn("safe-image-skeleton", className)}
          aria-hidden="true"
        />
      ) : null}
      <img
        ref={imgRef}
        src={resolved}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        className={cn(className, showPlaceholder && "safe-image--loading")}
        onLoad={(event: SyntheticEvent<HTMLImageElement>) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event: SyntheticEvent<HTMLImageElement>) => {
          if (onError) {
            // Parent may swap `src` (e.g. hero fallback). Keep skeleton until the next URL loads.
            setLoaded(false);
            onError(event);
            return;
          }
          setFailed(true);
          setLoaded(true);
        }}
        {...rest}
      />
    </>
  );
}
