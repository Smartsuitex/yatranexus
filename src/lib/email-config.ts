export type EmailProvider = "resend" | "smtp";

export type EmailSettings = {
  id: number;
  is_enabled: boolean;
  provider: EmailProvider;
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

export type EmailTemplateVars = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  destination?: string;
  package?: string;
  service?: string;
  message?: string;
};

export const DEFAULT_WELCOME_SUBJECT = "Welcome to {{company}}!";
export const DEFAULT_WELCOME_BODY = `<p>Hi {{name}},</p>
<p>Thank you for connecting with <strong>{{company}}</strong>. We are delighted to help you plan your next journey.</p>
<p>Our travel experts will reach out shortly. Meanwhile, explore holiday packages, flights, hotels and more on our website.</p>
<p>Warm regards,<br/>Team {{company}}</p>`;

export const DEFAULT_INQUIRY_CUSTOMER_SUBJECT = "We received your inquiry — {{company}}";
export const DEFAULT_INQUIRY_CUSTOMER_BODY = `<p>Hi {{name}},</p>
<p>Thank you for contacting <strong>{{company}}</strong>. We have received your travel inquiry and our team will call or email you within working hours.</p>
<p><strong>Service:</strong> {{service}}<br/>
<strong>Destination:</strong> {{destination}}<br/>
<strong>Package:</strong> {{package}}</p>
<p>Warm regards,<br/>Team {{company}}</p>`;

export const DEFAULT_INQUIRY_ADMIN_SUBJECT = "New inquiry: {{name}} — {{service}}";

export function defaultEmailSettings(): Omit<EmailSettings, "id" | "updated_at"> {
  return {
    is_enabled: false,
    provider: "resend",
    from_name: "YatraNexus",
    from_email: null,
    reply_to_email: null,
    admin_notification_email: null,
    resend_api_key: null,
    smtp_host: null,
    smtp_port: 587,
    smtp_username: null,
    smtp_password: null,
    smtp_secure: false,
    is_authenticated: false,
    last_tested_at: null,
    last_test_error: null,
    welcome_enabled: true,
    welcome_subject: DEFAULT_WELCOME_SUBJECT,
    welcome_body_html: DEFAULT_WELCOME_BODY,
    inquiry_customer_enabled: true,
    inquiry_customer_subject: DEFAULT_INQUIRY_CUSTOMER_SUBJECT,
    inquiry_customer_body_html: DEFAULT_INQUIRY_CUSTOMER_BODY,
    inquiry_admin_enabled: true,
    inquiry_admin_subject: DEFAULT_INQUIRY_ADMIN_SUBJECT,
  };
}

export function mergeEmailSettings(row: Partial<EmailSettings> | null | undefined): EmailSettings {
  const defaults = defaultEmailSettings();
  return {
    id: 1,
    updated_at: row?.updated_at ?? new Date().toISOString(),
    ...defaults,
    ...row,
    provider: row?.provider === "smtp" ? "smtp" : "resend",
    smtp_port: row?.smtp_port ?? defaults.smtp_port,
    smtp_secure: row?.smtp_secure ?? defaults.smtp_secure,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderEmailTemplate(
  template: string,
  vars: EmailTemplateVars,
  company = "YatraNexus",
): string {
  const map: Record<string, string> = {
    name: escapeHtml(vars.name?.trim() || "Traveler"),
    email: escapeHtml(vars.email?.trim() || ""),
    company: escapeHtml(company),
    phone: escapeHtml(vars.phone?.trim() || "—"),
    destination: escapeHtml(vars.destination?.trim() || "—"),
    package: escapeHtml(vars.package?.trim() || "—"),
    service: escapeHtml(vars.service?.trim() || "—"),
    message: escapeHtml(vars.message?.trim() || "—"),
  };

  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => map[key] ?? "");
}

export function formatFromAddress(name: string | null | undefined, email: string | null | undefined): string {
  const safeEmail = email?.trim();
  if (!safeEmail) return "";
  const safeName = name?.trim();
  return safeName ? `${safeName} <${safeEmail}>` : safeEmail;
}

export const SECRET_MASK = "••••••••••••";

/** Convert stored HTML email body to plain text for the admin editor. */
export function emailHtmlToPlain(html: string | null | undefined): string {
  if (!html?.trim()) return "";
  return html
    .replace(/\r\n/g, "\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?(strong|b)>/gi, "**")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Convert plain text (with optional **bold**) to simple HTML for sending. */
export function emailPlainToHtml(plain: string | null | undefined): string {
  const text = plain?.replace(/\r\n/g, "\n").trim() ?? "";
  if (!text) return "";

  const escape = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const formatInline = (line: string) =>
    escape(line).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  return text
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.split("\n").map(formatInline).join("<br/>");
      return `<p>${lines}</p>`;
    })
    .join("\n");
}

export type SmtpPresetId = "custom" | "gmail" | "outlook" | "hostinger" | "zoho";

export const SMTP_PRESETS: {
  id: SmtpPresetId;
  label: string;
  host: string;
  port: number;
  secure: boolean;
  hint: string;
}[] = [
  {
    id: "gmail",
    label: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    hint: "Use a Google App Password (not your normal password).",
  },
  {
    id: "outlook",
    label: "Outlook / Microsoft 365",
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    hint: "Use your full Outlook / Microsoft 365 email and password.",
  },
  {
    id: "hostinger",
    label: "Hostinger",
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    hint: "Use your Hostinger mailbox email and password.",
  },
  {
    id: "zoho",
    label: "Zoho Mail",
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    hint: "Use your Zoho mailbox credentials.",
  },
  {
    id: "custom",
    label: "Custom SMTP",
    host: "",
    port: 587,
    secure: false,
    hint: "Enter host, port and credentials from your email provider.",
  },
];

export function detectSmtpPreset(
  host: string | null | undefined,
  port: number | null | undefined,
  secure: boolean,
): SmtpPresetId {
  const h = host?.trim().toLowerCase() ?? "";
  if (!h) return "custom";
  const match = SMTP_PRESETS.find(
    (p) =>
      p.id !== "custom" &&
      p.host === h &&
      p.port === (port ?? 587) &&
      p.secure === secure,
  );
  return match?.id ?? "custom";
}

export const EMAIL_PLACEHOLDERS = [
  { key: "{{name}}", label: "Name" },
  { key: "{{email}}", label: "Email" },
  { key: "{{company}}", label: "Company" },
  { key: "{{phone}}", label: "Phone" },
  { key: "{{destination}}", label: "Destination" },
  { key: "{{package}}", label: "Package" },
  { key: "{{service}}", label: "Service" },
  { key: "{{message}}", label: "Message" },
] as const;