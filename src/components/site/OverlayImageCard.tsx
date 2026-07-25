import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/site/SafeImage";

type Aspect = "portrait" | "landscape" | "wide" | "square";

const ASPECT_CLASS: Record<Aspect, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
};

type Props = {
  to: string;
  params?: Record<string, string>;
  image?: string;
  imageAlt?: string;
  aspect?: Aspect;
  className?: string;
  children: ReactNode;
};

export function OverlayImageCard({
  to,
  params,
  image,
  imageAlt = "",
  aspect = "portrait",
  className,
  children,
}: Props) {
  return (
    <Link
      to={to}
      params={params}
      className={cn("home-dest-card home-dest-card--compact", ASPECT_CLASS[aspect], className)}
    >
      <SafeImage
        src={image}
        alt={imageAlt}
        loading="lazy"
        className="home-dest-card__img"
      />
      <div className="home-dest-card__overlay">{children}</div>
    </Link>
  );
}
