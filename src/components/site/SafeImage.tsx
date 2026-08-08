"use client";

import {
  useEffect,
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

/** When a preferred `.webp` 404s, try original raster siblings (admin PNG before convert). */
function nextRasterFallback(url: string, attempt: number): string | null {
  if (!/\.webp(\?|#|$)/i.test(url)) return null;
  const exts = [".png", ".jpg", ".jpeg"] as const;
  const ext = exts[attempt];
  if (!ext) return null;
  return url.replace(/\.webp(?=\?|#|$)/i, ext);
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
 *
 * If a `.webp` URL 404s (e.g. admin uploaded PNG before auto-convert),
 * we automatically try the `.png` sibling before showing the placeholder.
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
  const encoded = typeof src === "string" ? encodeImageSrc(src) : "";
  const [currentSrc, setCurrentSrc] = useState(encoded);
  const imgRef = useRef<HTMLImageElement>(null);
  const fallbackAttempt = useRef(0);
  const loadGen = useRef(0);
  const errorTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLcp =
    fetchPriority === "high" || loading === "eager" || showSkeleton === false;
  const [loaded, setLoaded] = useState(isLcp);
  const [failed, setFailed] = useState(false);

  const clearErrorTimer = () => {
    if (errorTimer.current != null) {
      clearTimeout(errorTimer.current);
      errorTimer.current = null;
    }
  };

  useLayoutEffect(() => {
    clearErrorTimer();
    loadGen.current += 1;
    const gen = loadGen.current;
    setCurrentSrc(encoded);
    fallbackAttempt.current = 0;
    setFailed(false);
    if (isLcp) {
      setLoaded(true);
      return () => {
        clearErrorTimer();
        loadGen.current += 1;
      };
    }
    setLoaded(false);
    const markIfReady = () => {
      if (gen !== loadGen.current) return true;
      const img = imgRef.current;
      if (!img) return false;
      if (img.complete && img.naturalWidth > 0) {
        setLoaded(true);
        return true;
      }
      // Broken responses (e.g. HTML 404) often complete with naturalWidth 0
      // without a reliable onError — promote to raster fallback / failure.
      if (img.complete && img.naturalWidth === 0 && (img.getAttribute("src") || "")) {
        const erroredSrc = img.getAttribute("src") || "";
        const raster = nextRasterFallback(erroredSrc, fallbackAttempt.current);
        if (raster && raster !== erroredSrc) {
          fallbackAttempt.current += 1;
          setCurrentSrc(encodeImageSrc(raster));
          return true;
        }
        setFailed(true);
        setLoaded(true);
        return true;
      }
      return false;
    };
    if (markIfReady()) {
      return () => {
        clearErrorTimer();
        loadGen.current += 1;
      };
    }
    const raf = requestAnimationFrame(() => {
      if (markIfReady()) return;
      window.setTimeout(markIfReady, 80);
    });
    return () => {
      cancelAnimationFrame(raf);
      clearErrorTimer();
      // Invalidate pending error handlers from aborted/remounted images
      loadGen.current += 1;
    };
  }, [encoded, isLcp]);

  useEffect(() => () => clearErrorTimer(), []);

  if (!encoded) {
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

  if (failed) {
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
  const displaySrc = currentSrc || encoded;

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
        src={displaySrc}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={cn(className, showPlaceholder && "safe-image--loading")}
        onLoad={(event: SyntheticEvent<HTMLImageElement>) => {
          clearErrorTimer();
          setFailed(false);
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event: SyntheticEvent<HTMLImageElement>) => {
          const img = event.currentTarget;
          const erroredSrc = img.getAttribute("src") || "";
          const genAtError = loadGen.current;

          // Cached / remount races can fire error while the bitmap is already valid.
          if (img.naturalWidth > 0) {
            clearErrorTimer();
            setFailed(false);
            setLoaded(true);
            return;
          }

          clearErrorTimer();
          // Wait long enough that a real network response (or cache paint) can win
          // before we treat this as a hard failure. Also ignore stale timers after remount.
          errorTimer.current = setTimeout(() => {
            if (genAtError !== loadGen.current) return;
            const live = imgRef.current;
            if (!live || (live.getAttribute("src") || "") !== erroredSrc) return;
            if (live.naturalWidth > 0) {
              setFailed(false);
              setLoaded(true);
              return;
            }

            const raster = nextRasterFallback(erroredSrc, fallbackAttempt.current);
            if (raster && raster !== erroredSrc) {
              fallbackAttempt.current += 1;
              setLoaded(false);
              setCurrentSrc(encodeImageSrc(raster));
              return;
            }

            if (onError) {
              setLoaded(false);
              onError(event);
              return;
            }

            setFailed(true);
            setLoaded(true);
          }, 250);
        }}
        {...rest}
      />
    </>
  );
}
