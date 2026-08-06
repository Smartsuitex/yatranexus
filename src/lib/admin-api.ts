import type { InquiryStatus } from "@/lib/db-types";
import {
  fetchDashboardStatsFn,
  fetchInquiriesFn,
  fetchRecentInquiriesFn,
  getAdminSessionFn,
  loginAdminFn,
  logoutAdminFn,
  requestPasswordResetFn,
  resetPasswordFn,
  updateInquiryStatusFn,
} from "@/lib/admin-auth.functions";

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
  return getAdminSessionFn();
}

export async function signInAdmin(email: string, password: string) {
  return loginAdminFn({ data: { email, password } });
}

export async function signOutAdmin() {
  return logoutAdminFn();
}

export async function sendPasswordReset(email: string) {
  return requestPasswordResetFn({ data: { email } });
}

export async function resetAdminPassword(token: string, password: string) {
  return resetPasswordFn({ data: { token, password } });
}

export async function fetchDashboardStats() {
  return fetchDashboardStatsFn();
}

export async function fetchRecentInquiries(limit = 8) {
  return fetchRecentInquiriesFn({ data: { limit } });
}

export type InquiryFilters = {
  status?: InquiryStatus | "all";
  search?: string;
  service?: string;
  dateFrom?: string;
  dateTo?: string;
};

export async function fetchInquiries(filters: InquiryFilters = {}) {
  return fetchInquiriesFn({ data: filters });
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  adminNotes?: string,
) {
  return updateInquiryStatusFn({ data: { id, status, adminNotes } });
}
