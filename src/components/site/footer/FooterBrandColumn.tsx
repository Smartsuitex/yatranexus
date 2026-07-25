"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/site/Logo";
import { FOOTER_BRAND_COPY, FOOTER_COLORS, SOCIAL_KEYS } from "./footer-data";

const SOCIAL_ICONS: Record<(typeof SOCIAL_KEYS)[number]["key"], LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
};

type FooterBrandColumnProps = {
  description?: string;
};

export function FooterBrandColumn({ description }: FooterBrandColumnProps) {
  const copy = description?.trim() || FOOTER_BRAND_COPY;

  return (
    <div className="text-center sm:text-left">
      <div className="flex justify-center sm:justify-start">
        <Logo size="footer" />
      </div>
      <p
        className="mx-auto mt-2.5 max-w-sm text-[13px] leading-relaxed sm:mx-0"
        style={{ color: `${FOOTER_COLORS.purple}E0` }}
      >
        {copy}
      </p>
    </div>
  );
}

type FooterContactColumnProps = {
  legalName: string;
  address: string;
  phone: string;
  phoneRaw: string;
  email: string;
  socialLinks: Record<string, string>;
};

function SocialIcons({ socialLinks }: { socialLinks: Record<string, string> }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
      {SOCIAL_KEYS.map(({ key, label }) => {
        const Icon = SOCIAL_ICONS[key];
        const href = socialLinks[key]?.trim();
        const className =
          "inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors";
        const style = {
          borderColor: FOOTER_COLORS.border,
          color: FOOTER_COLORS.purple,
        };

        if (!href) {
          return (
            <span
              key={key}
              className={className}
              style={style}
              title={`${label} (coming soon)`}
              aria-label={`${label} (coming soon)`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
          );
        }

        return (
          <motion.a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.96 }}
            className={`${className} hover:border-transparent hover:bg-[#34235F] hover:text-white`}
            style={style}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </motion.a>
        );
      })}
    </div>
  );
}

export function FooterContactColumn({
  legalName,
  address,
  phone,
  phoneRaw,
  email,
  socialLinks,
}: FooterContactColumnProps) {
  return (
    <div className="text-center sm:text-left">
      <h3
        className="font-display text-base font-bold tracking-tight"
        style={{ color: FOOTER_COLORS.purple }}
      >
        Get In Touch
      </h3>
      <address className="mt-2.5 space-y-2.5 not-italic text-[13px] leading-relaxed">
        <div className="flex items-start justify-center gap-3 text-left sm:justify-start">
          <MapPin
            className="mt-0.5 h-4 w-4 shrink-0"
            style={{ color: FOOTER_COLORS.orange }}
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <div style={{ color: `${FOOTER_COLORS.purple}E6` }}>
            <p className="font-semibold" style={{ color: FOOTER_COLORS.purple }}>
              {legalName}
            </p>
            <p className="mt-1 whitespace-pre-line">{formatAddressLines(address)}</p>
          </div>
        </div>

        <p className="flex items-center justify-center gap-3 sm:justify-start">
          <Phone
            className="h-4 w-4 shrink-0"
            style={{ color: FOOTER_COLORS.orange }}
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <a
            href={`tel:${phoneRaw}`}
            className="font-medium transition-colors hover:text-[#F47C20]"
            style={{ color: FOOTER_COLORS.purple }}
          >
            {phone}
          </a>
        </p>

        <p className="flex items-center justify-center gap-3 sm:justify-start">
          <Mail
            className="h-4 w-4 shrink-0"
            style={{ color: FOOTER_COLORS.orange }}
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <a
            href={`mailto:${email}`}
            className="break-all transition-colors hover:text-[#F47C20]"
            style={{ color: FOOTER_COLORS.purple }}
          >
            {email}
          </a>
        </p>

        <div className="flex flex-col items-center gap-3 sm:items-start">
          <SocialIcons socialLinks={socialLinks} />
        </div>
      </address>
    </div>
  );
}

function formatAddressLines(address: string) {
  const cleaned = address.replace(/\s+/g, " ").trim();
  if (cleaned.includes("\n")) return cleaned;

  return cleaned
    .replace(/,\s*Opp\./i, ",\nOpp.")
    .replace(/,\s*Drive-In/i, ",\nDrive-In")
    .replace(/,\s*Gurukul,/i, ",\n")
    .replace(/,\s*Ahmedabad/i, ",\nAhmedabad")
    .replace(/L\/8/i, "L-8");
}
