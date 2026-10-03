import Faq from "@/components/faq";
import { Section } from "@/components/ui/blocks";
import SectionHeading from "@/components/ui/section-heading";

/** A FAQ section in the pricing-page layout: heading on the left, ruled questions on the right. */
export default function FaqBlock({
  title = "Questions,",
  sub = "answered.",
  lead = "Something else? Email us from the contact page and a person will answer.",
  items,
}: {
  title?: string;
  sub?: string;
  lead?: string;
  items: { q: string; a: string }[];
}) {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <SectionHeading title={title} sub={sub} lead={lead} />
        <Faq items={items} />
      </div>
    </Section>
  );
}
