import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, Inter, Jost } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { GA_ID, SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  axes: ["opsz"],
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Appfox - Your app explained",
    template: "%s | Appfox",
  },
  description:
    "Appfox reads your reviews, rankings, releases, and revenue, then tells you what deserves attention and why. Evidence on every finding. Built for indie founders and small mobile studios.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Appfox - Your app explained",
    description:
      "An intelligence layer and operations partner for mobile apps. Reviews, rankings, releases, and revenue, read for you, with the evidence attached.",
    url: SITE_URL,
    siteName: "Appfox",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Appfox - Your app explained",
    description:
      "Appfox reads your reviews, rankings, releases, and revenue, then tells you what deserves attention and why.",
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
  icons: { icon: "/favicon.svg" },
};

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Appfox",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
      description:
        "Appfox is an intelligence layer and operations partner for mobile apps. It reads reviews, rankings, releases, and revenue, then turns meaningful changes into evidence-backed actions.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Appfox",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Appfox",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jost.variable} ${plexMono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="pt-[72px] lg:pt-[88px]">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
