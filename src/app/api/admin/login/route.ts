import { NextRequest, NextResponse } from "next/server";
import {
  adminCookieOptions,
  sessionTokenForPassword,
  verifyPassword,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  let password = "";
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    password = String(body.password || "");
  } else {
    const form = await req.formData();
    password = String(form.get("password") || "");
  }

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = sessionTokenForPassword(
    process.env.ADMIN_PASSWORD || "lasecraft-admin"
  );
  const res = NextResponse.json({ ok: true });
  const opts = adminCookieOptions(token);
  res.cookies.set(opts.name, opts.value, {
    httpOnly: opts.httpOnly,
    sameSite: opts.sameSite,
    secure: opts.secure,
    path: opts.path,
    maxAge: opts.maxAge,
  });
  return res;
}
