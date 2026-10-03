import HeroHeadline from "@/components/home/hero-headline";
import Container from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { APP_URL, CTA_HREF } from "@/lib/site";
import Reveal from "@/components/reveal";

const KICKER = "AI app store tracker for iOS and Android";
const DESCRIPTION =
  "Appfox reads your App Store and Google Play reviews, rankings, releases, revenue, and competitors every day, then tells you what needs attention and why, with the proof behind every finding.";

export default function Masthead() {
  return (
    <section className="-mt-[72px] bg-[linear-gradient(to_bottom,var(--hero-bg-top),var(--hero-bg))] lg:-mt-[88px]">
      <Container className="flex flex-col items-center pb-14 pt-[128px] text-center lg:pb-20 lg:pt-[200px]">
        <Reveal>
          <p className="label-mono pb-5 text-ink">{KICKER}</p>
        </Reveal>
        <HeroHeadline />
        <Reveal delay={140}>
          <p className="max-w-[640px] text-balance pt-6 text-[16px] leading-[26px] text-quiet">{DESCRIPTION}</p>
        </Reveal>
        <Reveal delay={240} className="flex flex-wrap justify-center gap-4 pt-8">
          <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="dark" size="hero">
            Start for free
          </ButtonLink>
          <ButtonLink href="/pricing" variant="secondary" size="hero">
            See pricing
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
