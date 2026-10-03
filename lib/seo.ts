import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

/**
 * Everything search engines and AI answer engines read about Appfox, in one place:
 * the default titles and descriptions, the per-page metadata helper, and the
 * schema.org builders used by the JSON-LD components.
 */

export const SITE_TITLE = "Appfox: AI App Store Tracker for iOS & Android";
export const SITE_TAGLINE = "Your app, explained.";

/** The one-paragraph definition, reused in metadata, structured data, and llms.txt. */
export const SITE_DESCRIPTION =
  "Appfox is the AI app tracker for indie founders and mobile studios. It reads your App Store and Google Play reviews, rankings, releases, revenue, and competitors every day, then tells you what needs attention and why, with the evidence attached.";

export const SITE_KEYWORDS = [
  "app tracker",
  "mobile app tracker",
  "app store tracker",
  "AI app tracker",
  "app review monitoring",
  "app review tracker",
  "app ranking tracker",
  "app competitor tracking",
  "app store intelligence",
  "mobile app intelligence",
  "mobile app analytics",
  "ASO tool",
  "App Store Optimization",
  "RevenueCat integration",
  "mobile session replay",
  "React Native session replay",
  "app idea research",
  "app market research",
  "indie app founder tools",
  "Appfox",
];

export const OG_IMAGE = `${SITE_URL}/opengraph-image`;
export const LOGO_IMAGE = `${SITE_URL}/icon`;
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const APP_ID = `${SITE_URL}/#software`;

/** The published plans, used for the SoftwareApplication offers. Keep in sync with the pricing table. */
export const PLANS = [
  { name: "Free", monthly: 0, annual: 0 },
  { name: "Indie", monthly: 29, annual: 24 },
  { name: "Studio", monthly: 99, annual: 79 },
  { name: "Scale", monthly: 299, annual: 249 },
] as const;

export const FEATURES = [
  "Daily ranked feed of what changed across reviews, rankings, releases, revenue, and competitors",
  "App Store and Google Play review monitoring with themes, exact counts, and the original review text",
  "Competitor tracking with full listing, rating, and price history",
  "AI research briefs for new app ideas, with the evidence for and against",
  "AI explanations that cite the reviews, listings, and metrics they used",
  "Read-only RevenueCat integration for revenue, subscriptions, and trials",
  "Privacy-masked mobile session replay for React Native and Expo",
  "Drafted review replies and store copy, never published without you",
  "Tracked App Store search queries with current and previous rank",
  "Workspace isolation with row-level security and server-side credential vault",
];

type PageMeta = {
  /** Route path, starting with a slash. The homepage is "/". */
  path: string;
  /** Title without the site suffix; the root template appends " | Appfox". */
  title: string;
  description: string;
  /** Social card title, when it should differ from the <title>. */
  ogTitle?: string;
  noIndex?: boolean;
};

/** Per-page metadata with a self-referencing canonical, Open Graph, and Twitter card. */
export function pageMetadata({ path, title, description, ogTitle, noIndex }: PageMeta): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const social = ogTitle ?? `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: social,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME}: ${SITE_TAGLINE}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
      images: [OG_IMAGE],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ---------- schema.org builders ---------- */

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: LOGO_IMAGE, width: 192, height: 192 },
    image: OG_IMAGE,
    description: SITE_DESCRIPTION,
    email: CONTACT_EMAIL,
    slogan: SITE_TAGLINE,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT_EMAIL,
        availableLanguage: ["English"],
      },
    ],
    ...(SOCIAL_LINKS.length ? { sameAs: SOCIAL_LINKS } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    alternateName: ["Appfox app tracker", "appfox.app"],
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: SITE_NAME,
    alternateName: "Appfox app tracker",
    url: SITE_URL,
    image: OG_IMAGE,
    screenshot: OG_IMAGE,
    description: SITE_DESCRIPTION,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Mobile app intelligence and analytics",
    operatingSystem: "Web",
    browserRequirements: "Requires a modern web browser",
    isAccessibleForFree: true,
    featureList: FEATURES,
    audience: {
      "@type": "Audience",
      audienceType: "Indie app founders, mobile developers, and small mobile studios",
    },
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    offers: PLANS.map((plan) => ({
      "@type": "Offer",
      name: `${plan.name} plan`,
      price: String(plan.monthly),
      priceCurrency: "USD",
      url: `${SITE_URL}/pricing`,
      availability: "https://schema.org/InStock",
      category: "subscription",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(plan.monthly),
        priceCurrency: "USD",
        billingIncrement: 1,
        unitCode: "MON",
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
      },
    })),
  };
}

/** A WebPage node plus a Home > Page breadcrumb for inner pages. */
export function webPageJsonLd({ path, name, description }: { path: string; name: string; description: string }) {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const page = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": APP_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
  };
  if (path === "/") return [page];
  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };
  return [{ ...page, breadcrumb: { "@id": `${url}#breadcrumb` } }, breadcrumb];
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** An ordered list of steps, for the two journeys. */
export function howToJsonLd({ name, description, steps }: { name: string; description: string; steps: { t: string; b: string }[] }) {
  return {
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.t, text: s.b })),
  };
}

/** A glossary entry. */
export function definedTermJsonLd({ slug, term, definition }: { slug: string; term: string; definition: string }) {
  return {
    "@type": "DefinedTerm",
    "@id": `${SITE_URL}/glossary/${slug}#term`,
    name: term,
    description: definition,
    url: `${SITE_URL}/glossary/${slug}`,
    inDefinedTermSet: `${SITE_URL}/glossary#set`,
  };
}

/** An ordered list of linked items, for index and alternatives pages. */
export function itemListJsonLd({ name, items }: { name: string; items: { name: string; url: string; description?: string }[] }) {
  return {
    "@type": "ItemList",
    name,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

/** Wraps nodes in a single @graph document. */
export function graph(...nodes: (object | object[])[]) {
  return { "@context": "https://schema.org", "@graph": nodes.flat() };
}
