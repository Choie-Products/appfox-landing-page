import type { Metadata } from "next";
import CtaBand from "@/components/cta-band";
import MarketTable from "@/components/mock/market-table";
import { Section } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Research an idea",
  description:
    "Describe an app idea, confirm a bounded competitor set, and get a saved research brief with positioning, observed monetization, recurring complaints, and the evidence against the idea.",
};

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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] font-medium leading-5 text-accent-ink">{children}</p>;
}

export default function ResearchPage() {
  return (
    <>
      {/* Hero */}
      <section className="-mt-[72px] bg-[linear-gradient(to_bottom,var(--hero-bg-top),var(--paper))] lg:-mt-[88px]">
        <Container className="pb-4 pt-[128px] lg:pb-8 lg:pt-[176px]">
          <div className="max-w-[780px]">
            <Eyebrow>Research an idea</Eyebrow>
            <h1 className="pt-5 text-[40px] font-medium leading-[1.05] tracking-[-0.03em] text-ink sm:text-[52px] lg:text-[60px]">
              Decide whether to build it, with the evidence on the table.
            </h1>
            <p className="max-w-[620px] pt-6 text-[18px] leading-[28px] text-muted">
              A research brief that supports a decision, written from real listings and real reviews, and honest about
              what reviews cannot tell you.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-8">
              <ButtonLink href="/waitlist" variant="dark" size="lg">
                Start a brief
              </ButtonLink>
              <ButtonLink href="#how-it-works" variant="secondary" size="lg">
                How it works
              </ButtonLink>
            </div>
          </div>

          <dl className="mt-16 grid gap-x-8 gap-y-6 border-t border-line pt-6 sm:grid-cols-3">
            {FACTS.map((f) => (
              <div key={f.label}>
                <dt className="text-[13px] leading-5 text-quiet">{f.label}</dt>
                <dd className="pt-1 text-[15px] font-medium leading-6 text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>

      </section>

      {/* How it works */}
      <Section id="how-it-works" className="scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="pt-3 text-display-md text-ink">From an idea to a recorded decision.</h2>
            <p className="max-w-[440px] pt-3 text-[16px] leading-[26px] text-muted">
              You describe the idea and confirm the competitors. Appfox does the collecting, and writes a brief you can
              trace back to its sources.
            </p>
          </div>
          <ol className="relative">
            <span className="absolute bottom-4 left-[15px] top-4 w-px bg-line" aria-hidden="true" />
            {steps.map((step, i) => (
              <li key={step.t} className="relative grid grid-cols-[32px_minmax(0,1fr)] gap-5 pb-10 last:pb-0">
                <span className="flex size-8 items-center justify-center rounded-full border border-line bg-paper text-[13px] font-medium tabular-nums text-ink">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="text-[18px] font-semibold leading-6 text-ink">{step.t}</h3>
                  <p className="pt-1.5 text-[16px] leading-[26px] text-muted">{step.b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Scope */}
      <Section>
        <div className="max-w-[640px]">
          <Eyebrow>Scope</Eyebrow>
          <h2 className="pt-3 text-display-md text-ink">Clear about what reviews can and cannot show.</h2>
          <p className="pt-3 text-[16px] leading-[26px] text-muted">
            A brief is built for a build or do-not-build decision. It reports what the evidence supports and names
            what it cannot establish.
          </p>
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {[
            { title: "What a brief can tell you", items: CAN, dot: "bg-accent", tone: "text-ink-soft" },
            { title: "What it will refuse to claim", items: WONT, dot: "bg-[#c8c8c4]", tone: "text-muted" },
          ].map((col) => (
            <div key={col.title}>
              <p className="flex items-center gap-2.5 border-b border-line pb-3 text-[15px] font-semibold leading-6 text-ink">
                <span className={`size-2 rounded-full ${col.dot}`} aria-hidden="true" />
                {col.title}
              </p>
              <ul>
                {col.items.map((item) => (
                  <li key={item} className={`border-b border-line py-4 text-[16px] leading-[26px] ${col.tone}`}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* After the brief */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <Eyebrow>After the brief</Eyebrow>
            <h2 className="pt-3 text-display-md text-ink">The market keeps going after the brief.</h2>
            <p className="pt-3 text-[16px] leading-[26px] text-muted">
              The brief was a decision point. The market is a living object. When you later add an owned app, it joins
              the same market with its evidence intact.
            </p>
          </div>
          <dl className="grid gap-x-8 sm:grid-cols-3">
            {AFTER.map((a) => (
              <div key={a.t} className="border-t border-line py-4">
                <dt className="text-[16px] font-semibold leading-6 text-ink">{a.t}</dt>
                <dd className="pt-1 text-[16px] leading-[26px] text-muted">{a.b}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="outline-card mt-12 rounded-[28px] p-3 sm:p-4">
          <MarketTable />
        </div>
        <p className="pt-4 text-[13px] leading-5 text-quiet">
          A tracked market for a meal-planning idea. Ratings, prices, and release dates from the US App Store, October
          2026.
        </p>
      </Section>

      <CtaBand
        title="Research your next idea."
        lead="The Free plan includes a research brief every month. Start with the idea and the store you plan to launch in."
      />
    </>
  );
}
