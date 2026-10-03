import type { ReactNode } from "react";
import { Section } from "@/components/ui/blocks";
import PageIntro from "@/components/ui/page-intro";

/** Privacy, terms, and cookies: the inner-page hero, then readable prose with mono section titles. */
export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article>
      <PageIntro kicker="Legal" title={title} lead={`Last updated: ${updated}`} />
      <Section className="pt-4 lg:pt-8">
        <div className="prose-legal max-w-prose space-y-10 text-[16px] leading-[26px] text-muted">{children}</div>
      </Section>
    </article>
  );
}
