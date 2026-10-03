import type { Metadata } from "next";
import { Check } from "lucide-react";
import CtaBand from "@/components/cta-band";
import Faq from "@/components/faq";
import { PricingGrid } from "@/components/home/pricing-table";
import { Section } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { APP_URL, CTA_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Appfox plans: Free, Indie at $29 a month, Studio at $99, and Scale at $299. Every plan has the same evidence ledger and the same read-only boundary.",
};

/** One-line fit for each plan, shown under the plan name in the table. */
const FITS: Record<string, string> = {
  Free: "Try both journeys on one app.",
  Indie: "For a solo founder with a few apps.",
  Studio: "For a small studio across several apps.",
  Scale: "For teams running many apps and markets.",
};

const EVERY_PLAN = [
  { t: "Both journeys", b: "Research an idea and operate a live app in one workspace." },
  { t: "Every surface", b: "Today, Market, My App, Customers, Actions, and Integrations." },
  { t: "Evidence on every finding", b: "Each recommendation links to the reviews, listings, and metrics behind it." },
  { t: "Read-only integrations", b: "Appfox never writes to your stores or providers. Credentials stay server-side." },
  { t: "Workspace isolation", b: "Row-level isolation, with owner, admin, and viewer roles." },
  { t: "Usage you can see", b: "A per-workspace history of what was spent, on what, and when." },
];

const METERING = [
  {
    t: "Server-enforced limits",
    b: "Markets, competitors, tracked queries, and members are checked on the server before any paid provider job starts.",
  },
  {
    t: "Reserved, then settled",
    b: "A job reserves its budget first and settles at actual cost, so two clicks cannot double-spend.",
  },
  {
    t: "Nothing silently retried",
    b: "At a limit, the control that would start new paid work stops and says why. Nothing you collected goes away.",
  },
  {
    t: "No accounts on your behalf",
    b: "Appfox never creates provider accounts or purchases data for you.",
  },
];

const faq = [
  {
    q: "Can I start for free?",
    a: "Yes. The Free plan includes both journeys for one owned app and one market, with 30 days of evidence history, 20 AI runs, and one research brief a month.",
  },
  {
    q: "How does annual billing work?",
    a: "Annual prices are shown as a monthly rate. Indie is $24, Studio is $79, and Scale is $249 a month when billed annually.",
  },
  {
    q: "What counts as an AI run?",
    a: "AI work such as review classification and brief generation. Runs are reserved before a job starts and settled at actual cost, and your workspace shows its usage history.",
  },
  {
    q: "What happens when I hit a plan limit?",
    a: "The control that would start new paid work stops and says why. Nothing you already collected goes away, and nothing is silently retried. Upgrade when the limits get in the way.",
  },
  {
    q: "Do I need to connect RevenueCat?",
    a: "No. RevenueCat is optional and read-only. It is available on Indie and above, alongside verified competitor revenue.",
  },
  {
    q: "What does Scale add over Studio?",
    a: "More seats and owned apps, unlimited markets, 50 competitors per market, daily ads monitoring, 90-day replay retention, and SSO alongside the API.",
  },
  {
    q: "Are these prices final?",
    a: "Not yet. These are proposed plans. Limits such as competitor caps, review depth, and refresh cadence are pilot defaults we are still testing.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] font-medium leading-5 text-accent-ink">{children}</p>;
}

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="-mt-[72px] bg-[linear-gradient(to_bottom,var(--hero-bg-top),var(--paper))] lg:-mt-[88px]">
        <Container className="pb-12 pt-[128px] lg:pb-16 lg:pt-[176px]">
          <div className="max-w-[760px]">
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="pt-5 text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-ink sm:text-[52px] lg:text-[60px]">
              Priced in the open. Start free, pay when you outgrow it.
            </h1>
            <p className="max-w-[620px] pt-6 text-[18px] leading-[28px] text-muted">
              Every plan has the same evidence ledger and the same read-only boundary. The tiers change how much you can
              watch, how far back you can look, and how many people can look with you.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-8">
              <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="dark" size="lg">
                Start for free
              </ButtonLink>
              <ButtonLink href="#plans" variant="secondary" size="lg">
                See plans
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Plans and comparison, in one table */}
      <Container as="section" id="plans" className="scroll-mt-24 pb-16 lg:pb-24">
        <PricingGrid className="pt-12" collapsible fits={FITS} />
        <p className="pt-6 text-center text-[13px] leading-5 text-quiet">
          Proposed plans. Prices are per month, with the annual rate where it applies.
        </p>
      </Container>

      {/* Included in every plan */}
      <Section>
        <div className="max-w-[640px]">
          <Eyebrow>Included in every plan</Eyebrow>
          <h2 className="pt-3 text-display-md text-ink">The same evidence ledger on every plan.</h2>
        </div>
        <div className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {EVERY_PLAN.map((item) => (
            <div key={item.t} className="border-t border-line py-5">
              <p className="flex items-center gap-2.5 text-[16px] font-semibold leading-6 text-ink">
                <Check className="size-4 shrink-0 text-accent" strokeWidth={2.2} aria-hidden="true" />
                {item.t}
              </p>
              <p className="pt-1.5 text-[16px] leading-[26px] text-muted">{item.b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How usage is metered */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <Eyebrow>How usage works</Eyebrow>
            <h2 className="pt-3 text-display-md text-ink">Metered, so the free plan can stay free.</h2>
            <p className="pt-3 text-[16px] leading-[26px] text-muted">
              Paid provider jobs and AI runs count against your plan. The accounting is the same on every tier, and you
              can always see it.
            </p>
          </div>
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {METERING.map((m) => (
              <div key={m.t} className="border-t border-line py-5">
                <dt className="text-[16px] font-semibold leading-6 text-ink">{m.t}</dt>
                <dd className="pt-1.5 text-[16px] leading-[26px] text-muted">{m.b}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="pt-3 text-display-md text-ink">Pricing questions</h2>
            <p className="pt-3 text-[16px] leading-[26px] text-muted">
              Something else? Email us from the contact page and a person will answer.
            </p>
          </div>
          <Faq items={faq} />
        </div>
      </Section>

      <CtaBand secondary={{ label: "Compare plans", href: "#plans" }} />
    </>
  );
}
