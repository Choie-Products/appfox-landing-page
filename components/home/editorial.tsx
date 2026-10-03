import Image from "next/image";
import Container from "@/components/ui/container";

function Art({ src, alt, width = 1448, height = 1086 }: { src: string; alt: string; width?: number; height?: number }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(min-width: 1024px) 420px, 80vw"
      className="mx-auto h-auto w-[80%]"
    />
  );
}

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
    <div className="grid gap-10 py-16 lg:grid-cols-[minmax(0,560px)_1fr] lg:items-center lg:gap-16 lg:py-24">
      <div>
        <h2 className="text-display-md text-ink">
          <span className="block">{lead}</span>
          <span className="block">{title}</span>
        </h2>
        <div className="pt-5 text-[16px] leading-[26px] text-ink-soft">{children}</div>
      </div>
      <div className="flex w-full max-w-[520px] items-center lg:justify-self-end">{illustration}</div>
    </div>
  );
}

export default function Editorial() {
  return (
    <Container as="section">
      <Row lead="What changed:" title="the reading is no longer the job." illustration={
          <Art
            src="/illustrations/what-changed-2.png"
            width={1254}
            height={1254}
            alt="Illustration of reviews, rankings, and releases flowing into AI, which flags one change with its chart and checks, while a person inspects it with a magnifying glass."
          />
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
          <Art
            src="/illustrations/what-didnt-change-2.png"
            width={1254}
            height={1254}
            alt="Illustration of a person approving drafted replies, store copy, a task, and an experiment plan, while sending, publishing, and file changes stay switched off."
          />
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
