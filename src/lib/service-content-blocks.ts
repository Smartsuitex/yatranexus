import type { LucideIcon } from "lucide-react";
import { resolveCmsIcon } from "@/lib/cms-icons";
import type {
  PublicServiceContentBlocks,
  PublicServiceFeature,
  PublicVisaCountry,
} from "@/lib/public-cms";
import type { VisaTableRow } from "@/lib/visa-page-data";
import { VISA_TABLE_ROWS } from "@/lib/visa-page-data";

export type ServiceHeroParts = {
  titleFirst: string;
  titleAccent: string;
};

export type CmsFeatureItem = {
  icon: LucideIcon;
  title: string;
  detail?: string;
};

/** Split CMS heroTitle on the first comma, or use the full phrase as the accent line. */
export function parseServiceHeroTitle(
  heroTitle: string | undefined,
  fallback: ServiceHeroParts,
): ServiceHeroParts {
  const title = heroTitle?.trim();
  if (!title) return fallback;
  if (title.includes(",")) {
    const commaIndex = title.indexOf(",");
    return {
      titleFirst: title.slice(0, commaIndex + 1).trim(),
      titleAccent: title.slice(commaIndex + 1).trim(),
    };
  }

  const lead = fallback.titleFirst.replace(/,$/, "").trim();
  if (lead && title.toLowerCase().startsWith(`${lead.toLowerCase()} `)) {
    return {
      titleFirst: fallback.titleFirst.includes(",") ? `${lead},` : lead,
      titleAccent: title.slice(lead.length).trim(),
    };
  }

  return { titleFirst: fallback.titleFirst, titleAccent: title };
}

export function resolveCmsFeatureItems(
  cmsFeatures: PublicServiceFeature[] | undefined,
  fallback: CmsFeatureItem[],
  minCount = 1,
): CmsFeatureItem[] {
  if (cmsFeatures && cmsFeatures.length >= minCount) {
    return cmsFeatures.map((f) => ({
      icon: resolveCmsIcon(f.icon),
      title: f.title,
      detail: f.detail,
    }));
  }
  return fallback;
}

export function formatVisaCountryLabel(country: string): string {
  return country
    .replace(/^(\p{Regional_Indicator}{2}|\p{Emoji_Presentation}|\p{Extended_Pictographic})+\s*/u, "")
    .trim();
}

export function mapVisaCountriesToTableRows(countries: PublicVisaCountry[]): VisaTableRow[] {
  return countries.map((v) => ({
    country: formatVisaCountryLabel(v.country),
    touristVisa: v.touristType ?? v.type,
    businessVisa: v.businessType ?? "Contact us for details",
    processingTime: v.processingNote ?? v.processing,
  }));
}

export function isCompleteVisaCmsData(countries?: PublicVisaCountry[]): boolean {
  if (!countries?.length) return false;
  if (countries.length < VISA_TABLE_ROWS.length) return false;
  return countries.every((country) => Boolean(country.touristType && country.businessType));
}

export function resolveVisaTableRows(countries?: PublicVisaCountry[]): VisaTableRow[] {
  return isCompleteVisaCmsData(countries)
    ? mapVisaCountriesToTableRows(countries!)
    : VISA_TABLE_ROWS;
}

export function hasCmsVisaCountries(blocks: PublicServiceContentBlocks): boolean {
  return isCompleteVisaCmsData(blocks.visaCountries);
}

export function hasCmsSteps(blocks: PublicServiceContentBlocks): boolean {
  return Boolean(blocks.steps && blocks.steps.length > 0);
}
