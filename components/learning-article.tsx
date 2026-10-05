import Link from "next/link";
import CtaBand from "@/components/cta-band";
import { PageJsonLd } from "@/components/json-ld";
import { MonoLabel, MonoLink, Section, SoftCard } from "@/components/ui/blocks";
import PageIntro from "@/components/ui/page-intro";
import type { LearningResource } from "@/content/learning";
import { ORG_ID } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export default function LearningArticle({ resource }: { resource: LearningResource }) {
  const updated = new Date(`${resource.updated}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
  return (
    <>
      <PageJsonLd
        path={resource.path}
        name={resource.title}
        description={resource.description}
        extra={[{
          "@type": "Article",
          "@id": `${SITE_URL}${resource.path}#article`,
          headline: resource.title,
          description: resource.description,
          mainEntityOfPage: `${SITE_URL}${resource.path}`,
          dateModified: resource.updated,
          author: { "@type": "Organization", "@id": ORG_ID, name: SITE_NAME, url: SITE_URL },
          publisher: { "@id": ORG_ID },
          inLanguage: "en",
          citation: resource.sections.flatMap((section) => section.links ?? [])
            .filter((link) => link.href.startsWith("https://"))
            .map((link) => link.href),
        }]}
      />
      <PageIntro kicker={resource.kicker} title={resource.title} lead={resource.lead}>
        <p className="label-mono">
          Published by Appfox · Updated <time dateTime={resource.updated}>{updated}</time>
        </p>
      </PageIntro>
      <Section className="pt-4 lg:pt-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <article className="space-y-12 text-[16px] leading-[26px] text-muted">
            {resource.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 space-y-5">
                <h2 className="text-display-sm text-ink">{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items ? (
                  <ul className="list-disc space-y-3 pl-5">
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
                {section.links ? (
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-ink underline underline-offset-2 hover:text-accent">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <SoftCard>
              <MonoLabel>On this page</MonoLabel>
              <ol className="space-y-3 pt-4 text-[16px] leading-[26px]">
                {resource.sections.map((section) => (
                  <li key={section.id}>
                    <Link href={`#${section.id}`} className="text-ink underline underline-offset-2 hover:text-accent">
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </SoftCard>
            <MonoLabel>Keep exploring</MonoLabel>
            <div className="flex flex-col gap-3">
              {resource.related.filter((link) => link.href !== "/guides").map((link) => <MonoLink key={link.href} href={link.href}>{link.label}</MonoLink>)}
              <MonoLink href="/guides">All guides</MonoLink>
            </div>
          </aside>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
