import { getResend, getResendFrom, getWaitlistSegmentId } from "@/lib/resend";
import {
  waitlistConfirmationHtml,
  waitlistConfirmationSubject,
  waitlistConfirmationText,
} from "@/lib/waitlist-email";

export type WaitlistSignup = {
  email: string;
  role?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
};

function contactProperties(input: WaitlistSignup) {
  const properties: Record<string, string> = {
    source: "waitlist",
  };
  if (input.role) properties.role = input.role;
  if (input.utmSource) properties.utm_source = input.utmSource;
  if (input.utmMedium) properties.utm_medium = input.utmMedium;
  if (input.utmCampaign) properties.utm_campaign = input.utmCampaign;
  if (input.referrer) properties.referrer = input.referrer;
  return properties;
}

function isMissingContact(error: { statusCode?: number | null; name?: string } | null) {
  if (!error) return false;
  return error.statusCode === 404 || error.name === "not_found";
}

export async function findWaitlistContact(email: string) {
  const resend = getResend();
  const { data, error } = await resend.contacts.get({ email });
  if (data) return data;
  if (isMissingContact(error)) return null;
  if (error) {
    throw new Error(error.message);
  }
  return null;
}

export async function saveWaitlistSignup(input: WaitlistSignup) {
  const resend = getResend();
  const existing = await findWaitlistContact(input.email);

  if (existing) {
    if (input.role || input.utmSource || input.utmMedium || input.utmCampaign || input.referrer) {
      const { error } = await resend.contacts.update({
        email: input.email,
        properties: contactProperties(input),
      });
      if (error) {
        console.error("Resend contact update failed:", error.message);
      }
    }
    return { alreadyJoined: true as const };
  }

  const segmentId = getWaitlistSegmentId();
  const { error: createError } = await resend.contacts.create({
    email: input.email,
    unsubscribed: false,
    properties: contactProperties(input),
    ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
  });

  if (createError) {
    const already =
      createError.statusCode === 409 ||
      /already exists|already been taken/i.test(createError.message);
    if (already) {
      return { alreadyJoined: true as const };
    }
    throw new Error(createError.message);
  }

  await sendWaitlistConfirmation(input.email);
  return { alreadyJoined: false as const };
}

async function sendWaitlistConfirmation(email: string) {
  const resend = getResend();
  const { error } = await resend.emails.send(
    {
      from: getResendFrom(),
      to: [email],
      subject: waitlistConfirmationSubject(),
      text: waitlistConfirmationText(),
      html: waitlistConfirmationHtml(),
    },
    { idempotencyKey: `waitlist-welcome/${email}` },
  );

  if (error) {
    // Contact is already stored; don't fail the signup if mail delivery is blocked
    // (unverified domain, sandbox from-address, etc.).
    console.error("Resend waitlist email failed:", error.message);
  }
}
