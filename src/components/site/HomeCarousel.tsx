import { useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function scrollCarouselTrack(
  track: HTMLDivElement | null,
  selector: string,
  direction: "prev" | "next",
) {
  if (!track) return;

  const items = Array.from(track.querySelectorAll<HTMLElement>(selector));
  if (items.length === 0) {
    const fallback = Math.max(track.clientWidth * 0.8, 160);
    track.scrollBy({
      left: direction === "next" ? fallback : -fallback,
      behavior: "smooth",
    });
    return;
  }

  const gap =
    parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "12") || 12;
  const step = (items[0]?.offsetWidth ?? 160) + gap;
  const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
  const current = track.scrollLeft;
  const epsilon = 4;

  let target =
    direction === "next"
      ? Math.min(maxScroll, current + step)
      : Math.max(0, current - step);

  // Snap to the nearest card start so the next package lines up cleanly.
  const starts = items.map((item) => item.offsetLeft);
  if (direction === "next") {
    const nextStart = starts.find((left) => left > current + epsilon);
    if (nextStart != null) target = Math.min(maxScroll, nextStart);
  } else {
    const prevStarts = starts.filter((left) => left < current - epsilon);
    if (prevStarts.length > 0) target = prevStarts[prevStarts.length - 1] ?? 0;
  }

  track.scrollTo({ left: target, behavior: "smooth" });
}

export type HomeCarouselProps = {
  ariaLabel: string;
  children: React.ReactNode;
  itemSelector: string;
  className?: string;
};

export function HomeCarousel({
  ariaLabel,
  children,
  itemSelector,
  className = "",
}: HomeCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback(
    (direction: "prev" | "next") => {
      scrollCarouselTrack(trackRef.current, itemSelector, direction);
    },
    [itemSelector],
  );

  return (
    <div className={`home-carousel ${className}`.trim()}>
      <button
        type="button"
        className="home-carousel__arrow"
        aria-label={`Previous ${ariaLabel}`}
        onClick={() => scroll("prev")}
      >
        <ChevronLeft className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="home-carousel__viewport">
        <div ref={trackRef} className="home-carousel__track">
          {children}
        </div>
      </div>

      <button
        type="button"
        className="home-carousel__arrow"
        aria-label={`Next ${ariaLabel}`}
        onClick={() => scroll("next")}
      >
        <ChevronRight className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
