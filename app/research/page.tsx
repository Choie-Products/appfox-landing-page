import CtaBand from "@/components/cta-band";
import { PageJsonLd } from "@/components/json-ld";
import { ResearchArt } from "@/components/illustrations/iso-art";
import MarketTable from "@/components/mock/market-table";
import { CheckList, Section, Split } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/button";
import PageIntro from "@/components/ui/page-intro";
import SectionHeading from "@/components/ui/section-heading";
import { APP_URL, CTA_HREF } from "@/lib/site";
import { howToJsonLd, pageMetadata } from "@/lib/seo";
import Reveal from "@/components/reveal";

const PAGE = {
  path: "/research",
  title: "App Idea Research: AI Competitor Briefs",
  description:
    "Validate a mobile app idea before you build it. Describe the idea, confirm the competitor set, and get an AI research brief from real App Store and Google Play listings and reviews, including the evidence against the idea.",
};

export const metadata = pageMetadata(PAGE);

const steps = [
  {
    t: "Describe the idea",
    b: "The job it does, who it is for, the store, the country, and the language. Appfox derives editable search concepts from that description.",
  },
  {
    t: "Confirm the competitor set",
    b: "Discovery runs across store search, similar-app relationships, and overlapping review language. You keep or remove candidates and label each one direct or adjacent. Low-confidence candidates are never added silently.",
  },
  {
    t: "Read the brief",
    b: "Positioning, observable monetization, recurring complaints, existing strengths, potential gaps, and evidence against the idea. Each claim links to the listings and reviews behind it, with coverage shown.",
  },
  {
    t: "Inspect the sources",
    b: "The original review text, the listing snapshot, and the collection window. A complete local list is not the whole store, and the brief says exactly how much was collected.",
  },
  {
    t: "Record a decision",
    b: "Save a hypothesis and the next validation action, or record that you will not pursue the idea. Both are useful outcomes.",
  },
  {
    t: "Keep watching",
    b: "Enable monitoring and the market keeps refreshing. When you later add an owned app, it joins the same market with its evidence intact.",
  },
];

const CAN = [
  "Who exists in the market, and who was newly discovered versus verifiably newly launched.",
  "How apps position themselves on their listings.",
  "What monetization is observable: free or paid, in-app purchase names, listed prices, trials where visible.",
  "What customers complain about repeatedly, and the words they use for the job.",
  "What features are praised, and which are requested again and again.",
  "Where review or rating activity is rising, as an activity proxy with its components shown.",
];

const WONT = [
  "Market size, willingness to pay, or business viability. Reviews cannot establish those.",
  "That an unmentioned feature is a missing feature. Unmentioned and verified missing are different states.",
  "A trend before trustworthy comparable snapshots exist. History is never backdated from today's listing.",
  "That update frequency or review velocity equals revenue growth.",
  "That an in-app purchase indicator is a verified subscription offer.",
  "That a periodic search is an exhaustive census of the market.",
];

const FACTS = [
  { label: "Stores", value: "App Store and Google Play" },
  { label: "Scope", value: "One country and language per market" },
  { label: "Sources", value: "Real listings and reviews, linked" },
];

const AFTER = [
  {
    t: "Competitor sets refresh",
    b: "New entrants are scored for similarity before they are suggested to you.",
  },
  {
    t: "Listings and prices are recorded",
    b: "Changes are stored against history. Nothing is backdated from today's listing.",
  },
  {
    t: "Tracked queries report rank",
    b: "Current and previous rank for every search query you follow.",
  },
];

export default function ResearchPage() {
  return (
    <>
      <PageJsonLd
        path={PAGE.path}
        name={PAGE.title}
        description={PAGE.description}
        extra={[
          howToJsonLd({
            name: "How to research an app idea with Appfox",
            description: "From an idea to a recorded build or do-not-build decision, with the evidence on the table.",
            steps,
          }),
        ]}
      />
      <PageIntro
        kicker="Research an idea"
        title="Decide whether to build it, with the evidence on the table."
        lead="An AI research brief that supports a build or do-not-build decision, written from real App Store and Google Play listings and reviews, and honest about what reviews cannot tell you."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="dark" size="hero">
            Start a brief
          </ButtonLink>
          <ButtonLink href="#how-it-works" variant="secondary" size="hero">
            How it works
          </ButtonLink>
        </div>
      </PageIntro>

      <Section className="pt-4 lg:pt-8">
        <Split
          title="One idea in."
          sub="One brief out, with its sources."
          visual={<ResearchArt className="mx-auto h-auto w-full max-w-[520px]" />}
        >
          <p>
            Describe the idea, confirm which apps really compete with it, and Appfox writes the brief from their
            listings and reviews. Every claim links back to what it came from.
          </p>
          <dl className="pt-2">
            {FACTS.map((f) => (
              <div key={f.label} className="flex justify-between gap-6 border-b border-line py-3.5 last:border-b-0">
                <dt className="font-mono text-[13px] font-medium uppercase leading-6 text-ink">{f.label}</dt>
                <dd className="text-right text-[15px] leading-6 text-muted">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Split>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" className="scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              title="From an idea"
              sub="to a recorded decision."
              lead="You describe the idea and confirm the competitors. Appfox does the collecting, and writes a brief you can trace back to its sources."
            />
          </div>
          <ol className="relative">
            <span className="absolute bottom-4 left-[17px] top-4 w-px bg-line" aria-hidden="true" />
            {steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.t}
                delay={(i % 3) * 70}
                className="relative grid grid-cols-[36px_minmax(0,1fr)] gap-5 pb-10 last:pb-0"
              >
                <span className="soft-key flex size-9 items-center justify-center rounded-full font-mono text-[13px] font-medium tabular-nums text-ink">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-mono text-[14px] font-medium uppercase leading-5 text-ink">{step.t}</h3>
                  <p className="pt-1.5 text-[16px] leading-[26px] text-muted">{step.b}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* Scope */}
      <Section>
        <SectionHeading
          title="Clear about what reviews"
          sub="can and cannot show."
          lead="A brief is built for a build or do-not-build decision. It reports what the evidence supports and names what it cannot establish."
          className="max-w-[640px]"
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {[
            { title: "What a brief can tell you", items: CAN, tone: "yes" as const },
            { title: "What it will refuse to claim", items: WONT, tone: "no" as const },
          ].map((col, i) => (
            <Reveal key={col.title} delay={i * 100} className="soft-surface rounded-[28px] p-6 sm:p-8">
              <p className="font-mono text-[14px] font-medium uppercase leading-5 text-ink">{col.title}</p>
              <CheckList items={col.items} tone={col.tone} className="pt-3" />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* After the brief */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <SectionHeading
            title="The market keeps going"
            sub="after the brief."
            lead="The brief was a decision point. The market is a living object. When you later add an owned app, it joins the same market with its evidence intact."
          />
          <Reveal delay={100}>
          <dl className="grid gap-x-8 sm:grid-cols-3">
            {AFTER.map((a) => (
              <div key={a.t} className="border-t border-line py-4">
                <dt className="font-mono text-[14px] font-medium uppercase leading-5 text-ink">{a.t}</dt>
                <dd className="pt-1.5 text-[16px] leading-[26px] text-muted">{a.b}</dd>
              </div>
            ))}
          </dl>
          </Reveal>
        </div>
        <Reveal variant="scale" className="soft-surface mt-12 overflow-x-auto rounded-[28px] p-3 sm:p-4">
          <MarketTable />
        </Reveal>
        <p className="pt-5 text-[13px] leading-5 text-quiet">
          A tracked market for a meal-planning idea. Ratings, prices, and release dates from the US App Store, October
          2026.
        </p>
      </Section>

      <CtaBand
        title="Research your next idea."
        lead="Research briefs are available to invited beta users. Request access with an idea and the store you plan to launch in."
      />
    </>
  );
}
