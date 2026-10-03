import Link from "next/link";
import CtaBand from "@/components/cta-band";
import { JsonLd, PageJsonLd } from "@/components/json-ld";
import { Section } from "@/components/ui/blocks";
import PageIntro from "@/components/ui/page-intro";
import { terms } from "@/content/glossary";
import { definedTermJsonLd, graph, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const PAGE = {
  path: "/glossary",
  title: "Glossary: App Tracker, ASO, Review Monitoring & More",
  description:
    "Plain definitions of the terms behind mobile app intelligence: app tracker, App Store Optimization, review monitoring, competitor tracking, mobile session replay, and how Appfox handles each.",
};

export const metadata = pageMetadata(PAGE);

export default function GlossaryIndexPage() {
  return (
    <>
      <PageJsonLd path={PAGE.path} name={PAGE.title} description={PAGE.description} />
      <JsonLd
        data={graph({
          "@type": "DefinedTermSet",
          "@id": `${SITE_URL}/glossary#set`,
          name: "Appfox glossary",
          url: `${SITE_URL}/glossary`,
          hasDefinedTerm: terms.map(definedTermJsonLd),
        })}
      />
      <PageIntro
        kicker="Glossary"
        title="The words behind the product, defined plainly."
        lead="Short definitions you can quote, longer explanations you can argue with, and a note on how Appfox handles each one."
      />
      <Section className="pt-4 lg:pt-8">
        <dl className="border-t border-line">
          {terms.map((t) => (
            <div key={t.slug} className="grid gap-2 border-b border-line py-6 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-10">
              <dt>
                <Link href={`/glossary/${t.slug}`} className="font-mono text-[14px] font-medium uppercase leading-5 text-ink hover:text-accent">
                  {t.term}
                </Link>
              </dt>
              <dd className="text-[16px] leading-[26px] text-muted">
                {t.definition}{" "}
                <Link href={`/glossary/${t.slug}`} className="text-ink underline underline-offset-2 hover:text-accent">
                  Read more
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Section>
      <CtaBand />
    </>
  );
}
