/**
 * The plans and the comparison rows behind the pricing table. This module only runs on the
 * server: the table receives just the plans that are shown, so a hidden plan never reaches
 * the page, its HTML, or the JavaScript sent to the browser.
 */

export type Cell = string | { text: string; tone: "muted" | "accent" };

export type Plan = {
  name: string;
  price: string;
  note: string;
  /** One-line fit shown under the plan name on the pricing page. */
  fit: string;
  cta: string;
  style: "outline" | "accent" | "dark";
  /** Where the button goes, when it is not the app sign-up. */
  href?: string;
  /** Kept in the data but left off the site. */
  hidden?: boolean;
};

export type PlanRow = {
  label: string;
  /** A short explanation for the info tooltip. */
  info: string;
  /** One cell per plan, in the same order as the plans. */
  cells: Cell[];
  /** Stays visible when the table is collapsed on the pricing page. */
  key?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    note: "per month",
    fit: "Proposed entry plan for your first app.",
    cta: "Request access",
    style: "outline",
  },
  {
    name: "Indie",
    price: "$29",
    note: "monthly · $24/mo billed yearly",
    fit: "For a solo founder with a few apps.",
    cta: "Request access",
    style: "accent",
  },
  {
    name: "Studio",
    price: "$99",
    note: "monthly · $79/mo billed yearly",
    fit: "For a small studio across several apps.",
    cta: "Request access",
    style: "dark",
  },
  {
    name: "Scale",
    price: "$299",
    note: "per month · $249 annual",
    fit: "For teams running many apps and markets.",
    cta: "Talk to us",
    style: "outline",
    href: "/contact",
    // Not offered on the site for now.
    hidden: true,
  },
];

const off: Cell = { text: "Off", tone: "muted" };
const none: Cell = { text: "—", tone: "muted" };
const yes: Cell = { text: "✓", tone: "accent" };

/**
 * One data point per row, each with a short explanation for the info tooltip.
 * `key` rows stay visible when the table is collapsed on the pricing page.
 */
const ROWS: PlanRow[] = [
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
    info: "Proposed brand monitoring for social posts and ads. This capability is not confirmed for the current beta.",
    cells: [off, "3", "10", "30"],
  },
  {
    label: "Monitoring refresh",
    info: "Proposed refresh intervals for brand monitoring. These are not current beta service commitments.",
    cells: [none, "Weekly", "Weekly", "Daily ads"],
  },
  {
    label: "RevenueCat (planned)",
    info: "Planned, not available in the current beta: a read-only connection to revenue, subscription, and trial metrics.",
    cells: [none, yes, yes, yes],
  },
  {
    label: "Verified competitor revenue",
    info: "Proposed verified competitor revenue with a cited source. Availability is not confirmed for the current beta.",
    cells: [none, yes, yes, yes],
  },
  {
    label: "Replay sessions (planned)",
    info: "Planned, not available in the current beta. The table shows proposed limits for completed, privacy-masked sessions.",
    cells: ["1,000", "10,000", "50,000", "250,000"],
  },
  {
    label: "Replay retention",
    info: "Proposed retention for planned session replay. Replay is not available in the current beta.",
    cells: ["7 days", "14 days", "30 days", "90 days"],
  },
  {
    label: "CSV export",
    info: "Proposed CSV downloads for workspace data. Availability is not confirmed for the current beta.",
    cells: [none, yes, yes, yes],
  },
  {
    label: "API access (planned)",
    info: "Planned, not available in the current beta: programmatic access to workspace data.",
    cells: [none, none, yes, yes],
  },
  {
    label: "Single sign-on",
    info: "Sign in through your company's identity provider.",
    cells: [none, none, none, yes],
  },
];

const shownIndexes = PLANS.flatMap((plan, i) => (plan.hidden ? [] : [i]));

/** The plans shown on the site, in order. */
export const SHOWN_PLANS = shownIndexes.map((i) => PLANS[i]);

/**
 * The rows with only the shown plans' cells. A row that no shown plan offers is left out,
 * since it would read as all dashes.
 */
export const SHOWN_ROWS: PlanRow[] = ROWS.map((row) => ({
  ...row,
  cells: shownIndexes.map((i) => row.cells[i]),
})).filter((row) => row.cells.some((cell) => typeof cell === "string" || cell.tone !== "muted"));
