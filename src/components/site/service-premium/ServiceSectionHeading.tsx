import type { ReactNode } from "react";
import { toTitleCase } from "@/lib/utils";

type Props = {
  id?: string;
  title: ReactNode;
  subtitle?: string;
};

function formatHeadingTitle(title: ReactNode): ReactNode {
  if (typeof title === "string") return toTitleCase(title);
  return title;
}

export function ServiceSectionHeading({ id, title, subtitle }: Props) {
  const formatted = formatHeadingTitle(title);
  return (
    <div className="hotels-section__header">
      {id ? (
        <h2 id={id} className="hotels-section__title">
          {formatted}
        </h2>
      ) : (
        <h2 className="hotels-section__title">{formatted}</h2>
      )}
      {subtitle ? <p className="hotels-section__lead">{subtitle}</p> : null}
    </div>
  );
}
