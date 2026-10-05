import CtaBand from "@/components/cta-band";
import { PageJsonLd } from "@/components/json-ld";
import { CompetitorsArt, ResearchArt, OperateArt, OutcomeArt, ThemesArt } from "@/components/home/journey-art";
import { MonoLink, Section, Split } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/button";
import PageIntro from "@/components/ui/page-intro";
import SceneFrame from "@/components/ui/scene-frame";
import { pageMetadata } from "@/lib/seo";
import { APP_URL, CTA_HREF } from "@/lib/site";

const PAGE = {
  path: "/how-it-works",
  title: "How Appfox Works: From an App Idea to Your Next Decision",
  description: "Walk through Appfox's private beta: choose an idea or live app, explore the market, read review themes, track keywords, and check the sources behind a decision.",
};

export const metadata = pageMetadata(PAGE);

const steps = [
  {
    id: "start", title: "Start with an idea", sub: "or an app you already ship.", screen: "Getting started",
    paragraphs: [
      "Choose Research an idea when you are still deciding what to build. Choose Operate a live app when you already have an App Store or Google Play listing, then add its store URL.",
      "Set the market you want to investigate. A US iOS app and the same app in another country can have different competitors and customer feedback. Keep that scope in mind as you read.",
    ], art: <ResearchArt />, href: "/beta", link: "Check beta availability",
  },
  {
    id: "overview", title: "Open the overview.", sub: "Find a question worth investigating.", screen: "Dashboard · Market",
    paragraphs: [
      "Dashboard brings together the app or opportunity overview. For a live app, start with its store rating, the comparison with peers, and the customer feedback summary. Daily findings help you notice changes that deserve a closer look.",
      "In Market, inspect the competitor set and research brief. Use the brief to challenge a specific idea: who already serves this need, what do their listings promise, and what evidence would change your decision? Missing data is a reason to investigate further.",
    ], art: <CompetitorsArt />, href: "/research", link: "Explore idea research",
  },
  {
    id: "reviews", title: "Follow a theme", sub: "back to what customers wrote.", screen: "Customers",
    paragraphs: [
      "Open Customers and select the market. The theme view brings together what people love, what frustrates them, and issues to investigate first. Check how many reviews were sampled and how many were classified.",
      "Open a theme to read the matching reviews. Use market, sentiment, rating, reason, and theme filters to narrow the evidence. A repeated complaint can suggest a useful test; it does not tell you how every customer feels.",
    ], art: <ThemesArt />, href: "/guides/analyze-reviews-after-a-release", link: "Learn to investigate app reviews",
  },
  {
    id: "keywords", title: "Track the searches", sub: "that matter to your app.", screen: "Keywords",
    paragraphs: [
      "Open Keywords, choose the market, and add the search terms you want to follow. Record what you are testing in the keyword's notes so a future ranking change has context.",
      "Read a rank alongside its store, country, language, collection time, and search depth. An app missing from the collected results is not necessarily absent from the store. Popularity or other estimated metrics should be read with their source and scope, separately from an observed rank.",
    ], art: <OperateArt />, href: "/solutions/app-store-rank-tracking", link: "Understand rank tracking",
  },
  {
    id: "decision", title: "Make the call.", sub: "Keep the evidence with it.", screen: "Research brief · Source records",
    paragraphs: [
      "Follow a brief's evidence references to inspect the underlying listing, review, or observation. Check its date and market. Record your research decision and the action you want to test next.",
      "Write a small, specific next step: test an onboarding message, investigate a review theme, or speak with people who have the problem. Return to comparable evidence after the change. Your judgment connects the finding to what ships.",
    ], art: <OutcomeArt />, href: "/methodology", link: "How to read the evidence",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageJsonLd path={PAGE.path} name={PAGE.title} description={PAGE.description} />
      <PageIntro kicker="Product walkthrough · Private beta" title="From a question to a decision you can explain."
        lead="Follow the current Appfox workflow, whether this is your first app, you build with AI, or you run an established product. The beta includes research briefs, daily findings, review themes, and competitor and rank tracking.">
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="dark" size="hero">Request access</ButtonLink>
          <ButtonLink href="#start" variant="secondary" size="hero">Follow the steps</ButtonLink>
        </div>
        <p className="label-mono">Updated 5 October 2026 · Illustrations explain the workflow; they are not customer results.</p>
      </PageIntro>
      <Section className="space-y-24 pt-4 lg:space-y-40 lg:pt-8">
        {steps.map((step, index) => (
          <div key={step.id} id={step.id} className="scroll-mt-28">
            <Split reverse={index % 2 === 1}
              title={<><span className="label-mono block pb-4 text-ink">{String(index + 1).padStart(2, "0")} · {step.screen}</span>{step.title}</>}
              sub={step.sub} visual={<SceneFrame>{step.art}</SceneFrame>}>
              {step.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <MonoLink href={step.href}>{step.link}</MonoLink>
            </Split>
          </div>
        ))}
      </Section>
      <CtaBand title="Bring a real question about your app." lead="Request an invitation to the private beta. RevenueCat, session replay, reply drafts, Ask Fox, and API access are planned and are not part of the current beta." />
    </>
  );
}
