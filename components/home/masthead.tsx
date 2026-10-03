import HeroHeadline from "@/components/home/hero-headline";
import Container from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { APP_URL, CTA_HREF } from "@/lib/site";

const DESCRIPTION =
  "Appfox reads your reviews, rankings, releases, and revenue, then tells you what needs attention and why, with the proof behind every finding.";

export default function Masthead() {
  return (
    <section className="-mt-[72px] bg-[linear-gradient(to_bottom,var(--hero-bg-top),var(--hero-bg))] lg:-mt-[88px]">
      <Container className="flex flex-col items-center pb-14 pt-[128px] text-center lg:pb-20 lg:pt-[200px]">
        <HeroHeadline />
        <p className="max-w-[640px] text-balance pt-6 text-[16px] leading-[26px] text-quiet">{DESCRIPTION}</p>
        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <ButtonLink
            href={CTA_HREF}
            external={Boolean(APP_URL)}
            variant="dark"
            size="md"
            className="h-auto px-5 py-3 leading-5"
          >
            Start for free
          </ButtonLink>
          <ButtonLink href="/pricing" variant="secondary" size="md" className="h-auto px-5 py-3 leading-5">
            See pricing
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
