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

type ResendIssue = {
  message: string;
  statusCode?: number | null;
  name?: string;
} | null;

function logResend(label: string, error: ResendIssue) {
  if (!error) return;
  console.error(label, error.name ?? "", error.statusCode ?? "", error.message);
}

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

export async function saveWaitlistSignup(input: WaitlistSignup) {
  const stored = await storeWaitlistContact(input);
  const emailed =
    stored.alreadyJoined ? true : await sendWaitlistConfirmation(input.email);

  if (!stored.saved && !emailed) {
    throw new Error("waitlist_persist_failed");
  }

  return { alreadyJoined: stored.alreadyJoined };
}

async function storeWaitlistContact(input: WaitlistSignup) {
  try {
    const resend = getResend();
    const { data: existing, error: getError } = await resend.contacts.get({
      email: input.email,
    });

    if (existing) {
      const { error: updateError } = await resend.contacts.update({
        email: input.email,
        properties: contactProperties(input),
      });
      logResend("Resend contact update failed:", updateError);
      return { saved: true, alreadyJoined: true };
    }

    if (getError && getError.statusCode !== 404 && getError.name !== "not_found") {
      logResend("Resend contact lookup failed:", getError);
    }

    const segmentId = getWaitlistSegmentId();
    const created = await createContact(input, segmentId);
    if (created) return { saved: true, alreadyJoined: false };

    return { saved: false, alreadyJoined: false };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown_contact_error";
    console.error("Resend contacts unavailable:", message);
    return { saved: false, alreadyJoined: false };
  }
}

async function createContact(input: WaitlistSignup, segmentId?: string) {
  const resend = getResend();
  const attempts = [
    {
      email: input.email,
      unsubscribed: false,
      properties: contactProperties(input),
      ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
    },
    {
      email: input.email,
      unsubscribed: false,
    },
  ];

  for (const payload of attempts) {
    const { error } = await resend.contacts.create(payload);
    if (!error) return true;

    const already =
      error.statusCode === 409 || /already exists|already been taken/i.test(error.message);
    if (already) return true;

    logResend("Resend contact create failed:", error);
  }

  return false;
}

async function sendWaitlistConfirmation(email: string) {
  const fromAddresses = [getResendFrom(), "AppFox <onboarding@resend.dev>"].filter(
    (value, index, all) => all.indexOf(value) === index,
  );

  const resend = getResend();

  for (const from of fromAddresses) {
    const { error } = await resend.emails.send(
      {
        from,
        to: [email],
        subject: waitlistConfirmationSubject(),
        text: waitlistConfirmationText(),
        html: waitlistConfirmationHtml(),
      },
      { idempotencyKey: `waitlist-welcome/${email}/${from}` },
    );

    if (!error) return true;
    logResend(`Resend waitlist email failed (${from}):`, error);
  }

  return false;
}
