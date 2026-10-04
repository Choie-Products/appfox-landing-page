"use client";

import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Info } from "lucide-react";
import { APP_URL, CTA_HREF } from "@/lib/site";
import type { Cell, Plan, PlanRow } from "@/content/plans";

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
  outline: "k3d k3d-light text-ink",
  accent: "k3d k3d-accent text-white",
  dark: "k3d k3d-dark text-white",
} as const;

function PlanCta({ plan }: { plan: Plan }) {
  const href = plan.href ?? CTA_HREF;
  const external = !plan.href && Boolean(APP_URL);
  const classes = `mt-3.5 inline-block rounded-full px-4 py-[9px] text-[13px] font-semibold leading-4 ${ctaStyles[plan.style]}`;
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

/** Where the plan row sticks: just under the floating header (which ends at 60px), with a little air. */
const STICKY_TOP = 72;

/** The plan comparison table with the raised Indie column. Takes only the plans to show. */
export default function PricingGrid({
  plans,
  rows,
  className = "pt-[68px] lg:pt-[92px]",
  collapsible = false,
  showFits = false,
}: {
  plans: Plan[];
  rows: PlanRow[];
  className?: string;
  /** Start with only the key rows and offer a button to show every comparison. */
  collapsible?: boolean;
  /** Show each plan's one-line fit under its name. */
  showFits?: boolean;
}) {
  const [expanded, setExpanded] = useState(!collapsible);
  const visible = expanded ? rows : rows.filter((r) => r.key);
  const hidden = rows.length - rows.filter((r) => r.key).length;

  /*
   * On large screens the plan row sticks under the floating header while the rows scroll. Once it is stuck
   * it gets the page background (with a band reaching up behind the header) and a soft edge below.
   */
  const sentinel = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      setStuck(el.getBoundingClientRect().top < STICKY_TOP);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  const headCell = (indie: boolean) =>
    `lg:sticky lg:top-[72px] lg:z-20 ${
      stuck
        ? `${indie ? "lg:bg-[#fbfbfa]" : "lg:bg-paper"} lg:shadow-[inset_0_-1px_0_var(--line),0_14px_18px_-14px_rgba(17,17,17,0.14)] lg:before:absolute lg:before:inset-x-0 lg:before:bottom-full lg:before:h-[72px] lg:before:bg-paper lg:before:content-['']`
        : ""
    }`;

  return (
    <>
      <div
        className={`-mx-5 overflow-x-auto px-5 pb-10 sm:-mx-8 sm:px-8 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0 ${className}`}
      >
        <div className="relative min-w-[920px]">
          <div ref={sentinel} aria-hidden="true" className="absolute inset-x-0 top-0 h-px" />
          {/* Raised soft gray panel behind the Indie column (second plan column), drawn under the table */}
          <div
            aria-hidden="true"
            style={{ "--plans": plans.length } as CSSProperties}
            className="absolute -top-7 bottom-5 left-[calc(260px_+_(100%_-_260px)_/_var(--plans))] w-[calc((100%_-_260px)_/_var(--plans))] soft-surface rounded-[24px] lg:left-[calc(360px_+_(100%_-_360px)_/_var(--plans))] lg:w-[calc((100%_-_360px)_/_var(--plans))]"
          />
          <table className="relative w-full table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[260px] lg:w-[360px]" />
              {plans.map((plan) => (
                <col key={plan.name} />
              ))}
            </colgroup>
            <thead>
              <tr className="border-b border-line align-bottom">
                <th scope="col" className={`label-mono pb-[18px] pt-4 font-normal ${headCell(false)}`}>
                  Plan
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    scope="col"
                    className={`px-6 pb-[18px] pt-4 font-normal align-bottom ${headCell(plan.name === "Indie")}`}
                  >
                    <span className="flex items-center gap-2 text-[16px] font-semibold leading-5 text-ink">
                      {plan.name}
                    </span>
                    {showFits ? (
                      <span className="block min-h-9 pt-1 text-[13px] leading-[18px] text-muted">
                        {plan.fit}
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
                  colSpan={plans.length + 1}
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
            className="k3d k3d-light inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-semibold text-ink"
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
