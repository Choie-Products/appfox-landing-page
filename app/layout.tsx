import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Appfox - Find the Best Mobile App Deals",
  description: "Discover curated discounted mobile apps, lifetime deals, and limited-time offers. The mobile-first platform for app deal hunting.",
  keywords: "mobile apps, app deals, discounts, lifetime deals, iOS apps, Android apps, app store deals",
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
