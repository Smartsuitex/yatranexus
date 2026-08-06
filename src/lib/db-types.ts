export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type InquiryStatus = "new" | "contacted" | "quoted" | "closed" | "spam";

export type BookingHistoryEntry = {
  package_name?: string | null;
  destination?: string | null;
  service_type?: string | null;
  source_page?: string | null;
  message?: string | null;
  travel_date?: string | null;
  travelers?: number | null;
  saved_at?: string;
};

export type PackageRow = {
  id: string;
  slug: string;
  title: string;
  destination: string;
  scope: "domestic" | "international";
  nights: number;
  days: number;
  from_price: string;
  discount_price: string | null;
  package_code: string | null;
  image_url: string | null;
  gallery_urls: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: Json;
  is_active: boolean;
  is_featured: boolean;
  meta_title: string | null;
  meta_description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  short_description: string | null;
  description: string | null;
  banner_url: string | null;
  icon: string | null;
  gallery_urls: string[];
  inclusions: string[];
  exclusions: string[];
  faqs: Json;
  content_blocks: Json;
  is_active: boolean;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  content: Json;
  featured_image_url: string | null;
  tags: string[];
  read_minutes: number;
  is_published: boolean;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
};

export type GalleryRow = {
  id: string;
  title: string;
  album: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export type TestimonialRow = {
  id: string;
  name: string;
  city: string | null;
  designation: string | null;
  review_text: string;
  rating: number;
  photo_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type FaqRow = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export type DestinationRow = {
  id: string;
  slug: string;
  scope: "domestic" | "international";
  name: string;
  region: string;
  image_url: string;
  blurb: string | null;
  highlights: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type HomepageRow = {
  id: number;
  hero_slides: Json;
  hero_interval_ms: number;
  featured_service_slugs: string[];
  featured_package_slugs: string[];
  featured_destination_slugs: string[];
  about_title: string | null;
  about_content: string | null;
  why_choose_us: Json;
  stats: Json;
  how_it_works: Json;
  corporate_features: Json;
  tour_types: Json;
  holiday_themes: Json;
  cta_title: string | null;
  cta_subtitle: string | null;
  updated_at: string;
};

export type SiteSettingsRow = {
  id: number;
  contact_phone: string | null;
  contact_phone_raw: string | null;
  contact_email: string | null;
  contact_whatsapp: string | null;
  address: string | null;
  map_embed_url: string | null;
  business_hours: string | null;
  social_links: Json;
  footer_text: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  legal_name: string | null;
  tagline: string | null;
  page_content: Json;
  updated_at: string;
};

export type EmailSettingsRow = {
  id: number;
  is_enabled: boolean;
  provider: "resend" | "smtp";
  from_name: string | null;
  from_email: string | null;
  reply_to_email: string | null;
  admin_notification_email: string | null;
  resend_api_key: string | null;
  smtp_host: string | null;
  smtp_port: number | null;
  smtp_username: string | null;
  smtp_password: string | null;
  smtp_secure: boolean;
  resend_api_key_set: boolean;
  smtp_password_set: boolean;
  is_authenticated: boolean;
  last_tested_at: string | null;
  last_test_error: string | null;
  welcome_enabled: boolean;
  welcome_subject: string | null;
  welcome_body_html: string | null;
  inquiry_customer_enabled: boolean;
  inquiry_customer_subject: string | null;
  inquiry_customer_body_html: string | null;
  inquiry_admin_enabled: boolean;
  inquiry_admin_subject: string | null;
  updated_at: string;
};

export type Inquiry = {
  id: string;
  service_type: string;
  name: string;
  phone: string;
  email: string | null;
  subject: string | null;
  destination: string | null;
  travel_date: string | null;
  travelers: number | null;
  message: string | null;
  package_name: string | null;
  source_page: string | null;
  selected_inclusions: string[] | null;
  selected_exclusions: string[] | null;
  status: InquiryStatus;
  admin_notes: string | null;
  phone_normalized: string | null;
  booking_history: BookingHistoryEntry[];
  created_at: string;
  updated_at: string;
};

export type AdminUserRow = {
  id: string;
  email: string;
  password_hash: string;
  full_name: string | null;
  role: "admin";
  reset_token_hash: string | null;
  reset_token_expires: string | null;
  created_at: string;
  updated_at: string;
};

export type AdminSession = {
  userId: string;
  email: string;
  fullName: string | null;
  role: "admin";
};
