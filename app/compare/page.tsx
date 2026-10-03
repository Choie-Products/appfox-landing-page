import Link from "next/link";
import CtaBand from "@/components/cta-band";
import { PageJsonLd } from "@/components/json-ld";
import { MonoLabel, MonoLink, Section } from "@/components/ui/blocks";
import PageIntro from "@/components/ui/page-intro";
import SectionHeading from "@/components/ui/section-heading";
import { CHECKED, competitors } from "@/content/competitors";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const PAGE = {
  path: "/compare",
  title: "Compare Appfox with Appfigures, AppFollow, Appbot & AppTweak",
  description:
    "Honest side-by-side comparisons of Appfox with Appfigures, AppFollow, Appbot, and AppTweak: pricing, stores, review monitoring, competitor tracking, revenue data, AI, and who each tool is built for.",
};

export const metadata = pageMetadata(PAGE);

export default function CompareIndexPage() {
  return (
    <>
      <PageJsonLd
        path={PAGE.path}
        name={PAGE.title}
        description={PAGE.description}
        extra={[
          itemListJsonLd({
            name: "Appfox comparisons",
            items: competitors.map((c) => ({ name: `Appfox vs ${c.name}`, url: `${SITE_URL}/compare/${c.slug}` })),
          }),
        ]}
      />
      <PageIntro
        kicker="Compare"
        title="Appfox next to the tools you already know."
        lead={`Each comparison is written from the other product's own website and public listings, checked ${CHECKED}, and says plainly when the other tool is the better choice.`}
      />
      <Section className="pt-4 lg:pt-8">
        <div className="grid gap-5 md:grid-cols-2">
          {competitors.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="soft-card group flex flex-col rounded-[24px] p-6 transition-colors hover:bg-white"
            >
              <MonoLabel>Appfox vs {c.name}</MonoLabel>
              <p className="pt-2 text-[14px] leading-5 text-quiet">{c.category}</p>
              <p className="pt-3 text-[16px] leading-[26px] text-muted">
                {c.name} is best for {c.bestFor.charAt(0).toLowerCase()}
                {c.bestFor.slice(1)}.
              </p>
              <span className="mt-auto pt-5 font-mono text-[14px] font-medium uppercase leading-5 text-accent-ink group-hover:text-ink">
                Read the comparison
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <Section className="pt-0 lg:pt-0">
        <SectionHeading title="Looking for alternatives" sub="rather than a head-to-head?" className="max-w-[640px]" />
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {competitors.map((c) => (
            <MonoLink key={c.slug} href={`/alternatives/${c.slug}`}>
              {c.name} alternatives
            </MonoLink>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
