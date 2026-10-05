import { ChangedArt, DecisionArt } from "@/components/illustrations/iso-art";
import Container from "@/components/ui/container";
import { MonoLink } from "@/components/ui/blocks";
import Reveal from "@/components/reveal";

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
      <Reveal>
        <h2 className="text-display-md text-ink">
          <span className="block">{lead}</span>
          <span className="block text-quiet">{title}</span>
        </h2>
        <div className="pt-5 text-[16px] leading-[26px] text-ink-soft">{children}</div>
      </Reveal>
      <Reveal variant="scale" delay={120} className="flex w-full max-w-[520px] items-center lg:justify-self-end">
        {illustration}
      </Reveal>
    </div>
  );
}

export default function Editorial() {
  return (
    <Container as="section" className="flex flex-col gap-24 py-24 lg:gap-40 lg:py-40">
      <Row lead="You can build faster." title="Knowing what to build still takes work." illustration={
          <ChangedArt className="mx-auto h-auto w-full max-w-[460px]" />
        }>
        <p>
          Whether you write every line or build with AI, shipping an app is only the start. Reviews, rankings, and
          competitors hold clues about what to do next. Reading them all takes time.
        </p>
        <p className="pt-3.5">
          Appfox brings those clues together in plain language, with the sources attached. Spend less time
          gathering information and more time deciding what deserves your next release.
        </p>
        <MonoLink href="/product" className="mt-5">See how Appfox works</MonoLink>
      </Row>

      <Row lead="Get a clearer picture." title="Make the call yourself." illustration={
          <DecisionArt className="mx-auto h-auto w-full max-w-[460px]" />
        }>
        <p>
          A research brief can challenge your idea. A review theme can point to a problem worth investigating.
          Appfox shows you the evidence and its limits. You bring the context, choose the next step,
          and decide what ships.
        </p>
        <MonoLink href="/methodology" className="mt-5">How to read the evidence</MonoLink>
      </Row>
    </Container>
  );
}
