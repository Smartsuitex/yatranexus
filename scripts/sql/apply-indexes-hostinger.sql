-- Run once in Hostinger phpMyAdmin (SQL tab) on u391320881_yatranexus
-- Speeds package/destination list queries that return image URLs.

ALTER TABLE packages ADD INDEX idx_packages_active_sort (is_active, sort_order);
ALTER TABLE packages ADD INDEX idx_packages_featured (is_featured, is_active, sort_order);
ALTER TABLE packages ADD INDEX idx_packages_destination (destination(191), is_active, sort_order);
ALTER TABLE packages ADD INDEX idx_packages_scope_active (scope, is_active, sort_order);
ALTER TABLE services ADD INDEX idx_services_active_sort (is_active, sort_order);
ALTER TABLE blog_posts ADD INDEX idx_blog_published (is_published, published_at);
ALTER TABLE gallery_images ADD INDEX idx_gallery_active_sort (is_active, sort_order);
ALTER TABLE testimonials ADD INDEX idx_testimonials_active_sort (is_active, sort_order);
ALTER TABLE faqs ADD INDEX idx_faqs_active_sort (is_active, sort_order);
ALTER TABLE destinations ADD INDEX idx_destinations_active_scope (is_active, scope, sort_order);
ALTER TABLE inquiries ADD INDEX idx_inquiries_status_created (status, created_at);
