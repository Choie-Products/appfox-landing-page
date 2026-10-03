/**
 * Comparison and alternatives content. Every claim about another product comes from that
 * product's own website or public listings, checked in October 2026. Pricing changes; each
 * page links to the vendor's pricing page and says when the figures were checked.
 */

export const CHECKED = "October 2026";

/** One row of the side-by-side table. `them` is written per competitor; `us` is constant. */
export type Row = { label: string; them: string; us: string };

export type Competitor = {
  slug: string;
  name: string;
  website: string;
  pricingUrl: string;
  /** How the vendor describes its own category. */
  category: string;
  /** Who it serves best, in our honest reading. */
  bestFor: string;
  summary: string;
  pricing: { free: boolean; from: string; note: string };
  strengths: string[];
  /** Where the two products genuinely diverge. Written as differences, not faults. */
  differences: string[];
  /** When the other product is the better choice. */
  chooseThem: string[];
  chooseUs: string[];
  rows: Row[];
  /** Why people search for alternatives to this tool, written from public reviews and pricing. */
  alternativesIntro: string;
  faq: { q: string; a: string }[];
};

export const APPFOX = {
  category: "Mobile app intelligence and operations",
  bestFor: "Indie founders and small studios who want the reading done for them, with evidence",
  pricing: "Free plan; Indie from $29 a month, Studio $99, Scale $299. Proposed plans.",
};

/** The Appfox side of every comparison row, in a fixed order. */
const US = {
  category: "Mobile app intelligence and operations: tracking, explanation, and action in one workspace",
  free: "Yes. Both journeys on one app and one market, 30 days of history, 20 AI runs a month",
  from: "$29 a month (Indie), $99 (Studio), $299 (Scale). Annual rates lower. Proposed plans",
  stores: "App Store and Google Play, one country and language per market",
  reviews: "Yes. Reviews grouped into themes with exact counts, denominators, trend, and affected versions. Every number links to the original review",
  keywords: "Tracked search queries with current and previous rank. Not a keyword research suite: no volume estimates",
  competitors: "Yes. Confirm competitors once; every listing, rating, and price change is kept as history",
  revenue: "RevenueCat, read-only, on Indie and above. Revenue, active subscriptions, trials, paid conversions",
  daily: "Yes. Today ranks what changed by severity, freshness, and evidence. A quiet day is reported as quiet",
  ai: "Yes. Deterministic signals, then an AI explanation that cites the evidence it used",
  research: "Yes. AI research briefs for new ideas, with the evidence for and against",
  replay: "Yes. Privacy-masked mobile session replay for React Native and Expo, on every plan",
  writes: "Never. Appfox drafts replies and store copy; you post them. Every integration is read-only",
  builtFor: "Indie founders and small studios running the whole app",
};

const labels = [
  "Category",
  "Free plan",
  "Paid plans from",
  "Stores",
  "Review monitoring",
  "Keyword and rank tracking",
  "Competitor tracking",
  "Revenue data",
  "Daily ranked findings",
  "AI explanations with citations",
  "Research briefs for new ideas",
  "Mobile session replay",
  "Writes to stores or providers",
  "Built for",
] as const;

const usValues = [
  US.category, US.free, US.from, US.stores, US.reviews, US.keywords, US.competitors, US.revenue,
  US.daily, US.ai, US.research, US.replay, US.writes, US.builtFor,
];

function rows(them: string[]): Row[] {
  return labels.map((label, i) => ({ label, them: them[i], us: usValues[i] }));
}

export const competitors: Competitor[] = [
  {
    slug: "appfigures",
    name: "Appfigures",
    website: "https://appfigures.com",
    pricingUrl: "https://appfigures.com/platform/pricing",
    category: "App analytics, intelligence, and ASO tools",
    bestFor: "Teams that want downloads, revenue, and ad-network data for many apps in one reporting tool",
    summary:
      "Appfigures is one of the longest-running app analytics platforms. It aggregates downloads, revenue, and ad-network data across the App Store and Google Play, adds keyword rank tracking, competitor keyword tracking, and review management, and exposes most of it through an API. It is priced per plan with five apps included and a small fee per extra app.",
    pricing: {
      free: true,
      from: "$9.99 a month",
      note: "Six tiers from Free to Amplify at $1,399.99 a month, about 20 percent off annually, five apps included and $1.99 per extra app, as listed in October 2026.",
    },
    strengths: [
      "Unified sales, download, and revenue reporting across stores and ad networks",
      "A genuinely useful free plan and a very low entry price",
      "Keyword rank tracking and competitor keyword tracking, scaled by tier",
      "Review monitoring with replies from inside the product",
      "A mature API and long historical coverage",
    ],
    differences: [
      "Appfigures is organized by dataset: sales, ads, keywords, reviews, each with its own reports. Appfox is organized by question: what needs attention today, who is in the market, what customers are saying, did the change help.",
      "Appfigures reports numbers for you to read. Appfox reads them first and ranks what changed, with the evidence attached and quiet days reported as quiet.",
      "Appfigures covers ad-network revenue and many apps cheaply. Appfox covers monetization through a read-only RevenueCat connection and is built around a handful of apps per workspace.",
      "Appfigures posts review replies from inside the product. Appfox drafts replies and store copy but never writes to a store.",
      "Appfox adds research briefs for ideas you have not built yet and privacy-masked session replay. Appfigures does not try to do either.",
    ],
    chooseThem: [
      "You need ad-network and store revenue aggregated in one report",
      "You manage many apps and want the cheapest per-app analytics",
      "You want to reply to reviews from the same tool that tracks them",
      "You rely on an established API for your own dashboards",
    ],
    chooseUs: [
      "You want a ranked daily list of what changed, not dashboards to read",
      "You want every finding to cite the reviews, listings, and metrics behind it",
      "You are deciding whether to build an idea and want a brief from real listings and reviews",
      "You want competitor history, review themes, and session replay in one workspace with a read-only boundary",
    ],
    rows: rows([
      "App analytics and ASO tools, organized by dataset",
      "Yes, with review management and basic revenue tracking",
      "$9.99 a month (Connect), up to $1,399.99 (Amplify)",
      "App Store, Google Play, and ad networks",
      "Yes, with sentiment and replies from inside the product",
      "Yes. Rank tracking, popularity scores, and competitor keywords, 25 to 2,500 keywords by tier",
      "Keyword-level competitor tracking",
      "Store sales and ad-network revenue, aggregated",
      "Alerts on metrics; reports are read by you",
      "AI-assisted features; reports remain the primary surface",
      "No",
      "No",
      "Yes. Review replies are posted from the product",
      "Developers, publishers, and marketing teams of any size",
    ]),
    alternativesIntro:
      "People look for Appfigures alternatives for three reasons that show up repeatedly in public reviews: the per-app pricing adds up across a portfolio, the product is organized as reports rather than recommendations, and newer tools add things Appfigures does not try to do, such as AI explanations, research briefs, or session replay.",
    faq: [
      {
        q: "Is Appfox a replacement for Appfigures?",
        a: "For an indie founder or small studio that wants a ranked daily reading of reviews, rankings, competitors, and RevenueCat revenue, yes. If you need ad-network revenue aggregation or the cheapest analytics for dozens of apps, Appfigures remains the stronger fit.",
      },
      {
        q: "Does Appfox track keywords like Appfigures?",
        a: "Appfox tracks the search queries you follow and reports current and previous rank for each. It does not estimate search volume or suggest keywords. Appfigures includes a fuller keyword toolkit.",
      },
      {
        q: "Can I use both?",
        a: "Yes. Appfox reads public store data and RevenueCat; it does not need Appfigures and does not conflict with it.",
      },
    ],
  },
  {
    slug: "appfollow",
    name: "AppFollow",
    website: "https://appfollow.io",
    pricingUrl: "https://appfollow.io/pricing",
    category: "Review management and ASO platform",
    bestFor: "Support and marketing teams that reply to reviews at volume and route them into helpdesk tools",
    summary:
      "AppFollow is a review management and ASO platform. Its core is review monitoring across stores with AI-assisted replies, sentiment analysis, and integrations into Slack, Zendesk, Salesforce, and Helpshift, alongside keyword rank tracking, ASO reporting, and competitor monitoring. It is priced for teams, with a free tier for small apps.",
    pricing: {
      free: true,
      from: "$179 a month",
      note: "Free plan for two apps in two countries with 20 keywords and 20 replies a month; Essential at $179 a month, Team at $599, Enterprise on request, as listed in October 2026.",
    },
    strengths: [
      "Review replies at scale, including AI-assisted and automated replies",
      "Helpdesk and chat integrations: Zendesk, Salesforce, Helpshift, Slack",
      "Sentiment analysis and customizable reporting",
      "Keyword rank tracking and ASO reports with competitor monitoring",
      "Unlimited team members on paid plans",
    ],
    differences: [
      "AppFollow is a workflow tool for answering reviews. Appfox is a reading tool for deciding what to do. It groups reviews into themes with exact counts and tells you which theme moved after which release.",
      "AppFollow posts replies to the stores. Appfox drafts them and leaves posting to you, because every Appfox integration is read-only.",
      "AppFollow adds revenue context through store connections. Appfox reads monetization from RevenueCat and keeps project totals, app-level series, and matched cohorts separate.",
      "Appfox includes research briefs for ideas you have not shipped and competitor history for apps you confirm. AppFollow's competitor features are keyword and rating oriented.",
      "AppFollow's paid plans start at team prices. Appfox starts at $29 a month for a solo founder.",
    ],
    chooseThem: [
      "A support team replies to hundreds of reviews a month and needs them in Zendesk or Salesforce",
      "You want automated replies and SLAs on response time",
      "You need unlimited seats on one plan",
    ],
    chooseUs: [
      "You are one person or a small studio and want the reading done, not the replying automated",
      "You want to know which review theme rose after which release, with the counts to prove it",
      "You want competitors, revenue, and reviews in one ranked feed with evidence on every finding",
      "You prefer a tool that never writes to your store listing or replies on your behalf",
    ],
    rows: rows([
      "Review management and ASO platform",
      "Yes. Two apps, two countries, 20 keywords and 20 replies a month",
      "$179 a month (Essential), $599 (Team), Enterprise on request",
      "App Store, Google Play, and others",
      "Yes. Replies, AI-assisted replies, sentiment, helpdesk routing",
      "Yes. Keyword tracking and ASO reporting",
      "Yes. Ratings, keywords, and benchmarking",
      "Through store connections and reporting",
      "Alerts and dashboards; prioritization is yours",
      "AI-assisted replies and summaries",
      "No",
      "No",
      "Yes. Replies are posted to the stores",
      "Support, product, and marketing teams",
    ]),
    alternativesIntro:
      "People look for AppFollow alternatives when the team pricing does not fit a solo founder, when they want analysis more than reply automation, or when they prefer a tool that never posts to the store on their behalf.",
    faq: [
      {
        q: "Does Appfox reply to reviews like AppFollow?",
        a: "No. Appfox drafts review replies from the evidence for you to copy and post. It never writes to the App Store or Google Play. AppFollow posts replies directly and automates them.",
      },
      {
        q: "Which is better for a solo founder?",
        a: "Appfox starts at $29 a month and its free plan covers one app and one market. AppFollow's free plan covers two apps with limited replies and keywords, and paid plans start at $179 a month.",
      },
      {
        q: "Does Appfox integrate with Zendesk or Slack?",
        a: "Not at launch. Appfox's launch integrations are public store data and RevenueCat, all read-only. Helpdesk routing is AppFollow's strength.",
      },
    ],
  },
  {
    slug: "appbot",
    name: "Appbot",
    website: "https://appbot.co",
    pricingUrl: "https://appbot.co/pricing",
    category: "Review and sentiment analytics",
    bestFor: "Product and support teams that want sentiment and topic analysis across app stores and other review sources",
    summary:
      "Appbot specializes in review analytics. It collects reviews from the app stores and other sources, classifies sentiment with a proprietary model, detects topics such as bugs, performance, onboarding, and pricing, supports custom topics, and routes findings into Slack, Zendesk, and similar tools. Ask Appbot adds natural-language questions over your reviews on the larger plans.",
    pricing: {
      free: false,
      from: "about $49 a month",
      note: "Entry plans around $49 a month billed annually for a handful of apps, with larger tiers from about $159 a month for more seats and sources, as listed in October 2026. A free trial is offered.",
    },
    strengths: [
      "Sentiment classification with a published accuracy claim above 93 percent",
      "Automatic topic detection plus custom topics for themes specific to your app",
      "Sources beyond the app stores, so one view covers more than iOS and Android",
      "Integrations into Slack, Zendesk, and other team tools",
      "Ask Appbot for natural-language questions over reviews",
    ],
    differences: [
      "Appbot is deep on reviews and stops there. Appfox reads reviews alongside rankings, releases, competitors, and RevenueCat revenue, so a review spike is shown next to the release that preceded it.",
      "Appbot reports sentiment scores and topic trends. Appfox reports exact counts with denominators and links each count to the original review, and it refuses percentage alarms when the sample is too small.",
      "Appbot covers review sources beyond the app stores. Appfox covers the App Store and Google Play only.",
      "Appfox adds competitor history, research briefs, and session replay. Appbot does not.",
    ],
    chooseThem: [
      "Reviews are the whole problem and you want the deepest sentiment model",
      "You need review sources beyond the App Store and Google Play",
      "You route review findings into Zendesk or Slack today",
    ],
    chooseUs: [
      "You want reviews read in the context of releases, rankings, competitors, and revenue",
      "You want exact counts and denominators rather than scores, with the customer's words one click away",
      "You want one ranked feed across every source, with a quiet day reported as quiet",
      "You want session replay and competitor tracking in the same workspace",
    ],
    rows: rows([
      "Review and sentiment analytics",
      "No. Free trial",
      "About $49 a month billed annually; larger tiers from about $159",
      "App Store, Google Play, and other review sources",
      "Yes. Sentiment, automatic and custom topics, trend tracking",
      "Keyword tracking inside reviews, not store search rank",
      "Limited to review comparisons",
      "No",
      "Alerts and reports on review changes",
      "Ask Appbot answers questions over reviews on larger plans",
      "No",
      "No",
      "Routes to team tools; replying depends on integrations",
      "Product, support, and customer experience teams",
    ]),
    alternativesIntro:
      "People look for Appbot alternatives when they want reviews read together with rankings, releases, and revenue instead of in isolation, when they want exact counts rather than sentiment scores, or when they need competitor tracking in the same tool.",
    faq: [
      {
        q: "How does Appfox's review analysis differ from Appbot's sentiment analysis?",
        a: "Appbot classifies each review's sentiment and detects topics. Appfox groups reviews into themes with total mentions, share of reviews, trend against the previous period, rating distribution, and affected versions, and every count links back to the original review text. When the sample is too small, Appfox shows the individual reviews instead of a percentage.",
      },
      {
        q: "Does Appfox cover review sources other than the app stores?",
        a: "No. Appfox reads the App Store and Google Play. Appbot covers additional sources.",
      },
      {
        q: "Does Appfox have something like Ask Appbot?",
        a: "Ask Fox is coming soon: ask a question in plain words and get an answer built from your own reviews, releases, and metrics, with the sources linked.",
      },
    ],
  },
  {
    slug: "apptweak",
    name: "AppTweak",
    website: "https://www.apptweak.com",
    pricingUrl: "https://www.apptweak.com/en/pricing",
    category: "ASO and app store intelligence platform",
    bestFor: "ASO specialists and growth teams who live in keyword research and Apple Search Ads",
    summary:
      "AppTweak is an App Store Optimization platform. Its strengths are keyword research with proprietary volume estimates, live rank tracking, competitor keyword overlap, Apple Search Ads and Google Ads insights, storefront analytics across more than 100 languages, and market intelligence estimates. Plans are sized by keyword count and history length.",
    pricing: {
      free: false,
      from: "$79 a month",
      note: "Essential at $79 a month for 500 keywords and six months of history, Grow at $299, Grow Plus at $549, Enterprise on request, with a seven-day free trial, as listed in October 2026.",
    },
    strengths: [
      "Keyword research with volume estimates that specialists rate highly",
      "Live keyword rank tracking and competitor keyword overlap",
      "Apple Search Ads and Google Ads insights in the same tool",
      "Storefront and localization coverage in more than 100 languages",
      "AI agents for position analysis on newer plans",
    ],
    differences: [
      "AppTweak is a keyword-first platform. Appfox treats ASO as one workflow among several: tracked search queries and listing history are there, but the product is organized around what needs attention across customers, competitors, releases, and revenue.",
      "AppTweak estimates search volume and downloads per keyword. Appfox does not estimate; it reports what it observed, with the collection window and sample shown.",
      "AppTweak covers paid search. Appfox has no ads features.",
      "Appfox adds review themes with exact counts, read-only RevenueCat monetization, research briefs, and session replay. AppTweak's review features are secondary to keywords.",
      "AppTweak starts at $79 a month with no free plan. Appfox starts free and its first paid plan is $29.",
    ],
    chooseThem: [
      "Keyword research and search volume estimates drive your growth work",
      "You run Apple Search Ads and want organic and paid in one place",
      "You localize listings across many storefronts and languages",
    ],
    chooseUs: [
      "You want to know what changed across your whole app, not only in search rank",
      "You want reviews, competitors, and revenue read for you with evidence on every finding",
      "You prefer observed facts with windows and samples to estimated volumes",
      "You want a free plan and a $29 tier built for one founder",
    ],
    rows: rows([
      "ASO and app store intelligence, keyword-first",
      "No. Seven-day free trial",
      "$79 a month (Essential), $299 (Grow), $549 (Grow Plus)",
      "App Store and Google Play, 100+ languages",
      "Review features exist; keywords are the focus",
      "Yes. Live rank tracking, research, volume estimates, 500 to 3,000 keywords by tier",
      "Yes. Keyword overlap, metadata, and market intelligence estimates",
      "Estimated downloads and revenue for the market",
      "Alerts and dashboards; AI agents assist on newer plans",
      "AI agents for position analysis",
      "Market intelligence estimates, not idea briefs",
      "No",
      "No store writes; ads management is separate",
      "ASO specialists, growth and marketing teams",
    ]),
    alternativesIntro:
      "People look for AppTweak alternatives when they are not ASO specialists and the keyword-first workflow is more than they need, when there is no free plan to start on, or when they want reviews, competitors, and revenue read together instead of keywords alone.",
    faq: [
      {
        q: "Is Appfox an ASO tool like AppTweak?",
        a: "ASO is one workflow inside Appfox, not the whole product. Appfox tracks the search queries you follow and keeps listing history, but it does not estimate search volume or suggest keywords. AppTweak is the stronger choice for keyword research.",
      },
      {
        q: "Does Appfox estimate competitor downloads and revenue?",
        a: "No. Appfox reports what it observed on listings and in reviews, with the window and sample shown, and reads verified competitor revenue only where it is available on Indie and above. It refuses to present estimates as facts.",
      },
      {
        q: "Can Appfox replace AppTweak for a solo developer?",
        a: "If you want to know what changed across reviews, rankings, releases, competitors, and revenue each day, yes. If keyword research drives your growth, keep AppTweak and use Appfox for everything else.",
      },
    ],
  },
];

export function getCompetitor(slug: string) {
  return competitors.find((c) => c.slug === slug);
}
