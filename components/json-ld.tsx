import { faqJsonLd, graph, webPageJsonLd } from "@/lib/seo";

/**
 * Structured data for search engines and AI answer engines. All content is
 * authored in this repository; no user input reaches these scripts.
 */
export function JsonLd({ data }: { data: object }) {
  // "<" is escaped so the JSON can never close the script tag early.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

/** WebPage plus breadcrumb for one route, with any extra nodes (FAQ, HowTo) in the same graph. */
export function PageJsonLd({
  path,
  name,
  description,
  extra = [],
}: {
  path: string;
  name: string;
  description: string;
  extra?: object[];
}) {
  return <JsonLd data={graph(webPageJsonLd({ path, name, description }), ...extra)} />;
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  return <JsonLd data={graph(faqJsonLd(items))} />;
}
