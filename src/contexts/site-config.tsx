import { createContext, useContext } from "react";
import {
  DEFAULT_SITE_SETTINGS,
  type PublicNavLink,
  type PublicSiteSettings,
} from "@/lib/public-cms";

export type InquiryServiceOption = {
  slug: string;
  title: string;
};

export type SiteBootstrap = PublicSiteSettings & {
  navLinks: PublicNavLink[];
  inquiryServices: InquiryServiceOption[];
  tourTypes: { slug: string; name: string }[];
};

export const SiteConfigContext = createContext<SiteBootstrap>({
  ...DEFAULT_SITE_SETTINGS,
  navLinks: [],
  inquiryServices: [],
  tourTypes: [],
});

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}
