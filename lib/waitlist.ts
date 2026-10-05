import { createHash } from "node:crypto";
import { getResend, getResendFrom, getWaitlistSegmentId } from "@/lib/resend";
import { resendRequest } from "@/lib/resend-request";
import { waitlistConfirmationHtml, waitlistConfirmationSubject, waitlistConfirmationText } from "@/lib/waitlist-email";

export type WaitlistSignup = {
  email: string;
  role?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
};

type ResendIssue = { name?: string; statusCode?: number | null } | null;

function providerFailure(operation: string, error: ResendIssue): never {
  // Provider messages can contain the submitted email. Log codes, never applicant data.
  console.error("waitlist_provider_failure", { operation, code: error?.name, status: error?.statusCode });
  throw new Error("waitlist_persist_failed");
}

function contactProperties(input: WaitlistSignup, existing: Record<string, { value: string | number }> = {}) {
  const properties: Record<string, string> = { source: "waitlist" };
  if (input.role) properties.role = input.role;
  // Keep first-touch attribution when the optional role is saved or someone returns.
  const attribution = { utm_source: input.utmSource, utm_medium: input.utmMedium, utm_campaign: input.utmCampaign, referrer: input.referrer };
  for (const [key, value] of Object.entries(attribution)) {
    if (value && !existing[key]?.value) properties[key] = value;
  }
  return properties;
}

export async function saveWaitlistSignup(input: WaitlistSignup) {
  const resend = getResend();
  const segmentId = getWaitlistSegmentId();
  const found = await resendRequest(() => resend.contacts.get({ email: input.email }));
  if (found.error && found.error.statusCode !== 404 && found.error.name !== "not_found") {
    providerFailure("lookup", found.error);
  }

  let existing = found.data;
  let alreadyJoined = existing?.properties?.source?.value === "waitlist";
  if (!existing) {
    const created = await resendRequest(() => resend.contacts.create({
      email: input.email,
      unsubscribed: false,
      properties: contactProperties(input),
      ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
    }));
    if (created.error) {
      if (created.error.statusCode !== 409) providerFailure("create", created.error);
      // Another request may have created the same contact between lookup and create.
      const raced = await resendRequest(() => resend.contacts.get({ email: input.email }));
      if (raced.error || !raced.data) providerFailure("confirm_duplicate", raced.error);
      existing = raced.data;
      alreadyJoined = existing.properties?.source?.value === "waitlist";
    } else if (!created.data?.id) {
      providerFailure("confirm_create", null);
    }
  }

  if (existing) {
    const contactId = existing.id;
    if (segmentId) {
      const membership = await resendRequest(() => resend.contacts.segments.add({ contactId, segmentId }));
      if (membership.error) providerFailure("segment", membership.error);
    }
    const properties = contactProperties(input, existing.properties);
    const updated = await resendRequest(() => resend.contacts.update({
      id: contactId,
      properties,
      // Preserve subscription preferences; submitting again must not resubscribe a contact.
    }));
    if (updated.error || !updated.data?.id) providerFailure("update", updated.error);
  }

  // Receipt delivery can fail without losing a successfully persisted access request.
  let confirmation: "sent" | "failed" | "not_requested" = "not_requested";
  if (!alreadyJoined) {
    try {
      const sent = await resendRequest(() => resend.emails.send({
        from: getResendFrom(),
        to: [input.email],
        replyTo: "hello@appfox.app",
        subject: waitlistConfirmationSubject(),
        text: waitlistConfirmationText(),
        html: waitlistConfirmationHtml(),
      }, { idempotencyKey: `beta-receipt/${createHash("sha256").update(input.email).digest("hex")}` }));
      confirmation = sent.error || !sent.data?.id ? "failed" : "sent";
      if (confirmation === "failed") console.error("waitlist_receipt_failed", { code: sent.error?.name, status: sent.error?.statusCode });
    } catch {
      confirmation = "failed";
      console.error("waitlist_receipt_failed", { code: "transport_error" });
    }
  }
  return { saved: true as const, alreadyJoined, confirmation };
}
