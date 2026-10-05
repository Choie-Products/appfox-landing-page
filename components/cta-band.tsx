import FoxMark from "@/components/fox-mark";
import { ButtonLink } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { APP_URL, CTA_HREF } from "@/lib/site";
import Reveal from "@/components/reveal";

/** Closing call to action for inner pages: a black card that sends people to sign up or to pricing. */
export default function CtaBand({
  title = "Build your next release with a clearer picture.",
  lead = "Research your idea, understand your reviews, and follow your competitors. Request an invitation to the Appfox private beta.",
  secondary = { label: "See pricing", href: "/pricing" },
  spacing = "py-16 lg:py-24",
}: {
  title?: string;
  lead?: string;
  secondary?: { label: string; href: string };
  /** Vertical padding around the card; the homepage uses a roomier rhythm. */
  spacing?: string;
}) {
  return (
    <section id="get-started" className="scroll-mt-20">
      <Container className={spacing}>
        <Reveal variant="scale" className="relative overflow-hidden rounded-[32px] bg-ink px-8 py-12 sm:px-12 lg:px-16 lg:py-16">
          <FoxMark className="pointer-events-none absolute -right-8 -top-16 h-[300px] w-[285px] text-white opacity-[0.05]" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="font-mono text-[14px] font-medium uppercase leading-5 tracking-normal text-[#ff8a4c]">
                Private beta
              </p>
              <h2 className="max-w-[640px] pt-4 font-display text-[34px] font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-[50px]">
                {title}
              </h2>
              <p className="max-w-[32rem] pt-4 text-[16px] leading-[26px] text-[#b8b8b4]">{lead}</p>
            </div>
            <div className="lg:justify-self-end">
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="primary" size="lg">
                  Request access
                </ButtonLink>
                <ButtonLink
                  href={secondary.href}
                  variant="ghost"
                  size="lg"
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  {secondary.label}
                </ButtonLink>
              </div>
              <p className="pt-4 text-[13px] leading-5 text-[#8a8a8a]">
                Invitations are sent by email.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
