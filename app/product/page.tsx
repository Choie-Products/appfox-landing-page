import CtaBand from "@/components/cta-band";
import { PageJsonLd } from "@/components/json-ld";
import {
  CompetitorsArt,
  MyAppArt,
  OperateArt,
  OutcomeArt,
  RevenueArt,
  ThemesArt,
} from "@/components/home/journey-art";
import { MonoLabel, MonoLink, SoftCard, PanelCard, Section, Split } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/button";
import PageIntro from "@/components/ui/page-intro";
import SceneFrame from "@/components/ui/scene-frame";
import { APP_URL, CTA_HREF } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import SectionHeading from "@/components/ui/section-heading";

const PAGE = {
  path: "/product",
  title: "App Intelligence for Research, Reviews & Competitor Tracking",
  description:
    "Explore Appfox's research briefs, daily findings, review themes, and competitor and rank tracking. See how the private beta helps you choose what to build next.",
};

export const metadata = pageMetadata(PAGE);

const surfaces = [
  {
    id: "today",
    name: "Today",
    question: "What needs my attention?",
    body: "A ranked list of significant findings with evidence, freshness, coverage, and a next action. Sections for critical, important, opportunities, recent changes, and resolved outcomes. Zero findings is a valid state, and it is distinguished from not enough data and from a failed sync.",
    mock: <OperateArt />,
  },
  {
    id: "market",
    name: "Market",
    question: "Who is out there, and what is changing?",
    body: "Choose the market you want to understand, review direct and adjacent competitors, and open a research brief. Compare collected listings, prices, ratings, and reviews. Saved observations let you see changes over time; coverage depends on the store, market, and collection history.",
    mock: <CompetitorsArt />,
  },
  {
    id: "customers",
    name: "Customers",
    question: "What are people telling us?",
    body: "Open Customers to see recurring praise, friction, and requests in collected reviews. Follow a theme into the review browser and filter by market, sentiment, rating, or reason. Check the sampled and classified review counts before treating a theme as representative of all your users.",
    mock: <ThemesArt />,
  },
  {
    id: "my-app",
    name: "My App",
    question: "How is my app doing, across sources?",
    body: "Your app in one place: public store identity, listing history, customer evidence, and release context. RevenueCat metrics are planned and unavailable in the current beta. The aim is to connect the evidence around your app, with the source and scope clear.",
    mock: <MyAppArt />,
  },
  {
    id: "actions",
    name: "Actions",
    question: "What did we decide, and did it help?",
    body: "Keep a decision close to the research that led to it. Research briefs let you record a decision and follow up on suggested actions. Write down what you will test and how you will judge the result. A change in reviews or rank is evidence to investigate, not proof that your release caused it.",
    mock: <OutcomeArt />,
  },
  {
    id: "integrations",
    name: "Integrations",
    question: "What does Appfox read, and can it write?",
    body: "The beta uses public store data. Private connections, including RevenueCat, are planned. Connection cards are designed to show what is read, permissions, sync status, usage limits, and a disconnect control. Private integrations are intended to be read-only.",
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
    <div className="soft-panel w-full rounded-[14px] p-3.5 text-left">
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
      <PageJsonLd path={PAGE.path} name={PAGE.title} description={PAGE.description} />
      <PageIntro
        kicker="Product"
        title="Six questions. A clearer view of your app."
        lead="Appfox is an app intelligence platform for research and day-to-day decisions. The beta navigation brings together Dashboard, Customers, Market, Keywords, and Settings. The six areas below explain the questions it helps you answer, including what is still planned."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="dark" size="hero">
            Request access
          </ButtonLink>
          <ButtonLink href="#surfaces" variant="secondary" size="hero">
            Explore the product
          </ButtonLink>
        </div>
        <MonoLink href="/how-it-works">Follow the product walkthrough</MonoLink>
      </PageIntro>

      <Section id="surfaces" className="scroll-mt-24 space-y-24 pt-4 lg:space-y-40 lg:pt-8">
        {surfaces.map((s, i) => (
          <div key={s.name} id={s.id} className="scroll-mt-28">
          <Split
            reverse={i % 2 === 1}
            title={
              <>
                <span className="label-mono block pb-4 text-ink">
                  {String(i + 1).padStart(2, "0")} · {s.name}
                </span>
                {s.name}:
              </>
            }
            sub={s.question}
            visual={<SceneFrame>{s.mock}</SceneFrame>}
          >
            <p>{s.body}</p>
          </Split>
          </div>
        ))}
      </Section>

      <Section>
        <SectionHeading
          title="Not every change"
          sub="deserves a notification."
          lead="Each signal has a detection threshold, a minimum sample size, a cooldown, and a separate notification threshold. Alerts are driven by significance, not by events."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((l, i) => (
            <PanelCard key={l.level} delay={i * 90} visual={<LevelTile index={i} where={l.where} />} title={l.level} body={l.when} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <SectionHeading
            title="Concise by default."
            sub="Deep when you ask."
            lead="Every finding opens the same way. You read the action first and drill into the evidence only as far as you need."
          />
          <SoftCard className="p-0 sm:p-0">
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
          </SoftCard>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
