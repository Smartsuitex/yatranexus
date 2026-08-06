import type { RowDataPacket } from "mysql2/promise";
import { execute, queryOne } from "@/lib/db-server";
import type { SiteSettingsRow } from "@/lib/db-types";
import { mapSiteSettingsRow, toJson } from "./helpers";

export type SiteSettingsPayload = Partial<Omit<SiteSettingsRow, "id">>;

function siteSettingsParams(row: Omit<SiteSettingsRow, "id">) {
  return [
    row.contact_phone,
    row.contact_phone_raw,
    row.contact_email,
    row.contact_whatsapp,
    row.address,
    row.map_embed_url,
    row.business_hours,
    toJson(row.social_links),
    row.footer_text,
    row.logo_url,
    row.favicon_url,
    row.legal_name,
    row.tagline,
    toJson(row.page_content),
  ];
}

const EMPTY_SITE_SETTINGS: Omit<SiteSettingsRow, "id" | "updated_at"> = {
  contact_phone: null,
  contact_phone_raw: null,
  contact_email: null,
  contact_whatsapp: null,
  address: null,
  map_embed_url: null,
  business_hours: null,
  social_links: {},
  footer_text: null,
  logo_url: null,
  favicon_url: null,
  legal_name: null,
  tagline: null,
  page_content: {},
};

export async function getSiteSettings(): Promise<SiteSettingsRow | null> {
  const row = await queryOne<RowDataPacket>("SELECT * FROM site_settings WHERE id = 1 LIMIT 1");
  return row ? mapSiteSettingsRow(row) : null;
}

export async function saveSiteSettings(payload: SiteSettingsPayload): Promise<SiteSettingsRow> {
  const existing = (await getSiteSettings()) ?? { id: 1, ...EMPTY_SITE_SETTINGS, updated_at: "" };
  const merged: Omit<SiteSettingsRow, "id"> = {
    contact_phone:
      payload.contact_phone !== undefined ? payload.contact_phone : existing.contact_phone,
    contact_phone_raw:
      payload.contact_phone_raw !== undefined
        ? payload.contact_phone_raw
        : existing.contact_phone_raw,
    contact_email:
      payload.contact_email !== undefined ? payload.contact_email : existing.contact_email,
    contact_whatsapp:
      payload.contact_whatsapp !== undefined ? payload.contact_whatsapp : existing.contact_whatsapp,
    address: payload.address !== undefined ? payload.address : existing.address,
    map_embed_url:
      payload.map_embed_url !== undefined ? payload.map_embed_url : existing.map_embed_url,
    business_hours:
      payload.business_hours !== undefined ? payload.business_hours : existing.business_hours,
    social_links: payload.social_links ?? existing.social_links,
    footer_text: payload.footer_text !== undefined ? payload.footer_text : existing.footer_text,
    logo_url: payload.logo_url !== undefined ? payload.logo_url : existing.logo_url,
    favicon_url: payload.favicon_url !== undefined ? payload.favicon_url : existing.favicon_url,
    legal_name: payload.legal_name !== undefined ? payload.legal_name : existing.legal_name,
    tagline: payload.tagline !== undefined ? payload.tagline : existing.tagline,
    page_content: payload.page_content ?? existing.page_content,
    updated_at: existing.updated_at,
  };

  await execute(
    `INSERT INTO site_settings (
      id, contact_phone, contact_phone_raw, contact_email, contact_whatsapp, address,
      map_embed_url, business_hours, social_links, footer_text, logo_url, favicon_url,
      legal_name, tagline, page_content
    ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      contact_phone = VALUES(contact_phone),
      contact_phone_raw = VALUES(contact_phone_raw),
      contact_email = VALUES(contact_email),
      contact_whatsapp = VALUES(contact_whatsapp),
      address = VALUES(address),
      map_embed_url = VALUES(map_embed_url),
      business_hours = VALUES(business_hours),
      social_links = VALUES(social_links),
      footer_text = VALUES(footer_text),
      logo_url = VALUES(logo_url),
      favicon_url = VALUES(favicon_url),
      legal_name = VALUES(legal_name),
      tagline = VALUES(tagline),
      page_content = VALUES(page_content)`,
    siteSettingsParams(merged),
  );

  const row = await queryOne<RowDataPacket>("SELECT * FROM site_settings WHERE id = 1 LIMIT 1");
  if (!row) throw new Error("Site settings not found after save");
  return mapSiteSettingsRow(row);
}
