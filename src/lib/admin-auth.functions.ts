import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  clearAdminSessionCookie,
  getAdminSessionFromRequest,
  requireAdminFromRequest,
  setAdminSessionCookie,
} from "@/lib/admin-auth";
import {
  generateResetToken,
  hashPassword,
  hashResetToken,
  verifyPassword,
} from "@/lib/auth/password";
import {
  findAdminByEmail,
  findAdminByResetToken,
  setResetToken,
  clearResetToken,
  updateAdminPassword,
} from "@/lib/db-queries/admin-users";
import {
  countInquiries,
  getRecentInquiries,
  listInquiries,
  updateInquiryStatus,
} from "@/lib/db-queries/inquiries";
import type { InquiryStatus } from "@/lib/db-types";

const LoginSchema = z.object({
  email: z.string().trim().email().max(255),
  password: z.string().min(1).max(200),
});

const ResetRequestSchema = z.object({
  email: z.string().trim().email().max(255),
});

const ResetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8).max(200),
});

export const loginAdminFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => LoginSchema.parse(data))
  .handler(async ({ data }) => {
    const email = data.email.trim().toLowerCase();
    const admin = await findAdminByEmail(email);
    if (!admin) {
      throw new Error("Invalid email or password.");
    }
    const valid = await verifyPassword(data.password, admin.password_hash);
    if (!valid) {
      throw new Error("Invalid email or password.");
    }
    await setAdminSessionCookie({
      userId: admin.id,
      email: admin.email,
      fullName: admin.full_name,
      role: "admin",
    });
    return { ok: true, email: admin.email, fullName: admin.full_name };
  });

export const logoutAdminFn = createServerFn({ method: "POST" }).handler(async () => {
  clearAdminSessionCookie();
  return { ok: true };
});

export const getAdminSessionFn = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getAdminSessionFromRequest();
  if (!session) return null;
  return {
    userId: session.sub,
    email: session.email,
    fullName: session.fullName,
    role: session.role,
  };
});

export const requestPasswordResetFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => ResetRequestSchema.parse(data))
  .handler(async ({ data }) => {
    const email = data.email.trim().toLowerCase();
    const admin = await findAdminByEmail(email);
    if (!admin) {
      return { ok: true };
    }
    const token = generateResetToken();
    const tokenHash = hashResetToken(token);
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    await setResetToken(admin.id, tokenHash, expires);

    const origin =
      process.env.SITE_URL ||
      process.env.PUBLIC_SITE_URL ||
      process.env.VITE_SITE_URL ||
      "http://localhost:3000";
    const resetUrl = `${origin.replace(/\/$/, "")}/admin/reset-password?token=${token}`;

    try {
      const { sendPasswordResetEmail } = await import("@/lib/email");
      await sendPasswordResetEmail({ to: email, resetUrl, name: admin.full_name ?? undefined });
    } catch (err) {
      console.error("[auth] password reset email failed:", err);
    }

    return { ok: true };
  });

export const resetPasswordFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => ResetPasswordSchema.parse(data))
  .handler(async ({ data }) => {
    const tokenHash = hashResetToken(data.token);
    const admin = await findAdminByResetToken(tokenHash);
    if (!admin) {
      throw new Error("Invalid or expired reset link.");
    }
    const passwordHash = await hashPassword(data.password);
    await updateAdminPassword(admin.id, passwordHash);
    await clearResetToken(admin.id);
    return { ok: true };
  });

export const fetchDashboardStatsFn = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  const [
    inquiries,
    newInquiries,
    packages,
    services,
    blogs,
    testimonials,
    destinations,
    faqs,
    gallery,
  ] = await Promise.all([
    countInquiries(),
    countInquiries("new"),
    import("@/lib/db-queries/packages").then((m) => m.listPackages().then((r) => r.length)),
    import("@/lib/db-queries/services").then((m) => m.listServices().then((r) => r.length)),
    import("@/lib/db-queries/blog").then((m) => m.listBlogPosts().then((r) => r.length)),
    import("@/lib/db-queries/testimonials").then((m) => m.listTestimonials().then((r) => r.length)),
    import("@/lib/db-queries/destinations").then((m) => m.listDestinations().then((r) => r.length)),
    import("@/lib/db-queries/faqs").then((m) => m.listFaqs().then((r) => r.length)),
    import("@/lib/db-queries/gallery").then((m) => m.listGalleryImages().then((r) => r.length)),
  ]);

  return {
    inquiries,
    newInquiries,
    packages,
    services,
    blogs,
    testimonials,
    destinations,
    faqs,
    gallery,
  };
});

const RecentInquiriesSchema = z.object({ limit: z.number().int().min(1).max(50).optional() });

export const fetchRecentInquiriesFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => RecentInquiriesSchema.parse(data ?? {}))
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    return getRecentInquiries(data.limit ?? 8);
  });

const InquiryFiltersSchema = z.object({
  status: z.enum(["new", "contacted", "quoted", "closed", "spam", "all"]).optional(),
  search: z.string().optional(),
  service: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export const fetchInquiriesFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => InquiryFiltersSchema.parse(data ?? {}))
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    return listInquiries(data);
  });

export const updateInquiryStatusFn = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "contacted", "quoted", "closed", "spam"]),
        adminNotes: z.string().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    await updateInquiryStatus(data.id, data.status as InquiryStatus, data.adminNotes);
    return { ok: true };
  });
