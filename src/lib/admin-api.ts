import { supabase } from "@/integrations/supabase/client";
import type { InquiryStatus } from "@/integrations/supabase/types";
import { fetchIsAdmin } from "@/lib/admin-auth";

export const INQUIRY_STATUS_LABELS: Record<InquiryStatus, string> = {
  new: "Pending",
  contacted: "Contacted",
  quoted: "Quoted",
  closed: "Closed",
  spam: "Spam",
};

export const INQUIRY_STATUS_COLORS: Record<InquiryStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-amber-100 text-amber-800",
  quoted: "bg-purple-100 text-purple-800",
  closed: "bg-green-100 text-green-800",
  spam: "bg-gray-100 text-gray-600",
};

export async function getAdminSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function signInAdmin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });
  if (error) {
    if (error.message.toLowerCase().includes("email not confirmed")) {
      throw new Error("Email not confirmed. Confirm the user in Supabase Dashboard → Authentication → Users.");
    }
    if (error.message.toLowerCase().includes("invalid login credentials")) {
      throw new Error("Invalid email or password.");
    }
    throw error;
  }

  const isAdmin = data.user ? await fetchIsAdmin(data.user.id) : false;
  if (!isAdmin) {
    await supabase.auth.signOut();
    throw new Error("This account does not have admin access.");
  }

  return data.session;
}

export async function signOutAdmin() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function sendPasswordReset(email: string) {
  const redirectTo =
    typeof window !== "undefined" ? `${window.location.origin}/admin/reset-password` : undefined;
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) throw error;
}

function escapePostgrestFilter(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/\./g, "\\.");
}

export async function fetchDashboardStats() {
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
    supabase.from("inquiries").select("*", { count: "exact", head: true }),
    supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("packages").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("destinations").select("*", { count: "exact", head: true }),
    supabase.from("faqs").select("*", { count: "exact", head: true }),
    supabase.from("gallery_images").select("*", { count: "exact", head: true }),
  ]);

  const firstError =
    inquiries.error ||
    newInquiries.error ||
    packages.error ||
    services.error ||
    blogs.error ||
    testimonials.error ||
    destinations.error ||
    faqs.error ||
    gallery.error;

  if (firstError) throw firstError;

  return {
    inquiries: inquiries.count ?? 0,
    newInquiries: newInquiries.count ?? 0,
    packages: packages.count ?? 0,
    services: services.count ?? 0,
    blogs: blogs.count ?? 0,
    testimonials: testimonials.count ?? 0,
    destinations: destinations.count ?? 0,
    faqs: faqs.count ?? 0,
    gallery: gallery.count ?? 0,
  };
}

export async function fetchRecentInquiries(limit = 8) {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export type InquiryFilters = {
  status?: InquiryStatus | "all";
  search?: string;
  service?: string;
  dateFrom?: string;
  dateTo?: string;
};

export async function fetchInquiries(filters: InquiryFilters = {}) {
  let query = supabase.from("inquiries").select("*").order("created_at", { ascending: false });

  if (filters.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }
  if (filters.service && filters.service !== "all") {
    query = query.eq("service_type", filters.service);
  }
  if (filters.dateFrom) {
    query = query.gte("created_at", `${filters.dateFrom}T00:00:00`);
  }
  if (filters.dateTo) {
    query = query.lte("created_at", `${filters.dateTo}T23:59:59`);
  }
  if (filters.search?.trim()) {
    const term = escapePostgrestFilter(filters.search.trim());
    const like = `%${term}%`;
    const idFragment = term.replace(/[^a-fA-F0-9-]/g, "");
    if (idFragment.length >= 4) {
      query = query.or(
        `name.ilike.${like},phone.ilike.${like},email.ilike.${like},destination.ilike.${like},package_name.ilike.${like},id.ilike.%${idFragment}%`,
      );
    } else {
      query = query.or(
        `name.ilike.${like},phone.ilike.${like},email.ilike.${like},destination.ilike.${like},package_name.ilike.${like}`,
      );
    }
  }

  const { data, error } = await query.limit(500);
  if (error) throw error;
  return data ?? [];
}

export async function updateInquiryStatus(id: string, status: InquiryStatus, adminNotes?: string) {
  const payload: { status: InquiryStatus; admin_notes?: string } = { status };
  if (adminNotes !== undefined) payload.admin_notes = adminNotes;

  const { error } = await supabase.from("inquiries").update(payload).eq("id", id);
  if (error) throw error;
}
