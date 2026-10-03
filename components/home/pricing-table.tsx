"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/container";
import { APP_URL, CTA_HREF } from "@/lib/site";

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

/** `key` rows stay visible when the table is collapsed on the pricing page. */
const rows: { label: string; cells: Cell[]; bold?: boolean; key?: boolean }[] =
  [
    { label: "Seats", cells: ["1", "2", "5", "15"], key: true },
    { label: "Owned apps", cells: ["1", "3", "10", "30"], key: true },
    { label: "Markets", cells: ["1", "3", "10", "Unlimited"], key: true },
    { label: "Competitors per market", cells: ["5", "10", "25", "50"] },
    {
      label: "Evidence history",
      cells: ["30 days", "12 months", "Full", "Full"],
      key: true,
    },
    {
      label: "Social and ads monitoring",
      cells: [
        off,
        "3 brands, weekly",
        "10 brands, weekly",
        "30 brands, daily ads",
      ],
    },
    {
      label: "RevenueCat and verified competitor revenue",
      cells: [none, yes, yes, yes],
    },
    {
      label: "AI runs / research briefs per month",
      cells: ["20 / 1", "200 / 5", "1,000 / unlimited", "5,000 / unlimited"],
      key: true,
    },
    {
      label: "Replay sessions / retention",
      cells: [
        "1,000 / 7 days",
        "10,000 / 14 days",
        "50,000 / 30 days",
        "250,000 / 90 days",
      ],
      bold: true,
    },
    {
      label: "Export, API, SSO",
      cells: [none, "CSV export", "API", "API and SSO"],
    },
  ];

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

function CellText({ cell, bold }: { cell: Cell; bold?: boolean }) {
  if (typeof cell === "string") {
    return (
      <span className={bold ? "font-semibold text-ink" : "text-ink-soft"}>
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
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
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
        </div>

        <PricingGrid />
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
          {/* Raised white panel behind the Indie column (second plan column), drawn under the table */}
          <div
            aria-hidden="true"
            className="absolute -top-7 bottom-5 left-[calc(260px_+_(100%_-_260px)_/_4)] w-[calc((100%_-_260px)_/_4)] rounded-[24px] bg-white shadow-[0_28px_60px_-30px_rgba(17,17,17,0.35),0_2px_6px_-2px_rgba(17,17,17,0.06)] lg:left-[calc(360px_+_(100%_-_360px)_/_4)] lg:w-[calc((100%_-_360px)_/_4)]"
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
                  <th
                    scope="row"
                    className={`py-3.5 pr-6 text-ink ${row.bold ? "font-semibold" : "font-normal"}`}
                  >
                    {row.label}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td key={i} className="px-6 py-3.5">
                      <CellText cell={cell} bold={row.bold} />
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
