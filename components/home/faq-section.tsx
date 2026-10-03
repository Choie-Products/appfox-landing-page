import Faq from "@/components/faq";
import Container from "@/components/ui/container";
import { CONTACT_EMAIL } from "@/lib/site";
import Reveal from "@/components/reveal";

/** Answers are plain strings so the same list feeds the FAQPage structured data. */
export const homeFaq: { q: string; a: string }[] = [
  {
    q: "What is Appfox?",
    a: "Appfox is an AI app tracker and intelligence layer for mobile apps. It reads your App Store and Google Play reviews, rankings, releases, revenue, and the competitors you confirm every day, then ranks what changed with the evidence attached. It is built for indie founders and small mobile studios.",
  },
  {
    q: "What exactly does Appfox do?",
    a: "It turns what changed across reviews, rankings, releases, revenue, and competitors into a ranked list of findings, each with the reviews, listings, and metrics behind it. It drafts replies, store copy, tasks, and experiment plans. You decide what ships.",
  },
  {
    q: "Does Appfox use AI?",
    a: "Yes. Signals are detected deterministically from stored facts, then AI joins independent sources into one plain-language explanation that cites the evidence it used. AI also writes research briefs for new ideas, groups reviews into themes with exact counts, and drafts review replies and store copy. Ask Fox, a question-and-answer layer over your own evidence, is coming soon.",
  },
  {
    q: "Which stores and platforms does Appfox support?",
    a: "The Apple App Store and Google Play, one country and language per market. Mobile session replay supports React Native and Expo apps on iOS and Android first, with native UIKit, SwiftUI, Views, and Compose to follow.",
  },
  {
    q: "Is Appfox an ASO tool or an app analytics dashboard?",
    a: "Neither on its own. App Store Optimization is one workflow inside Appfox: tracked search queries, listing history, and competitor metadata comparisons are all there. But Appfox is organized around what needs your attention across customers, competitors, releases, and revenue, and it reads the data for you instead of leaving you a dashboard. A quiet day is reported as a quiet day.",
  },
  {
    q: "Who built Appfox?",
    a: "A small team building for indie founders and mobile studios. The product is specified before it is built, including the claims it refuses to make.",
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
      <Container className="grid gap-10 py-24 lg:grid-cols-[400px_1fr] lg:gap-16 lg:py-40">
        <Reveal>
          <h2 className="text-display-md text-ink">Questions, answered.</h2>
          <p className="pt-3 text-[16px] leading-[26px] text-muted">
            Still stuck?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink underline underline-offset-2 hover:text-accent">
              Email us
            </a>{" "}
            and a person will reply.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <Faq items={homeFaq} />
        </Reveal>
      </Container>
    </section>
  );
}
