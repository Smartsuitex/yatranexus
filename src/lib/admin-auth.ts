import { getCookie, setCookie, deleteCookie, setResponseHeader } from "@tanstack/react-start/server";
import {
  getAdminCookieName,
  verifyAdminToken,
  signAdminToken,
  buildSessionCookie,
  type AdminJwtPayload,
} from "@/lib/auth/jwt";
import { findAdminById } from "@/lib/db-queries/admin-users";
import type { AdminSession } from "@/lib/db-types";

export type { InquiryStatus, Inquiry, BookingHistoryEntry } from "@/lib/db-types";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 7 * 24 * 60 * 60,
  secure: process.env.NODE_ENV === "production",
};

export async function getAdminSessionFromRequest(): Promise<AdminJwtPayload | null> {
  const token = getCookie(getAdminCookieName());
  if (!token) return null;
  return verifyAdminToken(token);
}

export async function requireAdminFromRequest(): Promise<AdminJwtPayload> {
  const session = await getAdminSessionFromRequest();
  if (!session) {
    throw new Error("Unauthorized: sign in as admin.");
  }
  const admin = await findAdminById(session.sub);
  if (!admin || admin.role !== "admin") {
    throw new Error("Unauthorized: admin access required.");
  }
  return session;
}

export async function setAdminSessionCookie(session: AdminSession): Promise<void> {
  const token = await signAdminToken(session);
  const name = getAdminCookieName();
  setCookie(name, token, cookieOptions);
  // Belt-and-suspenders for dev SSR / server-fn responses
  setResponseHeader("Set-Cookie", buildSessionCookie(token));
}

export function clearAdminSessionCookie(): void {
  deleteCookie(getAdminCookieName(), { path: "/" });
}

/** @deprecated Use getAdminSessionFromRequest on server or admin session server fn on client */
export async function fetchIsAdmin(userId: string): Promise<boolean> {
  const admin = await findAdminById(userId);
  return admin?.role === "admin";
}

/** Verify admin via JWT cookie or legacy Bearer token (email functions). */
export async function verifyAdminAccessToken(accessToken?: string): Promise<boolean> {
  const cookieSession = await getAdminSessionFromRequest();
  if (cookieSession) return true;
  if (!accessToken) return false;
  const payload = await verifyAdminToken(accessToken);
  return payload?.role === "admin";
}

export async function requireAdminSession(session: AdminJwtPayload | null): Promise<void> {
  if (!session?.sub) {
    throw new Error("Unauthorized: sign in as admin.");
  }
  const isAdmin = await fetchIsAdmin(session.sub);
  if (!isAdmin) {
    throw new Error("Unauthorized: admin access required.");
  }
}
