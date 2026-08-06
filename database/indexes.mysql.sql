-- Safe to run on existing Hostinger/local MySQL (idempotent via procedure-style checks).
-- Speeds up CMS list queries that return image_url paths — does NOT store image bytes in DB.

SET @schema = DATABASE();

DROP PROCEDURE IF EXISTS yn_add_index_if_missing;
DELIMITER //
CREATE PROCEDURE yn_add_index_if_missing(
  IN p_table VARCHAR(64),
  IN p_index VARCHAR(64),
  IN p_columns VARCHAR(255)
)
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.statistics
    WHERE table_schema = DATABASE()
      AND table_name = p_table
      AND index_name = p_index
  ) THEN
    SET @sql = CONCAT('ALTER TABLE `', p_table, '` ADD INDEX `', p_index, '` (', p_columns, ')');
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
  END IF;
END //
DELIMITER ;

CALL yn_add_index_if_missing('packages', 'idx_packages_active_sort', 'is_active, sort_order');
CALL yn_add_index_if_missing('packages', 'idx_packages_featured', 'is_featured, is_active, sort_order');
CALL yn_add_index_if_missing('packages', 'idx_packages_destination', 'destination(191), is_active, sort_order');
CALL yn_add_index_if_missing('packages', 'idx_packages_scope_active', 'scope, is_active, sort_order');
CALL yn_add_index_if_missing('services', 'idx_services_active_sort', 'is_active, sort_order');
CALL yn_add_index_if_missing('blog_posts', 'idx_blog_published', 'is_published, published_at');
CALL yn_add_index_if_missing('gallery_images', 'idx_gallery_active_sort', 'is_active, sort_order');
CALL yn_add_index_if_missing('testimonials', 'idx_testimonials_active_sort', 'is_active, sort_order');
CALL yn_add_index_if_missing('faqs', 'idx_faqs_active_sort', 'is_active, sort_order');
CALL yn_add_index_if_missing('destinations', 'idx_destinations_active_scope', 'is_active, scope, sort_order');
CALL yn_add_index_if_missing('inquiries', 'idx_inquiries_status_created', 'status, created_at');

DROP PROCEDURE IF EXISTS yn_add_index_if_missing;
