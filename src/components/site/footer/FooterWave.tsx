import { FOOTER_COLORS } from "./footer-data";

/** Straight brand-gradient divider above the footer. */
export function FooterWave() {
  return (
    <div className="relative z-[1] px-4 sm:px-6 lg:px-8" aria-hidden="true">
      <div
        className="mx-auto h-px max-w-6xl"
        style={{
          background: `linear-gradient(90deg, ${FOOTER_COLORS.purple} 0%, ${FOOTER_COLORS.orange} 100%)`,
        }}
      />
    </div>
  );
}
