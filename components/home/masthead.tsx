import HeroHeadline from "@/components/home/hero-headline";
import Container from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { APP_URL, CTA_HREF } from "@/lib/site";

export default function Masthead() {
  return (
    <section className="-mt-[72px] bg-[linear-gradient(to_bottom,var(--hero-bg-top),var(--hero-bg))] lg:-mt-[88px]">
      <Container className="grid items-center gap-10 pb-14 pt-[128px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 lg:pb-20 lg:pt-[200px]">
        <HeroHeadline />
        <div className="flex flex-col items-start">
          <p className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] uppercase leading-[14px] text-ink sm:text-[12px]">
            <span>An intelligence layer</span>
            <span>&amp;</span>
            <span>operations partner</span>
            <span>for mobile apps</span>
          </p>
          <p className="max-w-[560px] text-balance pt-4 text-[16px] leading-[26px] text-quiet">
            Appfox reads your reviews, rankings, releases, and revenue, then tells you what needs attention and why,
            with the proof behind every finding.
          </p>
          <div className="flex flex-wrap gap-4 pt-8 sm:gap-5">
            <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="dark" size="lg">
              Start for free
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary" size="lg">
              See pricing
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
