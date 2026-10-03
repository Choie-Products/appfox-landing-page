import { ChangedArt, DecisionArt } from "@/components/home/surface-art";
import Container from "@/components/ui/container";

/** Two editorial rows: copy on the left, an illustration on the right. */
function Row({
  lead,
  title,
  illustration,
  children,
}: {
  lead: string;
  title: string;
  illustration: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,560px)_1fr] lg:items-center lg:gap-16">
      <div>
        <h2 className="text-display-md text-ink">
          <span className="block">{lead}</span>
          <span className="block text-quiet">{title}</span>
        </h2>
        <div className="pt-5 text-[16px] leading-[26px] text-ink-soft">{children}</div>
      </div>
      <div className="flex w-full max-w-[520px] items-center lg:justify-self-end">{illustration}</div>
    </div>
  );
}

export default function Editorial() {
  return (
    <Container as="section" className="flex flex-col gap-24 py-24 lg:gap-40 lg:py-40">
      <Row lead="What changed:" title="the reading is no longer the job." illustration={
          <ChangedArt className="mx-auto h-auto w-full max-w-[460px]" />
        }>
        <p>
          AI can now read every review, ranking, and release for you in minutes. Gathering information is no longer
          the hard part. Knowing what matters is.
        </p>
        <p className="pt-3.5">
          Appfox only flags a change when the data clearly backs it up, and shows you the proof. On a quiet day, it
          says so.
        </p>
      </Row>

      <Row lead="What didn’t change:" title="the last 10 percent is still yours." illustration={
          <DecisionArt className="mx-auto h-auto w-full max-w-[460px]" />
        }>
        <p>
          The decision was never the machine&rsquo;s to make, and it still isn&rsquo;t. Appfox drafts review
          replies, store copy, tasks, and experiment plans, but it never publishes, sends, or changes anything
          outside your workspace.
        </p>
      </Row>
    </Container>
  );
}
