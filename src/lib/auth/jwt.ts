import { SignJWT, jwtVerify } from "jose";
import type { AdminSession } from "@/lib/db-types";

const COOKIE_NAME = process.env.ADMIN_COOKIE_NAME ?? "yn_admin_session";
const JWT_EXPIRY = "7d";

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set (min 32 characters).");
  }
  return new TextEncoder().encode(secret);
}

export type AdminJwtPayload = {
  sub: string;
  email: string;
  fullName: string | null;
  role: "admin";
};

export async function signAdminToken(session: AdminSession): Promise<string> {
  return new SignJWT({
    email: session.email,
    fullName: session.fullName,
    role: session.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.userId)
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(getJwtSecret());
}

export async function verifyAdminToken(token: string): Promise<AdminJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    if (!payload.sub || payload.role !== "admin") return null;
    return {
      sub: String(payload.sub),
      email: String(payload.email ?? ""),
      fullName: payload.fullName ? String(payload.fullName) : null,
      role: "admin",
    };
  } catch {
    return null;
  }
}

export function getAdminCookieName(): string {
  return COOKIE_NAME;
}

export function buildSessionCookie(token: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const maxAge = 7 * 24 * 60 * 60;
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function parseCookieHeader(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}
