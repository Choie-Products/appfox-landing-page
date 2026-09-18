import { Resend } from "resend";

let client: Resend | null = null;

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("missing_resend_key");
  }
  if (!client) {
    client = new Resend(apiKey);
  }
  return client;
}

export function getResendFrom() {
  return process.env.RESEND_FROM?.trim() || "AppFox <hello@appfox.app>";
}

export function getWaitlistSegmentId() {
  return process.env.RESEND_WAITLIST_SEGMENT_ID?.trim() || undefined;
}
