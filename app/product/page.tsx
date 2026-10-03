import type { Metadata } from "next";
import CtaBand from "@/components/cta-band";
import {
  CompetitorsArt,
  MyAppArt,
  OperateArt,
  OutcomeArt,
  RevenueArt,
  ThemesArt,
} from "@/components/home/journey-art";
import { MonoLabel, OutlineCard, PanelCard, Section, Split } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/button";
import PageIntro from "@/components/ui/page-intro";
import SceneFrame from "@/components/ui/scene-frame";
import { APP_URL, CTA_HREF } from "@/lib/site";
import SectionHeading from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Product",
  description:
    "The surfaces inside Appfox: Today, Market, My App, Customers, Actions, and Integrations. Organized by what needs attention, not by dataset.",
};

const surfaces = [
  {
    name: "Today",
    question: "What needs my attention?",
    body: "A ranked list of significant findings with evidence, freshness, coverage, and a next action. Sections for critical, important, opportunities, recent changes, and resolved outcomes. Zero findings is a valid state, and it is distinguished from not enough data and from a failed sync.",
    mock: <OperateArt />,
  },
  {
    name: "Market",
    question: "Who is out there, and what is changing?",
    body: "An editable market scope with confirmed direct and adjacent competitors, a saved research brief, metadata and pricing comparisons, rating and review movement, tracked search queries, and newly discovered apps. History is append-only, so you can see change over time rather than a snapshot.",
    mock: <CompetitorsArt />,
  },
  {
    name: "Customers",
    question: "What are people telling us?",
    body: "A review browser and a theme view. Themes carry total mentions, share of reviews, trend against the previous period, rating distribution, and affected versions. Every count links back to the original review text, and the collection window, locale, and cap are always shown.",
    mock: <ThemesArt />,
  },
  {
    name: "My App",
    question: "How is my app doing, across sources?",
    body: "Your owned app in one place: public store identity and listing history, customer evidence, store and manual release context, and supported RevenueCat metrics with exact project or app scope. The overview merges sources rather than mirroring each provider dashboard.",
    mock: <MyAppArt />,
  },
  {
    name: "Actions",
    question: "What did we decide, and did it help?",
    body: "A deliberately small task list. Accept, edit, dismiss, complete, and record an assessment. Each task keeps its rationale and evidence. Completed tasks get a matched-window comparison and your own verdict, because an observed change is not a proven cause.",
    mock: <OutcomeArt />,
  },
  {
    name: "Integrations",
    question: "What does Appfox read, and can it write?",
    body: "Every connection card shows the data read, permissions requested, last sync, sync status, usage against provider limits, and a disconnect control. All launch integrations are read-only. Credentials are stored server-side in a vault.",
    mock: <RevenueArt />,
  },
];

/** Dot colors from quiet to urgent, matching the homepage feed. */
const LEVEL_DOTS = ["bg-[#c8c8c4]", "bg-ink", "bg-[#ffa24d]", "bg-accent"];

const levels = [
  { level: "Low", where: "History only", when: "A small, expected movement worth keeping for later comparison." },
  { level: "Interesting", where: "Activity feed", when: "A real change that does not need a decision today." },
  { level: "Important", where: "Today and digest", when: "A change with enough evidence to deserve a look this week." },
  { level: "Critical", where: "Push or email candidate", when: "A change that is likely costing you customers or money right now." },
];

/** A four-step meter showing how far a level reaches, from quiet to urgent. */
function LevelTile({ index, where }: { index: number; where: string }) {
  return (
    <div className="w-full rounded-[14px] border border-ink bg-white p-3.5 text-left">
      <p className="text-[10px] leading-3 text-quiet">Where it goes</p>
      <p className="pt-1 text-[13px] font-semibold leading-4 text-ink">{where}</p>
      <div className="flex gap-1 pt-3" aria-hidden="true">
        {LEVEL_DOTS.map((color, i) => (
          <span key={color} className={`h-1.5 flex-1 rounded-full ${i <= index ? color : "bg-[#ececea]"}`} />
        ))}
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <>
      <PageIntro
        kicker="Product"
        title="Six surfaces. One question each."
        lead="Appfox avoids navigation built on raw datasets. There is no keywords tab, reviews tab, or revenue tab at the top level. Each surface answers something you actually ask about your app."
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="dark" size="lg">
            Start for free
          </ButtonLink>
          <ButtonLink href="#surfaces" variant="secondary" size="lg">
            See the surfaces
          </ButtonLink>
        </div>
      </PageIntro>

      <Section id="surfaces" className="scroll-mt-24 space-y-16 pt-4 lg:space-y-24 lg:pt-8">
        {surfaces.map((s, i) => (
          <Split
            key={s.name}
            reverse={i % 2 === 1}
            title={
              <>
                <span className="block font-mono text-[14px] font-medium uppercase leading-5 tracking-normal text-ink">
                  {String(i + 1).padStart(2, "0")} · {s.name}
                </span>
                <span className="block pt-3">{s.question}</span>
              </>
            }
            visual={<SceneFrame>{s.mock}</SceneFrame>}
          >
            <p>{s.body}</p>
          </Split>
        ))}
      </Section>

      <Section>
        <SectionHeading
          title="Not every change deserves a notification."
          lead="Each signal has a detection threshold, a minimum sample size, a cooldown, and a separate notification threshold. Alerts are driven by significance, not by events."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((l, i) => (
            <PanelCard key={l.level} visual={<LevelTile index={i} where={l.where} />} title={l.level} body={l.when} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <SectionHeading
            title="Concise by default. Deep when you ask."
            lead="Every finding opens the same way. You read the action first and drill into the evidence only as far as you need."
          />
          <OutlineCard className="p-0 sm:p-0">
            <ol>
              {[
                ["Recommendation", "One sentence you could act on today."],
                ["Why it matters", "The metric, review, release, or competitor movement behind it."],
                ["Evidence summary", "Counts, windows, denominators, and confidence."],
                ["Raw evidence", "The original reviews, listings, and metric observations."],
                ["Historical data", "The same facts over time, so you can judge the trend yourself."],
              ].map(([t, b], i) => (
                <li key={t} className="flex gap-5 border-b border-line px-6 py-5 last:border-b-0 sm:px-8">
                  <span className="font-mono text-[14px] leading-5 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <MonoLabel>{t}</MonoLabel>
                    <p className="pt-1 text-[16px] leading-[26px] text-muted">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </OutlineCard>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
