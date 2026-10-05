import type { ComponentProps } from "react";
import Container from "@/components/ui/container";
import Reveal from "@/components/reveal";
import PricingGridClient from "@/components/home/pricing-grid";
import { SHOWN_PLANS, SHOWN_ROWS } from "@/content/plans";

export default function PricingTable() {
  return (
    <section id="pricing" className="scroll-mt-20">
      <Container className="py-24 lg:py-40">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[520px]">
            <h2 className="text-display-md text-ink">
              Plans for your first app and the ones after it.
            </h2>
            <p className="label-mono pt-3">
              Proposed pricing · Private beta
            </p>
          </div>
          <p className="max-w-[480px] text-[16px] leading-[26px] text-muted">
            Appfox is invite-only. These proposed plans show how pricing may grow
            with your apps, history, and team. Features and limits may change;
            planned features are not included in the current beta.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <PricingGrid />
        </Reveal>
      </Container>
    </section>
  );
}

/** The plan comparison table with the raised Indie column, filled with the shown plans. Shared by the homepage and the pricing page. */
export function PricingGrid(props: Omit<ComponentProps<typeof PricingGridClient>, "plans" | "rows">) {
  return <PricingGridClient plans={SHOWN_PLANS} rows={SHOWN_ROWS} {...props} />;
}
