/**
 * Intent landing pages: one per search intent, written to answer the question a person
 * typed before it sells anything. Each page is a real piece of writing; the template only
 * sets the layout. Visuals are picked by key in the route.
 */

export type ArtKey = "operate" | "themes" | "competitors" | "research" | "revenue" | "ranks";

export type Solution = {
  slug: string;
  /** The query cluster, used in the H1. */
  title: string;
  metaTitle: string;
  description: string;
  kicker: string;
  lead: string;
  art: ArtKey;
  /** The problem, in two or three short paragraphs. */
  problem: { title: string; sub: string; paragraphs: string[] };
  /** How Appfox does it, as numbered steps. */
  how: { title: string; sub: string; steps: { t: string; b: string }[] };
  /** What you get, as checklist items. */
  get: { title: string; sub: string; items: string[] };
  /** What Appfox refuses to claim on this topic. */
  wont: { title: string; sub: string; items: string[] };
  faq: { q: string; a: string }[];
  related: { label: string; href: string }[];
  cta: { title: string; lead: string };
};

export const solutions: Solution[] = [
  {
    slug: "app-review-monitoring",
    title: "App review monitoring",
    metaTitle: "App Review Monitoring Tool for iOS & Android",
    description:
      "Monitor App Store and Google Play reviews with AI. Appfox groups reviews into themes with exact counts, links every number to the customer's words, and tells you which theme moved after which release.",
    kicker: "App review monitoring",
    lead: "Appfox reads every new App Store and Google Play review, groups them into themes with exact counts, and tells you when a theme moves and which release it followed. The customer's own words stay one click away.",
    art: "themes",
    problem: {
      title: "Reading reviews is easy.",
      sub: "Knowing what they add up to is not.",
      paragraphs: [
        "A review feed tells you what one person said this morning. It does not tell you whether pricing complaints are up this month, whether they started after version 2.8, or whether the five angry reviews you remember are five out of fifty or five out of five hundred.",
        "Sentiment scores hide the same problem in a number. A score of 0.71 does not say what changed, how many people said it, or whether the sample is big enough to mean anything.",
        "Review monitoring should produce a claim you can check: this theme, this many mentions, this share of reviews, this window, these versions, and here are the reviews themselves.",
      ],
    },
    how: {
      title: "From a review feed",
      sub: "to a theme you can act on.",
      steps: [
        { t: "Collect every review", b: "Appfox collects App Store and Google Play reviews for your app and the competitors you confirm, with the collection window, locale, and cap always shown." },
        { t: "Group into themes", b: "AI groups reviews into themes such as pricing, sync, onboarding, or crashes. Each theme carries total mentions, share of reviews, trend against the previous period, rating distribution, and affected versions." },
        { t: "Detect the change", b: "A negative review spike or a rising theme is detected deterministically, with a baseline window, a comparison window, a minimum sample, and a cooldown so one episode does not alert twice." },
        { t: "Explain with evidence", b: "The finding appears on Today with a plain explanation that cites the reviews and the release it followed. You read the recommendation first and drill into the raw reviews only as far as you need." },
        { t: "Draft the reply", b: "Planned: review replies drafted from evidence for you to review and post. Reply drafts are not in the current beta." },
        { t: "Close the loop", b: "When a task claims to fix a complaint, Appfox records the baseline mention rate and measures the theme afterwards with matched windows and denominators." },
      ],
    },
    get: {
      title: "What review monitoring",
      sub: "is intended to include.",
      items: [
        "Themes with total mentions, share of reviews, trend, rating distribution, and affected versions",
        "Every count links back to the original review text",
        "Competitor reviews grouped the same way, so you can compare complaints across the market",
        "Negative review spikes and rising themes ranked on Today with the evidence attached",
        "Planned: review replies drafted from evidence for human review",
        "A collection window, locale, and sample shown on every number",
      ],
    },
    wont: {
      title: "What Appfox refuses",
      sub: "to claim about reviews.",
      items: [
        "A percentage from a sample too small to support one. Low-volume apps see individual reviews instead of alarms.",
        "That an unmentioned feature is a missing feature. Unmentioned and verified missing are different states.",
        "That a drop in complaints was caused by your fix. A decrease is reported as observed, with your own assessment recorded beside it.",
        "That a local sample is the whole store. The brief and every theme say exactly how much was collected.",
      ],
    },
    faq: [
      { q: "Which stores does Appfox monitor reviews from?", a: "The Apple App Store and Google Play, one country and language per market. Other review sources are not covered." },
      { q: "Does Appfox reply to reviews automatically?", a: "No. Reply drafts are planned and unavailable in the current beta. The beta helps you understand reviews through themes and daily findings." },
      { q: "How is this different from sentiment analysis?", a: "Sentiment analysis gives each review a score. Appfox gives each theme a count, a denominator, a trend, and the affected versions, and links every count to the reviews behind it." },
      { q: "Can I monitor competitors' reviews too?", a: "Yes. Confirm your competitors once and their reviews are collected and grouped into themes alongside your own." },
      { q: "Is review monitoring on the free plan?", a: "The proposed Free plan includes one app, one market, 30 days of history, and 20 AI runs a month. Appfox is invite-only; pricing and beta limits are not final." },
    ],
    related: [
      { label: "Customers surface", href: "/product#customers" },
      { label: "Operate a live app", href: "/live-app" },
      { label: "Appfox vs Appbot", href: "/compare/appbot" },
      { label: "Appfox vs AppFollow", href: "/compare/appfollow" },
    ],
    cta: { title: "Put your reviews on Today.", lead: "Request a beta invitation to explore review themes and daily findings for your app." },
  },
  {
    slug: "app-store-competitor-tracking",
    title: "App Store competitor tracking",
    metaTitle: "App Store & Google Play Competitor Tracking",
    description:
      "Track competing apps on the App Store and Google Play. Appfox collects listing, price, rating, and release observations, discovers candidates, and surfaces changes to investigate.",
    kicker: "Competitor tracking",
    lead: "Confirm your competitors once. Appfox keeps reading their listings, reviews, rankings, prices, and releases, keeps collected observations as history, and tells you when something moved and when.",
    art: "competitors",
    problem: {
      title: "A competitor snapshot",
      sub: "is out of date the day you take it.",
      paragraphs: [
        "Most founders check competitors by opening their store pages when they remember to. That gives you a snapshot with no history: you see today's price and today's screenshots, but not that the price changed twice this quarter or that the subtitle was rewritten after a big update.",
        "Market data tools answer a different question. They estimate downloads and revenue for the category, which can help compare a category. To investigate a specific listing or price change, you also need dated observations of the competing app.",
        "Competitor tracking should be append-only and specific: who is in your market, what changed on their listing, when, and what their customers said about it.",
      ],
    },
    how: {
      title: "From a store URL",
      sub: "to a living market.",
      steps: [
        { t: "Discover candidates", b: "Discovery runs across store search, similar-app relationships, and overlapping review language. Low-confidence candidates are never added silently." },
        { t: "Confirm the set", b: "You keep or remove candidates and label each one direct or adjacent. The market scope stays editable." },
        { t: "Save collected observations", b: "Listings, prices, ratings, review counts, and releases are stored against history. Nothing is backdated from today's listing." },
        { t: "Detect what moved", b: "A price change, a new entrant, a rank acceleration, or a rating movement is detected with a threshold and a minimum sample." },
        { t: "Read it on Today", b: "The finding appears with the evidence: the before and after listing, the dates, and the reviews that followed." },
        { t: "Compare complaints", b: "Competitor reviews are grouped into the same themes as yours, so you can see where they are weak and where you are." },
      ],
    },
    get: {
      title: "What competitor tracking",
      sub: "is intended to include.",
      items: [
        "Confirmed direct and adjacent competitors in an editable market scope",
        "Listing, price, rating, and release history for every competitor, append-only",
        "Newly discovered apps scored for similarity before they are suggested",
        "Metadata and pricing comparisons across the set",
        "Tracked App Store search queries with current and previous rank",
        "Competitor review themes with exact counts next to your own",
      ],
    },
    wont: {
      title: "What Appfox refuses",
      sub: "to claim about competitors.",
      items: [
        "That provider estimates are verified downloads or earnings. Read the source and scope before drawing a conclusion.",
        "That newly discovered means newly launched. The two are distinguished.",
        "That a periodic search is an exhaustive census of the market.",
        "That an in-app purchase indicator is a verified subscription offer.",
      ],
    },
    faq: [
      { q: "How many competitors can I track?", a: "It depends on the plan. Competitor caps per market are pilot defaults shown on the pricing page." },
      { q: "Does Appfox estimate competitor downloads?", a: "Appfox distinguishes observed store evidence from any estimates supplied by a data provider. Estimates do not establish a competitor’s verified downloads or financial results." },
      { q: "Can I track competitors before I have an app?", a: "Yes. The research journey builds a market around an idea, and when you later add your own app it joins the same market with its history intact." },
      { q: "Which stores are covered?", a: "The Apple App Store and Google Play, one country and language per market." },
    ],
    related: [
      { label: "Market surface", href: "/product#market" },
      { label: "Research an idea", href: "/research" },
      { label: "Appfox vs AppTweak", href: "/compare/apptweak" },
      { label: "Appfox vs Appfigures", href: "/compare/appfigures" },
    ],
    cta: { title: "Watch your market while you build.", lead: "Confirm your competitors once. Every change after that is kept as history." },
  },
  {
    slug: "app-idea-validation",
    title: "App idea validation",
    metaTitle: "App Idea Validation: Research Before You Build",
    description:
      "Validate a mobile app idea with evidence. Appfox discovers the competitors, reads their listings and reviews, and writes an AI research brief with the case for and against building, and what reviews cannot tell you.",
    kicker: "App idea validation",
    lead: "Describe the idea, the store, and the country. Appfox discovers the competitors, you confirm the set, and an AI research brief is written from real listings and reviews, including the evidence against building it.",
    art: "research",
    problem: {
      title: "Most idea validation",
      sub: "is a search and a gut feeling.",
      paragraphs: [
        "You search the store, scroll a few competitors, read the top reviews, and decide. The evidence is real but unrecorded: a week later you cannot say which apps you looked at, what the complaints were, or why you felt the gap existed.",
        "Market-size reports have the opposite problem. They are recorded but not specific: a category estimate says nothing about whether the five apps that actually compete with your idea have an unsolved complaint.",
        "Validation should produce a brief you can argue with: who competes, how they position, what customers complain about repeatedly, what is praised, and what the evidence cannot establish.",
      ],
    },
    how: {
      title: "From an idea",
      sub: "to a recorded decision.",
      steps: [
        { t: "Describe the idea", b: "The job it does, who it is for, the store, the country, and the language. Appfox derives editable search concepts from that description." },
        { t: "Confirm the competitor set", b: "Discovery runs across store search, similar-app relationships, and overlapping review language. You keep or remove candidates and label each one direct or adjacent." },
        { t: "Read the brief", b: "Positioning, observable monetization, recurring complaints, existing strengths, potential gaps, and evidence against the idea. Each claim links to the listings and reviews behind it." },
        { t: "Inspect the sources", b: "The original review text, the listing snapshot, and the collection window. The brief says exactly how much was collected." },
        { t: "Record a decision", b: "Save a hypothesis and the next validation action, or record that you will not pursue the idea. Both are useful outcomes." },
        { t: "Keep watching", b: "Enable monitoring and the market keeps refreshing. When you later add your app, it joins the same market." },
      ],
    },
    get: {
      title: "What a research brief",
      sub: "gives you.",
      items: [
        "Who exists in the market, and who was newly discovered versus verifiably newly launched",
        "How each app positions itself on its listing",
        "What monetization is observable: free or paid, in-app purchase names, listed prices, visible trials",
        "What customers complain about repeatedly, in the words they use for the job",
        "What features are praised, and which are requested again and again",
        "Where review or rating activity is rising, with its components shown",
      ],
    },
    wont: {
      title: "What a brief refuses",
      sub: "to claim.",
      items: [
        "Market size, willingness to pay, or business viability. Reviews cannot establish those.",
        "That an unmentioned feature is a missing feature.",
        "A trend before trustworthy comparable snapshots exist.",
        "That update frequency or review velocity equals revenue growth.",
      ],
    },
    faq: [
      { q: "How long does a research brief take?", a: "Discovery and collection run after you confirm the competitor set. The brief is written once the sample is usable, and the collection window is shown on it." },
      { q: "Is a research brief on the free plan?", a: "Proposed allowances are one brief a month on Free, five on Indie, and unlimited on Studio. Research briefs are available by beta invitation; final plans and limits may change." },
      { q: "Can the brief tell me whether the idea will make money?", a: "No. It reports observable monetization and recurring complaints with the evidence. Willingness to pay and viability are decisions it leaves to you, and it says so." },
      { q: "What happens to the research after I launch?", a: "The market keeps refreshing. When you add your owned app, it joins the same market with its evidence intact." },
    ],
    related: [
      { label: "Research an idea", href: "/research" },
      { label: "Competitor tracking", href: "/solutions/app-store-competitor-tracking" },
      { label: "Market surface", href: "/product#market" },
      { label: "Pricing", href: "/pricing" },
    ],
    cta: { title: "Research your next idea.", lead: "Request a private beta invitation. Start your research with an idea and the store you plan to launch in." },
  },
  {
    slug: "revenuecat-analytics",
    title: "RevenueCat analytics",
    metaTitle: "Planned RevenueCat Analytics with App Store Context",
    description:
      "Explore the planned read-only RevenueCat integration for Appfox. Revenue and subscription context is on the roadmap and is not available in the current beta.",
    kicker: "RevenueCat analytics · Planned",
    lead: "RevenueCat is planned and is not available in the current beta. This page describes the intended read-only integration: revenue, subscriptions, trials, and conversions alongside reviews and competitor changes. No release date is announced.",
    art: "revenue",
    problem: {
      title: "RevenueCat shows the number.",
      sub: "Add the surrounding context.",
      paragraphs: [
        "A trial-to-paid change raises questions beyond the subscription chart. Was there a release that week? Did pricing complaints rise? Did a competitor change its price? The planned integration would bring that surrounding evidence into the investigation.",
        "Dashboards that sum everything also mislead quietly: active subscriptions are a stock, not a flow, and adding them across days produces a number that means nothing. Today's trial-to-paid ratio mixes cohorts that have not matured.",
        "Monetization analytics should keep scope exact and put the number next to evidence that may help explain it.",
      ],
    },
    how: {
      title: "The planned read-only connection",
      sub: "to a finding with context.",
      steps: [
        { t: "Verify the binding", b: "Planned: verify the RevenueCat project and app binding before reading supported metrics through an authorized, server-side connection." },
        { t: "Read a small, exact set", b: "Revenue, active subscriptions, trials, and paid conversions, with currency, timezone, and window recorded on every observation." },
        { t: "Keep scope honest", b: "Project totals and app-level series stay separate. Stocks are never summed across days. Trial-to-paid is computed from matched mature cohorts." },
        { t: "Detect the change", b: "A trial conversion drop or a revenue movement is detected against a baseline window with a minimum sample." },
        { t: "Explain with evidence", b: "The finding on Today cites the release, the review theme, or the competitor price change that preceded it." },
        { t: "Fail closed", b: "A failed sync is shown as failed with the last good read. It is never shown as zero revenue or a disconnected integration." },
      ],
    },
    get: {
      title: "What RevenueCat analytics",
      sub: "is intended to include.",
      items: [
        "Revenue, active subscriptions, trials, and paid conversions with exact project or app scope",
        "Trial conversion drops and revenue movements ranked on Today with evidence",
        "Planned monetization context next to releases, review themes, and competitor changes; timing alone would not prove a cause",
        "Source labels separating connected first-party metrics from competitor estimates",
        "A connection card showing exactly what is read, the last sync, and usage against RevenueCat's limits",
        "Read-only. Nothing is ever written back",
      ],
    },
    wont: {
      title: "What Appfox refuses",
      sub: "to do with revenue data.",
      items: [
        "Sum stocks like active subscriptions across days.",
        "Report today's trial-to-paid ratio as a conversion rate before cohorts mature.",
        "Show a failed read as zero, empty, or disconnected.",
        "Write anything to RevenueCat, or create provider accounts on your behalf.",
      ],
    },
    faq: [
      { q: "Is the RevenueCat integration read-only?", a: "The planned integration is intended to be read-only, with credentials kept server-side. RevenueCat is not available in the current beta." },
      { q: "Which plans include RevenueCat?", a: "The proposed pricing places RevenueCat on Indie and above, but the integration is not available in the beta. Final availability and plan limits may change." },
      { q: "Does Appfox replace the RevenueCat dashboard?", a: "No. RevenueCat would remain the source of truth for subscription data. The planned Appfox connection would put a supported subset alongside reviews, releases, and competitors." },
      { q: "What if I do not use RevenueCat?", a: "Appfox is useful with public store data alone, and accounts without a connection get a clearly labeled public-data experience. App Store Connect and Google Play Console integrations are planned." },
    ],
    related: [
      { label: "Integrations", href: "/integrations" },
      { label: "Operate a live app", href: "/live-app" },
      { label: "Security", href: "/security" },
      { label: "Appfox vs Appfigures", href: "/compare/appfigures" },
    ],
    cta: { title: "Put your revenue next to its reasons.", lead: "RevenueCat is planned. Request access to the current beta to research ideas and track public store data." },
  },
  {
    slug: "app-store-rank-tracking",
    title: "App Store rank tracking",
    metaTitle: "App Store Rank Tracking with Evidence",
    description:
      "Track your App Store and Google Play search rank for the queries that matter, with history. Appfox reports current and previous rank, flags accelerations, and shows them next to releases and listing changes.",
    kicker: "Rank tracking",
    lead: "Follow the search queries that matter to your app. Appfox records current and previous rank for each, flags a rank acceleration or drop with a minimum sample, and shows it next to the release or listing change that preceded it.",
    art: "ranks",
    problem: {
      title: "Rank is a symptom.",
      sub: "The cause is somewhere else.",
      paragraphs: [
        "A keyword tool tells you that you moved from 14 to 9 for a query. It usually cannot tell you that the move followed a subtitle change, a review spike, or a competitor leaving the top ten.",
        "Tracking thousands of keywords produces thousands of numbers and no decision. For most apps a few dozen queries carry the discovery that matters, and what you need is to know when one of them moves and why.",
        "Rank tracking should be a signal inside a wider reading of the app, not a dashboard of its own.",
      ],
    },
    how: {
      title: "From a tracked query",
      sub: "to an explained movement.",
      steps: [
        { t: "Choose the queries", b: "Track the search queries that matter for your app and your confirmed competitors, in your market's country and language." },
        { t: "Record rank over time", b: "Current and previous rank are stored for every query, append-only, so you can see what moved and when." },
        { t: "Detect the movement", b: "A rank acceleration or drop is detected with a threshold, a minimum sample, and a cooldown, so noise does not alert." },
        { t: "Find the cause", b: "The finding is shown next to your listing history, your releases, your review themes, and competitor changes in the same window." },
        { t: "Draft the response", b: "Planned: prepare store-copy drafts from evidence for you to review. Drafting is not available in the current beta." },
        { t: "Measure the result", b: "After you ship a change, matched windows show whether rank moved, reported as observed rather than caused." },
      ],
    },
    get: {
      title: "What rank tracking",
      sub: "is intended to include.",
      items: [
        "Tracked search queries with current and previous rank, for you and your competitors",
        "Rank accelerations and drops ranked on Today with the evidence attached",
        "Listing history, so a rank movement can be read against a subtitle or screenshot change",
        "Competitor rank in the same queries",
        "Planned: store-copy drafts based on evidence, for human review",
        "Coverage and window shown on every rank observation",
      ],
    },
    wont: {
      title: "What Appfox refuses",
      sub: "to claim about rank.",
      items: [
        "That a popularity score or rank proves demand. Observed positions and any provider estimates need their own source and scope.",
        "That a rank change was caused by a listing change. The two are shown together; the verdict is yours.",
        "A trend from a single observation. Movements need comparable snapshots.",
        "Keyword suggestions. Appfox is not a keyword research tool; AppTweak and Appfigures are stronger there.",
      ],
    },
    faq: [
      { q: "How many search queries can I track?", a: "It depends on the plan. Tracked query limits are pilot defaults shown on the pricing page." },
      { q: "Does Appfox suggest keywords or estimate search volume?", a: "No. It tracks rank for the queries you choose and shows movements with their context. For keyword research, see how Appfox compares with AppTweak." },
      { q: "Does rank tracking cover Google Play?", a: "Yes. Both the Apple App Store and Google Play, one country and language per market." },
      { q: "Can I see competitor rank for the same queries?", a: "Yes. Confirmed competitors are tracked in the same queries, with history." },
    ],
    related: [
      { label: "Market surface", href: "/product#market" },
      { label: "Competitor tracking", href: "/solutions/app-store-competitor-tracking" },
      { label: "Appfox vs AppTweak", href: "/compare/apptweak" },
      { label: "What is App Store Optimization?", href: "/glossary/app-store-optimization" },
    ],
    cta: { title: "Track the queries that matter.", lead: "Request a beta invitation to track your app and the search queries that matter to it." },
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
