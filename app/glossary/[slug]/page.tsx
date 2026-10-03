import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/cta-band";
import { PageJsonLd } from "@/components/json-ld";
import { CheckList, MonoLabel, MonoLink, Section, SoftCard } from "@/components/ui/blocks";
import PageIntro from "@/components/ui/page-intro";
import { getTerm, terms } from "@/content/glossary";
import { definedTermJsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return terms.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTerm((await params).slug);
  return t ? pageMetadata({ path: `/glossary/${t.slug}`, title: t.metaTitle, description: t.definition }) : {};
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTerm((await params).slug);
  if (!t) notFound();
  const related = t.related.map(getTerm).filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <>
      <PageJsonLd path={`/glossary/${t.slug}`} name={t.metaTitle} description={t.definition} extra={[definedTermJsonLd(t)]} />
      <PageIntro kicker="Glossary" title={t.question} lead={t.definition} />

      <Section className="pt-4 lg:pt-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <article className="space-y-5 text-[16px] leading-[26px] text-muted">
            {t.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </article>
          <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <SoftCard>
              <MonoLabel className="text-accent-ink">In Appfox</MonoLabel>
              <CheckList items={t.inAppfox} className="pt-3" />
              <div className="flex flex-col gap-2 pt-5">
                {t.links.map((l) => (
                  <MonoLink key={l.href} href={l.href}>
                    {l.label}
                  </MonoLink>
                ))}
              </div>
            </SoftCard>
            {related.length ? (
              <div>
                <MonoLabel>Related terms</MonoLabel>
                <ul className="flex flex-wrap gap-2 pt-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/glossary/${r.slug}`}
                        className="soft-panel inline-block rounded-full px-3.5 py-1.5 text-[14px] leading-5 text-ink hover:text-accent"
                      >
                        {r.term}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <MonoLink href="/glossary">All terms</MonoLink>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
