/** Exact artwork for Our Values (public/images/about). */
export const ABOUT_VALUE_ICON_IMAGES: Record<string, string> = {
  trust: "/images/about/value-trust.png",
  professionalism: "/images/about/value-professionalism.png",
  "continuous improvement": "/images/about/value-continuous-improvement.png",
};

export function aboutValueIconImage(title: string): string | undefined {
  return ABOUT_VALUE_ICON_IMAGES[title.trim().toLowerCase()];
}
