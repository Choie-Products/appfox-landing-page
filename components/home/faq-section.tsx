import Faq from "@/components/faq";
import Container from "@/components/ui/container";
import { CONTACT_EMAIL } from "@/lib/site";
import Reveal from "@/components/reveal";

/** Answers are plain strings so the same list feeds the FAQPage structured data. */
export const homeFaq: { q: string; a: string }[] = [
  {
    q: "What is Appfox?",
    a: "Appfox is an AI app intelligence tool for iOS and Android developers. It turns App Store and Google Play reviews, rankings, and competitor changes into research briefs and daily findings, with links to the sources. Appfox is in private beta; access is by invitation.",
  },
  {
    q: "What exactly does Appfox do?",
    a: "Invited beta users can research an app idea, read daily findings, explore review themes, and track competitors and rankings. RevenueCat, session replay, reply drafts, and API access are planned and are not available in the current beta.",
  },
  {
    q: "Does Appfox use AI?",
    a: "Yes. AI helps write research briefs, group reviews into themes, and explain findings in plain language. Explanations link to the evidence they use so you can check the original sources. A pattern in reviews can suggest what to investigate; it does not prove demand, revenue potential, or what caused a change. Reply drafts and Ask Fox are planned.",
  },
  {
    q: "Which stores and platforms does Appfox support?",
    a: "Appfox uses public data from the Apple App Store and Google Play, with a country and language selected for each market. The beta runs in your browser. Mobile session replay is planned, with React Native and Expo as the intended first platforms.",
  },
  {
    q: "Is Appfox an ASO tool or an app analytics dashboard?",
    a: "Appfox includes workflows for App Store Optimization (ASO), such as rank tracking and competitor listing comparisons. It also brings in review themes and research briefs to help you decide what to build or improve. It complements your existing analytics; it does not promise higher rankings or replace every specialist tool.",
  },
  {
    q: "Who built Appfox?",
    a: "Appfox is based in Milan, Italy, and is built for people who research, build, and grow mobile apps, from first-time developers and vibe coders to experienced founders and studios. The About page explains the thinking behind the product. You can reach the people building Appfox at hello@appfox.app.",
  },
  {
    q: "Do I need to connect private data?",
    a: "No. The beta uses public store listings, collected reviews, and tracked rankings. You do not need to connect private revenue data or install an SDK for these features. An optional, read-only RevenueCat integration is planned.",
  },
  {
    q: "Is my data safe? Does Appfox write anything?",
    a: "Each workspace is isolated at the database level with row-level security, and integration credentials live in a vault that never reaches the browser. Every integration is read-only. Appfox never publishes, sends, or changes anything outside your workspace.",
  },
  {
    q: "What is the difference between research and live-app?",
    a: "Research helps before you build: describe an idea, choose competitors, and get a brief with evidence for and against it. Live-app monitoring helps after you launch: follow reviews, rankings, and competitor changes through daily findings. Both are available to invited beta users, including developers building their first app.",
  },
  {
    q: "What happens when I hit a plan limit?",
    a: "The pricing table shows proposed plans and limits, which may change during the private beta. Request access to be considered for an invitation; submitting the form does not start a paid subscription. Confirm the available features and limits for your workspace when you are invited.",
  },
  {
    q: "Can I use Appfox before I have a published app?",
    a: "Yes. Invited beta users can start with an idea, a target store and country, and a set of relevant competitors. Research briefs help organize what listings and reviews suggest about the idea. You still need to test demand with the people you want to serve.",
  },
  {
    q: "Do I need to code or install an SDK to use the beta?",
    a: "No SDK is needed for the current public store-data features. You use Appfox in your browser to research ideas and inspect app evidence. Session replay would require a separate integration, but it is planned and unavailable in the current beta.",
  },
  {
    q: "What if my app has very few reviews?",
    a: "A few reviews can reveal a specific problem to investigate, but they are not enough to represent all customers or establish a reliable trend. Read the original comments, look at relevant competitors, and combine what you learn with direct feedback and hands-on tests. Missing data should stay unknown, not become a confident conclusion.",
  },
  {
    q: "Does Appfox build, fix, or publish my app?",
    a: "No. Appfox helps you decide what to investigate or improve using research briefs, review themes, and tracking. You continue building, testing, and publishing with your existing tools, whether you code directly or work with an AI coding assistant. You decide what ships.",
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
            and a person will reply. Prefer an example? Explore the{" "}
            <a href="/sample-report" className="text-ink underline underline-offset-2 hover:text-accent">
              sample report
            </a>{" "}
            or our{" "}
            <a href="/guides" className="text-ink underline underline-offset-2 hover:text-accent">
              developer guides
            </a>.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <Faq items={homeFaq} />
        </Reveal>
      </Container>
    </section>
  );
}
