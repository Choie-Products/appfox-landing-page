export const SITE_URL = "https://appfox.app";
export const SITE_NAME = "Appfox";
export const CONTACT_EMAIL = "hello@appfox.app";
export const GA_ID = "G-5H68LE3WEB";

/** Set NEXT_PUBLIC_APP_URL once the product is reachable; "Start for free" then points at the app. */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL?.trim() || null;

/** Where every "Start for free" button goes. */
export const CTA_HREF = APP_URL ?? "/waitlist";

export type NavLink = { label: string; href: string; description?: string };

export const productLinks: NavLink[] = [
  { label: "Overview", href: "/product", description: "The surfaces inside Appfox and how they connect" },
  { label: "Research an idea", href: "/research", description: "A saved brief with evidence for and against" },
  { label: "Operate a live app", href: "/live-app", description: "Today, customers, competitors, and outcomes" },
  { label: "Mobile session replay", href: "/replay", description: "Privacy-masked replays of your own app" },
  { label: "Integrations", href: "/integrations", description: "RevenueCat first, read-only by default" },
];

export const primaryNav: NavLink[] = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQs", href: "/#faq" },
];

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Today", href: "/product" },
      { label: "Market", href: "/product" },
      { label: "Customers", href: "/product" },
      { label: "Actions", href: "/product" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    heading: "Journeys",
    links: [
      { label: "Research an idea", href: "/research" },
      { label: "Operate a live app", href: "/live-app" },
      { label: "Session replay", href: "/replay" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Security", href: "/security" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];
