import type { RowDataPacket } from "mysql2/promise";
import { execute, queryOne } from "@/lib/db-server";
import type { EmailSettingsRow } from "@/lib/db-types";
import { mapEmailSettingsRow, toMysqlDatetime } from "./helpers";

const EMAIL_SETTINGS_PUBLIC_COLUMNS = `
  id, is_enabled, provider, from_name, from_email, reply_to_email, admin_notification_email,
  smtp_host, smtp_port, smtp_username, smtp_secure, is_authenticated, last_tested_at,
  last_test_error, welcome_enabled, welcome_subject, welcome_body_html,
  inquiry_customer_enabled, inquiry_customer_subject, inquiry_customer_body_html,
  inquiry_admin_enabled, inquiry_admin_subject, resend_api_key_set, smtp_password_set, updated_at
`.trim();

export type EmailSettingsPayload = Partial<Omit<EmailSettingsRow, "id">> & {
  resend_api_key?: string | null;
  smtp_password?: string | null;
};

function emailSettingsParams(row: EmailSettingsRow) {
  return [
    row.is_enabled ? 1 : 0,
    row.provider,
    row.from_name,
    row.from_email,
    row.reply_to_email,
    row.admin_notification_email,
    row.resend_api_key,
    row.smtp_host,
    row.smtp_port,
    row.smtp_username,
    row.smtp_password,
    row.smtp_secure ? 1 : 0,
    row.resend_api_key_set ? 1 : 0,
    row.smtp_password_set ? 1 : 0,
    row.is_authenticated ? 1 : 0,
    toMysqlDatetime(row.last_tested_at),
    row.last_test_error,
    row.welcome_enabled ? 1 : 0,
    row.welcome_subject,
    row.welcome_body_html,
    row.inquiry_customer_enabled ? 1 : 0,
    row.inquiry_customer_subject,
    row.inquiry_customer_body_html,
    row.inquiry_admin_enabled ? 1 : 0,
    row.inquiry_admin_subject,
  ];
}

const EMPTY_EMAIL_SETTINGS: Omit<EmailSettingsRow, "id" | "updated_at"> = {
  is_enabled: false,
  provider: "resend",
  from_name: null,
  from_email: null,
  reply_to_email: null,
  admin_notification_email: null,
  resend_api_key: null,
  smtp_host: null,
  smtp_port: 587,
  smtp_username: null,
  smtp_password: null,
  smtp_secure: false,
  resend_api_key_set: false,
  smtp_password_set: false,
  is_authenticated: false,
  last_tested_at: null,
  last_test_error: null,
  welcome_enabled: true,
  welcome_subject: null,
  welcome_body_html: null,
  inquiry_customer_enabled: true,
  inquiry_customer_subject: null,
  inquiry_customer_body_html: null,
  inquiry_admin_enabled: true,
  inquiry_admin_subject: null,
};

export async function getEmailSettings(): Promise<EmailSettingsRow | null> {
  const row = await queryOne<RowDataPacket>(
    `SELECT ${EMAIL_SETTINGS_PUBLIC_COLUMNS} FROM email_settings WHERE id = 1 LIMIT 1`,
  );
  if (!row) return null;
  return mapEmailSettingsRow({ ...row, resend_api_key: null, smtp_password: null });
}

export async function getEmailSettingsWithSecrets(): Promise<EmailSettingsRow | null> {
  const row = await queryOne<RowDataPacket>("SELECT * FROM email_settings WHERE id = 1 LIMIT 1");
  return row ? mapEmailSettingsRow(row) : null;
}

export async function saveEmailSettings(payload: EmailSettingsPayload): Promise<EmailSettingsRow> {
  const existing = (await getEmailSettingsWithSecrets()) ?? {
    id: 1,
    ...EMPTY_EMAIL_SETTINGS,
    updated_at: "",
  };

  const merged: EmailSettingsRow = {
    id: 1,
    is_enabled: payload.is_enabled ?? existing.is_enabled,
    provider: payload.provider ?? existing.provider,
    from_name: payload.from_name !== undefined ? payload.from_name : existing.from_name,
    from_email: payload.from_email !== undefined ? payload.from_email : existing.from_email,
    reply_to_email:
      payload.reply_to_email !== undefined ? payload.reply_to_email : existing.reply_to_email,
    admin_notification_email:
      payload.admin_notification_email !== undefined
        ? payload.admin_notification_email
        : existing.admin_notification_email,
    resend_api_key: existing.resend_api_key,
    smtp_host: payload.smtp_host !== undefined ? payload.smtp_host : existing.smtp_host,
    smtp_port: payload.smtp_port !== undefined ? payload.smtp_port : existing.smtp_port,
    smtp_username:
      payload.smtp_username !== undefined ? payload.smtp_username : existing.smtp_username,
    smtp_password: existing.smtp_password,
    smtp_secure: payload.smtp_secure ?? existing.smtp_secure,
    resend_api_key_set: existing.resend_api_key_set,
    smtp_password_set: existing.smtp_password_set,
    is_authenticated: payload.is_authenticated ?? existing.is_authenticated,
    last_tested_at:
      payload.last_tested_at !== undefined ? payload.last_tested_at : existing.last_tested_at,
    last_test_error:
      payload.last_test_error !== undefined ? payload.last_test_error : existing.last_test_error,
    welcome_enabled: payload.welcome_enabled ?? existing.welcome_enabled,
    welcome_subject:
      payload.welcome_subject !== undefined ? payload.welcome_subject : existing.welcome_subject,
    welcome_body_html:
      payload.welcome_body_html !== undefined
        ? payload.welcome_body_html
        : existing.welcome_body_html,
    inquiry_customer_enabled: payload.inquiry_customer_enabled ?? existing.inquiry_customer_enabled,
    inquiry_customer_subject:
      payload.inquiry_customer_subject !== undefined
        ? payload.inquiry_customer_subject
        : existing.inquiry_customer_subject,
    inquiry_customer_body_html:
      payload.inquiry_customer_body_html !== undefined
        ? payload.inquiry_customer_body_html
        : existing.inquiry_customer_body_html,
    inquiry_admin_enabled: payload.inquiry_admin_enabled ?? existing.inquiry_admin_enabled,
    inquiry_admin_subject:
      payload.inquiry_admin_subject !== undefined
        ? payload.inquiry_admin_subject
        : existing.inquiry_admin_subject,
    updated_at: existing.updated_at,
  };

  if (payload.resend_api_key) {
    merged.resend_api_key = payload.resend_api_key;
    merged.resend_api_key_set = true;
  }

  if (payload.smtp_password) {
    merged.smtp_password = payload.smtp_password;
    merged.smtp_password_set = true;
  }

  await execute(
    `INSERT INTO email_settings (
      id, is_enabled, provider, from_name, from_email, reply_to_email,
      admin_notification_email, resend_api_key, smtp_host, smtp_port, smtp_username,
      smtp_password, smtp_secure, resend_api_key_set, smtp_password_set, is_authenticated,
      last_tested_at, last_test_error, welcome_enabled, welcome_subject, welcome_body_html,
      inquiry_customer_enabled, inquiry_customer_subject, inquiry_customer_body_html,
      inquiry_admin_enabled, inquiry_admin_subject
    ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      is_enabled = VALUES(is_enabled),
      provider = VALUES(provider),
      from_name = VALUES(from_name),
      from_email = VALUES(from_email),
      reply_to_email = VALUES(reply_to_email),
      admin_notification_email = VALUES(admin_notification_email),
      resend_api_key = VALUES(resend_api_key),
      smtp_host = VALUES(smtp_host),
      smtp_port = VALUES(smtp_port),
      smtp_username = VALUES(smtp_username),
      smtp_password = VALUES(smtp_password),
      smtp_secure = VALUES(smtp_secure),
      resend_api_key_set = VALUES(resend_api_key_set),
      smtp_password_set = VALUES(smtp_password_set),
      is_authenticated = VALUES(is_authenticated),
      last_tested_at = VALUES(last_tested_at),
      last_test_error = VALUES(last_test_error),
      welcome_enabled = VALUES(welcome_enabled),
      welcome_subject = VALUES(welcome_subject),
      welcome_body_html = VALUES(welcome_body_html),
      inquiry_customer_enabled = VALUES(inquiry_customer_enabled),
      inquiry_customer_subject = VALUES(inquiry_customer_subject),
      inquiry_customer_body_html = VALUES(inquiry_customer_body_html),
      inquiry_admin_enabled = VALUES(inquiry_admin_enabled),
      inquiry_admin_subject = VALUES(inquiry_admin_subject)`,
    emailSettingsParams(merged),
  );

  const row = await queryOne<RowDataPacket>(
    `SELECT ${EMAIL_SETTINGS_PUBLIC_COLUMNS} FROM email_settings WHERE id = 1 LIMIT 1`,
  );
  if (!row) throw new Error("Email settings not found after save");
  return mapEmailSettingsRow({ ...row, resend_api_key: null, smtp_password: null });
}
