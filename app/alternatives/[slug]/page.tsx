import { notFound } from "next/navigation";
import CtaBand from "@/components/cta-band";
import FaqBlock from "@/components/faq-block";
import { PageJsonLd } from "@/components/json-ld";
import { CheckList, MonoLabel, MonoLink, Section } from "@/components/ui/blocks";
import { ButtonLink } from "@/components/ui/button";
import PageIntro from "@/components/ui/page-intro";
import SectionHeading from "@/components/ui/section-heading";
import { APPFOX, CHECKED, competitors, getCompetitor } from "@/content/competitors";
import { faqJsonLd, itemListJsonLd, pageMetadata } from "@/lib/seo";
import { APP_URL, CTA_HREF, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

const YEAR = CHECKED.split(" ").pop();

export function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }));
}

function meta(slug: string) {
  const c = getCompetitor(slug);
  if (!c) return null;
  const others = competitors.filter((o) => o.slug !== slug).map((o) => o.name);
  return {
    c,
    others,
    path: `/alternatives/${c.slug}`,
    title: `${c.name} Alternatives (${YEAR}): Appfox, ${others.join(", ")}`,
    description: `Compare ${c.name} alternatives for app developers in ${YEAR}: Appfox, ${others.join(", ")}. Explore workflows, billing terms, free options, and beta availability.`,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const m = meta((await params).slug);
  return m ? pageMetadata({ path: m.path, title: m.title, description: m.description }) : {};
}

const HOW_TO_CHOOSE = [
  "Start with the question you ask most mornings. If it is \"what changed and what should I do\", you want a reading tool. If it is \"how many downloads did we get\", you want reporting.",
  "Price the same workload in each tool: apps, markets, seats, keywords, and replies. Compare the same billing period and include any required add-ons.",
  "Decide whether you need store replies or analysis only. If you need automation, check approval controls, permissions, and the plan that includes it.",
  "Test one real question in each product. Inspect the source reviews, date windows, sample sizes, and limitations before deciding which answer helps you most.",
];

export default async function AlternativesPage({ params }: { params: Promise<{ slug: string }> }) {
  const m = meta((await params).slug);
  if (!m) notFound();
  const { c, path, title, description } = m;
  const others = competitors.filter((o) => o.slug !== c.slug);

  const faq = [
    {
      q: `What is the best ${c.name} alternative for an indie developer?`,
      a: `Appfox may fit app research, review themes, and daily findings, with access by invitation. Its Free and paid plans are proposed; RevenueCat and replay are unavailable in the beta. ${others
        .map((o) => `${o.name} is the stronger choice if ${o.chooseThem[0].charAt(0).toLowerCase()}${o.chooseThem[0].slice(1)}`)
        .join(". ")}.`,
    },
    {
      q: `Is there a free ${c.name} alternative?`,
      a: `Appfox has a proposed Free plan, but current access is invite-only. ${others
        .filter((o) => o.pricing.free)
        .map((o) => `${o.name} lists ${o.pricing.freeLabel ? "free options for some products" : "a free plan"}`)
        .join(", ")}${others.some((o) => !o.pricing.free) ? `. ${others.filter((o) => !o.pricing.free).map((o) => o.name).join(" and ")} offer trials rather than free plans` : ""}, as listed ${CHECKED}.`,
    },
    {
      q: `How should I compare alternatives to ${c.name}?`,
      a: c.alternativesIntro,
    },
  ];

  const listed = [
    {
      name: "Appfox",
      url: SITE_URL,
      description: `${APPFOX.category}. ${APPFOX.bestFor}.`,
    },
    ...others.map((o) => ({ name: o.name, url: o.website, description: `${o.category}. ${o.bestFor}.` })),
  ];

  return (
    <>
      <PageJsonLd
        path={path}
        name={title}
        description={description}
        extra={[itemListJsonLd({ name: `${c.name} alternatives`, items: listed }), faqJsonLd(faq)]}
      />
      <PageIntro
        kicker="Alternatives"
        title={
          <>
            <span className="block">{c.name} alternatives</span>
            <span className="block text-quiet">for founders and small studios, {YEAR}.</span>
          </>
        }
        lead={c.alternativesIntro}
      >
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href={CTA_HREF} external={Boolean(APP_URL)} variant="dark" size="hero">
            Request Appfox access
          </ButtonLink>
          <ButtonLink href={`/compare/${c.slug}`} variant="secondary" size="hero">
            Appfox vs {c.name}
          </ButtonLink>
        </div>
      </PageIntro>

      <Section className="pt-4 lg:pt-8">
        <SectionHeading
          title={`Four ${c.name} alternatives,`}
          sub="each for a different job."
          lead={`We build Appfox, so it is listed first and labeled as ours. Vendor pages were checked ${CHECKED}. This is an editorial shortlist, not a ranking or a hands-on benchmark.`}
          className="max-w-[640px]"
        />
        <ol className="mt-10 grid gap-5">
          {/* Appfox */}
          <li className="soft-surface grid gap-6 rounded-[28px] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12">
            <div>
              <span className="font-mono text-[14px] leading-5 text-accent-ink">01</span>
              <h3 className="pt-4 font-mono text-[14px] font-medium uppercase leading-5 text-ink">
                Appfox <span className="text-accent-ink">(ours)</span>
              </h3>
              <p className="pt-2 text-[14px] leading-5 text-quiet">{APPFOX.category}</p>
              <dl className="pt-4 text-[14px] leading-5">
                <div className="flex justify-between gap-4 border-t border-line py-2.5">
                  <dt className="text-quiet">Free plan</dt>
                  <dd className="text-ink">Proposed; invite-only beta</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-line py-2.5">
                  <dt className="text-quiet">Paid from</dt>
                  <dd className="text-right text-ink">Proposed: $29/month</dd>
                </div>
              </dl>
            </div>
            <div>
              <p className="text-[16px] leading-[26px] text-muted">
                Best for {APPFOX.bestFor.charAt(0).toLowerCase()}
                {APPFOX.bestFor.slice(1)}. The private beta includes research briefs, daily findings, review themes,
                and competitor and rank tracking. RevenueCat, replay, reply drafts, Ask Fox, and API access are
                planned and unavailable in the beta.
              </p>
              <CheckList items={c.chooseUs.slice(0, 3)} className="pt-3" />
              <div className="flex flex-wrap gap-x-8 gap-y-2 pt-5">
                <MonoLink href="/product">See the product</MonoLink>
                <MonoLink href="/pricing">Pricing</MonoLink>
              </div>
            </div>
          </li>
          {others.map((o, i) => (
            <li
              key={o.slug}
              className="soft-surface grid gap-6 rounded-[28px] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12"
            >
              <div>
                <span className="font-mono text-[14px] leading-5 text-accent-ink">{String(i + 2).padStart(2, "0")}</span>
                <h3 className="pt-4 font-mono text-[14px] font-medium uppercase leading-5 text-ink">{o.name}</h3>
                <p className="pt-2 text-[14px] leading-5 text-quiet">{o.category}</p>
                <dl className="pt-4 text-[14px] leading-5">
                  <div className="flex justify-between gap-4 border-t border-line py-2.5">
                    <dt className="text-quiet">Free plan</dt>
                    <dd className="text-ink">{o.pricing.freeLabel ?? (o.pricing.free ? "Yes" : "No, trial")}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-line py-2.5">
                    <dt className="text-quiet">Paid from</dt>
                    <dd className="text-right text-ink">{o.pricing.from}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <p className="text-[16px] leading-[26px] text-muted">
                  Best for {o.bestFor.charAt(0).toLowerCase()}
                  {o.bestFor.slice(1)}. {o.summary}
                </p>
                <CheckList items={o.strengths.slice(0, 3)} className="pt-3" />
                <p className="pt-3 text-[13px] leading-5 text-quiet">
                  {o.pricing.note}{" "}
                  Sources: {o.sources.map((source, index) => (
                    <span key={source.href}>{index > 0 ? " · " : ""}<a href={source.href} className="underline underline-offset-2 hover:text-ink">{source.label}</a></span>
                  ))}.
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-2 pt-5">
                  <MonoLink href={`/compare/${o.slug}`}>Appfox vs {o.name}</MonoLink>
                  <MonoLink href={o.website}>Visit {o.name}</MonoLink>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <SectionHeading title="How to choose" sub={`a ${c.name} alternative.`} />
          <ol>
            {HOW_TO_CHOOSE.map((d, i) => (
              <li key={d} className="flex gap-5 border-t border-line py-5">
                <span className="font-mono text-[14px] leading-5 text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-[16px] leading-[26px] text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-10">
          <MonoLabel>Not sure yet?</MonoLabel>
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-3">
            <MonoLink href={`/compare/${c.slug}`}>Read Appfox vs {c.name}</MonoLink>
            <MonoLink href="/compare">All comparisons</MonoLink>
          </div>
        </div>
      </Section>

      <FaqBlock title={`${c.name} alternatives,`} sub="common questions." items={faq} />

      <CtaBand title="Try the alternative that shows its evidence." lead="Request a private beta invitation. Start with public store data and findings you can check." />
    </>
  );
}
