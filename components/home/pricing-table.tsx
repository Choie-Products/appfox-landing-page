"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ChevronDown, Info } from "lucide-react";
import Container from "@/components/ui/container";
import { APP_URL, CTA_HREF } from "@/lib/site";
import Reveal from "@/components/reveal";

type Cell = string | { text: string; tone: "muted" | "accent" };

export const plans = [
  {
    name: "Free",
    price: "$0",
    note: "per month",
    cta: "Start free",
    style: "outline",
  },
  {
    name: "Indie",
    price: "$29",
    note: "per month · $24 annual",
    cta: "Start Indie",
    style: "accent",
  },
  {
    name: "Studio",
    price: "$99",
    note: "per month · $79 annual",
    cta: "Start Studio",
    style: "dark",
  },
  {
    name: "Scale",
    price: "$299",
    note: "per month · $249 annual",
    cta: "Talk to us",
    style: "outline",
    href: "/contact",
  },
] as const;

const off: Cell = { text: "Off", tone: "muted" };
const none: Cell = { text: "—", tone: "muted" };
const yes: Cell = { text: "✓", tone: "accent" };

/**
 * One data point per row, each with a short explanation for the info tooltip.
 * `key` rows stay visible when the table is collapsed on the pricing page.
 */
const rows: { label: string; info: string; cells: Cell[]; key?: boolean }[] = [
  {
    label: "Seats",
    info: "People in your workspace. Owners, admins, and viewers each take a seat.",
    cells: ["1", "2", "5", "15"],
    key: true,
  },
  {
    label: "Owned apps",
    info: "Apps you publish and track as your own, with listing history, reviews, and releases.",
    cells: ["1", "3", "10", "30"],
    key: true,
  },
  {
    label: "Markets",
    info: "A market is one set of competitors in one store country and language.",
    cells: ["1", "3", "10", "Unlimited"],
    key: true,
  },
  {
    label: "Competitors per market",
    info: "Apps you confirm as direct or adjacent competitors in each market.",
    cells: ["5", "10", "25", "50"],
  },
  {
    label: "Evidence history",
    info: "How far back stored listings, reviews, ranks, and metrics stay available.",
    cells: ["30 days", "12 months", "Full", "Full"],
    key: true,
  },
  {
    label: "AI runs per month",
    info: "AI work such as review classification and brief writing. Each run is reserved before it starts and settled at actual cost.",
    cells: ["20", "200", "1,000", "5,000"],
    key: true,
  },
  {
    label: "Research briefs per month",
    info: "Saved briefs for new app ideas, written from real listings and reviews.",
    cells: ["1", "5", "Unlimited", "Unlimited"],
    key: true,
  },
  {
    label: "Brands monitored",
    info: "Competitor brands whose social posts and ads Appfox keeps watching.",
    cells: [off, "3", "10", "30"],
  },
  {
    label: "Monitoring refresh",
    info: "How often social posts and ads are checked for the brands you monitor.",
    cells: [none, "Weekly", "Weekly", "Daily ads"],
  },
  {
    label: "RevenueCat integration",
    info: "A read-only connection to your revenue, subscription, and trial metrics. Nothing is written back.",
    cells: [none, yes, yes, yes],
  },
  {
    label: "Verified competitor revenue",
    info: "Competitor revenue backed by a verified source, labeled with where it came from.",
    cells: [none, yes, yes, yes],
  },
  {
    label: "Replay sessions",
    info: "Completed, privacy-masked sessions recorded by the replay SDK in your own app.",
    cells: ["1,000", "10,000", "50,000", "250,000"],
  },
  {
    label: "Replay retention",
    info: "How long each replay session is kept before it is deleted along with its storage.",
    cells: ["7 days", "14 days", "30 days", "90 days"],
  },
  {
    label: "CSV export",
    info: "Download your workspace data as CSV files.",
    cells: [none, yes, yes, yes],
  },
  {
    label: "API access",
    info: "Programmatic access to your workspace data.",
    cells: [none, none, yes, yes],
  },
  {
    label: "Single sign-on",
    info: "Sign in through your company's identity provider.",
    cells: [none, none, none, yes],
  },
];

/** A small info button beside a feature name; hovering or focusing it shows what the feature means. */
function InfoTip({ label, text }: { label: string; text: string }) {
  const id = useId();
  return (
    <span className="group/tip relative ml-1.5 inline-flex align-[-3px]">
      <button
        type="button"
        aria-label={`About ${label}`}
        aria-describedby={id}
        className="flex size-5 items-center justify-center rounded-full text-[#a8a8a4] outline-none transition-colors hover:text-ink focus-visible:text-ink"
      >
        <Info className="size-3.5" strokeWidth={2} aria-hidden="true" />
      </button>
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none invisible absolute left-full top-1/2 z-30 ml-2 w-[240px] -translate-y-1/2 rounded-[12px] bg-ink px-3 py-2 text-left text-[13px] font-normal leading-[18px] text-white opacity-0 shadow-[0_12px_30px_-12px_rgba(17,17,17,0.45)] transition-opacity duration-150 group-focus-within/tip:visible group-focus-within/tip:opacity-100 group-hover/tip:visible group-hover/tip:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}

const ctaStyles = {
  outline: "bg-white text-ink hover:bg-ink hover:text-white",
  accent: "bg-accent text-white hover:bg-[#e94800]",
  dark: "bg-ink text-white hover:bg-black",
} as const;

export function PlanCta({ plan }: { plan: (typeof plans)[number] }) {
  const href = "href" in plan ? plan.href : CTA_HREF;
  const external = !("href" in plan) && Boolean(APP_URL);
  const classes = `mt-3.5 inline-block rounded-full px-4 py-[9px] text-[13px] font-semibold leading-4 transition-colors ${ctaStyles[plan.style]}`;
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {plan.cta}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {plan.cta}
    </Link>
  );
}

function CellText({ cell }: { cell: Cell }) {
  if (typeof cell === "string") {
    return (
      <span className="text-ink-soft">
        {cell}
      </span>
    );
  }
  return (
    <span className={cell.tone === "accent" ? "text-accent" : "text-[#999999]"}>
      {cell.text}
    </span>
  );
}

export default function PricingTable() {
  return (
    <section id="pricing" className="scroll-mt-20">
      <Container className="py-24 lg:py-40">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[520px]">
            <h2 className="text-display-md text-ink">
              Priced in the open. Start free, pay when you outgrow it.
            </h2>
            <p className="label-mono pt-3">
              Proposed plans · monthly, annual in brackets
            </p>
          </div>
          <p className="max-w-[480px] text-[16px] leading-[26px] text-muted">
            Every plan has the same evidence ledger and the same read-only
            boundary. The tiers change how much you can watch, how far back you
            can look, and how many people can look with you.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <PricingGrid />
        </Reveal>
      </Container>
    </section>
  );
}

/** The plan comparison table with the raised Indie column. Shared by the homepage and the pricing page. */
export function PricingGrid({
  className = "pt-[68px] lg:pt-[92px]",
  collapsible = false,
  fits,
}: {
  className?: string;
  /** Start with only the key rows and offer a button to show every comparison. */
  collapsible?: boolean;
  /** Optional one-line fit shown under each plan name. */
  fits?: Record<string, string>;
}) {
  const [expanded, setExpanded] = useState(!collapsible);
  const visible = expanded ? rows : rows.filter((r) => r.key);
  const hidden = rows.length - rows.filter((r) => r.key).length;
  return (
    <>
      <div
        className={`-mx-5 overflow-x-auto px-5 pb-10 sm:-mx-8 sm:px-8 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0 ${className}`}
      >
        <div className="relative min-w-[920px]">
          {/* Raised soft gray panel behind the Indie column (second plan column), drawn under the table */}
          <div
            aria-hidden="true"
            className="absolute -top-7 bottom-5 left-[calc(260px_+_(100%_-_260px)_/_4)] w-[calc((100%_-_260px)_/_4)] soft-surface rounded-[24px] lg:left-[calc(360px_+_(100%_-_360px)_/_4)] lg:w-[calc((100%_-_360px)_/_4)]"
          />
          <table className="relative w-full table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[260px] lg:w-[360px]" />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr className="border-b border-line align-bottom">
                <th scope="col" className="label-mono pb-[18px] font-normal">
                  Plan
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    scope="col"
                    className="px-6 pb-[18px] font-normal align-bottom"
                  >
                    <span className="flex items-center gap-2 text-[16px] font-semibold leading-5 text-ink">
                      {plan.name}
                    </span>
                    {fits?.[plan.name] ? (
                      <span className="block min-h-9 pt-1 text-[13px] leading-[18px] text-muted">
                        {fits[plan.name]}
                      </span>
                    ) : null}
                    <span className="block pt-2 text-[28px] font-semibold leading-[34px] tracking-[-0.03em] text-ink">
                      {plan.price}
                    </span>
                    <span className="block pt-0.5 font-mono text-[11px] leading-[14px] text-quiet">
                      {plan.note}
                    </span>
                    <PlanCta plan={plan} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody id="pricing-rows">
              {visible.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-line text-[16px] leading-[22px]"
                >
                  <th scope="row" className="py-3.5 pr-6 font-normal text-ink">
                    {row.label}
                    <InfoTip label={row.label} text={row.info} />
                  </th>
                  {row.cells.map((cell, i) => (
                    <td key={i} className="px-6 py-3.5">
                      <CellText cell={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={5}
                  className="pt-5 text-[12px] leading-4 text-quiet"
                >
                  All plans: read-only integrations, row-level isolation,
                  evidence on every finding
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {collapsible ? (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="pricing-rows"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            {expanded
              ? "Show fewer comparisons"
              : `Show all comparisons (${hidden} more)`}
            <ChevronDown
              className={`size-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              strokeWidth={2.2}
              aria-hidden="true"
            />
          </button>
        </div>
      ) : null}
    </>
  );
}
