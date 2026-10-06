import Reveal from "@/components/reveal";
import Container from "@/components/ui/container";

/**
 * Inner-page hero, in the homepage style: centered, with a mono label, a Poppins headline, a quiet
 * lead, and optional actions. It sits under the fixed header on the same soft background as the
 * homepage hero.
 */
export default function PageIntro({
  kicker,
  title,
  lead,
  children,
}: {
  kicker?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="-mt-[72px] bg-[linear-gradient(to_bottom,var(--hero-bg-top),var(--paper))] lg:-mt-[88px]">
      <Container className="flex flex-col items-center pb-16 pt-[128px] text-center lg:pb-24 lg:pt-[200px]">
        {kicker ? (
          <Reveal>
            <p className="label-mono text-ink">{kicker}</p>
          </Reveal>
        ) : null}
        <Reveal delay={90}>
          <h1 className="max-w-[880px] text-balance pt-4 font-display text-[36px] font-bold leading-[1.1] tracking-[-0.035em] text-black sm:text-[54px]">
            {title}
          </h1>
        </Reveal>
        {lead ? (
          <Reveal delay={180}>
            <p className="max-w-[640px] text-balance pt-6 text-[16px] leading-[26px] text-quiet">{lead}</p>
          </Reveal>
        ) : null}
        {children ? (
          <Reveal delay={270} className="flex w-full flex-col items-center gap-6 pt-8">
            {children}
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
