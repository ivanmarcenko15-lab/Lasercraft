import { NextResponse } from "next/server";
import { clearAdminCookieOptions } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const opts = clearAdminCookieOptions();
  res.cookies.set(opts.name, opts.value, {
    httpOnly: opts.httpOnly,
    sameSite: opts.sameSite,
    secure: opts.secure,
    path: opts.path,
    maxAge: opts.maxAge,
  });
  return res;
}
