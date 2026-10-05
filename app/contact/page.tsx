import { ContactArt } from "@/components/illustrations/iso-art";
import { PageJsonLd } from "@/components/json-ld";
import { RuledList, Section } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/button";
import PageIntro from "@/components/ui/page-intro";
import { APP_URL, CONTACT_EMAIL, CTA_HREF } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import Reveal from "@/components/reveal";

const PAGE = {
  path: "/contact",
  title: "Contact Us",
  description:
    "Reach the Appfox team at hello@appfox.app for product questions, security reports, and research calls. Replies come from the people building the app tracker.",
};

export const metadata = pageMetadata(PAGE);

export default function ContactPage() {
  return (
    <>
      <PageJsonLd path={PAGE.path} name={PAGE.title} description={PAGE.description} />
      <PageIntro
        kicker="Contact"
        title="Talk to a person."
        lead="We read every message. Replies come from the people building the product."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href={`mailto:${CONTACT_EMAIL}`} variant="dark" size="hero">
            Email us
          </ButtonLink>
          <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="secondary" size="hero">
            Request access
          </ButtonLink>
        </div>
      </PageIntro>
      <Section className="pt-4 lg:pt-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          <RuledList
            items={[
              {
                title: "General and product",
                body: (
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                  >
                    {CONTACT_EMAIL}
                  </a>
                ),
              },
              {
                title: "Security reports",
                body: "Same address, subject line Security. See the Security page for the boundary we keep.",
              },
              {
                title: "Research and feedback",
                body: "We talk regularly with idea researchers and live-app operators, including low-volume apps and people who prefer not to connect private data. Tell us how you work and we will set up a call.",
              },
            ]}
          />
          <Reveal variant="scale" delay={120}>
            <ContactArt className="mx-auto h-auto w-full max-w-[460px]" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
