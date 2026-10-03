import CtaBand from "@/components/cta-band";
import { PageJsonLd } from "@/components/json-ld";
import Image from "next/image";
import { ChartLine, Github, ListTodo, Play, Store } from "lucide-react";
import AppleLogo from "@/components/apple-logo";
import { ConnectionArt } from "@/components/home/journey-art";
import { LedgerPlateArt } from "@/components/home/ledger";
import { CheckList, Section, Split } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/button";
import PageIntro from "@/components/ui/page-intro";
import SceneFrame from "@/components/ui/scene-frame";
import { APP_URL, CTA_HREF } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/reveal";

const PAGE = {
  path: "/integrations",
  title: "Integrations: RevenueCat, App Store & Google Play",
  description:
    "Appfox integrations are read-only by default. Public App Store and Google Play data from day one, RevenueCat for revenue and subscriptions, and a roadmap for App Store Connect, Google Play Console, GitHub, and analytics.",
};

export const metadata = pageMetadata(PAGE);

/* The connection map: launch sources join the ledger with flowing orange lines, planned ones with gray. */
const ROW = 80;
const GAP = 16;
const MAP_HEIGHT = ROW * 5 + GAP * 4;
const rowCenter = (i: number) => i * (ROW + GAP) + ROW / 2;
const LAUNCH_Y = [(rowCenter(0) + rowCenter(1)) / 2, (rowCenter(3) + rowCenter(4)) / 2];
const LATER_Y = [0, 1, 2, 3, 4].map(rowCenter);
const MID_Y = MAP_HEIGHT / 2;

const LAUNCH_NODES = [
  { name: "App Store and Google Play", meta: "Public listings, reviews, and ranks", icon: <Store className="size-4" strokeWidth={1.9} /> },
  {
    name: "RevenueCat",
    meta: "Revenue, subscriptions, trials",
    icon: <Image src="/icons/revenuecat.jpg" alt="" width={36} height={36} className="size-9 rounded-[28%]" />,
    bare: true,
  },
];

/** Row placement for the planned column on large screens only, so phones keep the source order. */
const LATER_ROWS = ["lg:row-start-1", "lg:row-start-2", "lg:row-start-3", "lg:row-start-4", "lg:row-start-5"];

const LATER_NODES = [
  { name: "App Store Connect", Icon: AppleLogo },
  { name: "Google Play Console", Icon: Play },
  { name: "GitHub", Icon: Github },
  { name: "Product analytics", Icon: ChartLine },
  { name: "Linear and Notion", Icon: ListTodo },
];

function ConnectionMap() {
  return (
    <div className="relative mt-10 grid gap-5 lg:mt-16 lg:h-[464px] lg:grid-cols-[minmax(0,1fr)_300px_minmax(0,1fr)] lg:grid-rows-5 lg:gap-x-16 lg:gap-y-4">
      <svg
        viewBox={`0 0 1000 ${MAP_HEIGHT}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        aria-hidden="true"
      >
        {LAUNCH_Y.map((y, i) => (
          <path
            key={`l${y}`}
            d={`M250 ${y} C 400 ${y}, 380 ${MID_Y}, 500 ${MID_Y}`}
            fill="none"
            stroke="#fe5000"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="ledger-flow"
            style={{ animationDuration: i ? "1.2s" : "0.95s" }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {LATER_Y.map((y) => (
          <path
            key={`r${y}`}
            d={`M750 ${y} C 600 ${y}, 620 ${MID_Y}, 500 ${MID_Y}`}
            fill="none"
            stroke="#c8c8c4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="2 9"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* At launch */}
      {LAUNCH_NODES.map((node, i) => (
        <div
          key={node.name}
          className={`soft-card relative z-10 flex items-center gap-3 rounded-[22px] p-4 lg:col-start-1 ${
            i === 0 ? "lg:row-span-2 lg:row-start-1" : "lg:row-span-2 lg:row-start-4"
          } lg:self-center`}
        >
          {"bare" in node ? (
            <span className="shrink-0">{node.icon}</span>
          ) : (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e9e9e7] text-[#8a8a87] shadow-[inset_0_2px_3px_rgba(17,17,17,0.08),0_1px_0_#ffffff]">
              {node.icon}
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[13px] font-medium uppercase leading-5 text-ink">{node.name}</span>
            <span className="block text-[14px] leading-5 text-muted">{node.meta}</span>
          </span>
          <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold leading-3 text-accent-ink">
            Launch
          </span>
        </div>
      ))}

      {/* The ledger */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center lg:col-start-2 lg:row-span-5 lg:row-start-1 lg:self-center">
        <LedgerPlateArt uid="integrations-ledger" className="h-auto w-full max-w-[300px]" />
        <div className="lg:absolute lg:inset-x-0 lg:top-full">
          <p className="pt-2 font-mono text-[14px] font-medium uppercase leading-5 text-ink">One ledger</p>
          <p className="pt-2 text-[15px] leading-[22px] text-muted">
            Every connection is read-only. Nothing is written back.
          </p>
        </div>
      </div>

      {/* Planned */}
      {LATER_NODES.map(({ name, Icon }, i) => (
        <div
          key={name}
          className={`soft-card relative z-10 flex items-center gap-3 rounded-[20px] px-4 py-3 lg:col-start-3 ${LATER_ROWS[i]}`}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e9e9e7] text-[#8a8a87] shadow-[inset_0_2px_3px_rgba(17,17,17,0.08),0_1px_0_#ffffff]">
            <Icon className="size-4" strokeWidth={1.9} />
          </span>
          <span className="flex-1 font-mono text-[13px] font-medium uppercase leading-5 text-ink">{name}</span>
          <span className="shrink-0 rounded-full bg-[#ececea] px-2.5 py-1 text-[11px] font-semibold leading-3 text-quiet">
            Later
          </span>
        </div>
      ))}
    </div>
  );
}

export default function IntegrationsPage() {
  return (
    <>
      <PageJsonLd path={PAGE.path} name={PAGE.title} description={PAGE.description} />
      <PageIntro
        kicker="Integrations"
        title="Useful without a connection. Better with one."
        lead="Appfox works as a public market-research product on its own. Each connection you add is optional, clearly permissioned, and read-only by default."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="dark" size="hero">
            Start for free
          </ButtonLink>
          <ButtonLink href="#connections" variant="secondary" size="hero">
            See connections
          </ButtonLink>
        </div>
      </PageIntro>

      <Section className="pt-4 lg:pt-8">
        <Split
          title="Every connection card"
          sub="shows exactly what it reads."
          visual={
            <SceneFrame>
              <ConnectionArt />
            </SceneFrame>
          }
        >
          <CheckList
            items={[
              "The data Appfox reads",
              "The permissions requested",
              "Last successful sync and current sync status",
              "Usage against the provider's rate limits",
              "Whether Appfox can write anything. At launch, it cannot.",
              "A disconnect control",
            ]}
          />
          <p>
            Adding a public store URL is a declaration, not proof of ownership. Private resources are bound only after
            server-side authorization through the connected account, and mismatched bindings are rejected.
          </p>
        </Split>
      </Section>

      <Section id="connections" className="scroll-mt-24">
        <SectionHeading
          align="center"
          title="Two sources at launch."
          sub="More once they prove useful."
          lead="Public store data and RevenueCat feed the same ledger from day one. The rest are designed and sequenced after the launch journeys."
        />
        <Reveal variant="scale" delay={100}>
          <ConnectionMap />
        </Reveal>
      </Section>

      <CtaBand
        title="Start with public data. Connect when you are ready."
        lead="Store data works from day one. RevenueCat is available on Indie and above, always read-only."
      />
    </>
  );
}
