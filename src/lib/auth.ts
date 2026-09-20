import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "lasecraft_admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "lasecraft-admin";
}

export function sessionTokenForPassword(password: string): string {
  return createHash("sha256")
    .update(`lasecraft:${password}:session`)
    .digest("hex");
}

export function expectedSessionToken(): string {
  return sessionTokenForPassword(getAdminPassword());
}

export function verifyPassword(password: string): boolean {
  const expected = getAdminPassword();
  try {
    const a = Buffer.from(password);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const expected = expectedSessionToken();
  try {
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function isAdminAuthenticated(): boolean {
  const jar = cookies();
  return verifySessionToken(jar.get(ADMIN_COOKIE)?.value);
}

export function adminCookieOptions(token: string) {
  return {
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  };
}

export function clearAdminCookieOptions() {
  return {
    name: ADMIN_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  };
}
