/**
 * Glossary: short, quotable definitions for the terms behind Appfox, written for people
 * and for answer engines. Each term has a one-sentence definition, a longer explanation,
 * and a note on how Appfox handles it.
 */

export type Term = {
  slug: string;
  term: string;
  /** The H1, phrased as the question people type. */
  question: string;
  /** One sentence, written to be quoted. */
  definition: string;
  metaTitle: string;
  paragraphs: string[];
  /** How Appfox approaches the term, as short items. */
  inAppfox: string[];
  related: string[];
  links: { label: string; href: string }[];
};

export const terms: Term[] = [
  {
    slug: "app-tracker",
    question: "What is an app tracker?",
    term: "App tracker",
    metaTitle: "What Is an App Tracker? Definition for Mobile Apps",
    definition:
      "An app tracker is a tool that monitors a mobile app's public and private signals, such as reviews, rankings, releases, revenue, and competitors, and reports when they change.",
    paragraphs: [
      "The phrase is used for several unrelated things. A phone's screen-time feature tracks which apps you use. A package tracker follows a parcel. In the mobile app business, an app tracker is a tool a developer or publisher uses to watch an app on the App Store or Google Play: its store listing, search rank, ratings and reviews, release history, and sometimes its revenue, alongside the apps it competes with.",
      "Early app trackers were dashboards: they pulled numbers into charts and left the reading to you. The current generation adds detection and explanation. A deterministic signal notices that a review theme rose or a competitor changed price, and an AI layer explains the change in plain language with the evidence attached.",
      "A good app tracker is judged on three things: coverage (which stores, which signals, which competitors), honesty (whether every number shows its window and sample), and whether it tells you what deserves attention rather than making you look.",
    ],
    inAppfox: [
      "Reads reviews, rankings, releases, revenue, and competitors every day for the App Store and Google Play",
      "Ranks what changed on one feed, with the evidence attached and a quiet day reported as quiet",
      "Never writes to a store or provider; it drafts, you decide",
    ],
    related: ["mobile-app-intelligence", "app-review-monitoring", "competitor-tracking"],
    links: [
      { label: "Product overview", href: "/product" },
      { label: "Operate a live app", href: "/live-app" },
    ],
  },
  {
    slug: "mobile-app-intelligence",
    question: "What is mobile app intelligence?",
    term: "Mobile app intelligence",
    metaTitle: "What Is Mobile App Intelligence? Definition",
    definition:
      "Mobile app intelligence is the practice of joining outside-in signals (competitors, rankings, reviews, pricing, new entrants) with inside-out signals (revenue, conversion, releases, customer feedback) to decide what an app team should do next.",
    paragraphs: [
      "Market intelligence tools estimate the size and shape of a category: downloads, revenue, and share for thousands of apps. Analytics tools report what is happening inside your own app. Mobile app intelligence sits between them: it is specific to your app and your confirmed competitors, and it exists to produce decisions rather than reports.",
      "The category includes App Store Optimization as one workflow, but it is wider. A review theme that rose after a release, a trial conversion drop that followed a competitor's price cut, or a rank acceleration after a subtitle change are all intelligence findings, and none of them lives in a keyword tool.",
      "The standard that matters is decision usefulness: does the tool lead to better decisions with less work, both before you build and after you launch?",
    ],
    inAppfox: [
      "Four layers: facts stored once, deterministic signals, AI insights that cite their evidence, and recorded outcomes",
      "Six surfaces organized by question: Today, Market, Customers, My App, Actions, Integrations",
      "Two journeys in one workspace: research an idea, operate a live app",
    ],
    related: ["app-tracker", "app-store-optimization", "competitor-tracking"],
    links: [
      { label: "About Appfox", href: "/about" },
      { label: "Product overview", href: "/product" },
    ],
  },
  {
    slug: "app-store-optimization",
    question: "What is App Store Optimization (ASO)?",
    term: "App Store Optimization (ASO)",
    metaTitle: "What Is App Store Optimization (ASO)? Definition",
    definition:
      "App Store Optimization (ASO) is the work of improving an app's visibility and conversion on the App Store and Google Play through its title, subtitle, keywords, screenshots, ratings, and reviews.",
    paragraphs: [
      "ASO has two halves. Visibility is whether people find the app: search rank for the queries that matter, featuring, and category rank. Conversion is whether people who find it install it: the listing's screenshots, copy, ratings, and recent reviews.",
      "Dedicated ASO tools such as AppTweak and Appfigures specialize in keyword research, volume estimates, and rank tracking across thousands of keywords. That depth is valuable for growth teams and often more than an indie founder needs.",
      "ASO is one workflow inside a wider operation. A listing change should be read against the reviews and rank movements that followed it, and a rank drop against the competitor change or release that preceded it.",
    ],
    inAppfox: [
      "Tracked search queries with current and previous rank, for you and your competitors",
      "Listing history, so a rank movement can be read against a subtitle or screenshot change",
      "Store copy drafted from evidence, never submitted for you. No search volume estimates",
    ],
    related: ["app-tracker", "competitor-tracking", "mobile-app-intelligence"],
    links: [
      { label: "App Store rank tracking", href: "/solutions/app-store-rank-tracking" },
      { label: "Appfox vs AppTweak", href: "/compare/apptweak" },
    ],
  },
  {
    slug: "app-review-monitoring",
    question: "What is app review monitoring?",
    term: "App review monitoring",
    metaTitle: "What Is App Review Monitoring? Definition",
    definition:
      "App review monitoring is the continuous collection and analysis of App Store and Google Play reviews to detect changes in what customers are saying, usually by grouping reviews into themes and measuring how each theme moves over time.",
    paragraphs: [
      "The simplest form is a feed: every new review, in order, with an alert for low ratings. The useful form adds structure: reviews grouped into themes such as pricing, sync, or crashes, each with a count, a share of reviews, a trend, and the versions it affects.",
      "Sentiment analysis is a common component. It assigns each review a positive, negative, or neutral score. Scores are easy to chart and hard to act on; a theme with an exact count and the original reviews behind it is what a product decision needs.",
      "Review monitoring is most valuable when it is read together with releases. A theme that rose after a specific version is a finding; the same theme in isolation is a number.",
    ],
    inAppfox: [
      "Themes with total mentions, share of reviews, trend, rating distribution, and affected versions",
      "Every count links back to the original review text; small samples show individual reviews instead of percentages",
      "Negative review spikes ranked on Today next to the release they followed",
    ],
    related: ["app-tracker", "mobile-app-intelligence"],
    links: [
      { label: "App review monitoring in Appfox", href: "/solutions/app-review-monitoring" },
      { label: "Appfox vs Appbot", href: "/compare/appbot" },
    ],
  },
  {
    slug: "competitor-tracking",
    question: "What is competitor tracking for apps?",
    term: "Competitor tracking (for apps)",
    metaTitle: "What Is App Competitor Tracking? Definition",
    definition:
      "Competitor tracking for mobile apps is the ongoing recording of competing apps' store listings, prices, ratings, reviews, rankings, and releases, kept as history so that changes can be seen and dated.",
    paragraphs: [
      "A competitor set is a decision, not a search result. The useful version starts with discovery across store search, similar-app relationships, and overlapping review language, then asks you to confirm which apps really compete and whether each is direct or adjacent.",
      "History is what separates tracking from checking. A snapshot shows today's price and screenshots; a tracked history shows that the price changed twice this quarter and the subtitle was rewritten after a major release.",
      "Competitor reviews are the overlooked half. Grouped into the same themes as your own, they show where a competitor is weak and which complaints are shared across the market.",
    ],
    inAppfox: [
      "Confirmed direct and adjacent competitors in an editable market scope",
      "Listing, price, rating, and release history, append-only and never backdated",
      "Competitor review themes with exact counts next to your own",
    ],
    related: ["app-tracker", "app-store-optimization", "mobile-app-intelligence"],
    links: [
      { label: "Competitor tracking in Appfox", href: "/solutions/app-store-competitor-tracking" },
      { label: "Market surface", href: "/product#market" },
    ],
  },
  {
    slug: "mobile-session-replay",
    question: "What is mobile session replay?",
    term: "Mobile session replay",
    metaTitle: "What Is Mobile Session Replay? Definition",
    definition:
      "Mobile session replay is a recording of what a user did in a mobile app, reconstructed from screen snapshots and interaction events so a developer can watch a completed session without seeing what the user typed.",
    paragraphs: [
      "Web session replay records the DOM. Mobile replay has to work differently: an SDK inside the app captures native view snapshots and an event timeline, masks sensitive content on the device, and uploads completed sessions for playback.",
      "The privacy design is the product. Consent, a visible recording indicator, on-device masking of text inputs and marked views, bounded storage, sampling, a remote kill switch, and real deletion are what separate replay from surveillance.",
      "Replay answers a narrow question well: what did this person actually do? It does not replace analytics, and it should not record keyboard values, audio, or request bodies.",
    ],
    inAppfox: [
      "A first-party SDK for React Native and Expo on iOS and Android, snapshots and events rather than video",
      "Masking on the device before anything leaves it; no keyboard values, audio, or request bodies",
      "On every plan, starting with 1,000 sessions and 7-day retention on Free",
    ],
    related: ["app-tracker", "mobile-app-intelligence"],
    links: [
      { label: "Mobile session replay in Appfox", href: "/replay" },
      { label: "Security", href: "/security" },
    ],
  },
];

export function getTerm(slug: string) {
  return terms.find((t) => t.slug === slug);
}
