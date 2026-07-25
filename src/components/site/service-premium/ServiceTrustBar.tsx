import type { ServiceIconItem } from "./types";

const TONE_CLASS = ["purple", "pink", "orange", "blue", "green"] as const;

type Props = {
  items: ServiceIconItem[];
  ariaLabel: string;
  columns?: 4 | 5;
};

export function ServiceTrustBar({ items, ariaLabel, columns = 5 }: Props) {
  const gridClass =
    columns === 4
      ? "service-trust-bar__grid--4"
      : "service-trust-bar__grid--5";

  return (
    <div className="service-trust-bar" role="region" aria-label={ariaLabel}>
      <div className={`service-trust-bar__inner service-trust-bar__grid ${gridClass}`}>
        {items.map(({ icon: Icon, title, detail }, index) => (
          <div key={`${title}-${index}`} className="service-trust-bar__item">
            <span
              className={`service-trust-bar__icon service-trust-bar__icon--${TONE_CLASS[index % TONE_CLASS.length]}`}
              aria-hidden="true"
            >
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <div className="service-trust-bar__text">
              <p className="service-trust-bar__title">{title}</p>
              {detail ? <p className="service-trust-bar__detail">{detail}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
