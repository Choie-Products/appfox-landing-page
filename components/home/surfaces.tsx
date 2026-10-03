import Image from "next/image";
import Container from "@/components/ui/container";

/** A surface illustration, centered on a light panel at the top of its card. */
function SurfaceArt({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex aspect-[4/3] items-center justify-center rounded-b-[24px] bg-[#f6f6f6]">
      <Image
        src={src}
        alt={alt}
        width={1254}
        height={1254}
        sizes="(min-width: 768px) 280px, 70vw"
        className="h-auto w-[70%]"
      />
    </div>
  );
}

export default function Surfaces() {
  return (
    <section>
      <Container className="pb-6 pt-[164px] sm:pb-10 lg:pt-[196px]">
        <p className="mx-auto max-w-[1000px] text-balance text-center text-display-md text-ink">
          Every day, Appfox checks your app, reviews, and competitors, and ranks what changed. It all lives in three
          places:
        </p>
      </Container>
      <Container className="grid gap-6 pb-16 pt-6 md:grid-cols-3 lg:pb-24">
        {/* Today */}
        <div className="flex flex-col overflow-hidden rounded-[24px] border-2 border-ink bg-ink text-center">
          <SurfaceArt
            src="/illustrations/today-2.png"
            alt="Illustration of a person pointing at a ranked Today list, with the top item flagged as urgent next to a clock."
          />
          <div className="flex-1 bg-ink px-6 pb-7 pt-6">
            <h2 className="font-mono text-[12px] font-medium uppercase leading-4 tracking-normal text-white">
              Today
            </h2>
            <p className="pt-2 text-[16px] leading-[26px] text-[#b8b8b4]">
              The ranked list of what needs you today. Severity, freshness, and
              evidence set the order. A quiet day shows as a quiet day.
            </p>
          </div>
        </div>

        {/* Market */}
        <div className="flex flex-col overflow-hidden rounded-[24px] border-2 border-ink bg-ink text-center">
          <SurfaceArt
            src="/illustrations/market-2.png"
            alt="Illustration of a person comparing app prices on iOS and Android, with a chart showing a price going up."
          />
          <div className="flex-1 bg-ink px-6 pb-7 pt-6">
            <h2 className="font-mono text-[12px] font-medium uppercase leading-4 tracking-normal text-white">
              Market
            </h2>
            <p className="pt-2 text-[16px] leading-[26px] text-[#b8b8b4]">
              Your confirmed competitors, with every listing and price change
              kept as history. A living market, not a one-off report.
            </p>
          </div>
        </div>

        {/* Customers */}
        <div className="flex flex-col overflow-hidden rounded-[24px] border-2 border-ink bg-ink text-center">
          <SurfaceArt
            src="/illustrations/customers-2.png"
            alt="Illustration of a person reading review themes with counts out of 48, next to a quote from a customer."
          />
          <div className="flex-1 bg-ink px-6 pb-7 pt-6">
            <h2 className="font-mono text-[12px] font-medium uppercase leading-4 tracking-normal text-white">
              Customers
            </h2>
            <p className="pt-2 text-[16px] leading-[26px] text-[#b8b8b4]">
              Reviews grouped into themes with exact counts and denominators.
              The customer&rsquo;s own words stay one click away.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
