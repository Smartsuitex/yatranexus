import { cn } from "@/lib/utils";

type Props = {
  amount: string;
  /** "starting" → "Starting From ", "from" → "From ", "none" → amount only */
  prefix?: "starting" | "from" | "none";
  perPerson?: boolean;
  discountPrice?: string;
  /** overlay = on dark image cards; inline = hero / light backgrounds */
  variant?: "overlay" | "inline";
  className?: string;
};

const PREFIX_TEXT = {
  starting: "Starting From ",
  from: "From ",
  none: "",
} as const;

export function PackagePriceLabel({
  amount,
  prefix = "starting",
  perPerson = true,
  discountPrice,
  variant = "overlay",
  className,
}: Props) {
  const prefixText = PREFIX_TEXT[prefix];
  const Root = variant === "overlay" ? "p" : "span";

  return (
    <Root
      className={cn(
        variant === "overlay" ? "home-dest-card__price" : "package-price package-price--inline",
        className,
      )}
    >
      {prefixText ? (
        <span
          className={
            variant === "overlay"
              ? "home-dest-card__price-prefix"
              : "package-price__prefix"
          }
        >
          {prefixText}
        </span>
      ) : null}
      <span
        className={
          variant === "overlay"
            ? "home-dest-card__price-amount"
            : "package-price__amount"
        }
      >
        {amount}
      </span>
      {perPerson ? (
        <span
          className={
            variant === "overlay"
              ? "home-dest-card__price-suffix"
              : "package-price__suffix"
          }
        >
          {" "}
          per person
        </span>
      ) : null}
      {discountPrice ? (
        <span
          className={
            variant === "overlay"
              ? "home-dest-card__price-discount"
              : "package-price__discount"
          }
        >
          {" "}
          {discountPrice}
        </span>
      ) : null}
    </Root>
  );
}
