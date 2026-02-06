import type { Metadata } from "next";
import "./globals.css";
import { AgentationWrapper } from "@/components/agentation-wrapper";

export const metadata: Metadata = {
  title: "Appfox - Find the Best Mobile App Deals",
  description: "Discover curated discounted mobile apps, lifetime deals, and limited-time offers. The mobile-first platform for app deal hunting.",
  keywords: "mobile apps, app deals, discounts, lifetime deals, iOS apps, Android apps, app store deals",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Appfox - Find the Best Mobile App Deals",
    description: "Discover curated discounted mobile apps, lifetime deals, and limited-time offers.",
    url: "https://appfox.app",
    siteName: "Appfox",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        <AgentationWrapper />
      </body>
    </html>
  );
}
