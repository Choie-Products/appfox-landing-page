import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AgentationWrapper } from "@/components/agentation-wrapper";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  axes: ["opsz"],
});

const sentient = localFont({
  src: "./fonts/Sentient-Variable.woff2",
  display: "swap",
  variable: "--font-sentient",
  weight: "200 700",
});

const GA_ID = "G-5H68LE3WEB";
const SITE_URL = "https://appfox.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AppFox - Know What Your App Needs Next",
    template: "%s | AppFox",
  },
  description:
    "AppFox watches your app, customers, competitors, and market, then turns meaningful changes into evidence-backed actions. Join the waitlist.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "AppFox - Intelligence for Mobile Apps",
    description:
      "Your app, customers, competitors, and market, continuously researched and turned into actionable priorities.",
    url: SITE_URL,
    siteName: "AppFox",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AppFox - Intelligence for Mobile Apps",
    description:
      "AppFox watches your app, customers, and market, then tells you what deserves attention next.",
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

const jsonLdString = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "AppFox",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      description:
        "AppFox is an intelligence system for mobile apps. It watches an app, its customers, and its market, then turns meaningful changes into evidence-backed actions.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "AppFox",
      publisher: { "@id": `${SITE_URL}/#organization` },
      description:
        "Join the AppFox waitlist. Intelligence for mobile apps that tells you what deserves attention next.",
    },
    {
      "@type": "SoftwareApplication",
      name: "AppFox",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "An intelligence layer for mobile apps that connects market, customer, business, and product signals, then recommends what to do next.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
      },
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sentient.variable}`}>
      <head>
        <script type="application/ld+json">{jsonLdString}</script>
      </head>
      <body className={`${inter.className} antialiased`}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        {children}
        <AgentationWrapper />
      </body>
    </html>
  );
}
