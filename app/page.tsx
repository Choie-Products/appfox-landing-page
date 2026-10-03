import CtaBand from "@/components/cta-band";
import Editorial from "@/components/home/editorial";
import FaqSection from "@/components/home/faq-section";
import HeroShowcase from "@/components/home/hero-showcase";
import Journeys from "@/components/home/journeys";
import Layers from "@/components/home/layers";
import Ledger from "@/components/home/ledger";
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
      <Layers />
      <Journeys />
      <Ledger />
      <PricingTable />
      <FaqSection />
      <CtaBand />
    </>
  );
}
