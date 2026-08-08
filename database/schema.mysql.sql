-- YatraNexus CMS schema for Hostinger MySQL/MariaDB
-- Migrated from Supabase Postgres migrations (no RLS; enforced in server code)

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS packages (
  id CHAR(36) NOT NULL PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  scope ENUM('domestic', 'international') NOT NULL,
  nights INT NOT NULL DEFAULT 0,
  days INT NOT NULL DEFAULT 1,
  from_price VARCHAR(64) NOT NULL,
  discount_price VARCHAR(64) NULL,
  package_code VARCHAR(64) NULL,
  image_url TEXT NULL,
  gallery_urls JSON NOT NULL,
  inclusions JSON NOT NULL,
  exclusions JSON NOT NULL,
  itinerary JSON NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  meta_title TEXT NULL,
  meta_description TEXT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CHECK (nights >= 0),
  CHECK (days >= 1),
  KEY idx_packages_active_sort (is_active, sort_order),
  KEY idx_packages_featured (is_featured, is_active, sort_order),
  KEY idx_packages_destination (destination(191), is_active, sort_order),
  KEY idx_packages_scope_active (scope, is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS services (
  id CHAR(36) NOT NULL PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  short_description TEXT NULL,
  description TEXT NULL,
  banner_url TEXT NULL,
  icon VARCHAR(64) NULL,
  gallery_urls JSON NOT NULL,
  inclusions JSON NOT NULL,
  exclusions JSON NOT NULL,
  faqs JSON NOT NULL,
  content_blocks JSON NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  meta_title TEXT NULL,
  meta_description TEXT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  KEY idx_services_active_sort (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blog_posts (
  id CHAR(36) NOT NULL PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NULL,
  category VARCHAR(128) NULL,
  content JSON NOT NULL,
  featured_image_url TEXT NULL,
  tags JSON NOT NULL,
  read_minutes INT NOT NULL DEFAULT 5,
  is_published TINYINT(1) NOT NULL DEFAULT 0,
  published_at DATETIME(3) NULL,
  meta_title TEXT NULL,
  meta_description TEXT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  KEY idx_blog_published (is_published, published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS gallery_images (
  id CHAR(36) NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  album VARCHAR(128) NOT NULL DEFAULT 'General',
  image_url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  KEY idx_gallery_active_sort (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS testimonials (
  id CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(128) NULL,
  designation VARCHAR(255) NULL,
  review_text TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  photo_url TEXT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  CHECK (rating BETWEEN 1 AND 5),
  KEY idx_testimonials_active_sort (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS faqs (
  id CHAR(36) NOT NULL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(128) NOT NULL DEFAULT 'general',
  sort_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  KEY idx_faqs_active_sort (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS destinations (
  id CHAR(36) NOT NULL PRIMARY KEY,
  slug VARCHAR(255) NOT NULL,
  scope ENUM('domestic', 'international') NOT NULL,
  name VARCHAR(255) NOT NULL,
  region VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  blurb TEXT NULL,
  highlights JSON NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  UNIQUE KEY uq_destinations_slug_scope (slug, scope),
  KEY idx_destinations_active_scope (is_active, scope, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS homepage_settings (
  id INT NOT NULL PRIMARY KEY DEFAULT 1,
  hero_slides JSON NOT NULL,
  hero_interval_ms INT NOT NULL DEFAULT 10000,
  featured_service_slugs JSON NOT NULL,
  featured_package_slugs JSON NOT NULL,
  featured_destination_slugs JSON NOT NULL,
  about_title TEXT NULL,
  about_content TEXT NULL,
  why_choose_us JSON NOT NULL,
  stats JSON NOT NULL,
  how_it_works JSON NOT NULL,
  corporate_features JSON NOT NULL,
  tour_types JSON NOT NULL,
  holiday_themes JSON NOT NULL,
  cta_title TEXT NULL,
  cta_subtitle TEXT NULL,
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_settings (
  id INT NOT NULL PRIMARY KEY DEFAULT 1,
  contact_phone VARCHAR(64) NULL,
  contact_phone_raw VARCHAR(32) NULL,
  contact_email VARCHAR(255) NULL,
  contact_whatsapp VARCHAR(32) NULL,
  address TEXT NULL,
  map_embed_url TEXT NULL,
  business_hours TEXT NULL,
  social_links JSON NOT NULL,
  footer_text TEXT NULL,
  logo_url TEXT NULL,
  favicon_url TEXT NULL,
  legal_name VARCHAR(255) NULL,
  tagline VARCHAR(255) NULL,
  page_content JSON NOT NULL,
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS email_settings (
  id INT NOT NULL PRIMARY KEY DEFAULT 1,
  is_enabled TINYINT(1) NOT NULL DEFAULT 0,
  provider ENUM('resend', 'smtp') NOT NULL DEFAULT 'resend',
  from_name VARCHAR(255) NULL,
  from_email VARCHAR(255) NULL,
  reply_to_email VARCHAR(255) NULL,
  admin_notification_email VARCHAR(255) NULL,
  resend_api_key TEXT NULL,
  smtp_host VARCHAR(255) NULL,
  smtp_port INT NULL DEFAULT 587,
  smtp_username VARCHAR(255) NULL,
  smtp_password TEXT NULL,
  smtp_secure TINYINT(1) NOT NULL DEFAULT 0,
  resend_api_key_set TINYINT(1) NOT NULL DEFAULT 0,
  smtp_password_set TINYINT(1) NOT NULL DEFAULT 0,
  is_authenticated TINYINT(1) NOT NULL DEFAULT 0,
  last_tested_at DATETIME(3) NULL,
  last_test_error TEXT NULL,
  welcome_enabled TINYINT(1) NOT NULL DEFAULT 1,
  welcome_subject VARCHAR(255) NULL,
  welcome_body_html MEDIUMTEXT NULL,
  inquiry_customer_enabled TINYINT(1) NOT NULL DEFAULT 1,
  inquiry_customer_subject VARCHAR(255) NULL,
  inquiry_customer_body_html MEDIUMTEXT NULL,
  inquiry_admin_enabled TINYINT(1) NOT NULL DEFAULT 1,
  inquiry_admin_subject VARCHAR(255) NULL,
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS inquiries (
  id CHAR(36) NOT NULL PRIMARY KEY,
  service_type VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NULL,
  subject VARCHAR(200) NULL,
  destination VARCHAR(120) NULL,
  travel_date DATE NULL,
  travelers INT NULL,
  message TEXT NULL,
  package_name VARCHAR(160) NULL,
  source_page VARCHAR(120) NULL,
  selected_inclusions JSON NULL,
  selected_exclusions JSON NULL,
  status ENUM('new', 'contacted', 'quoted', 'closed', 'spam') NOT NULL DEFAULT 'new',
  admin_notes TEXT NULL,
  phone_normalized VARCHAR(20) NULL,
  booking_history JSON NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  KEY idx_inquiries_phone_normalized (phone_normalized, updated_at),
  KEY idx_inquiries_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_users (
  id CHAR(36) NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NULL,
  role ENUM('admin') NOT NULL DEFAULT 'admin',
  reset_token_hash VARCHAR(255) NULL,
  reset_token_expires DATETIME(3) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO homepage_settings (id) VALUES (1);
INSERT IGNORE INTO site_settings (id) VALUES (1);
INSERT IGNORE INTO email_settings (id) VALUES (1);

-- Admin uploads survive Hostinger redeploys (bytes restored to disk on boot).
CREATE TABLE IF NOT EXISTS cms_media (
  path VARCHAR(512) NOT NULL PRIMARY KEY,
  content_type VARCHAR(128) NOT NULL DEFAULT 'image/webp',
  bytes MEDIUMBLOB NOT NULL,
  byte_length INT NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
