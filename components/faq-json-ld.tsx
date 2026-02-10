// Static FAQ structured data for SEO and Generative Engine Optimization.
// All content is hardcoded — no user input flows into the output.
const data = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Appfox?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Appfox is a mobile-first platform that curates discounted mobile apps, lifetime deals, and limited-time offers across iOS and Android. It helps users find premium apps at 50-90% off with real-time alerts and smart filters.",
      },
    },
    {
      "@type": "Question",
      name: "How does Appfox work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Appfox works in three steps: (1) Browse curated deals across all categories from productivity to games, (2) Use smart filters and search to find apps at unbeatable prices, (3) Tap to open in App Store or Google Play and redeem your deal.",
      },
    },
    {
      "@type": "Question",
      name: "Is Appfox free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Appfox is free to download and use. The app aggregates deals from app stores and notifies users about discounts, lifetime deals, and limited-time offers at no cost.",
      },
    },
    {
      "@type": "Question",
      name: "What kind of deals does Appfox offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Appfox features time-sensitive deals with expiration countdowns, lifetime access offers with one-time purchases, and deep discounts of 50-90% off across 15+ app categories on both iOS and Android.",
      },
    },
    {
      "@type": "Question",
      name: "Can developers promote their apps on Appfox?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, developers can reach thousands of engaged users through Appfox. Every app goes through a manual review process for quality and trust. Developers get performance analytics to track impressions, clicks, and conversions in real time.",
      },
    },
  ],
};

export default function FaqJsonLd() {
  return (
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  );
}
