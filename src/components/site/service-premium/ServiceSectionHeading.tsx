import type { ReactNode } from "react";

type Props = {
  id?: string;
  title: ReactNode;
  subtitle?: string;
};

export function ServiceSectionHeading({ id, title, subtitle }: Props) {
  return (
    <div className="hotels-section__header">
      {id ? (
        <h2 id={id} className="hotels-section__title">
          {title}
        </h2>
      ) : (
        <h2 className="hotels-section__title">{title}</h2>
      )}
      {subtitle ? <p className="hotels-section__lead">{subtitle}</p> : null}
    </div>
  );
}
