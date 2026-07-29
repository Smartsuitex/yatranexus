import type { ComponentType, ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, className, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Handshake + shield check — Trust */
export function ValueTrustIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M24 4.5 17.8 7.4v5.8c0 4.4 2.9 8.4 6.2 9.8 3.3-1.4 6.2-5.4 6.2-9.8V7.4L24 4.5Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m20.8 12.4 2.2 2.2 4.2-4.3"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 30.2c1.8-2.4 5-3 7.6-1.4l3.5 2.2c1.1.7 2.5.8 3.7.3l2.2-.9c1.6-.7 3.4.3 3.6 2 .1.9-.3 1.8-1.1 2.3l-6.2 4c-1.5 1-3.4 1-4.9.1L10.2 35c-1.7-1-2.5-3-1.9-4.8Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.5 30.2c-1.8-2.4-5-3-7.6-1.4l-3.5 2.2c-1.1.7-2.5.8-3.7.3l-1.5-.6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 26.5c1.4-2.6 4.4-3.9 7.2-3.2M35.5 26.5c-1.4-2.6-4.4-3.9-7.2-3.2"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </BaseIcon>
  );
}

/** Open shield — Transparency */
export function ValueTransparencyIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M24 6 11.5 11.2v9.4c0 8.4 5.6 16 12.5 18.4 6.9-2.4 12.5-10 12.5-18.4v-9.4L24 6Z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}

/** Star — Customer Satisfaction */
export function ValueSatisfactionIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M24 7 28.2 17.2H39l-8.6 6.4 3.3 10.4L24 27.8l-9.7 6.2 3.3-10.4L9 17.2h10.8L24 7Z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}

/** Shield with check — Reliability */
export function ValueReliabilityIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        d="M24 6 11.5 11.2v9.4c0 8.4 5.6 16 12.5 18.4 6.9-2.4 12.5-10 12.5-18.4v-9.4L24 6Z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m17.5 23.5 4.6 4.6 8.4-8.6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}

/** Clipboard checklist + badge — Professionalism */
export function ValueProfessionalismIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="12.5" y="10" width="23" height="30" rx="3.5" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M19 10V8.6A2.8 2.8 0 0 1 21.8 5.8h4.4A2.8 2.8 0 0 1 29 8.6V10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="20.2" y="7" width="7.6" height="4.4" rx="1.4" fill="currentColor" />
      <path
        d="m17 19.2 1.9 1.9 3.4-3.5M17 26.2l1.9 1.9 3.4-3.5M17 33.2l1.9 1.9 3.4-3.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 20h7M26 27h7M26 34h4.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="35" cy="36.5" r="7.2" fill="currentColor" />
      <path
        d="m31.8 36.5 2 2 4.4-4.5"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}

/** Rising bars + arrow — Continuous Improvement */
export function ValueImprovementIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7.5 38.5h33" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="9.5" y="29.5" width="5" height="9" rx="1.1" fill="currentColor" />
      <rect x="16.5" y="24" width="5" height="14.5" rx="1.1" fill="currentColor" />
      <rect x="23.5" y="18" width="5" height="20.5" rx="1.1" fill="currentColor" />
      <rect x="30.5" y="11.5" width="5" height="27" rx="1.1" fill="currentColor" />
      <path
        d="M11 21c6.5-1.5 12-7 17.5-13"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M26 7h9.5v9.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </BaseIcon>
  );
}

const VALUE_ICON_BY_TITLE: Record<string, ComponentType<IconProps>> = {
  trust: ValueTrustIcon,
  transparency: ValueTransparencyIcon,
  "customer satisfaction": ValueSatisfactionIcon,
  reliability: ValueReliabilityIcon,
  professionalism: ValueProfessionalismIcon,
  "continuous improvement": ValueImprovementIcon,
};

export function resolveAboutValueIcon(title: string): ComponentType<IconProps> | undefined {
  return VALUE_ICON_BY_TITLE[title.trim().toLowerCase()];
}
