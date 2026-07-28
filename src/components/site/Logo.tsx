import { Link } from "@tanstack/react-router";
import brandTextSvg from "@/assets/YatraNexus Text.svg";
import logoIconSvg from "@/assets/YatraNexus Icon.svg";
import logoIconPng from "@/assets/yatranexus-logo.png";
import { useSiteConfig } from "@/contexts/site-config";

type LogoProps = {
  className?: string;
  /** Header uses a compact lockup; footer is slightly larger. */
  size?: "header" | "footer";
};

export function Logo({ className = "", size = "header" }: LogoProps) {
  const site = useSiteConfig();
  const cmsLogo = site.logoUrl?.trim();
  const isFooter = size === "footer";

  const iconClass = isFooter ? "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]" : "h-11 w-11 sm:h-16 sm:w-16";
  const textClass = isFooter ? "h-14 w-auto sm:h-16" : "h-9 w-auto sm:h-14";
  const gapClass = isFooter ? "gap-3 sm:gap-3.5" : "gap-2 sm:gap-3";
  const textMaxClass = isFooter
    ? "max-w-[13rem] sm:max-w-[15rem] lg:max-w-none"
    : "max-w-[9.5rem] sm:max-w-[13.5rem] lg:max-w-none";
  const cmsClass = isFooter
    ? "h-[4.5rem] w-auto max-w-[min(15rem,70vw)] sm:h-20"
    : "h-12 w-auto max-w-[min(11rem,calc(100vw-5.5rem))] sm:h-[4.5rem] sm:max-w-[13.5rem]";

  return (
    <Link
      to="/"
      className={`inline-flex min-w-0 items-center ${gapClass} ${className}`}
      aria-label="YatraNexus home"
    >
      {cmsLogo ? (
        <img
          src={cmsLogo}
          alt="YatraNexus — Your Journey, Our Priority"
          width={260}
          height={200}
          className={`${cmsClass} shrink-0 object-contain object-left`}
          decoding="async"
        />
      ) : (
        <>
          <img
            src={logoIconSvg}
            alt=""
            width={128}
            height={120}
            className={`${iconClass} shrink-0 object-contain`}
            decoding="async"
            aria-hidden="true"
            onError={(event) => {
              event.currentTarget.src = logoIconPng;
            }}
          />
          <img
            src={brandTextSvg}
            alt="YatraNexus — Your Journey, Our Priority"
            width={260}
            height={100}
            className={`${textClass} ${textMaxClass} shrink-0 object-contain object-left`}
            decoding="async"
          />
        </>
      )}
    </Link>
  );
}
