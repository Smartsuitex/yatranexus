import { createClient } from "@supabase/supabase-js";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { mergeEmailSettings, type EmailSettings } from "@/lib/email-config";
import { loadEmailSettings, sendWelcomeEmail, testEmailConfiguration } from "@/lib/email";
import { verifyAdminAccessToken } from "@/lib/admin-auth";
import { getServerSupabaseService } from "@/lib/supabase-server";

const EmailProviderSchema = z.enum(["resend", "smtp"]);

const optionalEmail = z
  .string()
  .trim()
  .max(255)
  .refine((value) => value === "" || z.string().email().safeParse(value).success, {
    message: "Invalid email",
  });

const EmailSettingsInputSchema = z.object({
  is_enabled: z.boolean(),
  provider: EmailProviderSchema,
  from_name: z.string().trim().max(120).default(""),
  from_email: optionalEmail.default(""),
  reply_to_email: optionalEmail.default(""),
  admin_notification_email: optionalEmail.default(""),
  resend_api_key: z.string().max(500).default(""),
  smtp_host: z.string().trim().max(255).default(""),
  smtp_port: z.coerce.number().int().min(1).max(65535).optional(),
  smtp_username: z.string().trim().max(255).default(""),
  smtp_password: z.string().max(500).default(""),
  smtp_secure: z.boolean().optional(),
  welcome_enabled: z.boolean(),
  welcome_subject: z.string().trim().max(255).default(""),
  welcome_body_html: z.string().trim().max(20000).default(""),
  inquiry_customer_enabled: z.boolean(),
  inquiry_customer_subject: z.string().trim().max(255).default(""),
  inquiry_customer_body_html: z.string().trim().max(20000).default(""),
  inquiry_admin_enabled: z.boolean(),
  inquiry_admin_subject: z.string().trim().max(255).default(""),
});

const TestEmailSchema = z.object({
  test_email: z.string().trim().email().max(255),
  settings: EmailSettingsInputSchema,
  access_token: z.string().optional().or(z.literal("")),
});

const WelcomeEmailSchema = z.object({
  email: z.string().trim().email().max(255),
  name: z.string().trim().max(100).optional().or(z.literal("")),
  access_token: z.string().optional().or(z.literal("")),
});

function toEmailSettings(input: z.infer<typeof EmailSettingsInputSchema>): Partial<EmailSettings> {
  return {
    is_enabled: input.is_enabled,
    provider: input.provider,
    from_name: input.from_name || null,
    from_email: input.from_email || null,
    reply_to_email: input.reply_to_email || null,
    admin_notification_email: input.admin_notification_email || null,
    resend_api_key: input.resend_api_key || null,
    smtp_host: input.smtp_host || null,
    smtp_port: input.smtp_port ?? 587,
    smtp_username: input.smtp_username || null,
    smtp_password: input.smtp_password || null,
    smtp_secure: input.smtp_secure ?? false,
    welcome_enabled: input.welcome_enabled,
    welcome_subject: input.welcome_subject || null,
    welcome_body_html: input.welcome_body_html || null,
    inquiry_customer_enabled: input.inquiry_customer_enabled,
    inquiry_customer_subject: input.inquiry_customer_subject || null,
    inquiry_customer_body_html: input.inquiry_customer_body_html || null,
    inquiry_admin_enabled: input.inquiry_admin_enabled,
    inquiry_admin_subject: input.inquiry_admin_subject || null,
  };
}

async function markEmailTestResult(ok: boolean, error?: string) {
  const service = getServerSupabaseService();
  if (!service) return;
  await service
    .from("email_settings")
    .upsert({
      id: 1,
      is_authenticated: ok,
      last_tested_at: new Date().toISOString(),
      last_test_error: ok ? null : (error ?? "Test failed"),
      updated_at: new Date().toISOString(),
    })
    .select()
    .maybeSingle();
}

async function loadStoredEmailSecrets(accessToken?: string): Promise<Partial<EmailSettings>> {
  const service = getServerSupabaseService();
  if (service) {
    const { data } = await service.from("email_settings").select("*").eq("id", 1).maybeSingle();
    return (data as EmailSettings | null) ?? {};
  }

  if (!accessToken) return {};

  const url =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    (typeof import.meta !== "undefined" ? import.meta.env?.VITE_SUPABASE_URL : undefined);
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    (typeof import.meta !== "undefined" ? import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY : undefined);

  if (!url || !key) return {};

  const authed = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
  const { data } = await authed.from("email_settings").select("*").eq("id", 1).maybeSingle();
  return (data as EmailSettings | null) ?? {};
}

export const testEmailSettings = createServerFn({ method: "POST" })
  .validator((data: unknown) => TestEmailSchema.parse(data))
  .handler(async ({ data }) => {
    const isAdmin = await verifyAdminAccessToken(data.access_token || "");
    if (!isAdmin) {
      throw new Error("Unauthorized: admin access required.");
    }

    const config = mergeEmailSettings({
      ...toEmailSettings(data.settings),
      is_enabled: true,
    });

    const existing = await loadStoredEmailSecrets(data.access_token || undefined);
    if (!config.resend_api_key && existing.resend_api_key) {
      config.resend_api_key = existing.resend_api_key;
    }
    if (!config.smtp_password && existing.smtp_password) {
      config.smtp_password = existing.smtp_password;
    }

    const company = config.from_name ?? "YatraNexus";
    const result = await testEmailConfiguration(config, data.test_email, company);
    await markEmailTestResult(result.ok, result.error);

    if (!result.ok) {
      throw new Error(result.error ?? "Email test failed.");
    }

    return { ok: true };
  });

export const sendCustomerWelcomeEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => WelcomeEmailSchema.parse(data))
  .handler(async ({ data }) => {
    const isAdmin = await verifyAdminAccessToken(data.access_token || "");
    if (!isAdmin) {
      throw new Error("Unauthorized: admin access required.");
    }

    const sent = await sendWelcomeEmail({
      email: data.email,
      name: data.name || undefined,
    });
    if (!sent) {
      throw new Error("Welcome email could not be sent. Check email settings in admin.");
    }
    return { ok: true };
  });
