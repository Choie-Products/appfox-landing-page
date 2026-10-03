import type { Metadata } from "next";
import { OutlineCard } from "@/components/ui/blocks";
import PageIntro from "@/components/ui/page-intro";
import WaitlistForm from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Start for free",
  description:
    "Join the Appfox open beta. Both journeys, the full evidence ledger, and read-only integrations, free to start.",
};

export default function WaitlistPage() {
  return (
    <PageIntro
        kicker="Open beta · free to start"
        title="Start for free."
        lead="Join the waitlist and we will email you when your workspace is ready. Every workspace gets both journeys and the full evidence ledger, with no time expiry. Tell us whether you are researching an idea, operating a live app, or both."
      >
        <OutlineCard className="max-w-[520px] p-6 sm:p-8">
          <WaitlistForm source="waitlist-page" />
        </OutlineCard>
      </PageIntro>
  );
}
