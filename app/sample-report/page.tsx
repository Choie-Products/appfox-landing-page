import Link from "next/link";
import CtaBand from "@/components/cta-band";
import { PageJsonLd } from "@/components/json-ld";
import { MonoLabel, MonoLink, Section, SoftCard, StepCards } from "@/components/ui/blocks";
import PageIntro from "@/components/ui/page-intro";
import SectionHeading from "@/components/ui/section-heading";
import { sampleReviews, summarizeSample } from "@/content/sample-report";
import { pageMetadata } from "@/lib/seo";

const PAGE = {
  path: "/sample-report",
  title: "Sample App Review Report: From Evidence to a Next Step",
  description: "Inspect a fictional app-review finding, its 24 source records, theme counts, limitations, and suggested investigation. An Appfox worked example, not customer proof.",
};

export const metadata = pageMetadata(PAGE);

export default function SampleReportPage() {
  const before = summarizeSample("before");
  const after = summarizeSample("after");
  const percent = (value: number) => `${Math.round(value * 100)}%`;
  return (
    <>
      <PageJsonLd path={PAGE.path} name={PAGE.title} description={PAGE.description} />
      <PageIntro
        kicker="Worked example · Fictional data"
        title="A finding you can check, from source to next step."
        lead="An imaginary meal-planning app receives more reviews about shared-list sync after a release. Follow the evidence, check the arithmetic, and see why the next step is an investigation."
      >
        <p className="max-w-[640px] text-[16px] leading-[26px] text-muted">
          All app details, dates, and review text below are invented for this example.
          This is an editorial walkthrough, not a live Appfox export, customer result, or claim about a real app.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <MonoLink href="#finding">Read the finding</MonoLink>
          <MonoLink href="#evidence">Inspect all 24 records</MonoLink>
        </div>
      </PageIntro>

      <Section id="finding" className="scroll-mt-28 pt-4 lg:pt-8">
        <SectionHeading
          title="Shared-list complaints appear more often in this sample."
          lead="Observation: 6 of 12 fictional reviews mention a sync problem after the release, compared with 2 of 12 beforehand. That is a reason to check a core task—not proof that the release caused a regression."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <SoftCard>
            <MonoLabel>Before · 14–20 September 2026</MonoLabel>
            <p className="pt-4 text-display-md text-ink">{before.mentions.length} of {before.reviews.length}</p>
            <p className="pt-3 text-[16px] leading-[26px] text-muted">
              {percent(before.share)} of the fictional reviews mention sync. The example records show version 2.0.
            </p>
          </SoftCard>
          <SoftCard delay={100}>
            <MonoLabel>After · 21–27 September 2026</MonoLabel>
            <p className="pt-4 text-display-md text-ink">{after.mentions.length} of {after.reviews.length}</p>
            <p className="pt-3 text-[16px] leading-[26px] text-muted">
              {percent(after.share)} of the fictional reviews mention sync. The example records show version 2.1, released on 21 September.
            </p>
          </SoftCard>
        </div>
        <p className="max-w-3xl pt-6 text-[16px] leading-[26px] text-muted">
          The difference is about {Math.round((after.share - before.share) * 100)} percentage points.
          Counts refer to reviews mentioning the theme, not occurrences of a word. The denominator is the collected
          review sample, not all users or installs. No statistical significance or causal effect is established.
        </p>
      </Section>

      <Section>
        <SectionHeading title="What the evidence supports" sub="and what it leaves open." />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <SoftCard>
            <MonoLabel>A reasonable interpretation</MonoLabel>
            <p className="pt-4 text-[16px] leading-[26px] text-muted">
              Several fictional reviewers describe different versions of the same task failing: one person changes
              a shared list and another person does not see the change. That makes shared-list behavior worth investigating.
            </p>
            <ul className="list-disc space-y-3 pl-5 pt-5 text-[16px] leading-[26px] text-muted">
              {after.mentions.slice(0, 3).map((review) => (
                <li key={review.id}>
                  <Link href={`#${review.id}`} className="text-ink underline underline-offset-2 hover:text-accent">
                    {review.id}
                  </Link>: {review.text}
                </li>
              ))}
            </ul>
          </SoftCard>
          <SoftCard delay={100}>
            <MonoLabel>Open questions</MonoLabel>
            <ul className="list-disc space-y-3 pl-5 pt-4 text-[16px] leading-[26px] text-muted">
              <li>Does the problem reproduce on version 2.1, and did it also exist in 2.0?</li>
              <li>Is the issue synchronization, account setup, permissions, or a confusing saved state?</li>
              <li>Did collection coverage, traffic, or the mix of reviewers change?</li>
              <li>How many users encounter the problem? Reviews alone cannot answer this.</li>
            </ul>
          </SoftCard>
        </div>
      </Section>

      <Section>
        <SectionHeading title="A practical next investigation" lead="Use the evidence to define a small, checkable task before deciding what to ship." />
        <StepCards className="mt-10" steps={[
          { t: "Reproduce the task", b: "Use two test accounts on supported devices. Share a list, add an item on one device, and check the other. Record app version, connectivity, and the result." },
          { t: "Compare explanations", b: "Check invitation setup, permissions, saved-state feedback, and sync behavior. Compare the previous version where practical and inspect your existing diagnostics." },
          { t: "Record the decision", b: "Fix a verified problem or define the next diagnostic step. Repeat the task before shipping, then follow a comparable review period without assuming causation." },
        ]} />
        <p className="max-w-3xl pt-6 text-[16px] leading-[26px] text-muted">
          If you are researching an idea instead, this pattern could suggest an interview question:
          how do people coordinate a shared grocery list today? It does not establish demand for a new app or
          willingness to switch. Look for the strengths of existing alternatives as well as their complaints.
        </p>
      </Section>

      <Section>
        <SectionHeading title="How this example was constructed" />
        <dl className="mt-10 border-t border-line">
          {[
            ["Scope", "A fictional iOS meal-planning app, US App Store, English-language reviews. All source records were written for this page on 5 October 2026; none were scraped or collected from users."],
            ["Sample", "Two seven-day periods with 12 records each. These are deliberately constructed teaching samples, not random observations or a complete store history."],
            ["Theme rule", "Label a review “sync” when it describes list changes missing, appearing late, or differing across people or devices. Count each matching review once. General sharing requests without an observed failure would not qualify."],
            ["Multiple labels", "A review can mention more than one theme. For example, after-06 contains praise for planning and a sync complaint. Theme totals therefore need not add up to 100%."],
            ["Limits", "There are no real collection logs, customer outcomes, revenue figures, or experiment results. The small sample illustrates reasoning and arithmetic only; it does not validate Appfox’s detection accuracy."],
          ].map(([label, body]) => (
            <div key={label} className="grid gap-2 border-b border-line py-6 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-10">
              <dt className="font-mono text-[14px] font-medium uppercase leading-5 text-ink">{label}</dt>
              <dd className="text-[16px] leading-[26px] text-muted">{body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="evidence" className="scroll-mt-28">
        <SectionHeading title="All 24 fictional source records" lead="Every record is shown, including those without a sync complaint. Labels are hand-assigned for this example; you can check the counts against the text." />
        <ol className="mt-10 border-t border-line">
          {sampleReviews.map((review) => (
            <li id={review.id} key={review.id} className="grid scroll-mt-28 gap-3 border-b border-line py-6 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-10">
              <div>
                <MonoLabel>{review.id} · Fictional</MonoLabel>
                <p className="pt-2 text-[14px] leading-5 text-muted">
                  <time dateTime={review.date}>{review.date}</time> · Version {review.version}
                </p>
              </div>
              <div className="text-[16px] leading-[26px] text-muted">
                <p>{review.text}</p>
                <p className="pt-2 text-[14px] leading-5">Themes: {review.themes.join(", ")}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap gap-6 pt-10">
          <MonoLink href="/methodology">How to read the evidence</MonoLink>
          <MonoLink href="/guides/analyze-reviews-after-a-release">Investigate your own reviews</MonoLink>
          <MonoLink href="/beta">Current beta features</MonoLink>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
