import type { Metadata } from "next";
import "./globals.css";
import { AgentationWrapper } from "@/components/agentation-wrapper";

const SITE_URL = "https://appfox.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Appfox - Find the Best Mobile App Deals & Lifetime Offers",
    template: "%s | Appfox",
  },
  description:
    "Appfox is a mobile-first platform that curates discounted apps, lifetime deals, and limited-time offers across iOS and Android. Browse 500+ active deals with discounts of 50-90% off.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Appfox - Find the Best Mobile App Deals & Lifetime Offers",
    description:
      "Discover curated mobile app deals with 50-90% discounts. Lifetime access, real-time alerts, and smart filters across 15+ categories on iOS and Android.",
    url: SITE_URL,
    siteName: "Appfox",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Appfox - Find the Best Mobile App Deals & Lifetime Offers",
    description:
      "Discover curated mobile app deals with 50-90% discounts. Lifetime access, real-time alerts, and smart filters.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

// Structured data is a static constant derived from hardcoded values only — safe to inline.
const jsonLdString = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Appfox",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      description:
        "Appfox is a mobile-first platform that curates the best discounted apps, lifetime deals, and limited-time offers across iOS and Android app stores.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Appfox",
      publisher: { "@id": `${SITE_URL}/#organization` },
      description:
        "Find the best mobile app deals, lifetime offers, and deep discounts on premium iOS and Android apps.",
    },
    {
      "@type": "SoftwareApplication",
      name: "Appfox",
      operatingSystem: "iOS, Android",
      applicationCategory: "ShoppingApplication",
      description:
        "A mobile app that aggregates and curates discounted mobile apps, lifetime deals, and limited-time offers with real-time alerts, smart filters, and push notifications.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
      },
      featureList: [
        "Time-sensitive deal tracking with expiration countdowns",
        "Lifetime access deals and one-time purchases",
        "Push notifications for new deals and price drops",
        "Smart filters by discount, rating, category, and expiration",
        "Wishlist and favorites with price drop alerts",
        "Native iOS and Android performance",
      ],
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json">{jsonLdString}</script>
      </head>
      <body className="antialiased">
        {children}
        <AgentationWrapper />
      </body>
    </html>
  );
}
