import type { ServiceIconItem } from "./types";

type Props = {
  items: ServiceIconItem[];
  ariaLabel?: string;
  columns?: 4 | 5;
};

export function ServiceTrustFooter({
  items,
  ariaLabel = "Service guarantees",
  columns = 4,
}: Props) {
  const gridClass =
    columns === 5
      ? "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
      : "grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="hotels-trust-footer" aria-label={ariaLabel}>
      <div
        className={`hotels-trust-footer__inner mx-auto grid w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ${gridClass}`}
      >
        {items.map(({ icon: Icon, title, detail }) => (
          <div key={title} className="hotels-trust-footer__item">
            <span className="hotels-trust-footer__icon" aria-hidden="true">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <div>
              <p className="hotels-trust-footer__title">{title}</p>
              {detail ? <p className="hotels-trust-footer__detail">{detail}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
