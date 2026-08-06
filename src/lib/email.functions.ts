import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { mergeEmailSettings, type EmailSettings } from "@/lib/email-config";
import { loadEmailSettings, sendWelcomeEmail, testEmailConfiguration } from "@/lib/email";
import { verifyAdminAccessToken } from "@/lib/admin-auth";
import {
  getEmailSettingsWithSecrets,
  saveEmailSettings,
} from "@/lib/db-queries/email-settings";

const EmailProviderSchema = z.enum(["resend", "smtp"]);

const nullishString = (max: number) =>
  z.preprocess(
    (value) => (value == null ? "" : value),
    z.string().trim().max(max),
  );

const optionalEmail = z.preprocess(
  (value) => (value == null ? "" : value),
  z
    .string()
    .trim()
    .max(255)
    .refine((value) => value === "" || z.string().email().safeParse(value).success, {
      message: "Invalid email",
    }),
);

const EmailSettingsInputSchema = z.object({
  is_enabled: z.boolean(),
  provider: EmailProviderSchema,
  from_name: nullishString(120),
  from_email: optionalEmail,
  reply_to_email: optionalEmail,
  admin_notification_email: optionalEmail,
  resend_api_key: nullishString(500),
  smtp_host: nullishString(255),
  smtp_port: z.preprocess(
    (value) => (value == null || value === "" ? undefined : value),
    z.coerce.number().int().min(1).max(65535).optional(),
  ),
  smtp_username: nullishString(255),
  smtp_password: nullishString(500),
  smtp_secure: z.boolean().optional(),
  welcome_enabled: z.boolean(),
  welcome_subject: nullishString(255),
  welcome_body_html: nullishString(20000),
  inquiry_customer_enabled: z.boolean(),
  inquiry_customer_subject: nullishString(255),
  inquiry_customer_body_html: nullishString(20000),
  inquiry_admin_enabled: z.boolean(),
  inquiry_admin_subject: nullishString(255),
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
  await saveEmailSettings({
    is_authenticated: ok,
    last_tested_at: new Date().toISOString(),
    last_test_error: ok ? null : (error ?? "Test failed"),
  });
}

async function loadStoredEmailSecrets(): Promise<Partial<EmailSettings>> {
  const data = await getEmailSettingsWithSecrets();
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

    const existing = await loadStoredEmailSecrets();
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
