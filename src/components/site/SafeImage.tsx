"use client";

import {
  useLayoutEffect,
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

/** Encode path segments so filenames with spaces load reliably. */
export function encodeImageSrc(src: string): string {
  const trimmed = src.trim();
  if (!trimmed || trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return trimmed;
  }
  try {
    if (/^https?:\/\//i.test(trimmed)) {
      const u = new URL(trimmed);
      u.pathname = u.pathname
        .split("/")
        .map((seg) => encodeURIComponent(decodeURIComponent(seg)))
        .join("/");
      return u.toString();
    }
  } catch {
    /* fall through */
  }
  return trimmed
    .split("/")
    .map((seg, i) => (i === 0 && seg === "" ? "" : encodeURIComponent(decodeURIComponent(seg))))
    .join("/");
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
 *
 * Cached images often skip `onLoad` after client navigations — we detect
 * `img.complete` after mount so returning to Home does not stay blank.
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
  const resolved = typeof src === "string" ? encodeImageSrc(src) : "";
  const imgRef = useRef<HTMLImageElement>(null);
  const isLcp =
    fetchPriority === "high" || loading === "eager" || showSkeleton === false;
  const [loaded, setLoaded] = useState(isLcp);
  const [failed, setFailed] = useState(false);

  useLayoutEffect(() => {
    setFailed(false);
    if (isLcp) {
      setLoaded(true);
      return;
    }
    setLoaded(false);
    const markIfReady = () => {
      const img = imgRef.current;
      if (img?.complete && img.naturalWidth > 0) {
        setLoaded(true);
        return true;
      }
      return false;
    };
    if (markIfReady()) return;
    // Ref may not be attached on first pass; retry next frame + short timeout.
    const raf = requestAnimationFrame(() => {
      if (markIfReady()) return;
      window.setTimeout(markIfReady, 50);
    });
    return () => cancelAnimationFrame(raf);
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
        decoding="async"
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
