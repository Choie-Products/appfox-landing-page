import { CustomersArt, MarketArt, TodayArt } from "@/components/illustrations/iso-art";
import Container from "@/components/ui/container";
import Reveal from "@/components/reveal";

const CARDS = [
  {
    name: "Today",
    Art: TodayArt,
    body: "See what needs attention first, why it matters, and the evidence behind it. When nothing significant changes, Appfox says so.",
  },
  {
    name: "Market",
    Art: MarketArt,
    body: "Follow the competitors you choose. See how their listings, prices, and rankings change over time, without checking each app yourself.",
  },
  {
    name: "Customers",
    Art: CustomersArt,
    body: "Find recurring complaints, feature requests, and what people love. See how many collected reviews mention each theme, then read the originals.",
  },
];

export default function Surfaces() {
  return (
    <section>
      <Container className="pt-40 lg:pt-64">
        <Reveal>
        <h2 className="mx-auto max-w-[1000px] text-balance text-center text-display-md text-ink">
          Know what changed, what customers need, and where competitors are moving. Appfox brings the evidence
          together around three questions:
        </h2>
        </Reveal>
      </Container>
      <Container className="mt-10 grid gap-6 pb-24 md:grid-cols-3 lg:mt-16 lg:pb-40">
        {CARDS.map(({ name, Art, body }, i) => (
          <Reveal key={name} delay={i * 90} className="flex">
          <div className="soft-card flex w-full flex-col rounded-[24px] text-center">
            <div className="flex aspect-[4/3] items-center justify-center px-4 pt-4">
              <Art className="h-auto w-full max-w-[340px]" />
            </div>
            <div className="flex-1 px-6 pb-8 pt-2">
              <h3 className="font-mono text-[12px] font-medium uppercase leading-4 tracking-normal text-ink">{name}</h3>
              <p className="pt-2 text-[16px] leading-[26px] text-muted">{body}</p>
            </div>
          </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
