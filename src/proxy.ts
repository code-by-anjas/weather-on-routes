import { NextRequest, NextResponse } from "next/server";
import { redis } from "./lib/redis";
import { createClient } from "./lib/supabase/server";

export async function proxy(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const key = `rate:${ip}`;
  const count = await redis.incr(key);

  if (count === 1) await redis.expire(key, 60);

  if (count > 20) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/"],
};
