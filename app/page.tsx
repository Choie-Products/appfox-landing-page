import CtaBand from "@/components/cta-band";
import Editorial from "@/components/home/editorial";
import FaqSection from "@/components/home/faq-section";
import HeroShowcase from "@/components/home/hero-showcase";
import Journeys from "@/components/home/journeys";
import LayerStack from "@/components/home/layer-stack";
import Ledger from "@/components/home/ledger";
import MarketField from "@/components/home/market-field";
import Masthead from "@/components/home/masthead";
import PricingTable from "@/components/home/pricing-table";
import Surfaces from "@/components/home/surfaces";

export default function HomePage() {
  return (
    <>
      <Masthead />
      <HeroShowcase />
      <Surfaces />
      <Editorial />
      <LayerStack />
      <Journeys />
      <MarketField />
      <Ledger />
      <PricingTable />
      <FaqSection />
      <CtaBand spacing="py-24 lg:py-40" />
    </>
  );
}
