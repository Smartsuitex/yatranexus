import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getServerSupabase } from "@/lib/supabase-server";
import { normalizeInquiryPhone } from "@/lib/inquiry-dedupe";

const InquirySchema = z.object({
  service_type: z.string().trim().min(1).max(50),
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(5).max(20),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  destination: z.string().trim().max(120).optional().or(z.literal("")),
  travel_date: z.string().trim().max(20).optional().or(z.literal("")),
  travelers: z.coerce.number().int().min(1).max(99).optional(),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  package_name: z.string().trim().max(160).optional().or(z.literal("")),
  source_page: z.string().trim().max(120).optional().or(z.literal("")),
  selected_inclusions: z.array(z.string().trim().max(200)).max(30).optional(),
  selected_exclusions: z.array(z.string().trim().max(200)).max(30).optional(),
  recaptcha_token: z.string().optional().or(z.literal("")),
  existing_inquiry_id: z.string().uuid().optional().or(z.literal("")),
});

type SubmitInquiryResult = {
  ok: boolean;
  alreadySubmitted?: boolean;
  inquiryId?: string;
  updated?: boolean;
  emailSent?: boolean;
};

/** In-memory rate limit: max submissions per key within window. */
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 8;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateBuckets.get(key);
  if (!entry || now >= entry.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;

  const body = new URLSearchParams({ secret, response: token });
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export const submitInquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => InquirySchema.parse(data))
  .handler(async ({ data }) => {
    const phoneKey = normalizeInquiryPhone(data.phone) || data.phone.trim();
    if (isRateLimited(`phone:${phoneKey}`)) {
      throw new Error("Too many inquiries from this number. Please try again later.");
    }

    const hasSecret = Boolean(process.env.RECAPTCHA_SECRET_KEY);
    const hasSiteKey = Boolean(process.env.VITE_RECAPTCHA_SITE_KEY);
    const captchaConfigured = hasSecret && hasSiteKey;

    // Fail closed in production when captcha is expected or partially configured.
    if (isProduction() && (hasSecret || hasSiteKey) && !captchaConfigured) {
      throw new Error("Inquiry form is temporarily unavailable. Please contact us on WhatsApp.");
    }

    if (captchaConfigured || (isProduction() && hasSecret)) {
      if (!data.recaptcha_token) {
        throw new Error("reCAPTCHA verification is required.");
      }
      const valid = await verifyRecaptcha(data.recaptcha_token);
      if (!valid) {
        throw new Error("reCAPTCHA verification failed. Please try again.");
      }
    }

    const supabase = getServerSupabase();

    const rpcArgs = {
      p_service_type: data.service_type,
      p_name: data.name.trim(),
      p_phone: data.phone.trim(),
      p_email: data.email || null,
      p_subject: data.subject || null,
      p_destination: data.destination || null,
      p_travel_date: data.travel_date || null,
      p_travelers: data.travelers ?? null,
      p_message: data.message || null,
      p_package_name: data.package_name || null,
      p_source_page: data.source_page || null,
      p_selected_inclusions:
        data.selected_inclusions && data.selected_inclusions.length > 0
          ? data.selected_inclusions
          : null,
      p_selected_exclusions:
        data.selected_exclusions && data.selected_exclusions.length > 0
          ? data.selected_exclusions
          : null,
      p_existing_inquiry_id: data.existing_inquiry_id || null,
    };

    const { data: rpcResult, error: rpcError } = await supabase.rpc(
      "submit_inquiry",
      rpcArgs as never,
    );

    let result: SubmitInquiryResult | null = null;

    if (!rpcError && rpcResult && typeof rpcResult === "object") {
      result = rpcResult as SubmitInquiryResult;
    } else if (rpcError) {
      console.warn(
        "[inquiries] RPC submit_inquiry unavailable, using insert fallback:",
        rpcError.message,
      );
    }

    if (!result?.ok) {
      const payload = {
        service_type: data.service_type,
        name: data.name.trim(),
        phone: data.phone.trim(),
        email: data.email || null,
        subject: data.subject || null,
        destination: data.destination || null,
        travel_date: data.travel_date || null,
        travelers: data.travelers ?? null,
        message: data.message || null,
        package_name: data.package_name || null,
        source_page: data.source_page || null,
        selected_inclusions: rpcArgs.p_selected_inclusions,
        selected_exclusions: rpcArgs.p_selected_exclusions,
        phone_normalized: normalizeInquiryPhone(data.phone),
      };

      const { data: inserted, error } = await supabase
        .from("inquiries")
        .insert(payload)
        .select("id")
        .single();

      if (error) {
        console.error("[inquiries] insert failed:", error.message);
        throw new Error("Could not save inquiry. Please try again in a moment.");
      }

      result = {
        ok: true,
        alreadySubmitted: false,
        inquiryId: inserted?.id,
        updated: false,
      };
    }

    let emailSent = false;
    if (!result.alreadySubmitted) {
      try {
        const { sendInquiryEmails } = await import("@/lib/email");
        const emailResult = await sendInquiryEmails({
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          subject: data.subject || null,
          service_type: data.service_type,
          destination: data.destination || null,
          package_name: data.package_name || null,
          message: data.message || null,
        });
        emailSent = emailResult.customerSent || emailResult.adminSent;
      } catch (emailErr) {
        console.error("[inquiries] email notification failed:", emailErr);
      }
    }

    return {
      ok: true,
      alreadySubmitted: result.alreadySubmitted ?? false,
      inquiryId: result.inquiryId,
      updated: result.updated ?? false,
      emailSent,
    };
  });
