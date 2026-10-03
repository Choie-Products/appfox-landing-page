import type { Metadata } from "next";
import { MonoLabel, OutlineCard, RuledList, Section } from "@/components/ui/blocks";
import PageIntro from "@/components/ui/page-intro";
import WaitlistForm from "@/components/waitlist-form";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the Appfox team by email, or join the open-beta waitlist.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        kicker="Contact"
        title="Talk to a person."
        lead="We read every message. Replies come from the people building the product."
      />
      <Section className="pt-4 lg:pt-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
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
                title: "Pilot participation",
                body: "We are recruiting both idea researchers and live-app operators, including low-volume apps and people who prefer not to connect private data. Join the waitlist and reply to the confirmation email.",
              },
            ]}
          />
          <OutlineCard className="self-start sm:p-10">
            <MonoLabel>Join the waitlist</MonoLabel>
            <p className="pt-2 text-[16px] leading-[26px] text-muted">Free during the open beta. No time expiry.</p>
            <div className="pt-6">
              <WaitlistForm source="contact" />
            </div>
          </OutlineCard>
        </div>
      </Section>
    </>
  );
}
