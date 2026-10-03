import Dashboard from "@/components/mock/dashboard";
import { HalftoneSvg } from "@/components/home/halftone";
import Reveal from "@/components/reveal";

/** The dashboard mock sits on top of the halftone band and is cropped at the band's bottom edge. */
export default function HeroShowcase() {
  return (
    <section
      className="relative h-[220px] overflow-hidden bg-[var(--hero-bg)] sm:h-[360px] lg:h-[520px] xl:h-[600px]"
      aria-label="Appfox dashboard preview"
    >
      <HalftoneSvg className="absolute inset-0 h-full w-full opacity-[0.04]" />
      <div className="absolute left-1/2 top-8 w-[calc(100%-32px)] sm:top-12 lg:top-20 max-w-[1540px] -translate-x-1/2 sm:w-[84%]">
        <Reveal variant="scale" delay={320} className="overflow-hidden rounded-[15px] bg-white">
          <Dashboard />
        </Reveal>
      </div>
    </section>
  );
}
