/** Editorial comparisons based on the linked vendor pages, not hands-on benchmarks. */
export const CHECKED = "5 October 2026";
export type Row = { label: string; them: string; us: string };
export type Competitor = {
  slug: string; name: string; website: string; pricingUrl: string;
  category: string; bestFor: string; summary: string;
  pricing: { free: boolean; freeLabel?: string; from: string; note: string };
  strengths: string[]; differences: string[]; chooseThem: string[]; chooseUs: string[];
  rows: Row[]; alternativesIntro: string; faq: { q: string; a: string }[];
  sources: { label: string; href: string }[];
};

export const APPFOX = {
  category: "App intelligence for research and product decisions",
  bestFor: "App developers, from first-time builders to small studios, who want findings they can trace to sources",
  pricing: "Private beta by invitation. Proposed plans: Free, Indie $29/month, Studio $99/month.",
};

const usValues = [
  "App intelligence: research briefs, daily findings, reviews, and competitors",
  "Proposed Free plan; current access is invite-only",
  "Proposed: Indie $29/month and Studio $99/month; final terms may change",
  "App Store and Google Play, scoped by market",
  "Review themes, sampled and classified counts, and links to original reviews",
  "Tracked queries and rank observations with market and collection context",
  "Collected competitor listings, reviews, ratings, prices, and rank changes",
  "RevenueCat is planned and unavailable in the beta; provider estimates are not verified earnings",
  "Daily findings with supporting evidence and collection context",
  "Research and finding explanations linked to their sources",
  "Research briefs for app ideas and markets",
  "Planned; unavailable in the beta",
  "No store posting. Reply and store-copy drafts are planned",
  "Newcomers, vibe coders, experienced developers, and small studios",
];
const labels = ["Category", "Free plan", "Paid plans from", "Stores", "Review monitoring", "Keyword and rank tracking", "Competitor tracking", "Revenue data", "Daily ranked findings", "AI explanations with citations", "Research briefs for new ideas", "Mobile session replay", "Writes to stores or providers", "Built for"];
function rows(them: string[]): Row[] {
  if (them.length !== labels.length) throw new Error("Comparison row count mismatch");
  return labels.map((label, i) => ({ label, them: them[i], us: usValues[i] }));
}

export const competitors: Competitor[] = [
  {
    slug: "appfigures", name: "Appfigures", website: "https://appfigures.com",
    pricingUrl: "https://appfigures.com/platform/pricing",
    category: "App analytics, market intelligence, and ASO",
    bestFor: "Teams comparing store performance, revenue, and acquisition across apps",
    summary: "Appfigures combines connected app analytics with market intelligence, keyword tools, and review management. Its product range includes competitor estimates and an API. Feature access and tracked-app allowances depend on the plan.",
    pricing: { free: true, from: "$9.99/month, monthly billing", note: "Connect is $9.99/month on monthly billing; a free Starter plan is listed. Higher tiers add different capabilities. Check app limits and extra-app charges before comparing totals." },
    strengths: ["Connected download and revenue reporting", "Market and competitor intelligence", "Keyword discovery and rank monitoring", "Review monitoring and reply tools", "API access for custom reporting"],
    differences: [
      "Appfigures covers connected business reporting. Appfox's current beta focuses on public store research and product decisions.",
      "Appfigures offers market estimates and ASO tools. Appfox brings selected market observations into research briefs and daily findings.",
      "For portfolio reporting, compare the exact app allowance and data coverage you need. Appfox's proposed prices are not current subscription offers.",
      "Appfigures provides review reply tools. Appfox does not post to stores; reply drafts are planned.",
      "For idea research, test whether Appfox's brief answers your specific question and whether its cited sources are sufficient. This is a workflow choice, not a benchmark of accuracy.",
    ],
    chooseThem: ["You need connected store revenue reporting", "You need portfolio-level analytics", "You want review reply tools", "You need a public data API today"],
    chooseUs: ["You want a research brief before building", "You want daily findings with linked evidence", "You want review themes alongside competitor changes", "You are comfortable with invite-only beta access"],
    rows: rows(["Analytics, market intelligence, and ASO", "Yes, Starter", "$9.99/month, monthly billing", "App Store and Google Play, plus connected sources", "Review monitoring and replies", "Keyword research and rank tracking", "App intelligence and competitor keywords", "Connected analytics and market estimates", "Performance alerts and reports; workflow differs", "AI keyword suggestions; citation coverage not assessed", "Market research tools; equivalent brief workflow not verified", "Not documented in the sources reviewed", "Review reply tools", "Developers, publishers, and growth teams"]),
    alternativesIntro: "Compare Appfigures alternatives around the work you need to do: connected revenue reporting, keyword research, review operations, or deciding what to build. The options below serve different jobs; this is our editorial comparison, not a survey of switching customers.",
    faq: [
      { q: "Can Appfox replace Appfigures?", a: "It depends on the job. Appfox may fit public-store research and daily product investigation. Its beta does not replace connected revenue reporting or API workflows." },
      { q: "Does Appfox track keywords?", a: "Yes. It tracks queries and rank observations within a market. Compare the keyword coverage and research tools you need in a real trial; these products are not interchangeable feature for feature." },
      { q: "Can I use both?", a: "Yes. Public store research in Appfox can complement your existing reporting. RevenueCat support in Appfox is planned, not available in the beta." },
    ],
    sources: [{ label: "Appfigures product overview", href: "https://appfigures.com/" }, { label: "Appfigures plans and limits", href: "https://appfigures.com/platform/pricing" }],
  },
  {
    slug: "appfollow", name: "AppFollow", website: "https://appfollow.io",
    pricingUrl: "https://appfollow.io/pricing",
    category: "Review management and ASO",
    bestFor: "Teams managing review responses, reputation, and store visibility",
    summary: "AppFollow brings together review analysis, response workflows, integrations, and ASO tools. Its plan guide distinguishes a focused ASO plan from broader review-management plans, with a free option and unlimited users.",
    pricing: { free: true, from: "$19/month, billed yearly (ASO)", note: "The vendor's plan guide lists ASO from $19/month billed yearly. Essential is $179/month on monthly billing or $129/month billed yearly. These are different plans; confirm included workflows and taxes on the pricing page." },
    strengths: ["Review response workflows", "AI-assisted review handling", "Team and helpdesk integrations", "ASO and competitor monitoring", "Unlimited users in the published plan guide"],
    differences: [
      "AppFollow supports teams working through review replies. Appfox's beta helps investigate reviews and decide what to build.",
      "Both include review analysis. Compare one theme in each and inspect the underlying reviews before judging usefulness.",
      "AppFollow lists free and dedicated ASO options. A fair price comparison depends on the workflow and billing term, not just the headline fee.",
      "Appfox adds a research brief workflow for ideas. RevenueCat and replay remain planned and should not influence a purchase decision about today's beta.",
    ],
    chooseThem: ["You need review reply automation", "You need reviews in team workflows", "You want an ASO subscription available today", "You need broad team access"],
    chooseUs: ["You are deciding which problem to investigate", "You want a brief for an app idea", "You want reviews and competitors in the same research context", "You want to inspect the evidence behind daily findings"],
    rows: rows(["Review management and ASO", "Yes", "$19/month billed yearly for ASO; review plans differ", "App Store, Google Play, and additional sources", "Analysis, replies, and automation", "ASO tools and keyword tracking", "Competitor monitoring", "Confirm required metrics and integrations with vendor", "Alerts and review workflows; workflow differs", "AI review features; citation coverage not assessed", "ASO research; equivalent brief workflow not verified", "Not documented in the sources reviewed", "Review replies and automation", "Support, product, and marketing teams"]),
    alternativesIntro: "Start an AppFollow comparison by separating review response work from product research. A tool that routes and answers reviews solves a different problem from a brief that helps you evaluate an idea. Compare coverage, automation, and total cost for your actual workload.",
    faq: [
      { q: "Does Appfox reply to reviews like AppFollow?", a: "No. Appfox does not post replies to stores. Reply drafts are planned and unavailable in the current beta." },
      { q: "Which is better for a solo developer?", a: "Choose based on the task. AppFollow has free and ASO options; Appfox is invite-only. Try one real review investigation or research question before choosing." },
      { q: "Does Appfox include helpdesk routing?", a: "It is not part of the confirmed beta. Check AppFollow's integrations if routing reviews into your support workflow is essential." },
    ],
    sources: [{ label: "AppFollow product overview", href: "https://appfollow.io/" }, { label: "AppFollow plan guide", href: "https://appfollow.io/blog/new-plans-at-appfollow-and-how-to-choose-the-right-one" }, { label: "AppFollow pricing", href: "https://appfollow.io/pricing" }],
  },
  {
    slug: "appbot", name: "Appbot", website: "https://appbot.co", pricingUrl: "https://appbot.co/plans/",
    category: "Review analysis and response tools",
    bestFor: "Teams investigating feedback and managing review responses across sources",
    summary: "Appbot analyzes sentiment and topics in reviews, supports competitor comparisons, and connects feedback to team tools. Its larger plans include direct and automated replies, Ask Appbot, and MCP access for working with reviews in AI assistants.",
    pricing: { free: false, from: "$59/month, monthly billing", note: "Small is $59/month on monthly billing or $49/month billed annually. Large starts at $219/month monthly or $166/month billed annually. A 14-day trial is listed; advanced reply and AI tools are plan-dependent." },
    strengths: ["Sentiment and topic analysis", "Custom topics and dashboards", "Review sources beyond iOS and Android", "Team integrations and competitor review comparisons", "Direct replies and AI tools on eligible plans"],
    differences: [
      "Appbot specializes in feedback analysis and response. Appfox also includes market research briefs and keyword rank tracking.",
      "Both help investigate themes. Evaluate the review sample, filters, and source traceability on the same question rather than assuming one model is more accurate.",
      "Appbot covers additional review sources. Appfox's beta is scoped to App Store and Google Play evidence.",
      "Ask Appbot and MCP are advertised on eligible plans. Ask Fox and Appfox API access remain planned and unavailable in the beta.",
    ],
    chooseThem: ["You need review response tools", "You need additional review sources", "You want review data in team tools or AI assistants today"],
    chooseUs: ["You want research briefs for an idea", "You want competitor and rank context alongside reviews", "You want daily findings with their evidence", "You can work within the current private beta scope"],
    rows: rows(["Review analysis and response", "No permanent free plan listed; 14-day trial", "$59/month monthly or $49/month billed annually", "iOS, Google Play, Windows, and other sources", "Sentiment, topics, filters, and replies", "Review text analysis; store rank tracking not documented", "Review, rating, and sentiment comparisons", "Not documented in the sources reviewed", "Review reports and alerts; workflow differs", "Ask Appbot and MCP on eligible plans", "Equivalent idea-brief workflow not documented", "Not documented in the sources reviewed", "Direct and automated replies on eligible plans", "Product, support, and customer experience teams"]),
    alternativesIntro: "When comparing Appbot alternatives, decide whether you mainly need review analysis and responses or broader app research. Keep required integrations and sources on the checklist, and test the same customer question in each tool. We have not measured switching behavior or model accuracy.",
    faq: [
      { q: "How does Appfox's review analysis compare?", a: "Appfox groups collected reviews into themes and lets you inspect the source reviews. Appbot offers sentiment and topic analysis too. This comparison does not establish that either model is more accurate." },
      { q: "Does Appfox cover other review sources?", a: "The current beta covers App Store and Google Play evidence. Check Appbot's source coverage if you need additional stores or feedback channels." },
      { q: "Does Appfox have something like Ask Appbot?", a: "Ask Fox is planned, with no announced release date. It is not available in the beta. Appbot advertises Ask Appbot and MCP on eligible plans." },
    ],
    sources: [{ label: "Appbot product and source coverage", href: "https://appbot.co/" }, { label: "Appbot plans and billing terms", href: "https://appbot.co/plans/" }],
  },
  {
    slug: "apptweak", name: "AppTweak", website: "https://www.apptweak.com", pricingUrl: "https://www.apptweak.com/en/pricing",
    category: "App store marketing and intelligence",
    bestFor: "Growth teams working on ASO, Apple Ads, reviews, and market research",
    summary: "AppTweak offers multiple products: ASO Intelligence, Campaign Manager, App Reviews Manager, Market Intelligence, and API access. Plans and billing differ by product, so an ASO subscription price should not be read as the price of the full suite.",
    pricing: { free: true, freeLabel: "Some products; ASO trial", from: "$79/month equivalent, annual ASO billing", note: "ASO Essential is displayed at $79/month with $949 billed annually and a 7-day trial. Market Intelligence lists a free Starter tier; Campaign Manager has free options. Other products have separate plans. Confirm currency and billing at checkout." },
    strengths: ["Keyword research and rank monitoring", "Competitor and market intelligence", "Apple Ads campaign tools", "A separate review-management product", "Product-specific plans and API options"],
    differences: [
      "AppTweak offers specialist app-store marketing products. Appfox's beta combines public-store research, review themes, and daily findings for product decisions.",
      "Both may show observed and estimated data. Keep a recorded rank separate from a popularity or revenue estimate; neither proves demand on its own.",
      "AppTweak includes Apple Ads tools. Ads campaign management is outside Appfox's current beta.",
      "AppTweak has a dedicated review-management product. Compare the actual review workflow rather than treating reviews as an incidental feature.",
      "Some AppTweak products have free options, while ASO has a trial. Appfox's Free plan remains proposed and access is by invitation.",
    ],
    chooseThem: ["ASO research is central to your work", "You need Apple Ads campaign tools", "You need specialist app-store marketing products today"],
    chooseUs: ["You want a research brief before building", "You want reviews and competitors around one product question", "You want to inspect sources behind daily findings", "You are comfortable evaluating a private beta"],
    rows: rows(["App store marketing and intelligence", "Some products; ASO has a 7-day trial", "ASO Essential: $949/year, displayed as $79/month", "App Store and Google Play", "Dedicated App Reviews Manager product", "ASO keyword research and rank tracking", "ASO and market intelligence products", "Market download and revenue estimates", "Product-specific analytics and AI; workflow differs", "AI features; citation coverage not assessed", "Market research products; equivalent brief workflow not verified", "Not documented in the sources reviewed", "Review replies and ads tools in separate products", "Growth, ASO, support, and marketing teams"]),
    alternativesIntro: "AppTweak is a suite, so start by naming the product you need an alternative to. Keyword research, Apple Ads, review responses, and idea research need different comparisons. Include free tiers, billing terms, and additional product costs in your shortlist.",
    faq: [
      { q: "Is Appfox an ASO tool like AppTweak?", a: "Rank tracking is one Appfox workflow. AppTweak offers a broader set of specialist marketing products. Test the keyword coverage and analysis you need before replacing an existing ASO workflow." },
      { q: "Are competitor revenue numbers verified earnings?", a: "A provider estimate is not a competitor's verified financial result. Check the source, scope, and label. Appfox's planned RevenueCat connection concerns connected first-party data and is unavailable in the beta." },
      { q: "Can Appfox replace AppTweak for a solo developer?", a: "It may fit research and product investigation, but it does not replace paid-ad management or every specialist ASO workflow. Appfox is currently invite-only." },
    ],
    sources: [{ label: "AppTweak product overview", href: "https://www.apptweak.com/en" }, { label: "AppTweak product-specific pricing", href: "https://www.apptweak.com/en/pricing" }],
  },
];

export function getCompetitor(slug: string) {
  return competitors.find((competitor) => competitor.slug === slug);
}
