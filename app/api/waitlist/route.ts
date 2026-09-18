import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { isValidEmail, normalizeEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const WAITLIST_PATH = path.join(process.cwd(), "waitlist.json");
const ALLOWED_ROLES = new Set(["indie", "founder", "product", "studio", "exploring"]);

type Signup = {
  email: string;
  role?: string;
  createdAt: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
};

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

function normalizeSignups(data: unknown): Signup[] {
  if (!Array.isArray(data)) return [];
  return data
    .map((item) => {
      if (typeof item === "string") {
        return { email: normalizeEmail(item), createdAt: new Date().toISOString() };
      }
      if (item && typeof item === "object" && "email" in item && typeof item.email === "string") {
        const row = item as Signup;
        return { ...row, email: normalizeEmail(row.email) };
      }
      return null;
    })
    .filter((item): item is Signup => Boolean(item));
}

async function readSignups(): Promise<Signup[]> {
  try {
    const data = await readFile(WAITLIST_PATH, "utf-8");
    return normalizeSignups(JSON.parse(data));
  } catch {
    return [];
  }
}

async function writeSignups(signups: Signup[]) {
  await writeFile(WAITLIST_PATH, JSON.stringify(signups, null, 2));
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

    const signups = await readSignups();
    const existing = signups.find((signup) => signup.email === email);

    if (existing) {
      if (role) existing.role = role;
      await writeSignups(signups);
      return NextResponse.json({ ok: true, alreadyJoined: true });
    }

    signups.push({
      email,
      role,
      createdAt: new Date().toISOString(),
      utmSource: asOptionalString(body.utmSource),
      utmMedium: asOptionalString(body.utmMedium),
      utmCampaign: asOptionalString(body.utmCampaign),
      referrer: asOptionalString(body.referrer),
    });
    await writeSignups(signups);

    return NextResponse.json({ ok: true, alreadyJoined: false });
  } catch {
    return NextResponse.json(
      { error: "server_error", message: "Something went wrong" },
      { status: 500 },
    );
  }
}
