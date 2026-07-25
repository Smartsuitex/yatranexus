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
import { getServerSupabase, getServerSupabaseService } from "@/lib/supabase-server";

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
  return mergeEmailSettings({
    is_enabled: Boolean(process.env.RESEND_API_KEY),
    provider: "resend",
    from_name: process.env.EMAIL_FROM?.split("<")[0]?.trim() || "YatraNexus",
    from_email:
      process.env.EMAIL_FROM?.match(/<([^>]+)>/)?.[1] ??
      process.env.EMAIL_FROM ??
      "onboarding@resend.dev",
    admin_notification_email:
      process.env.ADMIN_EMAIL ?? process.env.EMAIL_ADMIN ?? "info@yatranexus.com",
    resend_api_key: process.env.RESEND_API_KEY ?? null,
    is_authenticated: Boolean(process.env.RESEND_API_KEY),
  });
}

export async function loadEmailSettings(): Promise<EmailSettings> {
  const service = getServerSupabaseService();
  const client = service ?? getServerSupabase();
  const { data, error } = await client.from("email_settings").select("*").eq("id", 1).maybeSingle();

  if (error || !data) {
    return envFallbackConfig();
  }

  const merged = mergeEmailSettings(data as EmailSettings);
  if (!merged.resend_api_key && process.env.RESEND_API_KEY) {
    merged.resend_api_key = process.env.RESEND_API_KEY;
    merged.is_enabled = merged.is_enabled || Boolean(process.env.RESEND_API_KEY);
  }
  if (!merged.from_email && process.env.EMAIL_FROM) {
    merged.from_email =
      process.env.EMAIL_FROM.match(/<([^>]+)>/)?.[1] ?? process.env.EMAIL_FROM;
  }
  if (!merged.admin_notification_email) {
    merged.admin_notification_email =
      process.env.ADMIN_EMAIL ?? process.env.EMAIL_ADMIN ?? "info@yatranexus.com";
  }
  return merged;
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
      html: input.html,
      reply_to: input.config.reply_to_email || undefined,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, error: text || `Resend error ${res.status}` };
  }
  return { ok: true };
}

async function sendViaSmtp(input: SendEmailInput): Promise<{ ok: boolean; error?: string }> {
  const { smtp_host, smtp_port, smtp_username, smtp_password, smtp_secure } = input.config;
  if (!smtp_host || !smtp_username || !smtp_password) {
    return { ok: false, error: "SMTP host, username and password are required." };
  }

  const transporter = nodemailer.createTransport({
    host: smtp_host,
    port: smtp_port ?? 587,
    secure: smtp_secure,
    auth: { user: smtp_username, pass: smtp_password },
  });

  try {
    await transporter.sendMail({
      from: resolveFrom(input.config),
      to: input.to,
      subject: input.subject,
      html: input.html,
      replyTo: input.config.reply_to_email || undefined,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "SMTP send failed." };
  }
}

export async function sendConfiguredEmail(
  input: SendEmailInput,
): Promise<{ ok: boolean; error?: string }> {
  if (!input.config.is_enabled) {
    return { ok: false, error: "Email sending is disabled in site settings." };
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
  const html = `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#111">
    <h2>Email configuration test</h2>
    <p>This is a test message from <strong>${escapeHtml(company)}</strong>.</p>
    <p>If you received this email, your provider settings are working correctly.</p>
  </body></html>`;

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
  const html = `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#111;line-height:1.6">${renderEmailTemplate(bodyTemplate, vars, company)}</body></html>`;

  const result = await sendConfiguredEmail({ to: payload.email, subject, html, config, company });
  return result.ok;
}

export async function sendInquiryEmails(payload: InquiryEmailPayload): Promise<{
  adminSent: boolean;
  customerSent: boolean;
}> {
  const config = await loadEmailSettings();
  const company = config.from_name ?? "YatraNexus";
  const vars = templateVars(payload, company);
  const adminEmail = config.admin_notification_email ?? "info@yatranexus.com";

  const tasks: Promise<{ kind: "admin" | "customer"; ok: boolean; error?: string }>[] = [];

  if (config.inquiry_admin_enabled) {
    const adminSubject = renderEmailTemplate(
      config.inquiry_admin_subject ?? DEFAULT_INQUIRY_ADMIN_SUBJECT,
      vars,
      company,
    );
    const adminHtml = `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#111">
      <h2>New website inquiry</h2>
      ${inquiryTableHtml(payload)}
    </body></html>`;
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
    const customerHtml = `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#111;line-height:1.6">
      ${renderEmailTemplate(bodyTemplate, vars, company)}
      <hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>
      <p style="font-size:12px;color:#666">Your inquiry details:</p>
      ${inquiryTableHtml(payload)}
    </body></html>`;
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
    if (!config.is_enabled && !process.env.RESEND_API_KEY) {
      console.info("[email] Email not configured — skipping notifications.");
    }
    return { adminSent: false, customerSent: false };
  }

  const results = await Promise.all(tasks);
  const adminSent = results.some((r) => r.kind === "admin" && r.ok);
  const customerSent = results.some((r) => r.kind === "customer" && r.ok);

  if (!results.some((r) => r.ok)) {
    const err = results.find((r) => r.error)?.error;
    console.error("[email] send failed:", err ?? "unknown error");
  }

  return { adminSent, customerSent };
}
