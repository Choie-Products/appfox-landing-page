import { CustomersArt, MarketArt, TodayArt } from "@/components/home/surface-art";
import Container from "@/components/ui/container";

const CARDS = [
  {
    name: "Today",
    Art: TodayArt,
    body: "The ranked list of what needs you today. Severity, freshness, and evidence set the order. A quiet day shows as a quiet day.",
  },
  {
    name: "Market",
    Art: MarketArt,
    body: "Your confirmed competitors, with every listing and price change kept as history. A living market, not a one-off report.",
  },
  {
    name: "Customers",
    Art: CustomersArt,
    body: "Reviews grouped into themes with exact counts and denominators. The customer\u2019s own words stay one click away.",
  },
];

export default function Surfaces() {
  return (
    <section>
      <Container className="pt-40 lg:pt-64">
        <p className="mx-auto max-w-[1000px] text-balance text-center text-display-md text-ink">
          Every day, Appfox checks your app, reviews, and competitors, and ranks what changed. It all lives in three
          places:
        </p>
      </Container>
      <Container className="mt-10 grid gap-6 pb-24 md:grid-cols-3 lg:mt-16 lg:pb-40">
        {CARDS.map(({ name, Art, body }) => (
          <div key={name} className="soft-card flex flex-col rounded-[24px] text-center">
            <div className="flex aspect-[4/3] items-center justify-center px-4 pt-4">
              <Art className="h-auto w-full max-w-[340px]" />
            </div>
            <div className="flex-1 px-6 pb-8 pt-2">
              <h2 className="font-mono text-[12px] font-medium uppercase leading-4 tracking-normal text-ink">{name}</h2>
              <p className="pt-2 text-[16px] leading-[26px] text-muted">{body}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
