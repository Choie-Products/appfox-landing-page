import CtaBand from "@/components/cta-band";
import { PageJsonLd } from "@/components/json-ld";
import Image from "next/image";
import { Check } from "lucide-react";
import { OperateArt, OutcomeArt, RevenueArt } from "@/components/home/journey-art";
import { PanelCard, Section, Split } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/button";
import PageIntro from "@/components/ui/page-intro";
import SceneFrame from "@/components/ui/scene-frame";
import { APP_URL, CTA_HREF } from "@/lib/site";
import { howToJsonLd, pageMetadata } from "@/lib/seo";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/reveal";

const PAGE = {
  path: "/live-app",
  title: "Operate a Live App: Daily App Monitoring",
  description:
    "Track a live iOS or Android app from one ranked feed. Add it by store URL, optionally connect RevenueCat read-only, and let Today surface the review, competitor, release, and revenue changes that matter, with evidence.",
};

export const metadata = pageMetadata(PAGE);

const steps = [
  { t: "Add your app", b: "Paste an App Store or Google Play URL. Appfox builds the initial market and suggests competitors for you to confirm." },
  { t: "Get public evidence", b: "Listing history, collected reviews, and tracked search queries start immediately, with collection progress shown while data is pending." },
  { t: "Connect RevenueCat, optionally", b: "Appfox verifies the project and app binding first, then reads a small set of supported metrics with exact scope. Nothing is written back." },
  { t: "Read Today", b: "Meaningful customer, competitor, release, and monetization changes, ranked, with evidence and a suggested action." },
  { t: "Act and record", b: "Inspect the evidence, accept, dismiss, or snooze the finding, and note what you did." },
  { t: "Revisit the result", b: "Comparable windows and your own assessment show whether the change you shipped moved the thing you meant to move." },
];

const states = [
  { s: "Nothing significant changed", b: "A quiet day. Shown as such, with the coverage and window that back it up." },
  { s: "Not enough data", b: "A low-volume app or a short history. Appfox shows individual evidence instead of percentage alarms." },
  { s: "Sync failed", b: "A provider read did not complete. Never shown as zero, empty, or disconnected." },
  { s: "Collection in progress", b: "Reviews or listings are still arriving. Findings wait until the sample is usable." },
];

/** Small coded tiles for the four kinds of empty, drawn as soft panels like the homepage scenes. */
function QuietTile() {
  return (
    <div className="w-full soft-panel rounded-[14px] p-3.5 text-left">
      <div className="flex items-center justify-between text-[11px] leading-4">
        <span className="font-semibold text-ink">Today</span>
        <span className="text-quiet">Updated 8:02</span>
      </div>
      <div className="flex items-center gap-2 pt-3">
        <span className="flex size-6 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Check className="size-3.5" strokeWidth={2.6} />
        </span>
        <span className="text-[13px] font-semibold leading-4 text-ink">Nothing significant changed</span>
      </div>
      <p className="pt-2 text-[11px] leading-4 text-quiet">47 reviews · 6 queries · 7-day window</p>
    </div>
  );
}

function SparseTile() {
  return (
    <div className="w-full soft-panel rounded-[14px] p-3.5 text-left">
      <div className="flex items-center justify-between text-[11px] leading-4">
        <span className="font-semibold text-ink">Customers</span>
        <span className="text-quiet">3 new reviews</span>
      </div>
      <div className="flex flex-col gap-1.5 pt-3">
        {[1, 2, 5].map((stars) => (
          <div key={stars} className="flex items-center gap-2">
            <span className="text-[10px] leading-3 tracking-[1px] text-accent">
              {"★".repeat(stars)}
              <span className="text-[#dcdcd9]">{"★".repeat(5 - stars)}</span>
            </span>
            <span className="h-1.5 flex-1 rounded-full bg-[#ececea]" />
          </div>
        ))}
      </div>
      <p className="pt-2 text-[11px] leading-4 text-quiet">Each review shown, no percentages</p>
    </div>
  );
}

function FailedTile() {
  return (
    <div className="w-full soft-panel rounded-[14px] p-3.5 text-left">
      <div className="flex items-center gap-2">
        <Image src="/icons/revenuecat.jpg" alt="" width={24} height={24} className="size-6 rounded-[28%]" />
        <span className="flex-1 text-[12px] font-semibold leading-4 text-ink">RevenueCat</span>
        <span className="rounded-full bg-[#fdebe8] px-2 py-0.5 text-[10px] font-semibold leading-3 text-danger">
          Sync failed
        </span>
      </div>
      <p className="pt-3 text-[11px] leading-4 text-ink">Last good read: Oct 2, 06:00</p>
      <p className="pt-1 text-[11px] leading-4 text-quiet">Shown as failed, never as zero</p>
    </div>
  );
}

function CollectingTile() {
  return (
    <div className="w-full soft-panel rounded-[14px] p-3.5 text-left">
      <div className="flex items-center justify-between text-[11px] leading-4">
        <span className="font-semibold text-ink">Collecting reviews</span>
        <span className="text-quiet">62%</span>
      </div>
      <span className="mt-3 block h-2 rounded-full bg-[#f0f0ee]">
        <span className="block h-2 w-[62%] rounded-full bg-accent" />
      </span>
      <p className="pt-3 text-[11px] leading-4 text-quiet">Findings wait for a usable sample</p>
    </div>
  );
}

const STATE_TILES = [QuietTile, SparseTile, FailedTile, CollectingTile];

/** Numbered step cards joined by orange dotted connectors, like the homepage hub lines. */
function ConnectedSteps({ items }: { items: { t: string; b: string }[] }) {
  return (
    <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {items.map((step, i) => (
        <Reveal
          as="li"
          key={step.t}
          delay={(i % 3) * 90}
          className="soft-surface relative flex flex-col rounded-[24px] p-6 lg:after:absolute lg:after:-right-[34px] lg:after:top-1/2 lg:after:w-[34px] lg:after:border-t-[2.5px] lg:after:border-dotted lg:after:border-accent lg:after:content-[''] lg:[&:nth-child(3n)]:after:hidden"
        >
          <span className="font-mono text-[14px] leading-5 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
          <p className="pt-6 font-mono text-[14px] font-medium uppercase leading-5 tracking-normal text-ink">{step.t}</p>
          <p className="pt-2 text-[16px] leading-[26px] text-muted">{step.b}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export default function LiveAppPage() {
  return (
    <>
      <PageJsonLd
        path={PAGE.path}
        name={PAGE.title}
        description={PAGE.description}
        extra={[
          howToJsonLd({
            name: "How to monitor a live app with Appfox",
            description: "From a store URL to a measured outcome.",
            steps,
          }),
        ]}
      />
      <PageIntro
        kicker="Operate a live app"
        title="Stop checking five tools every morning."
        lead="Appfox tracks your app every day. Today tells you what changed across your customers, your competitors, your releases, and your monetization, why it may matter, and what to do next."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="dark" size="hero">
            Start for free
          </ButtonLink>
          <ButtonLink href="#how-it-works" variant="secondary" size="hero">
            How it works
          </ButtonLink>
        </div>
      </PageIntro>

      <Section className="pt-4 lg:pt-8">
        <Split
          title="The signal is deterministic."
          sub="The explanation cites it."
          visual={
            <SceneFrame>
              <OperateArt />
            </SceneFrame>
          }
        >
          <p>
            A negative review spike, a trial conversion drop, a rank acceleration, a new competitor, a price change, a
            post-release crash increase. Each is computed from stored facts with a baseline window, a comparison
            window, and a minimum sample. Only then does AI connect them into a sentence you can act on, citing the
            evidence IDs it used.
          </p>
          <p>
            Each signal has a stable fingerprint, so an ongoing episode updates instead of re-alerting, and revised
            source data can retract a finding that no longer holds.
          </p>
        </Split>
      </Section>

      <Section id="how-it-works" className="scroll-mt-24">
        <SectionHeading title="From a store URL" sub="to a measured outcome." />
        <div className="mt-10">
          <ConnectedSteps items={steps} />
        </div>
      </Section>

      <Section>
        <Split
          reverse
          title="Real monetization context,"
          sub="with exact scope."
          visual={
            <SceneFrame>
              <RevenueArt />
            </SceneFrame>
          }
        >
          <p>
            RevenueCat is the first first-party integration. Appfox keeps project totals and app-level series
            separate, records currency, timezone, and window for every observation, never sums stocks like active
            subscriptions across days, and computes trial-to-paid from matched mature cohorts rather than today&rsquo;s
            ratio.
          </p>
          <p>
            Accounts without a connection get a clearly labeled public-data experience. Nothing is hidden behind a
            connect button.
          </p>
        </Split>
      </Section>

      <Section>
        <SectionHeading
          title="Quiet is"
          sub="a valid answer."
          lead="Today has no minimum card count. Four different kinds of empty are kept apart so you never mistake an outage for calm."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {states.map((st, i) => {
            const Visual = STATE_TILES[i];
            return <PanelCard key={st.s} delay={i * 90} visual={<Visual />} title={st.s} body={st.b} />;
          })}
        </div>
      </Section>

      <Section>
        <Split
          title="Close the loop:"
          sub="did the change help?"
          visual={
            <SceneFrame>
              <OutcomeArt />
            </SceneFrame>
          }
        >
          <p>
            When a task claims to fix a customer issue, Appfox records the baseline mention rate, links the task to the
            topic and the release, measures the topic afterwards with matched windows and denominators, and asks for
            your assessment. A decrease is reported as observed, not as caused.
          </p>
        </Split>
      </Section>

      <CtaBand
        title="Put your app on Today."
        lead="Add it by store URL. Public evidence starts immediately."
      />
    </>
  );
}
