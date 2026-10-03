import { PageJsonLd } from "@/components/json-ld";
import { SoftCard } from "@/components/ui/blocks";
import PageIntro from "@/components/ui/page-intro";
import WaitlistForm from "@/components/waitlist-form";
import { pageMetadata } from "@/lib/seo";

const PAGE = {
  path: "/waitlist",
  title: "Start for Free: Get Your Workspace",
  description:
    "Start Appfox for free. Get a workspace with both journeys, the full evidence ledger, AI explanations, and read-only integrations. No card required; upgrade when you outgrow the Free plan.",
};

export const metadata = pageMetadata(PAGE);

export default function WaitlistPage() {
  return (
    <>
    <PageJsonLd path={PAGE.path} name={PAGE.title} description={PAGE.description} />
    <PageIntro
        kicker="Start for free"
        title="Start for free."
        lead="Leave your email and we will send your workspace invite. Every workspace gets both journeys and the full evidence ledger on the Free plan. Upgrade when you outgrow it."
      >
        <SoftCard className="w-full max-w-[520px] p-6 text-left sm:p-8">
          <WaitlistForm source="waitlist-page" />
        </SoftCard>
      </PageIntro>
    </>
  );
}
