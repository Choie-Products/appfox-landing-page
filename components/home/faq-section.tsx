import Faq, { type FaqItem } from "@/components/faq";
import Container from "@/components/ui/container";
import { CONTACT_EMAIL } from "@/lib/site";

export const homeFaq: FaqItem[] = [
  {
    q: "Who built Appfox?",
    a: "A small team building for indie founders and mobile studios. The product is specified before it is built, including the claims it refuses to make.",
  },
  {
    q: "What exactly does Appfox do?",
    a: "It reads your reviews, rankings, releases, and revenue, plus the competitors you confirm, and turns what changed into a ranked list of findings with the evidence attached. It drafts replies, store copy, tasks, and experiment plans. You decide what ships.",
  },
  {
    q: "Do I need to connect private data?",
    a: "No. Appfox is useful with public store data alone: discovery, listings, collected reviews, and tracked search queries. Connecting RevenueCat adds real monetization context. Connections are optional, read-only, and shown with exactly what they read.",
  },
  {
    q: "Is my data safe? Does Appfox write anything?",
    a: "Each workspace is isolated at the database level with row-level security, and integration credentials live in a vault that never reaches the browser. Every integration is read-only. Appfox never publishes, sends, or changes anything outside your workspace.",
  },
  {
    q: "What is the difference between research and live-app?",
    a: "Research starts from an idea: describe it, confirm a competitor set, and get a saved brief with the evidence for and against. Live-app starts from an app you already ship: Today ranks what needs attention across customers, competitors, releases, and revenue. Both share one workspace and one evidence ledger, so a researched idea keeps its market when it becomes a launched app.",
  },
  {
    q: "What happens when I hit a plan limit?",
    a: "The control that would start new paid work stops and says why. Nothing you already collected goes away, and nothing is silently retried. Upgrade when the limits get in the way.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20">
      <Container className="grid gap-10 py-16 lg:grid-cols-[400px_1fr] lg:gap-16 lg:py-24">
        <div>
          <h2 className="text-display-md text-ink">Questions, answered.</h2>
          <p className="pt-3 text-[16px] leading-[26px] text-muted">
            Still stuck?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline underline-offset-2 hover:text-accent">
              Email us
            </a>{" "}
            and a person will reply.
          </p>
        </div>
        <Faq items={homeFaq} />
      </Container>
    </section>
  );
}
