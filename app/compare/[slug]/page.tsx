import { notFound } from "next/navigation";
import ComparisonTable from "@/components/comparison-table";
import CtaBand from "@/components/cta-band";
import FaqBlock from "@/components/faq-block";
import { PageJsonLd } from "@/components/json-ld";
import { CheckList, MonoLabel, MonoLink, Section, SoftCard } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/button";
import PageIntro from "@/components/ui/page-intro";
import SectionHeading from "@/components/ui/section-heading";
import { APPFOX, CHECKED, competitors, getCompetitor } from "@/content/competitors";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { APP_URL, CONTACT_EMAIL, CTA_HREF } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }));
}

function meta(slug: string) {
  const c = getCompetitor(slug);
  if (!c) return null;
  return {
    path: `/compare/${c.slug}`,
    title: `Appfox vs ${c.name}: Which App Tracker Fits You?`,
    description: `${c.name} is ${c.category.charAt(0).toLowerCase()}${c.category.slice(1)}. Appfox is ${APPFOX.category.toLowerCase()}. Pricing, stores, reviews, competitors, revenue, AI, and who each one is built for, compared honestly.`,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const m = meta((await params).slug);
  return m ? pageMetadata(m) : {};
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCompetitor(slug);
  const m = meta(slug);
  if (!c || !m) notFound();

  return (
    <>
      <PageJsonLd path={m.path} name={m.title} description={m.description} extra={[faqJsonLd(c.faq)]} />
      <PageIntro
        kicker={`Appfox vs ${c.name}`}
        title={
          <>
            <span className="block">Appfox vs {c.name}:</span>
            <span className="block text-quiet">which one fits how you work?</span>
          </>
        }
        lead={`${c.name} is built for ${c.bestFor.charAt(0).toLowerCase()}${c.bestFor.slice(1)}. Appfox is built for ${APPFOX.bestFor.charAt(0).toLowerCase()}${APPFOX.bestFor.slice(1)}. Here is where they overlap and where they do not.`}
      >
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="dark" size="hero">
            Request Appfox access
          </ButtonLink>
          <ButtonLink href="#table" variant="secondary" size="hero">
            See the table
          </ButtonLink>
        </div>
      </PageIntro>

      {/* At a glance */}
      <Section className="pt-4 lg:pt-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <SoftCard>
            <MonoLabel>{c.name}</MonoLabel>
            <p className="pt-3 text-[16px] leading-[26px] text-muted">{c.summary}</p>
            <dl className="pt-5">
              {[
                ["Category", c.category],
                ["Best for", c.bestFor],
                ["Free plan", c.pricing.freeLabel ?? (c.pricing.free ? "Yes" : "No, trial")],
                ["Paid plans from", c.pricing.from],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-t border-line py-3">
                  <dt className="font-mono text-[12px] font-medium uppercase leading-5 text-ink">{k}</dt>
                  <dd className="text-right text-[15px] leading-5 text-muted">{v}</dd>
                </div>
              ))}
            </dl>
            <MonoLabel className="pt-6">Strengths</MonoLabel>
            <CheckList items={c.strengths} className="pt-2" />
          </SoftCard>
          <SoftCard>
            <MonoLabel className="text-accent-ink">Appfox</MonoLabel>
            <p className="pt-3 text-[16px] leading-[26px] text-muted">
              Appfox is an app intelligence platform for iOS and Android developers. The private beta includes
              research briefs, daily findings, review themes, and competitor and rank tracking, with sources to
              inspect. RevenueCat, session replay, reply drafts, Ask Fox, and API access are planned.
            </p>
            <dl className="pt-5">
              {[
                ["Category", APPFOX.category],
                ["Best for", APPFOX.bestFor],
                ["Free plan", "Proposed · invite-only beta"],
                ["Paid plans from", "Proposed: $29/month (Indie)"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-t border-line py-3">
                  <dt className="font-mono text-[12px] font-medium uppercase leading-5 text-ink">{k}</dt>
                  <dd className="text-right text-[15px] leading-5 text-muted">{v}</dd>
                </div>
              ))}
            </dl>
            <MonoLabel className="pt-6">Strengths</MonoLabel>
            <CheckList
              items={[
                "Daily findings across reviews, rankings, releases, and competitors",
                "Every finding cites the reviews, listings, and metrics behind it",
                "Review themes with exact counts and denominators",
                "AI research briefs for ideas you have not built yet",
                "Planned: privacy-masked mobile session replay",
              ]}
              className="pt-2"
            />
          </SoftCard>
        </div>
      </Section>

      {/* Table */}
      <Section id="table" className="scroll-mt-24">
        <SectionHeading
          title="Side by side,"
          sub="feature by feature."
          lead={`Published by Appfox. Vendor pages checked ${CHECKED}; this is a documentation-based comparison, not a hands-on performance test. “Not documented” means we could not verify a feature from the sources below.`}
        />
        <div className="mt-10">
          <ComparisonTable name={c.name} rows={c.rows} />
        </div>
        <p className="pt-5 text-[13px] leading-5 text-quiet">
          {c.name} pricing: {c.pricing.note}{" "}
          <a href={c.pricingUrl} rel="nofollow noopener" target="_blank" className="underline underline-offset-2 hover:text-ink">
            Current {c.name} pricing
          </a>
          . Appfox plans are proposed and may change before general availability.
        </p>
        <p className="pt-5 text-[13px] leading-5 text-quiet">
          Sources: {c.sources.map((source, index) => (
            <span key={source.href}>{index > 0 ? " · " : ""}<a href={source.href} className="underline underline-offset-2 hover:text-ink">{source.label}</a></span>
          ))}. For Appfox, check the <a href="/beta" className="underline underline-offset-2 hover:text-ink">current beta features</a> and <a href="/how-it-works" className="underline underline-offset-2 hover:text-ink">product walkthrough</a>.
        </p>
      </Section>

      {/* Differences */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <SectionHeading
            title="Where they differ,"
            sub="in plain terms."
            lead="These are differences in approach, not a scorecard. Both products are good at what they are built for."
          />
          <ol>
            {c.differences.map((d, i) => (
              <li key={d} className="flex gap-5 border-t border-line py-5">
                <span className="font-mono text-[14px] leading-5 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[16px] leading-[26px] text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Choose */}
      <Section>
        <SectionHeading title="Which one" sub="should you choose?" className="max-w-[640px]" />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="soft-surface rounded-[28px] p-6 sm:p-8">
            <MonoLabel>Choose {c.name} if</MonoLabel>
            <CheckList items={c.chooseThem} className="pt-3" />
            <MonoLink href={c.website} className="mt-5">
              Visit {c.name}
            </MonoLink>
          </div>
          <div className="soft-surface rounded-[28px] p-6 sm:p-8">
            <MonoLabel className="text-accent-ink">Choose Appfox if</MonoLabel>
            <CheckList items={c.chooseUs} className="pt-3" />
            <MonoLink href="/pricing" className="mt-5">
              See Appfox pricing
            </MonoLink>
          </div>
        </div>
        <p className="pt-8 text-[13px] leading-5 text-quiet">
          {c.name} is a trademark of its owner. Appfox is independent and not affiliated. If something here is out of
          date, email{" "}
          <a href={`mailto:${CONTACT_EMAIL}?subject=Comparison%20correction`} className="underline underline-offset-2 hover:text-ink">
            {CONTACT_EMAIL}
          </a>{" "}
          and we will correct it.
        </p>
      </Section>

      <FaqBlock title={`Appfox vs ${c.name},`} sub="common questions." items={c.faq} />

      <Section className="pt-0 lg:pt-0">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <MonoLink href={`/alternatives/${c.slug}`}>{c.name} alternatives</MonoLink>
          <MonoLink href="/compare">All comparisons</MonoLink>
        </div>
      </Section>

      <CtaBand title="See whether it changes how you decide." lead="Request access to the private beta for app research, daily findings, and review and competitor tracking." />
    </>
  );
}
