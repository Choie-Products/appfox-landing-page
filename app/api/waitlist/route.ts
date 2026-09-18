import { NextResponse } from "next/server";
import { isValidEmail, normalizeEmail } from "@/lib/email";
import { saveWaitlistSignup } from "@/lib/waitlist";

export const dynamic = "force-dynamic";

const ALLOWED_ROLES = new Set(["indie", "founder", "product", "studio", "exploring"]);

type WaitlistBody = {
  email?: unknown;
  role?: unknown;
  website?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
  referrer?: unknown;
};

const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateBuckets.get(ip);
  if (!current || current.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 8;
}

function asOptionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, 200) : undefined;
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(getClientIp(request))) {
      return NextResponse.json(
        { error: "rate_limited", message: "Too many tries. Wait a moment and try again." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as WaitlistBody;

    if (asOptionalString(body.website)) {
      return NextResponse.json({ ok: true });
    }

    if (!body.email || typeof body.email !== "string") {
      return NextResponse.json(
        { error: "invalid_email", message: "Email is required" },
        { status: 400 },
      );
    }

    const email = normalizeEmail(body.email);
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "invalid_email", message: "Invalid email address" },
        { status: 400 },
      );
    }

    const role = asOptionalString(body.role);
    if (role && !ALLOWED_ROLES.has(role)) {
      return NextResponse.json(
        { error: "invalid_role", message: "That role is not supported" },
        { status: 400 },
      );
    }

    const result = await saveWaitlistSignup({
      email,
      role,
      utmSource: asOptionalString(body.utmSource),
      utmMedium: asOptionalString(body.utmMedium),
      utmCampaign: asOptionalString(body.utmCampaign),
      referrer: asOptionalString(body.referrer),
    });

    return NextResponse.json({ ok: true, alreadyJoined: result.alreadyJoined });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "missing_resend_key") {
      console.error("RESEND_API_KEY is not set");
    } else if (message) {
      console.error("Waitlist signup failed:", message);
    }
    return NextResponse.json(
      { error: "server_error", message: "Something went wrong" },
      { status: 500 },
    );
  }
}
