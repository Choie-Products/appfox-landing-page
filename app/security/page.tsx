import CtaBand from "@/components/cta-band";
import { PageJsonLd } from "@/components/json-ld";
import { SecurityArt } from "@/components/illustrations/iso-art";
import { CheckList, MonoLabel, MonoLink, SoftCard, Section, Split } from "@/components/ui/blocks";
import PageIntro from "@/components/ui/page-intro";
import SectionHeading from "@/components/ui/section-heading";
import { CONTACT_EMAIL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const PAGE = {
  path: "/security",
  title: "Security: Isolated Workspaces, Read-Only Access",
  description:
    "How Appfox protects your app data: workspace isolation with row-level security, credentials in a server-side vault, read-only integrations, fail-closed reads, and explicit retention and deletion.",
};

export const metadata = pageMetadata(PAGE);

const sections = [
  {
    title: "Workspace isolation",
    items: [
      "Every tenant resource carries its workspace identity, enforced with Postgres row-level security and composite foreign keys.",
      "Role-aware membership with owner, admin, and viewer roles. A failed membership read is treated as unavailable, never as a default viewer.",
      "Authentication is handled by Clerk. Supabase remains the database and the enforcement layer; there is no second authorization system.",
    ],
  },
  {
    title: "Credentials and provider access",
    items: [
      "Integration credentials such as a RevenueCat key are stored in Supabase Vault, used server-side only, and never reach the browser.",
      "Connecting an integration verifies that the acting member is an owner or admin before any provider request is made. The persistence function rechecks that role independently.",
      "Provider inventory and metric reads are capped below each provider's documented rate limits, with bounded retries and exact handling of retry-after headers.",
    ],
  },
  {
    title: "Read-only by default",
    items: [
      "All launch integrations read. None write. Appfox drafts review replies and store copy for you to copy; it does not submit them.",
      "A public store URL is a declaration, not proof of ownership. Private resources bind only after server-side authorization through the connected account.",
      "External actions, when they arrive, require explicit approval and an audit trail.",
    ],
  },
  {
    title: "Fail closed",
    items: [
      "An unavailable read cannot appear as inactive access, zero spend, a disconnected integration, empty inventory, zero findings, or an ordinary role restriction.",
      "Controls that would start paid provider work stop when their history cannot be confirmed, so an outage cannot invite duplicate jobs.",
      "Required-read classification makes database errors take precedence over stale or partial data for every authenticated mutation.",
    ],
  },
  {
    title: "Observability without payloads",
    items: [
      "Provider calls emit a strict record with latency, result and unit counts, bounded cost, retry metadata, cache status, and safe error codes.",
      "Identifiers, payloads, credentials, URLs, and raw error text are excluded from those records.",
      "Web request and authentication failures are logged in a safe structured form. Background failures go to a durable alert outbox.",
    ],
  },
  {
    title: "Retention, deletion, and recovery",
    items: [
      "Explicit retention windows. Owner deletion removes workspace data and is Vault-aware.",
      "Replay sessions are masked on the device before upload, retained for a fixed window, and deleted with their storage objects.",
      "A logical backup and restore rehearsal runs in hosted CI as a release gate.",
    ],
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageJsonLd path={PAGE.path} name={PAGE.title} description={PAGE.description} />
      <PageIntro
        kicker="Security"
        title="Your evidence, your workspace, nobody else's."
        lead="Appfox handles store data, customer reviews, and sometimes your revenue. These are the boundaries it keeps, written the way they are enforced."
      />

      <Section className="pt-4 lg:pt-8">
        <Split
          title="Isolated by default."
          sub="Read-only by design."
          visual={<SecurityArt className="mx-auto h-auto w-full max-w-[520px]" />}
        >
          <p>
            Every workspace is walled off at the database, credentials never reach the browser, and every launch
            integration only reads. When data is unavailable, Appfox says so instead of guessing.
          </p>
          <p>The six boundaries below are written the way they are enforced.</p>
        </Split>
      </Section>

      <Section className="pt-0 lg:pt-0">
        <div className="grid gap-5 md:grid-cols-2">
          {sections.map((sec, i) => (
            <SoftCard key={sec.title} delay={(i % 2) * 90}>
              <span className="font-mono text-[14px] leading-5 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
              <MonoLabel className="pt-4">{sec.title}</MonoLabel>
              <CheckList items={sec.items} className="pt-2" />
            </SoftCard>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            title="What we do not"
            sub="claim yet."
            lead="Real pilot outcomes, authenticated end-to-end tests against production, and authorized live-provider checks are release evidence, not marketing claims. We publish them when they exist."
          />
          <SoftCard delay={100}>
            <MonoLabel>Report a security issue</MonoLabel>
            <p className="pt-2 text-[16px] leading-[26px] text-muted">
              Email us with the subject line Security. We respond to every report.
            </p>
            <MonoLink href={`mailto:${CONTACT_EMAIL}?subject=Security`} className="mt-5 normal-case">
              {CONTACT_EMAIL}
            </MonoLink>
          </SoftCard>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
