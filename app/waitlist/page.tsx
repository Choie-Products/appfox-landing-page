import { PageJsonLd } from "@/components/json-ld";
import { SoftCard } from "@/components/ui/blocks";
import PageIntro from "@/components/ui/page-intro";
import WaitlistForm from "@/components/waitlist-form";
import { pageMetadata } from "@/lib/seo";

const PAGE = {
  path: "/waitlist",
  title: "Request Private Beta Access",
  description:
    "Request access to the Appfox private beta for app research, daily findings, review themes, and competitor and rank tracking. Access is by invitation.",
};

export const metadata = pageMetadata(PAGE);

export default function WaitlistPage() {
  return (
    <>
    <PageJsonLd path={PAGE.path} name={PAGE.title} description={PAGE.description} />
    <PageIntro
        kicker="Private beta"
        title="Request your invitation."
        lead="Building your first app or growing an existing one? Leave your email to request beta access. We will contact you when an invitation is available. Beta features include research briefs, review themes, and app tracking."
      >
        <SoftCard className="w-full max-w-[520px] p-6 text-left sm:p-8">
          <WaitlistForm source="waitlist-page" />
        </SoftCard>
      </PageIntro>
    </>
  );
}
