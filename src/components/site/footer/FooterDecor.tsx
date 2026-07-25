import { FOOTER_COLORS } from "./footer-data";

/** Ultra-subtle travel line art — opacity kept under 5%. */
export function FooterDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Dotted airplane path */}
        <path
          d="M80 220 C 280 140, 520 300, 760 200 S 1180 120, 1360 180"
          stroke={FOOTER_COLORS.purple}
          strokeWidth="1.25"
          strokeDasharray="3 10"
          opacity="0.045"
        />
        {/* Soft clouds */}
        <path
          d="M160 520 C 180 500, 220 500, 240 520 C 270 510, 300 530, 280 555 C 250 575, 180 570, 160 545 Z"
          fill={FOOTER_COLORS.purple}
          opacity="0.035"
        />
        <path
          d="M1080 640 C 1105 618, 1155 618, 1180 640 C 1215 628, 1250 655, 1225 680 C 1190 705, 1105 698, 1080 670 Z"
          fill={FOOTER_COLORS.orange}
          opacity="0.03"
        />
        {/* Mountain outline */}
        <path
          d="M40 780 L 160 620 L 240 700 L 340 560 L 460 780"
          stroke={FOOTER_COLORS.purple}
          strokeWidth="1.5"
          opacity="0.04"
        />
        {/* Location pins */}
        <g opacity="0.045" stroke={FOOTER_COLORS.orange} strokeWidth="1.5" fill="none">
          <path d="M620 760 C 620 740, 640 725, 655 725 C 670 725, 690 740, 690 760 C 690 780, 655 805, 655 805 C 655 805, 620 780, 620 760 Z" />
          <circle cx="655" cy="755" r="5" />
          <path d="M900 420 C 900 400, 920 385, 935 385 C 950 385, 970 400, 970 420 C 970 440, 935 465, 935 465 C 935 465, 900 440, 900 420 Z" />
          <circle cx="935" cy="415" r="5" />
        </g>
        {/* Compass — top right */}
        <g
          transform="translate(1280 48)"
          stroke={FOOTER_COLORS.purple}
          strokeWidth="1.25"
          fill="none"
          opacity="0.04"
        >
          <circle cx="48" cy="48" r="36" />
          <circle cx="48" cy="48" r="22" />
          <path d="M48 12 L48 84 M12 48 L84 48" />
          <path d="M48 18 L54 48 L48 78 L42 48 Z" fill={FOOTER_COLORS.orange} opacity="0.5" stroke="none" />
        </g>
        {/* Tiny plane silhouette on path */}
        <g transform="translate(740 175)" opacity="0.045" fill={FOOTER_COLORS.purple}>
          <path d="M0 8 L28 4 L40 0 L44 4 L32 10 L48 18 L44 20 L28 14 L8 18 L0 14 Z" />
        </g>
      </svg>
    </div>
  );
}
