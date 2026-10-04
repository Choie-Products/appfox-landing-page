import { Check } from "lucide-react";
import CtaBand from "@/components/cta-band";
import Faq from "@/components/faq";
import { PageJsonLd } from "@/components/json-ld";
import { PricingGrid } from "@/components/home/pricing-table";
import { Section } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/button";
import PageIntro from "@/components/ui/page-intro";
import SectionHeading from "@/components/ui/section-heading";
import { APP_URL, CTA_HREF } from "@/lib/site";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import Reveal from "@/components/reveal";

const PAGE = {
  path: "/pricing",
  title: "Pricing: Free, Indie $29, Studio $99",
  description:
    "Appfox app tracker pricing. Start free with both journeys and the full evidence ledger, then upgrade to Indie at $29 or Studio at $99 a month. Every plan is read-only and metered in the open.",
};

export const metadata = pageMetadata(PAGE);

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
    a: "Annual prices are shown as a monthly rate. Indie is $24 and Studio is $79 a month when billed annually.",
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
    q: "Are these prices final?",
    a: "Not yet. These are proposed plans. Limits such as competitor caps, review depth, and refresh cadence are pilot defaults we are still testing.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageJsonLd path={PAGE.path} name={PAGE.title} description={PAGE.description} extra={[faqJsonLd(faq)]} />
      <PageIntro
        kicker="Pricing"
        title="Priced in the open. Start free, pay when you outgrow it."
        lead="Every plan has the same evidence ledger and the same read-only boundary. The tiers change how much you can watch, how far back you can look, and how many people can look with you."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="dark" size="hero">
            Start for free
          </ButtonLink>
          <ButtonLink href="#plans" variant="secondary" size="hero">
            See plans
          </ButtonLink>
        </div>
      </PageIntro>

      {/* Plans and comparison, in one table */}
      <Section id="plans" className="scroll-mt-24 pt-4 lg:pt-8">
        <Reveal variant="scale">
          <PricingGrid className="pt-12" collapsible showFits />
        </Reveal>
        <p className="pt-6 text-center text-[13px] leading-5 text-quiet">
          Proposed plans. Prices are per month, with the annual rate where it applies.
        </p>
      </Section>

      {/* Included in every plan */}
      <Section>
        <SectionHeading title="Included in every plan:" sub="the same evidence ledger." className="max-w-[640px]" />
        <div className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {EVERY_PLAN.map((item, i) => (
            <Reveal key={item.t} delay={(i % 3) * 80} className="border-t border-line py-5">
              <p className="flex items-center gap-2.5 font-mono text-[14px] font-medium uppercase leading-6 text-ink">
                <Check className="size-4 shrink-0 text-accent" strokeWidth={2.2} aria-hidden="true" />
                {item.t}
              </p>
              <p className="pt-1.5 text-[16px] leading-[26px] text-muted">{item.b}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* How usage is metered */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <SectionHeading
            title="Metered,"
            sub="so the free plan can stay free."
            lead="Paid provider jobs and AI runs count against your plan. The accounting is the same on every tier, and you can always see it."
          />
          <Reveal delay={100}>
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {METERING.map((m) => (
              <div key={m.t} className="border-t border-line py-5">
                <dt className="font-mono text-[14px] font-medium uppercase leading-6 text-ink">{m.t}</dt>
                <dd className="pt-1.5 text-[16px] leading-[26px] text-muted">{m.b}</dd>
              </div>
            ))}
          </dl>
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <SectionHeading
            title="Pricing questions,"
            sub="answered."
            lead="Something else? Email us from the contact page and a person will answer."
          />
          <Reveal delay={100}>
            <Faq items={faq} />
          </Reveal>
        </div>
      </Section>

      <CtaBand secondary={{ label: "Compare plans", href: "#plans" }} />
    </>
  );
}
