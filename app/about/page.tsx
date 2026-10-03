import CtaBand from "@/components/cta-band";
import { PageJsonLd } from "@/components/json-ld";
import { MorningArt } from "@/components/home/journey-art";
import { LedgerPlateArt } from "@/components/home/ledger";
import { PanelCard, Section, Split } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/button";
import PageIntro from "@/components/ui/page-intro";
import SceneFrame from "@/components/ui/scene-frame";
import { APP_URL, CTA_HREF } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/reveal";

const PAGE = {
  path: "/about",
  title: "About: Mobile App Intelligence for Founders",
  description:
    "Why Appfox exists: indie founders and small studios should not be the integration layer between their tools. An AI app tracker built on four rules: evidence before advice, facts first, honest coverage, human approval.",
};

export const metadata = pageMetadata(PAGE);

const levels = [
  ["Research", "Understand a market and an app opportunity."],
  ["Intelligence", "Continuously monitor the market and the owned app."],
  ["Recommendation", "Turn evidence into prioritized actions."],
  ["Operator", "Prepare and, with explicit approval, execute actions. Not part of the launch."],
];

const OUTSIDE_IN = ["Competitors", "Rankings", "Reviews", "Pricing", "New entrants"];
const INSIDE_OUT = ["Revenue", "Conversion", "Releases", "Customer feedback"];

/** Outside-in and inside-out data meeting in one place, drawn like the homepage ledger hub. */
function SourcesMap() {
  const column = (title: string, items: string[]) => (
    <div className="soft-surface relative z-10 rounded-[24px] p-5">
      <p className="font-mono text-[13px] font-medium uppercase leading-5 text-ink">{title}</p>
      <ul className="pt-2">
        {items.map((item) => (
          <li key={item} className="border-b border-line py-2.5 text-[15px] leading-5 text-ink-soft last:border-b-0">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="relative mt-10 grid items-center gap-5 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_300px_minmax(0,1fr)] lg:gap-16">
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        aria-hidden="true"
      >
        <path d="M250 50 H 500" fill="none" stroke="#fe5000" strokeWidth="2.5" strokeLinecap="round" className="ledger-flow" vectorEffect="non-scaling-stroke" />
        <path d="M750 50 H 500" fill="none" stroke="#fe5000" strokeWidth="2.5" strokeLinecap="round" className="ledger-flow" style={{ animationDuration: "1.2s" }} vectorEffect="non-scaling-stroke" />
      </svg>
      {column("Outside-in", OUTSIDE_IN)}
      <div className="relative z-10 order-first flex flex-col items-center text-center lg:order-none">
        <LedgerPlateArt uid="about-hub" className="h-auto w-full max-w-[300px]" />
        <div className="lg:absolute lg:inset-x-0 lg:top-full">
          <p className="pt-2 font-mono text-[14px] font-medium uppercase leading-5 text-ink">Appfox</p>
          <p className="pt-2 text-[15px] leading-[22px] text-muted">
            Says what a generic market tool cannot, with the evidence attached.
          </p>
        </div>
      </div>
      {column("Inside-out", INSIDE_OUT)}
    </div>
  );
}

/** Small coded tiles for the four rules, drawn as soft panels like the homepage scenes. */
function EvidenceTile() {
  return (
    <div className="w-full soft-panel rounded-[14px] p-3.5 text-left">
      <p className="text-[12px] font-semibold leading-4 text-ink">Pricing complaints rose after v2.8</p>
      <div className="flex flex-wrap gap-1 pt-2.5">
        {["47 reviews", "v2.8", "RevenueCat"].map((c) => (
          <span key={c} className="flex items-center gap-1 rounded-full border border-[#e6e6e4] px-2 py-0.5 text-[10px] leading-3 text-ink">
            <span className="size-1 rounded-full bg-accent" />
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function FactsTile() {
  return (
    <div className="w-full soft-panel rounded-[14px] p-3.5 text-left">
      <div className="flex items-end gap-3">
        {[
          { label: "Baseline", h: 26, c: "bg-[#c8c8c4]" },
          { label: "Now", h: 40, c: "bg-accent" },
        ].map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-1">
            <span className={`w-9 rounded-md ${b.c}`} style={{ height: b.h }} />
            <span className="text-[10px] leading-3 text-quiet">{b.label}</span>
          </div>
        ))}
        <div className="pb-4">
          <p className="text-[16px] font-semibold leading-5 text-ink">+38%</p>
          <p className="text-[10px] leading-3 text-quiet">14 days vs 14 days</p>
        </div>
      </div>
    </div>
  );
}

function CoverageTile() {
  return (
    <div className="w-full soft-panel rounded-[14px] p-3.5 text-left">
      <div className="flex items-center justify-between text-[11px] leading-4">
        <span className="font-semibold text-ink">Coverage</span>
        <span className="text-quiet">US, English</span>
      </div>
      <span className="mt-2.5 block h-2 rounded-full bg-[#f0f0ee]">
        <span className="block h-2 w-[72%] rounded-full bg-ink" />
      </span>
      <p className="pt-2.5 text-[11px] leading-4 text-quiet">1,840 reviews collected, window shown</p>
    </div>
  );
}

function ApprovalTile() {
  return (
    <div className="w-full soft-panel rounded-[14px] p-3.5 text-left">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold leading-4 text-ink">Draft reply</span>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold leading-3 text-accent-ink">
          Your call
        </span>
      </div>
      <span className="mt-2.5 block h-1.5 w-full rounded-full bg-[#ececea]" />
      <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-[#ececea]" />
      <div className="flex gap-1.5 pt-3 text-[10px] font-semibold leading-3">
        <span className="rounded-full bg-ink px-2.5 py-1 text-white">Copy</span>
        <span className="rounded-full border border-[#e6e6e4] px-2.5 py-1 text-ink">Edit</span>
      </div>
    </div>
  );
}

const RULES = [
  {
    title: "Evidence before advice",
    body: "Every recommendation links to the reviews, listings, and metrics behind it.",
    Visual: EvidenceTile,
  },
  {
    title: "Facts first, explained by AI",
    body: "Signals are computed from stored facts. AI only explains them, citing what it used.",
    Visual: FactsTile,
  },
  {
    title: "Honest coverage",
    body: "Every number shows its window, its sample, and what was not collected.",
    Visual: CoverageTile,
  },
  {
    title: "Human approval",
    body: "Appfox drafts. It never publishes, sends, or changes anything outside your workspace.",
    Visual: ApprovalTile,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageJsonLd path={PAGE.path} name={PAGE.title} description={PAGE.description} />
      <PageIntro
        kicker="About"
        title="Built for the person who runs the whole app."
        lead="Indie founders and small studios ship fast and own everything: product, growth, store presence, pricing, support. Appfox exists so that one person can operate an app with the awareness of a team."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="dark" size="hero">
            Start for free
          </ButtonLink>
          <ButtonLink href="/product" variant="secondary" size="hero">
            See the product
          </ButtonLink>
        </div>
      </PageIntro>

      <Section className="pt-4 lg:pt-8">
        <Split
          title="Every founder we talk to"
          sub="describes the same morning."
          visual={
            <SceneFrame>
              <MorningArt />
            </SceneFrame>
          }
        >
          <p>
            Open App Store Connect. Open RevenueCat. Skim the reviews. Check a competitor. Look at the crash dashboard.
            Try to remember what shipped last week. Then decide what to work on, mostly from memory.
          </p>
          <p>
            The tools are good. The problem is that the founder is the integration layer between them, and integration
            is where the time goes and where the mistakes hide.
          </p>
        </Split>
      </Section>

      <Section>
        <SectionHeading
          align="center"
          title="Outside-in and inside-out,"
          sub="in one place."
          lead="We think of the category as mobile app intelligence and operations. ASO is one workflow inside it. Dashboards are not the product. Attention is."
        />
        <Reveal variant="scale" delay={100}>
          <SourcesMap />
        </Reveal>
      </Section>

      <Section>
        <SectionHeading
          title="Where this goes,"
          sub="one level at a time."
          lead="The launch covers the first three. Autonomous execution is explicitly not a goal of the first version."
        />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {levels.map(([t, b], i) => {
            const later = i === levels.length - 1;
            return (
              <Reveal
                as="li"
                key={t}
                delay={i * 90}
                className={`relative flex flex-col rounded-[24px] p-6 lg:after:absolute lg:after:-right-[34px] lg:after:top-1/2 lg:after:w-[34px] lg:after:border-t-[2.5px] lg:after:border-dotted lg:after:content-[''] lg:last:after:hidden ${
                  i === levels.length - 2 ? "lg:after:border-[#c8c8c4]" : "lg:after:border-accent"
                } ${later ? "border-2 border-dashed border-[#d6d6d3]" : "soft-surface"}`}
              >
                <span className="flex items-center justify-between">
                  <span className="font-mono text-[14px] leading-5 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold leading-3 ${
                      later ? "bg-[#ececea] text-quiet" : "bg-accent-soft text-accent-ink"
                    }`}
                  >
                    {later ? "Later" : "At launch"}
                  </span>
                </span>
                <p className="pt-6 font-mono text-[14px] font-medium uppercase leading-5 tracking-normal text-ink">{t}</p>
                <p className="pt-2 text-[16px] leading-[26px] text-muted">{b}</p>
              </Reveal>
            );
          })}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <SectionHeading
            title="The honest version"
            sub="of the pitch."
            lead="Aggregating reviews, rankings, and revenue, or adding AI summaries on top, is not differentiation. Plenty of products already do parts of that well."
          />
          <Reveal delay={100} className="text-[16px] leading-[26px] text-muted lg:pt-2">
            Our hypothesis is decision usefulness: that Appfox leads to better decisions with less work, both before you
            build and after you launch. We are testing that with researchers and live-app operators, including
            low-volume apps and people who will not connect private data. If the evidence says we are wrong, the product
            changes. Everything we ship follows four rules.
          </Reveal>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RULES.map(({ title, body, Visual }, i) => (
            <PanelCard key={title} delay={i * 90} visual={<Visual />} title={title} body={body} />
          ))}
        </div>
      </Section>

      <CtaBand
        title="See whether it changes how you decide."
        lead="Start free. Research an idea, operate a live app, or both, with the evidence on every finding."
      />
    </>
  );
}
