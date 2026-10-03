import CtaBand from "@/components/cta-band";
import Editorial from "@/components/home/editorial";
import FaqSection, { homeFaq } from "@/components/home/faq-section";
import HeroShowcase from "@/components/home/hero-showcase";
import Journeys from "@/components/home/journeys";
import LayerStack from "@/components/home/layer-stack";
import Ledger from "@/components/home/ledger";
import MarketField from "@/components/home/market-field";
import Masthead from "@/components/home/masthead";
import PricingTable from "@/components/home/pricing-table";
import Surfaces from "@/components/home/surfaces";
import { PageJsonLd } from "@/components/json-ld";
import { SITE_DESCRIPTION, SITE_TITLE, faqJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <PageJsonLd path="/" name={SITE_TITLE} description={SITE_DESCRIPTION} extra={[faqJsonLd(homeFaq)]} />
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
