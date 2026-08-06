-- Hostinger phpMyAdmin — safe re-run (skips existing indexes).
-- Select database: u391320881_yatranexus first.

-- packages
SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'packages' AND index_name = 'idx_packages_active_sort');
SET @sql := IF(@exist = 0, 'ALTER TABLE packages ADD INDEX idx_packages_active_sort (is_active, sort_order)', 'SELECT ''skip idx_packages_active_sort''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'packages' AND index_name = 'idx_packages_featured');
SET @sql := IF(@exist = 0, 'ALTER TABLE packages ADD INDEX idx_packages_featured (is_featured, is_active, sort_order)', 'SELECT ''skip idx_packages_featured''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'packages' AND index_name = 'idx_packages_destination');
SET @sql := IF(@exist = 0, 'ALTER TABLE packages ADD INDEX idx_packages_destination (destination(191), is_active, sort_order)', 'SELECT ''skip idx_packages_destination''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'packages' AND index_name = 'idx_packages_scope_active');
SET @sql := IF(@exist = 0, 'ALTER TABLE packages ADD INDEX idx_packages_scope_active (scope, is_active, sort_order)', 'SELECT ''skip idx_packages_scope_active''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'services' AND index_name = 'idx_services_active_sort');
SET @sql := IF(@exist = 0, 'ALTER TABLE services ADD INDEX idx_services_active_sort (is_active, sort_order)', 'SELECT ''skip idx_services_active_sort''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'blog_posts' AND index_name = 'idx_blog_published');
SET @sql := IF(@exist = 0, 'ALTER TABLE blog_posts ADD INDEX idx_blog_published (is_published, published_at)', 'SELECT ''skip idx_blog_published''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'gallery_images' AND index_name = 'idx_gallery_active_sort');
SET @sql := IF(@exist = 0, 'ALTER TABLE gallery_images ADD INDEX idx_gallery_active_sort (is_active, sort_order)', 'SELECT ''skip idx_gallery_active_sort''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'testimonials' AND index_name = 'idx_testimonials_active_sort');
SET @sql := IF(@exist = 0, 'ALTER TABLE testimonials ADD INDEX idx_testimonials_active_sort (is_active, sort_order)', 'SELECT ''skip idx_testimonials_active_sort''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'faqs' AND index_name = 'idx_faqs_active_sort');
SET @sql := IF(@exist = 0, 'ALTER TABLE faqs ADD INDEX idx_faqs_active_sort (is_active, sort_order)', 'SELECT ''skip idx_faqs_active_sort''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'destinations' AND index_name = 'idx_destinations_active_scope');
SET @sql := IF(@exist = 0, 'ALTER TABLE destinations ADD INDEX idx_destinations_active_scope (is_active, scope, sort_order)', 'SELECT ''skip idx_destinations_active_scope''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = 'inquiries' AND index_name = 'idx_inquiries_status_created');
SET @sql := IF(@exist = 0, 'ALTER TABLE inquiries ADD INDEX idx_inquiries_status_created (status, created_at)', 'SELECT ''skip idx_inquiries_status_created''');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
