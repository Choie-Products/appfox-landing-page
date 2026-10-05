// Match the canonical host currently served by the production domain redirect.
export const SITE_URL = "https://www.appfox.app";
export const SITE_NAME = "Appfox";
export const CONTACT_EMAIL = "hello@appfox.app";
export const GA_ID = "G-5H68LE3WEB";

/** Public profiles, used as schema.org sameAs links. Add them as they go live, e.g. an X or LinkedIn URL. */
export const SOCIAL_LINKS: string[] = [];

/** Optional destination for access requests when the product handles beta invitations. */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || null;

/** Where access-request buttons go during private beta. */
export const CTA_HREF = APP_URL ?? "/waitlist";

export type NavLink = { label: string; href: string; description?: string };

export const productLinks: NavLink[] = [
  { label: "Overview", href: "/product", description: "Research, daily findings, and the evidence behind them" },
  { label: "Research an idea", href: "/research", description: "A saved brief with evidence for and against" },
  { label: "Operate a live app", href: "/live-app", description: "Daily findings, review themes, and competitor changes" },
  { label: "Mobile session replay", href: "/replay", description: "Planned: privacy-masked replays of your own app" },
  { label: "Integrations", href: "/integrations", description: "Public store data now; RevenueCat is planned" },
];

export const primaryNav: NavLink[] = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQs", href: "/#faq" },
];

export const solutionLinks: NavLink[] = [
  { label: "App review monitoring", href: "/solutions/app-review-monitoring" },
  { label: "Competitor tracking", href: "/solutions/app-store-competitor-tracking" },
  { label: "App idea validation", href: "/solutions/app-idea-validation" },
  { label: "RevenueCat analytics", href: "/solutions/revenuecat-analytics" },
  { label: "Rank tracking", href: "/solutions/app-store-rank-tracking" },
];

export const compareLinks: NavLink[] = [
  { label: "Appfox vs Appfigures", href: "/compare/appfigures" },
  { label: "Appfox vs AppFollow", href: "/compare/appfollow" },
  { label: "Appfox vs Appbot", href: "/compare/appbot" },
  { label: "Appfox vs AppTweak", href: "/compare/apptweak" },
  { label: "All comparisons", href: "/compare" },
  { label: "Glossary", href: "/glossary" },
];

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "Product walkthrough", href: "/how-it-works" },
      { label: "Today", href: "/product#today" },
      { label: "Market", href: "/product#market" },
      { label: "Customers", href: "/product#customers" },
      { label: "Research an idea", href: "/research" },
      { label: "Operate a live app", href: "/live-app" },
      { label: "Session replay", href: "/replay" },
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  { heading: "Solutions", links: solutionLinks },
  { heading: "Compare", links: compareLinks },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Security", href: "/security" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Sample report", href: "/sample-report" },
      { label: "Evidence & methodology", href: "/methodology" },
      { label: "Developer guides", href: "/guides" },
      { label: "Beta features", href: "/beta" },
    ],
  },
];
