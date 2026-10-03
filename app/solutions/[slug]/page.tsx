import { notFound } from "next/navigation";
import CtaBand from "@/components/cta-band";
import FaqBlock from "@/components/faq-block";
import { CompetitorsArt, OperateArt, ResearchArt, RevenueArt, ThemesArt } from "@/components/home/journey-art";
import { PageJsonLd } from "@/components/json-ld";
import MarketTable from "@/components/mock/market-table";
import { CheckList, MonoLink, Section, Split, StepCards } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/button";
import PageIntro from "@/components/ui/page-intro";
import SceneFrame from "@/components/ui/scene-frame";
import SectionHeading from "@/components/ui/section-heading";
import { type ArtKey, getSolution, solutions } from "@/content/solutions";
import { faqJsonLd, howToJsonLd, pageMetadata } from "@/lib/seo";
import { APP_URL, CTA_HREF } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSolution((await params).slug);
  return s ? pageMetadata({ path: `/solutions/${s.slug}`, title: s.metaTitle, description: s.description }) : {};
}

function Art({ art }: { art: ArtKey }) {
  if (art === "ranks") {
    return (
      <div className="soft-surface overflow-x-auto rounded-[28px] p-3 sm:p-4">
        <MarketTable />
      </div>
    );
  }
  const Scene = { operate: OperateArt, themes: ThemesArt, competitors: CompetitorsArt, research: ResearchArt, revenue: RevenueArt }[art];
  return (
    <SceneFrame>
      <Scene />
    </SceneFrame>
  );
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getSolution((await params).slug);
  if (!s) notFound();
  const path = `/solutions/${s.slug}`;

  return (
    <>
      <PageJsonLd
        path={path}
        name={s.metaTitle}
        description={s.description}
        extra={[faqJsonLd(s.faq), howToJsonLd({ name: `${s.title} with Appfox`, description: s.lead, steps: s.how.steps })]}
      />
      <PageIntro
        kicker={s.kicker}
        title={
          <>
            <span className="block">{s.title},</span>
            <span className="block text-quiet">with the evidence attached.</span>
          </>
        }
        lead={s.lead}
      >
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="dark" size="hero">
            Start for free
          </ButtonLink>
          <ButtonLink href="#how-it-works" variant="secondary" size="hero">
            How it works
          </ButtonLink>
        </div>
      </PageIntro>

      <Section className="pt-4 lg:pt-8">
        <Split title={s.problem.title} sub={s.problem.sub} visual={<Art art={s.art} />}>
          {s.problem.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Split>
      </Section>

      <Section id="how-it-works" className="scroll-mt-24">
        <SectionHeading title={s.how.title} sub={s.how.sub} />
        <StepCards steps={s.how.steps} className="mt-10" />
      </Section>

      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="soft-surface rounded-[28px] p-6 sm:p-8">
            <h2 className="text-display-sm text-ink">
              <span className="block">{s.get.title}</span>
              <span className="block text-quiet">{s.get.sub}</span>
            </h2>
            <CheckList items={s.get.items} className="pt-4" />
          </div>
          <div className="soft-surface rounded-[28px] p-6 sm:p-8">
            <h2 className="text-display-sm text-ink">
              <span className="block">{s.wont.title}</span>
              <span className="block text-quiet">{s.wont.sub}</span>
            </h2>
            <CheckList items={s.wont.items} tone="no" className="pt-4" />
          </div>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 pt-10">
          {s.related.map((r) => (
            <MonoLink key={r.href} href={r.href}>
              {r.label}
            </MonoLink>
          ))}
        </div>
      </Section>

      <FaqBlock title={`${s.title},`} sub="common questions." items={s.faq} />

      <CtaBand title={s.cta.title} lead={s.cta.lead} />
    </>
  );
}
