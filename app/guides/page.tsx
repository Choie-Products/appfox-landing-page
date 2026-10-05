import Link from "next/link";
import CtaBand from "@/components/cta-band";
import { PageJsonLd } from "@/components/json-ld";
import { MonoLink, Section } from "@/components/ui/blocks";
import PageIntro from "@/components/ui/page-intro";
import { guides } from "@/content/guides";
import { mealPlanningSnapshot } from "@/content/market-snapshot";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const PAGE = {
  path: "/guides",
  title: "Practical Guides for Mobile App Developers",
  description: "Research an app idea, investigate reviews after a release, and choose what to improve next. Practical guides for beginners, vibe coders, and experienced teams.",
};

export const metadata = pageMetadata(PAGE);
const resources = [...guides, mealPlanningSnapshot];

export default function GuidesPage() {
  return (
    <>
      <PageJsonLd path={PAGE.path} name={PAGE.title} description={PAGE.description} extra={[
        itemListJsonLd({ name: PAGE.title, items: resources.map((guide) => ({ name: guide.title, url: `${SITE_URL}${guide.path}`, description: guide.description })) }),
      ]} />
      <PageIntro
        kicker="Developer guides"
        title="Make your next app decision with better evidence."
        lead="Practical steps for researching an idea, understanding customer feedback, and choosing a useful next release. Use them with Appfox or the tools you already have."
      />
      <Section className="pt-4 lg:pt-8">
        <dl className="border-t border-line">
          {resources.map((guide) => (
            <div key={guide.slug} className="grid gap-2 border-b border-line py-6 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-10">
              <dt>
                <Link href={guide.path} className="font-mono text-[14px] font-medium uppercase leading-5 text-ink hover:text-accent">
                  {guide.title}
                </Link>
              </dt>
              <dd className="text-[16px] leading-[26px] text-muted">
                {guide.description}{" "}
                <Link href={guide.path} className="text-ink underline underline-offset-2 hover:text-accent">Read the guide</Link>
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-6 pt-10">
          <MonoLink href="/sample-report">See a sample report</MonoLink>
          <MonoLink href="/methodology">How to read the evidence</MonoLink>
          <MonoLink href="/beta">What is in the beta</MonoLink>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
