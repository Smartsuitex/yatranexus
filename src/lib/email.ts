import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";
import {
  DEFAULT_INQUIRY_ADMIN_SUBJECT,
  DEFAULT_INQUIRY_CUSTOMER_BODY,
  DEFAULT_INQUIRY_CUSTOMER_SUBJECT,
  DEFAULT_WELCOME_BODY,
  DEFAULT_WELCOME_SUBJECT,
  formatFromAddress,
  mergeEmailSettings,
  renderEmailTemplate,
  type EmailSettings,
  type EmailTemplateVars,
} from "@/lib/email-config";
import { getEmailSettingsWithSecrets } from "@/lib/db-queries/email-settings";

type InquiryEmailPayload = {
  name: string;
  phone: string;
  email?: string | null;
  subject?: string | null;
  service_type: string;
  destination?: string | null;
  package_name?: string | null;
  message?: string | null;
};

type WelcomeEmailPayload = {
  name?: string;
  email: string;
};

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  config: EmailSettings;
  company?: string;
};

const EMAIL_LOGO_CID = "yatranexus-logo";
const EMAIL_LOGO_PUBLIC_PATH = "/images/logo/yatranexus-full-logo.jpg";

function resolveSiteOrigin(): string {
  return (
    process.env.SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    process.env.VITE_SITE_URL ||
    "https://yatranexus.com"
  ).replace(/\/$/, "");
}

function resolveEmailLogoFile(): string | null {
  const candidates = [
    path.join(process.cwd(), "public/images/logo/yatranexus-full-logo.jpg"),
    path.join(process.cwd(), "src/assets/YatraNexus Full Logo.jpg"),
    path.join(process.cwd(), "public/images/logo/yatranexus-logo.png"),
    path.join(process.cwd(), "src/assets/yatranexus-logo.png"),
  ];
  return candidates.find((file) => fs.existsSync(file)) ?? null;
}

function emailLogoSrc(preferCid: boolean): string {
  if (preferCid && resolveEmailLogoFile()) {
    return `cid:${EMAIL_LOGO_CID}`;
  }
  return `${resolveSiteOrigin()}${EMAIL_LOGO_PUBLIC_PATH}`;
}

function wrapEmailDocument(bodyHtml: string, company: string, preferCid: boolean): string {
  const logoSrc = emailLogoSrc(preferCid);
  const safeCompany = escapeHtml(company);
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:Georgia,'Times New Roman',serif;color:#1a2332">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:24px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8ecf0">
        <tr>
          <td style="padding:28px 28px 18px;text-align:center;background:linear-gradient(180deg,#ffffff 0%,#f8fafc 100%);border-bottom:1px solid #eef1f4">
            <img src="${logoSrc}" alt="${safeCompany}" width="220" style="display:inline-block;max-width:220px;height:auto;border:0;outline:none;text-decoration:none"/>
          </td>
        </tr>
        <tr>
          <td style="padding:28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#1a2332">
            ${bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:18px 28px 28px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#6b7280;border-top:1px solid #eef1f4;text-align:center">
            © ${new Date().getFullYear()} ${safeCompany}. Your Journey, Our Priority.
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function smtpLogoAttachment():
  | { filename: string; path: string; cid: string; contentDisposition: "inline" }
  | undefined {
  const filePath = resolveEmailLogoFile();
  if (!filePath) return undefined;
  return {
    filename: path.basename(filePath),
    path: filePath,
    cid: EMAIL_LOGO_CID,
    contentDisposition: "inline",
  };
}

function resendLogoAttachment():
  | { filename: string; content: string; content_id: string; content_type: string }
  | undefined {
  const filePath = resolveEmailLogoFile();
  if (!filePath) return undefined;
  const ext = path.extname(filePath).toLowerCase();
  const contentType =
    ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "application/octet-stream";
  return {
    filename: path.basename(filePath),
    content: fs.readFileSync(filePath).toString("base64"),
    content_id: EMAIL_LOGO_CID,
    content_type: contentType,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inquiryTableHtml(payload: InquiryEmailPayload): string {
  const rows = [
    ["Name", payload.name],
    ["Phone", payload.phone],
    ["Email", payload.email ?? "—"],
    ["Subject", payload.subject ?? "—"],
    ["Service", payload.service_type],
    ["Destination", payload.destination ?? "—"],
    ["Package", payload.package_name ?? "—"],
    ["Message", payload.message ?? "—"],
  ];

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px;border:1px solid #eee;font-weight:600">${escapeHtml(label)}</td><td style="padding:8px;border:1px solid #eee">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<table style="border-collapse:collapse;width:100%;max-width:560px">${body}</table>`;
}

function envFallbackConfig(): EmailSettings {
  const smtpHost = process.env.SMTP_HOST?.trim() || null;
  const smtpUser = process.env.SMTP_USER?.trim() || process.env.SMTP_USERNAME?.trim() || null;
  const smtpPass = process.env.SMTP_PASSWORD?.trim() || null;
  const smtpConfigured = Boolean(smtpHost && smtpUser && smtpPass);
  const resendKey = process.env.RESEND_API_KEY?.trim() || null;

  return mergeEmailSettings({
    is_enabled: Boolean(resendKey || smtpConfigured),
    provider: smtpConfigured ? "smtp" : "resend",
    from_name: process.env.EMAIL_FROM?.split("<")[0]?.trim() || "YatraNexus",
    from_email:
      process.env.EMAIL_FROM?.match(/<([^>]+)>/)?.[1] ??
      process.env.EMAIL_FROM ??
      (smtpUser || "onboarding@resend.dev"),
    admin_notification_email:
      process.env.ADMIN_EMAIL ?? process.env.EMAIL_ADMIN ?? "info@yatranexus.com",
    resend_api_key: resendKey,
    smtp_host: smtpHost,
    smtp_port: Number(process.env.SMTP_PORT || (smtpConfigured ? 465 : 587)),
    smtp_username: smtpUser,
    smtp_password: smtpPass,
    smtp_secure:
      process.env.SMTP_SECURE === "true" ||
      process.env.SMTP_SECURE === "1" ||
      Number(process.env.SMTP_PORT || 0) === 465,
    inquiry_admin_enabled: true,
    inquiry_customer_enabled: true,
    is_authenticated: Boolean(resendKey || smtpConfigured),
  });
}

function applyEnvEmailSecrets(config: EmailSettings): EmailSettings {
  const next = { ...config };
  if (process.env.RESEND_API_KEY) {
    next.resend_api_key = process.env.RESEND_API_KEY.trim();
  }
  if (process.env.SMTP_HOST) {
    next.smtp_host = process.env.SMTP_HOST.trim();
  }
  if (process.env.SMTP_USER || process.env.SMTP_USERNAME) {
    next.smtp_username = (process.env.SMTP_USER || process.env.SMTP_USERNAME)!.trim();
  }
  if (process.env.SMTP_PASSWORD) {
    next.smtp_password = process.env.SMTP_PASSWORD;
  }
  if (process.env.SMTP_PORT) {
    next.smtp_port = Number(process.env.SMTP_PORT);
  }
  if (process.env.SMTP_SECURE === "true" || process.env.SMTP_SECURE === "1") {
    next.smtp_secure = true;
  } else if (process.env.SMTP_SECURE === "false" || process.env.SMTP_SECURE === "0") {
    next.smtp_secure = false;
  } else if (Number(process.env.SMTP_PORT || 0) === 465) {
    next.smtp_secure = true;
  }
  if (process.env.EMAIL_FROM) {
    next.from_email =
      process.env.EMAIL_FROM.match(/<([^>]+)>/)?.[1] ?? process.env.EMAIL_FROM;
    const name = process.env.EMAIL_FROM.split("<")[0]?.trim();
    if (name) next.from_name = name;
  }
  if (process.env.ADMIN_EMAIL || process.env.EMAIL_ADMIN) {
    next.admin_notification_email =
      process.env.ADMIN_EMAIL ?? process.env.EMAIL_ADMIN ?? next.admin_notification_email;
  }
  if (
    next.smtp_host &&
    next.smtp_username &&
    next.smtp_password &&
    !process.env.RESEND_API_KEY
  ) {
    next.provider = "smtp";
  }
  if (
    !next.is_enabled &&
    (next.resend_api_key || (next.smtp_host && next.smtp_username && next.smtp_password))
  ) {
    // Credentials exist (DB or env) but toggle left off — still allow inquiry mail.
    next.is_enabled = true;
  }
  return next;
}

function hasEmailCredentials(config: EmailSettings): boolean {
  if (config.provider === "smtp") {
    return Boolean(config.smtp_host && config.smtp_username && config.smtp_password);
  }
  return Boolean(config.resend_api_key || process.env.RESEND_API_KEY);
}

export async function loadEmailSettings(): Promise<EmailSettings> {
  try {
    const data = await getEmailSettingsWithSecrets();
    if (!data) {
      return applyEnvEmailSecrets(envFallbackConfig());
    }
    return applyEnvEmailSecrets(mergeEmailSettings(data as EmailSettings));
  } catch (err) {
    console.warn("[email] Could not load email settings from MySQL:", err);
    return applyEnvEmailSecrets(envFallbackConfig());
  }
}

function resolveFrom(config: EmailSettings): string {
  return (
    formatFromAddress(config.from_name, config.from_email) ||
    process.env.EMAIL_FROM ||
    "YatraNexus <onboarding@resend.dev>"
  );
}

async function sendViaResend(input: SendEmailInput): Promise<{ ok: boolean; error?: string }> {
  const apiKey = input.config.resend_api_key ?? process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: "Resend API key is not configured." };

  const from = resolveFrom(input.config);
  const company = input.company ?? input.config.from_name ?? "YatraNexus";
  const logo = resendLogoAttachment();
  const html = wrapEmailDocument(input.html, company, Boolean(logo));
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: input.subject,
      html,
      reply_to: input.config.reply_to_email || undefined,
      attachments: logo ? [logo] : undefined,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, error: text || `Resend error ${res.status}` };
  }
  return { ok: true };
}

function buildSmtpTransport(config: {
  smtp_host: string;
  smtp_port?: number | null;
  smtp_username: string;
  smtp_password: string;
  smtp_secure?: boolean | null;
}) {
  const port = Number(config.smtp_port) || 587;
  // Port 465 = implicit TLS; 587 = STARTTLS. Prefer port-correct secure mode.
  const secure = port === 465 ? true : port === 587 ? false : Boolean(config.smtp_secure);

  return nodemailer.createTransport({
    host: config.smtp_host,
    port,
    secure,
    requireTLS: !secure && port === 587,
    auth: { user: config.smtp_username, pass: config.smtp_password },
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 20_000,
    tls: {
      minVersion: "TLSv1.2",
      servername: config.smtp_host,
    },
  });
}

async function sendViaSmtp(input: SendEmailInput): Promise<{ ok: boolean; error?: string }> {
  const { smtp_host, smtp_port, smtp_username, smtp_password, smtp_secure } = input.config;
  if (!smtp_host || !smtp_username || !smtp_password) {
    return { ok: false, error: "SMTP host, username and password are required." };
  }

  const company = input.company ?? input.config.from_name ?? "YatraNexus";
  const logo = smtpLogoAttachment();
  const mail = {
    from: resolveFrom(input.config),
    to: input.to,
    subject: input.subject,
    html: wrapEmailDocument(input.html, company, Boolean(logo)),
    replyTo: input.config.reply_to_email || undefined,
    attachments: logo ? [logo] : undefined,
  };

  const primary = buildSmtpTransport({
    smtp_host,
    smtp_port,
    smtp_username,
    smtp_password,
    smtp_secure,
  });

  try {
    await primary.sendMail(mail);
    return { ok: true };
  } catch (err) {
    const primaryError = err instanceof Error ? err.message : "SMTP send failed.";
    const port = Number(smtp_port) || 587;

    // Retry once with the alternate TLS mode for common Admin misconfig.
    if (port === 465 || port === 587) {
      const altPort = port === 465 ? 587 : 465;
      try {
        console.warn(
          `[email] SMTP failed (${primaryError}). Retrying with port ${altPort}.`,
        );
        const fallback = buildSmtpTransport({
          smtp_host,
          smtp_port: altPort,
          smtp_username,
          smtp_password,
          smtp_secure: altPort === 465,
        });
        await fallback.sendMail(mail);
        return { ok: true };
      } catch (retryErr) {
        const retryError =
          retryErr instanceof Error ? retryErr.message : "SMTP retry failed.";
        return { ok: false, error: `${primaryError} | retry: ${retryError}` };
      }
    }

    return { ok: false, error: primaryError };
  }
}

export async function sendConfiguredEmail(
  input: SendEmailInput,
): Promise<{ ok: boolean; error?: string }> {
  if (!input.config.is_enabled) {
    if (!hasEmailCredentials(input.config)) {
      return { ok: false, error: "Email sending is disabled in site settings." };
    }
    console.warn(
      "[email] Outgoing email is toggled off, but credentials are configured — sending anyway.",
    );
  }

  if (input.config.provider === "smtp") {
    return sendViaSmtp(input);
  }
  return sendViaResend(input);
}

export async function testEmailConfiguration(
  config: EmailSettings,
  testRecipient: string,
  company = "YatraNexus",
): Promise<{ ok: boolean; error?: string }> {
  const html = `<h2 style="margin:0 0 12px;font-size:20px;color:#0f2744">Email configuration test</h2>
    <p style="margin:0 0 12px">This is a test message from <strong>${escapeHtml(company)}</strong>.</p>
    <p style="margin:0">If you received this email with the logo above, your provider settings are working correctly.</p>`;

  return sendConfiguredEmail({
    to: testRecipient,
    subject: `${company} — email test successful`,
    html,
    config: { ...config, is_enabled: true },
    company,
  });
}

function templateVars(
  payload: InquiryEmailPayload | WelcomeEmailPayload,
  company: string,
): EmailTemplateVars {
  if ("service_type" in payload) {
    return {
      name: payload.name,
      email: payload.email ?? "",
      company,
      phone: payload.phone,
      destination: payload.destination ?? "",
      package: payload.package_name ?? "",
      service: payload.service_type,
      message: payload.message ?? "",
    };
  }
  return {
    name: payload.name ?? "Traveler",
    email: payload.email,
    company,
  };
}

export async function sendWelcomeEmail(payload: WelcomeEmailPayload): Promise<boolean> {
  const config = await loadEmailSettings();
  if (!config.welcome_enabled || !payload.email) return false;

  const company = config.from_name ?? "YatraNexus";
  const vars = templateVars(payload, company);
  const subject = renderEmailTemplate(
    config.welcome_subject ?? DEFAULT_WELCOME_SUBJECT,
    vars,
    company,
  );
  const bodyTemplate = config.welcome_body_html ?? DEFAULT_WELCOME_BODY;
  const html = renderEmailTemplate(bodyTemplate, vars, company);

  const result = await sendConfiguredEmail({ to: payload.email, subject, html, config, company });
  return result.ok;
}

export async function sendInquiryEmails(payload: InquiryEmailPayload): Promise<{
  adminSent: boolean;
  customerSent: boolean;
  error?: string;
}> {
  const loaded = await loadEmailSettings();
  const config: EmailSettings = {
    ...loaded,
    // Inquiry notifications should fire whenever credentials exist.
    is_enabled: loaded.is_enabled || hasEmailCredentials(loaded),
    inquiry_admin_enabled: loaded.inquiry_admin_enabled !== false,
    inquiry_customer_enabled: loaded.inquiry_customer_enabled !== false,
  };
  const company = config.from_name ?? "YatraNexus";
  const vars = templateVars(payload, company);
  const adminEmail = config.admin_notification_email ?? "info@yatranexus.com";

  if (!hasEmailCredentials(config)) {
    const error =
      "Email credentials are not configured. Set Resend/SMTP in Admin → Email settings.";
    console.error("[email]", error);
    return { adminSent: false, customerSent: false, error };
  }

  const tasks: Promise<{ kind: "admin" | "customer"; ok: boolean; error?: string }>[] = [];

  if (config.inquiry_admin_enabled) {
    const adminSubject = renderEmailTemplate(
      config.inquiry_admin_subject ?? DEFAULT_INQUIRY_ADMIN_SUBJECT,
      vars,
      company,
    );
    const adminHtml = `<h2 style="margin:0 0 16px;font-size:20px;color:#0f2744">New website inquiry</h2>
      ${inquiryTableHtml(payload)}`;
    tasks.push(
      sendConfiguredEmail({ to: adminEmail, subject: adminSubject, html: adminHtml, config, company }).then(
        (result) => ({ kind: "admin" as const, ...result }),
      ),
    );
  }

  if (config.inquiry_customer_enabled && payload.email) {
    const customerSubject = renderEmailTemplate(
      config.inquiry_customer_subject ?? DEFAULT_INQUIRY_CUSTOMER_SUBJECT,
      vars,
      company,
    );
    const bodyTemplate = config.inquiry_customer_body_html ?? DEFAULT_INQUIRY_CUSTOMER_BODY;
    const customerHtml = `${renderEmailTemplate(bodyTemplate, vars, company)}
      <hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>
      <p style="font-size:12px;color:#666;margin:0 0 8px">Your inquiry details:</p>
      ${inquiryTableHtml(payload)}`;
    tasks.push(
      sendConfiguredEmail({
        to: payload.email,
        subject: customerSubject,
        html: customerHtml,
        config,
        company,
      }).then((result) => ({ kind: "customer" as const, ...result })),
    );
  }

  if (tasks.length === 0) {
    return { adminSent: false, customerSent: false, error: "No inquiry email recipients enabled." };
  }

  const results = await Promise.all(tasks);
  const adminSent = results.some((r) => r.kind === "admin" && r.ok);
  const customerSent = results.some((r) => r.kind === "customer" && r.ok);
  const error = results.find((r) => r.error)?.error;

  if (!results.some((r) => r.ok)) {
    console.error("[email] inquiry send failed:", error ?? "unknown error");
  } else if (error) {
    console.warn("[email] partial inquiry send failure:", error);
  }

  return { adminSent, customerSent, error };
}

export async function sendPasswordResetEmail(input: {
  to: string;
  resetUrl: string;
  name?: string;
}): Promise<boolean> {
  const config = await loadEmailSettings();
  if (!hasEmailCredentials(config)) {
    console.warn("[email] password reset skipped — no email credentials configured.");
    return false;
  }

  const company = config.from_name ?? "YatraNexus";
  const greeting = input.name ? `Hi ${escapeHtml(input.name)},` : "Hi,";
  const html = `<p>${greeting}</p>
<p>We received a request to reset your YatraNexus admin password.</p>
<p><a href="${escapeHtml(input.resetUrl)}" style="color:#e85d04;font-weight:600">Reset your password</a></p>
<p>This link expires in 1 hour. If you did not request this, you can ignore this email.</p>`;

  const result = await sendConfiguredEmail({
    to: input.to,
    subject: "Reset your YatraNexus admin password",
    html,
    config,
    company,
  });
  return result.ok;
}
