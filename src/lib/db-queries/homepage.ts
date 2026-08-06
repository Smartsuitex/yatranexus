import type { RowDataPacket } from "mysql2/promise";
import { execute, queryOne } from "@/lib/db-server";
import type { HomepageRow } from "@/lib/db-types";
import { mapHomepageRow, toJson } from "./helpers";

export type HomepageSettingsPayload = Partial<Omit<HomepageRow, "id">>;

function homepageParams(row: Omit<HomepageRow, "id">) {
  return [
    toJson(row.hero_slides),
    row.hero_interval_ms,
    toJson(row.featured_service_slugs),
    toJson(row.featured_package_slugs),
    toJson(row.featured_destination_slugs),
    row.about_title,
    row.about_content,
    toJson(row.why_choose_us),
    toJson(row.stats),
    toJson(row.how_it_works),
    toJson(row.corporate_features),
    toJson(row.tour_types),
    toJson(row.holiday_themes),
    row.cta_title,
    row.cta_subtitle,
  ];
}

const EMPTY_HOMEPAGE: Omit<HomepageRow, "id" | "updated_at"> = {
  hero_slides: [],
  hero_interval_ms: 10_000,
  featured_service_slugs: [],
  featured_package_slugs: [],
  featured_destination_slugs: [],
  about_title: null,
  about_content: null,
  why_choose_us: [],
  stats: [],
  how_it_works: [],
  corporate_features: [],
  tour_types: [],
  holiday_themes: [],
  cta_title: null,
  cta_subtitle: null,
};

export async function getHomepageSettings(): Promise<HomepageRow | null> {
  const row = await queryOne<RowDataPacket>("SELECT * FROM homepage_settings WHERE id = 1 LIMIT 1");
  return row ? mapHomepageRow(row) : null;
}

export async function saveHomepageSettings(payload: HomepageSettingsPayload): Promise<HomepageRow> {
  const existing = (await getHomepageSettings()) ?? { id: 1, ...EMPTY_HOMEPAGE, updated_at: "" };
  const merged: Omit<HomepageRow, "id"> = {
    hero_slides: payload.hero_slides ?? existing.hero_slides,
    hero_interval_ms: payload.hero_interval_ms ?? existing.hero_interval_ms,
    featured_service_slugs: payload.featured_service_slugs ?? existing.featured_service_slugs,
    featured_package_slugs: payload.featured_package_slugs ?? existing.featured_package_slugs,
    featured_destination_slugs:
      payload.featured_destination_slugs ?? existing.featured_destination_slugs,
    about_title: payload.about_title !== undefined ? payload.about_title : existing.about_title,
    about_content:
      payload.about_content !== undefined ? payload.about_content : existing.about_content,
    why_choose_us: payload.why_choose_us ?? existing.why_choose_us,
    stats: payload.stats ?? existing.stats,
    how_it_works: payload.how_it_works ?? existing.how_it_works,
    corporate_features: payload.corporate_features ?? existing.corporate_features,
    tour_types: payload.tour_types ?? existing.tour_types,
    holiday_themes: payload.holiday_themes ?? existing.holiday_themes,
    cta_title: payload.cta_title !== undefined ? payload.cta_title : existing.cta_title,
    cta_subtitle: payload.cta_subtitle !== undefined ? payload.cta_subtitle : existing.cta_subtitle,
    updated_at: existing.updated_at,
  };

  await execute(
    `INSERT INTO homepage_settings (
      id, hero_slides, hero_interval_ms, featured_service_slugs, featured_package_slugs,
      featured_destination_slugs, about_title, about_content, why_choose_us, stats,
      how_it_works, corporate_features, tour_types, holiday_themes, cta_title, cta_subtitle
    ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      hero_slides = VALUES(hero_slides),
      hero_interval_ms = VALUES(hero_interval_ms),
      featured_service_slugs = VALUES(featured_service_slugs),
      featured_package_slugs = VALUES(featured_package_slugs),
      featured_destination_slugs = VALUES(featured_destination_slugs),
      about_title = VALUES(about_title),
      about_content = VALUES(about_content),
      why_choose_us = VALUES(why_choose_us),
      stats = VALUES(stats),
      how_it_works = VALUES(how_it_works),
      corporate_features = VALUES(corporate_features),
      tour_types = VALUES(tour_types),
      holiday_themes = VALUES(holiday_themes),
      cta_title = VALUES(cta_title),
      cta_subtitle = VALUES(cta_subtitle)`,
    homepageParams(merged),
  );

  const row = await queryOne<RowDataPacket>("SELECT * FROM homepage_settings WHERE id = 1 LIMIT 1");
  if (!row) throw new Error("Homepage settings not found after save");
  return mapHomepageRow(row);
}
