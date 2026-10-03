import Container from "@/components/ui/container";

/**
 * Inner-page hero, in the homepage style: a mono label, a Jost headline with the orange swoosh drawn
 * underneath, and the lead (plus optional actions) in the right column. It sits under the fixed header
 * on the same soft background as the homepage hero.
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
      <Container className="grid items-end gap-8 pb-16 pt-[128px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16 lg:pb-24 lg:pt-[184px]">
        <div>
          {kicker ? (
            <p className="font-mono text-[14px] font-medium uppercase leading-5 tracking-normal text-ink">{kicker}</p>
          ) : null}
          <h1 className="pt-4 font-display text-[40px] font-bold leading-[1.02] tracking-[-0.01em] text-black sm:text-[52px] lg:text-[60px]">
            {title}
          </h1>
          <svg
            viewBox="0 0 560 60"
            preserveAspectRatio="none"
            className="mt-4 block h-[22px] w-[200px] sm:h-[26px] sm:w-[260px]"
            aria-hidden="true"
          >
            <path
              className="hl-underline"
              d="M8 52 C 90 24, 300 8, 552 14"
              pathLength={1}
              fill="none"
              stroke="#fe5000"
              strokeWidth={9}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: "0.35s" }}
            />
          </svg>
        </div>
        {lead || children ? (
          <div className="lg:pb-2">
            {lead ? <p className="max-w-[560px] text-[16px] leading-[26px] text-muted">{lead}</p> : null}
            {children ? <div className="pt-8">{children}</div> : null}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
