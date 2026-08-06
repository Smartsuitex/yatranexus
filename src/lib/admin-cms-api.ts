import {
  listPackages as listPackagesFn,
  upsertPackage as upsertPackageFn,
  deletePackage as deletePackageFn,
  ensureCoreServices as ensureCoreServicesFn,
  listServices as listServicesFn,
  upsertService as upsertServiceFn,
  setServiceBannerUrl as setServiceBannerUrlFn,
  deleteService as deleteServiceFn,
  listBlogPosts as listBlogPostsFn,
  upsertBlogPost as upsertBlogPostFn,
  deleteBlogPost as deleteBlogPostFn,
  listGalleryImages as listGalleryImagesFn,
  upsertGalleryImage as upsertGalleryImageFn,
  deleteGalleryImage as deleteGalleryImageFn,
  listTestimonials as listTestimonialsFn,
  upsertTestimonial as upsertTestimonialFn,
  renumberTestimonials as renumberTestimonialsFn,
  deleteTestimonial as deleteTestimonialFn,
  listFaqs as listFaqsFn,
  upsertFaq as upsertFaqFn,
  deleteFaq as deleteFaqFn,
  getHomepageSettings as getHomepageSettingsFn,
  saveHomepageSettings as saveHomepageSettingsFn,
  getSiteSettings as getSiteSettingsFn,
  saveSiteSettings as saveSiteSettingsFn,
  getEmailSettings as getEmailSettingsFn,
  saveEmailSettings as saveEmailSettingsFn,
  listDestinations as listDestinationsFn,
  upsertDestination as upsertDestinationFn,
  renumberDestinations as renumberDestinationsFn,
  deleteDestination as deleteDestinationFn,
} from "@/lib/admin-cms.functions";
import type {
  PackageRow,
  ServiceRow,
  BlogPostRow,
  GalleryRow,
  TestimonialRow,
  FaqRow,
  HomepageRow,
  SiteSettingsRow,
  DestinationRow,
  EmailSettingsRow,
} from "@/lib/db-types";
import type { PackageUpsertPayload } from "@/lib/db-queries/packages";
import type { ServiceUpsertPayload } from "@/lib/db-queries/services";
import type { BlogPostUpsertPayload } from "@/lib/db-queries/blog";
import type { GalleryUpsertPayload } from "@/lib/db-queries/gallery";
import type { TestimonialUpsertPayload } from "@/lib/db-queries/testimonials";
import type { FaqUpsertPayload } from "@/lib/db-queries/faqs";
import type { HomepageSettingsPayload } from "@/lib/db-queries/homepage";
import type { SiteSettingsPayload } from "@/lib/db-queries/site-settings";
import type { EmailSettingsPayload } from "@/lib/db-queries/email-settings";
import type { DestinationUpsertPayload } from "@/lib/db-queries/destinations";

export type {
  PackageRow,
  ServiceRow,
  BlogPostRow,
  GalleryRow,
  TestimonialRow,
  FaqRow,
  HomepageRow,
  SiteSettingsRow,
  DestinationRow,
  EmailSettingsRow,
};

export function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function arrayToLines(value: string[] | null | undefined): string {
  return (value ?? []).join("\n");
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Packages
export async function listPackages() {
  return listPackagesFn();
}

export async function upsertPackage(payload: PackageUpsertPayload) {
  return upsertPackageFn({ data: payload });
}

export async function deletePackage(id: string) {
  return deletePackageFn({ data: { id } });
}

export async function ensureCoreServices() {
  return ensureCoreServicesFn();
}

// Services
export async function listServices() {
  return listServicesFn();
}

export async function upsertService(payload: ServiceUpsertPayload) {
  return upsertServiceFn({ data: payload });
}

export async function setServiceBannerUrl(slug: string, bannerUrl: string | null) {
  return setServiceBannerUrlFn({ data: { slug, bannerUrl } });
}

export async function deleteService(id: string) {
  return deleteServiceFn({ data: { id } });
}

// Blog
export async function listBlogPosts() {
  return listBlogPostsFn();
}

export async function upsertBlogPost(payload: BlogPostUpsertPayload) {
  return upsertBlogPostFn({ data: payload });
}

export async function deleteBlogPost(id: string) {
  return deleteBlogPostFn({ data: { id } });
}

// Gallery
export async function listGalleryImages() {
  return listGalleryImagesFn();
}

export async function upsertGalleryImage(payload: GalleryUpsertPayload) {
  return upsertGalleryImageFn({ data: payload });
}

export async function deleteGalleryImage(id: string) {
  return deleteGalleryImageFn({ data: { id } });
}

// Testimonials
export async function listTestimonials() {
  return listTestimonialsFn();
}

export async function upsertTestimonial(payload: TestimonialUpsertPayload) {
  return upsertTestimonialFn({ data: payload });
}

export async function renumberTestimonials(orderedIds: string[]) {
  return renumberTestimonialsFn({ data: { orderedIds } });
}

export async function deleteTestimonial(id: string) {
  return deleteTestimonialFn({ data: { id } });
}

// FAQs
export async function listFaqs() {
  return listFaqsFn();
}

export async function upsertFaq(payload: FaqUpsertPayload) {
  return upsertFaqFn({ data: payload });
}

export async function deleteFaq(id: string) {
  return deleteFaqFn({ data: { id } });
}

// Homepage settings (singleton)
export async function getHomepageSettings() {
  return getHomepageSettingsFn();
}

export async function saveHomepageSettings(payload: HomepageSettingsPayload) {
  return saveHomepageSettingsFn({ data: payload });
}

// Site settings (singleton)
export async function getSiteSettings() {
  return getSiteSettingsFn();
}

export async function saveSiteSettings(payload: SiteSettingsPayload) {
  return saveSiteSettingsFn({ data: payload });
}

export async function getEmailSettings() {
  return getEmailSettingsFn();
}

export async function saveEmailSettings(payload: EmailSettingsPayload) {
  return saveEmailSettingsFn({ data: payload });
}

// Destinations
export async function listDestinations() {
  return listDestinationsFn();
}

export async function upsertDestination(payload: DestinationUpsertPayload) {
  return upsertDestinationFn({ data: payload });
}

export async function renumberDestinations(orderedIds: string[]) {
  return renumberDestinationsFn({ data: { orderedIds } });
}

export async function deleteDestination(id: string) {
  return deleteDestinationFn({ data: { id } });
}
