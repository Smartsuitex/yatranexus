"use client";

import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Mail, XCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  AdminCard,
  AdminErrorBanner,
  AdminField,
  AdminLoading,
  adminInputClass,
} from "@/components/admin/AdminPageHeader";
import { AdminFloatingSaveButton } from "@/components/admin/AdminFloatingSaveButton";
import { getEmailSettings, saveEmailSettings } from "@/lib/admin-cms-api";
import {
  DEFAULT_INQUIRY_ADMIN_SUBJECT,
  DEFAULT_INQUIRY_CUSTOMER_BODY,
  DEFAULT_INQUIRY_CUSTOMER_SUBJECT,
  DEFAULT_WELCOME_BODY,
  DEFAULT_WELCOME_SUBJECT,
  detectSmtpPreset,
  EMAIL_PLACEHOLDERS,
  emailHtmlToPlain,
  emailPlainToHtml,
  mergeEmailSettings,
  SMTP_PRESETS,
  type EmailProvider,
  type SmtpPresetId,
} from "@/lib/email-config";
import { testEmailSettings } from "@/lib/email.functions";
import { useAdminAuth } from "@/hooks/use-admin-auth";

type EmailFormState = {
  is_enabled: boolean;
  provider: EmailProvider;
  smtp_preset: SmtpPresetId;
  from_name: string;
  from_email: string;
  reply_to_email: string;
  admin_notification_email: string;
  resend_api_key: string;
  smtp_host: string;
  smtp_port: string;
  smtp_username: string;
  smtp_password: string;
  smtp_secure: boolean;
  is_authenticated: boolean;
  last_tested_at: string;
  last_test_error: string;
  welcome_enabled: boolean;
  welcome_subject: string;
  welcome_body: string;
  inquiry_customer_enabled: boolean;
  inquiry_customer_subject: string;
  inquiry_customer_body: string;
  inquiry_admin_enabled: boolean;
  inquiry_admin_subject: string;
  test_email: string;
};

function emptyForm(): EmailFormState {
  const d = mergeEmailSettings(undefined);
  return {
    is_enabled: d.is_enabled,
    provider: d.provider,
    smtp_preset: "gmail",
    from_name: d.from_name ?? "",
    from_email: d.from_email ?? "",
    reply_to_email: d.reply_to_email ?? "",
    admin_notification_email: d.admin_notification_email ?? "",
    resend_api_key: "",
    smtp_host: d.smtp_host ?? "",
    smtp_port: String(d.smtp_port ?? 587),
    smtp_username: d.smtp_username ?? "",
    smtp_password: "",
    smtp_secure: d.smtp_secure,
    is_authenticated: false,
    last_tested_at: "",
    last_test_error: "",
    welcome_enabled: d.welcome_enabled,
    welcome_subject: d.welcome_subject ?? DEFAULT_WELCOME_SUBJECT,
    welcome_body: emailHtmlToPlain(d.welcome_body_html ?? DEFAULT_WELCOME_BODY),
    inquiry_customer_enabled: d.inquiry_customer_enabled,
    inquiry_customer_subject:
      d.inquiry_customer_subject ?? DEFAULT_INQUIRY_CUSTOMER_SUBJECT,
    inquiry_customer_body: emailHtmlToPlain(
      d.inquiry_customer_body_html ?? DEFAULT_INQUIRY_CUSTOMER_BODY,
    ),
    inquiry_admin_enabled: d.inquiry_admin_enabled,
    inquiry_admin_subject: d.inquiry_admin_subject ?? DEFAULT_INQUIRY_ADMIN_SUBJECT,
    test_email: "",
  };
}

function PlaceholderChips({
  onInsert,
}: {
  onInsert: (token: string) => void;
}) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {EMAIL_PLACEHOLDERS.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onInsert(item.key)}
          className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-[color:var(--brand-orange)] hover:text-[color:var(--brand-orange)]"
          title={`Insert ${item.key}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function AdminEmailSettingsCard({
  floatingSave = false,
  stackIndex = 0,
}: {
  floatingSave?: boolean;
  stackIndex?: number;
} = {}) {
  const { session } = useAdminAuth();
  const testEmail = useServerFn(testEmailSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [hasStoredResendKey, setHasStoredResendKey] = useState(false);
  const [hasStoredSmtpPassword, setHasStoredSmtpPassword] = useState(false);
  const [form, setForm] = useState<EmailFormState>(emptyForm);

  const load = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    try {
      const row = await getEmailSettings();
      const merged = mergeEmailSettings(row ?? undefined);
      setHasStoredResendKey(Boolean(row?.resend_api_key_set));
      setHasStoredSmtpPassword(Boolean(row?.smtp_password_set));
      setForm({
        ...emptyForm(),
        is_enabled: merged.is_enabled,
        provider: merged.provider,
        smtp_preset: detectSmtpPreset(
          merged.smtp_host,
          merged.smtp_port,
          merged.smtp_secure,
        ),
        from_name: merged.from_name ?? "",
        from_email: merged.from_email ?? "",
        reply_to_email: merged.reply_to_email ?? "",
        admin_notification_email: merged.admin_notification_email ?? "",
        smtp_host: merged.smtp_host ?? "",
        smtp_port: String(merged.smtp_port ?? 587),
        smtp_username: merged.smtp_username ?? "",
        smtp_secure: merged.smtp_secure,
        is_authenticated: merged.is_authenticated,
        last_tested_at: merged.last_tested_at ?? "",
        last_test_error: merged.last_test_error ?? "",
        welcome_enabled: merged.welcome_enabled,
        welcome_subject: merged.welcome_subject ?? DEFAULT_WELCOME_SUBJECT,
        welcome_body: emailHtmlToPlain(
          merged.welcome_body_html ?? DEFAULT_WELCOME_BODY,
        ),
        inquiry_customer_enabled: merged.inquiry_customer_enabled,
        inquiry_customer_subject:
          merged.inquiry_customer_subject ?? DEFAULT_INQUIRY_CUSTOMER_SUBJECT,
        inquiry_customer_body: emailHtmlToPlain(
          merged.inquiry_customer_body_html ?? DEFAULT_INQUIRY_CUSTOMER_BODY,
        ),
        inquiry_admin_enabled: merged.inquiry_admin_enabled,
        inquiry_admin_subject:
          merged.inquiry_admin_subject ?? DEFAULT_INQUIRY_ADMIN_SUBJECT,
        test_email: session?.user.email ?? "",
      });
    } catch (err) {
      setDbError(err instanceof Error ? err.message : "Could not load email settings");
    } finally {
      setLoading(false);
    }
  }, [session?.user.email]);

  useEffect(() => {
    load();
  }, [load]);

  function applySmtpPreset(presetId: SmtpPresetId) {
    const preset = SMTP_PRESETS.find((p) => p.id === presetId) ?? SMTP_PRESETS[4]!;
    setForm((f) => ({
      ...f,
      smtp_preset: presetId,
      smtp_host: preset.host || f.smtp_host,
      smtp_port: String(preset.port),
      smtp_secure: preset.secure,
    }));
  }

  function settingsPayload() {
    return {
      is_enabled: form.is_enabled,
      provider: form.provider,
      from_name: form.from_name || null,
      from_email: form.from_email || null,
      reply_to_email: form.reply_to_email || null,
      admin_notification_email: form.admin_notification_email || null,
      resend_api_key: form.resend_api_key || undefined,
      smtp_host: form.smtp_host || null,
      smtp_port: Number(form.smtp_port) || 587,
      smtp_username: form.smtp_username || null,
      smtp_password: form.smtp_password || undefined,
      smtp_secure: form.smtp_secure,
      welcome_enabled: form.welcome_enabled,
      welcome_subject: form.welcome_subject || null,
      welcome_body_html: emailPlainToHtml(form.welcome_body) || null,
      inquiry_customer_enabled: form.inquiry_customer_enabled,
      inquiry_customer_subject: form.inquiry_customer_subject || null,
      inquiry_customer_body_html: emailPlainToHtml(form.inquiry_customer_body) || null,
      inquiry_admin_enabled: form.inquiry_admin_enabled,
      inquiry_admin_subject: form.inquiry_admin_subject || null,
    };
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = settingsPayload();
      if (!payload.resend_api_key) delete payload.resend_api_key;
      if (!payload.smtp_password) delete payload.smtp_password;

      await saveEmailSettings(payload);
      if (form.resend_api_key) setHasStoredResendKey(true);
      if (form.smtp_password) setHasStoredSmtpPassword(true);
      setForm((f) => ({ ...f, resend_api_key: "", smtp_password: "" }));
      toast.success("Email settings saved");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleTest() {
    if (!form.test_email.trim()) {
      toast.error("Enter a test email address");
      return;
    }
    if (form.provider === "resend" && !form.resend_api_key && !hasStoredResendKey) {
      toast.error("Enter your Resend API key first");
      return;
    }
    if (
      form.provider === "smtp" &&
      (!form.smtp_host || !form.smtp_username || (!form.smtp_password && !hasStoredSmtpPassword))
    ) {
      toast.error("Fill SMTP host, username, and password before testing");
      return;
    }

    setTesting(true);
    try {
      const payload = settingsPayload();
      if (!payload.resend_api_key) delete payload.resend_api_key;
      if (!payload.smtp_password) delete payload.smtp_password;

      await testEmail({
        data: {
          test_email: form.test_email.trim(),
          access_token: session?.access_token ?? "",
          settings: {
            ...payload,
            resend_api_key: form.resend_api_key || undefined,
            smtp_password: form.smtp_password || undefined,
          },
        },
      });
      await saveEmailSettings({
        ...payload,
        is_authenticated: true,
        last_tested_at: new Date().toISOString(),
        last_test_error: null,
      });
      toast.success("Test email sent — settings saved");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Email test failed");
      await load();
    } finally {
      setTesting(false);
    }
  }

  if (loading) return <AdminLoading />;

  const selectedPreset =
    SMTP_PRESETS.find((p) => p.id === form.smtp_preset) ?? SMTP_PRESETS[4]!;

  return (
    <AdminCard>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold text-[color:var(--brand-navy)]">
            <Mail className="h-4 w-4" />
            Email configuration
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Choose a provider, fill in the details, send a test email, then customise customer messages.
          </p>
        </div>
        {form.is_authenticated ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Authenticated
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
            <XCircle className="h-3.5 w-3.5" />
            Not verified — send a test email
          </span>
        )}
      </div>

      {dbError && <AdminErrorBanner message={dbError} />}

      {form.last_test_error ? (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
          Last test error: {form.last_test_error}
        </p>
      ) : null}

      <form
        id="admin-email-settings-form"
        onSubmit={handleSave}
        className="grid gap-4 md:grid-cols-2"
      >
        <div className="md:col-span-2 flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.is_enabled}
              onChange={(e) => setForm((f) => ({ ...f, is_enabled: e.target.checked }))}
            />
            Enable outgoing email
          </label>
        </div>

        <AdminField label="Email provider">
          <select
            value={form.provider}
            onChange={(e) =>
              setForm((f) => ({ ...f, provider: e.target.value as EmailProvider }))
            }
            className={adminInputClass}
          >
            <option value="resend">Resend (API key)</option>
            <option value="smtp">SMTP (Gmail, Outlook, Hostinger…)</option>
          </select>
        </AdminField>

        <AdminField label="From name">
          <input
            value={form.from_name}
            onChange={(e) => setForm((f) => ({ ...f, from_name: e.target.value }))}
            className={adminInputClass}
            placeholder="YatraNexus"
          />
        </AdminField>

        <AdminField label="From email" hint="Must be allowed by your email provider">
          <input
            type="email"
            value={form.from_email}
            onChange={(e) => setForm((f) => ({ ...f, from_email: e.target.value }))}
            className={adminInputClass}
            placeholder="noreply@yatranexus.com"
          />
        </AdminField>

        <AdminField label="Reply-to email">
          <input
            type="email"
            value={form.reply_to_email}
            onChange={(e) => setForm((f) => ({ ...f, reply_to_email: e.target.value }))}
            className={adminInputClass}
            placeholder="info@yatranexus.com"
          />
        </AdminField>

        <AdminField label="Admin notification email" hint="Receives new inquiry alerts">
          <input
            type="email"
            value={form.admin_notification_email}
            onChange={(e) =>
              setForm((f) => ({ ...f, admin_notification_email: e.target.value }))
            }
            className={adminInputClass}
            placeholder="info@yatranexus.com"
          />
        </AdminField>

        {form.provider === "resend" ? (
          <div className="md:col-span-2">
            <AdminField
              label="Resend API key"
              hint={
                hasStoredResendKey
                  ? "Saved — leave blank to keep the existing key"
                  : "Get this from resend.com → API Keys"
              }
            >
              <input
                type="password"
                value={form.resend_api_key}
                onChange={(e) => setForm((f) => ({ ...f, resend_api_key: e.target.value }))}
                className={adminInputClass}
                placeholder={hasStoredResendKey ? "••••••••••••" : "re_..."}
                autoComplete="new-password"
              />
            </AdminField>
          </div>
        ) : (
          <>
            <AdminField label="SMTP provider preset" hint={selectedPreset.hint}>
              <select
                value={form.smtp_preset}
                onChange={(e) => applySmtpPreset(e.target.value as SmtpPresetId)}
                className={adminInputClass}
              >
                {SMTP_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </AdminField>

            <AdminField label="SMTP host">
              <input
                value={form.smtp_host}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    smtp_host: e.target.value,
                    smtp_preset: "custom",
                  }))
                }
                className={adminInputClass}
                placeholder="smtp.gmail.com"
              />
            </AdminField>
            <AdminField label="SMTP port">
              <input
                type="number"
                value={form.smtp_port}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    smtp_port: e.target.value,
                    smtp_preset: "custom",
                  }))
                }
                className={adminInputClass}
                placeholder="587"
              />
            </AdminField>
            <AdminField label="SMTP username" hint="Usually your full email address">
              <input
                value={form.smtp_username}
                onChange={(e) => setForm((f) => ({ ...f, smtp_username: e.target.value }))}
                className={adminInputClass}
                placeholder="you@company.com"
              />
            </AdminField>
            <AdminField
              label="SMTP password"
              hint={
                hasStoredSmtpPassword
                  ? "Saved — leave blank to keep the existing password"
                  : "App password for Gmail / mailbox password for others"
              }
            >
              <input
                type="password"
                value={form.smtp_password}
                onChange={(e) => setForm((f) => ({ ...f, smtp_password: e.target.value }))}
                className={adminInputClass}
                placeholder={hasStoredSmtpPassword ? "••••••••••••" : ""}
                autoComplete="new-password"
              />
            </AdminField>
            <div className="md:col-span-2">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.smtp_secure}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      smtp_secure: e.target.checked,
                      smtp_preset: "custom",
                    }))
                  }
                />
                Use SSL/TLS (usually for port 465)
              </label>
            </div>
          </>
        )}

        <div className="md:col-span-2 rounded-xl border border-border bg-muted/30 p-4">
          <h3 className="text-sm font-semibold text-[color:var(--brand-navy)]">
            Authenticate &amp; test
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Send a test email to verify credentials before enabling live emails.
          </p>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            <div className="min-w-[240px] flex-1">
              <AdminField label="Test recipient email">
                <input
                  type="email"
                  value={form.test_email}
                  onChange={(e) => setForm((f) => ({ ...f, test_email: e.target.value }))}
                  className={adminInputClass}
                  placeholder="admin@yatranexus.com"
                />
              </AdminField>
            </div>
            <button
              type="button"
              onClick={handleTest}
              disabled={testing}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold shadow-soft disabled:opacity-70"
            >
              {testing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
              Send test email
            </button>
          </div>
          {form.last_tested_at ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Last tested: {new Date(form.last_tested_at).toLocaleString()}
            </p>
          ) : null}
        </div>

        <div className="md:col-span-2 mt-2">
          <h3 className="text-sm font-semibold text-[color:var(--brand-navy)]">
            Customer welcome email
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Plain text only — click a chip to insert a placeholder. Use **text** for bold.
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.welcome_enabled}
              onChange={(e) => setForm((f) => ({ ...f, welcome_enabled: e.target.checked }))}
            />
            Send welcome email to customers
          </label>
        </div>

        <div className="md:col-span-2">
          <AdminField label="Welcome email subject">
            <input
              value={form.welcome_subject}
              onChange={(e) => setForm((f) => ({ ...f, welcome_subject: e.target.value }))}
              className={adminInputClass}
            />
          </AdminField>
          <PlaceholderChips
            onInsert={(token) =>
              setForm((f) => ({ ...f, welcome_subject: `${f.welcome_subject}${token}` }))
            }
          />
        </div>

        <div className="md:col-span-2">
          <AdminField label="Welcome email message">
            <textarea
              rows={7}
              value={form.welcome_body}
              onChange={(e) => setForm((f) => ({ ...f, welcome_body: e.target.value }))}
              className={adminInputClass}
              placeholder={"Hi {{name}},\n\nThank you for connecting with {{company}}..."}
            />
          </AdminField>
          <PlaceholderChips
            onInsert={(token) =>
              setForm((f) => ({ ...f, welcome_body: `${f.welcome_body}${token}` }))
            }
          />
        </div>

        <div className="md:col-span-2 mt-2">
          <h3 className="text-sm font-semibold text-[color:var(--brand-navy)]">
            Inquiry confirmation email
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Sent to customers after they submit a travel inquiry form.
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.inquiry_customer_enabled}
              onChange={(e) =>
                setForm((f) => ({ ...f, inquiry_customer_enabled: e.target.checked }))
              }
            />
            Send inquiry confirmation to customer
          </label>
        </div>

        <div className="md:col-span-2">
          <AdminField label="Inquiry customer subject">
            <input
              value={form.inquiry_customer_subject}
              onChange={(e) =>
                setForm((f) => ({ ...f, inquiry_customer_subject: e.target.value }))
              }
              className={adminInputClass}
            />
          </AdminField>
          <PlaceholderChips
            onInsert={(token) =>
              setForm((f) => ({
                ...f,
                inquiry_customer_subject: `${f.inquiry_customer_subject}${token}`,
              }))
            }
          />
        </div>

        <div className="md:col-span-2">
          <AdminField label="Inquiry customer message">
            <textarea
              rows={7}
              value={form.inquiry_customer_body}
              onChange={(e) =>
                setForm((f) => ({ ...f, inquiry_customer_body: e.target.value }))
              }
              className={adminInputClass}
            />
          </AdminField>
          <PlaceholderChips
            onInsert={(token) =>
              setForm((f) => ({
                ...f,
                inquiry_customer_body: `${f.inquiry_customer_body}${token}`,
              }))
            }
          />
        </div>

        <div className="md:col-span-2">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.inquiry_admin_enabled}
              onChange={(e) =>
                setForm((f) => ({ ...f, inquiry_admin_enabled: e.target.checked }))
              }
            />
            Send inquiry alert to admin
          </label>
        </div>

        <div className="md:col-span-2">
          <AdminField label="Admin inquiry subject">
            <input
              value={form.inquiry_admin_subject}
              onChange={(e) =>
                setForm((f) => ({ ...f, inquiry_admin_subject: e.target.value }))
              }
              className={adminInputClass}
            />
          </AdminField>
          <PlaceholderChips
            onInsert={(token) =>
              setForm((f) => ({
                ...f,
                inquiry_admin_subject: `${f.inquiry_admin_subject}${token}`,
              }))
            }
          />
        </div>

        {!floatingSave ? (
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
            >
              {saving ? "Saving…" : "Save email settings"}
            </button>
          </div>
        ) : null}
      </form>
      {floatingSave ? (
        <AdminFloatingSaveButton
          formId="admin-email-settings-form"
          label="Save email settings"
          saving={saving}
          stackIndex={stackIndex}
        />
      ) : null}
    </AdminCard>
  );
}
