import Link from "next/link";
import CtaBand from "@/components/cta-band";
import { PageJsonLd } from "@/components/json-ld";
import { MonoLabel, Section } from "@/components/ui/blocks";
import PageIntro from "@/components/ui/page-intro";
import { solutions } from "@/content/solutions";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const PAGE = {
  path: "/solutions",
  title: "Solutions: Review Monitoring, Competitor Tracking, Idea Validation & More",
  description:
    "What Appfox is used for: App Store and Google Play review monitoring, competitor tracking, app idea validation, RevenueCat analytics, and rank tracking, each with the evidence attached.",
};

export const metadata = pageMetadata(PAGE);

export default function SolutionsIndexPage() {
  return (
    <>
      <PageJsonLd
        path={PAGE.path}
        name={PAGE.title}
        description={PAGE.description}
        extra={[
          itemListJsonLd({
            name: "Appfox solutions",
            items: solutions.map((s) => ({ name: s.title, url: `${SITE_URL}/solutions/${s.slug}`, description: s.description })),
          }),
        ]}
      />
      <PageIntro
        kicker="Solutions"
        title="One workspace, five jobs people hire it for."
        lead="Each page answers the question you typed before it describes the product: what the job is, how Appfox does it, what you get, and what it refuses to claim."
      />
      <Section className="pt-4 lg:pt-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="soft-card group flex flex-col rounded-[24px] p-6 transition-colors hover:bg-white"
            >
              <MonoLabel>{s.title}</MonoLabel>
              <p className="pt-3 text-[16px] leading-[26px] text-muted">{s.description}</p>
              <span className="mt-auto pt-5 font-mono text-[14px] font-medium uppercase leading-5 text-accent-ink group-hover:text-ink">
                Read more
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
