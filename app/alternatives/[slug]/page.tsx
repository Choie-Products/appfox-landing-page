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
    description: `The best ${c.name} alternatives for indie founders and small studios in ${YEAR}: Appfox, ${others.join(", ")}. Pricing, free plans, what each does best, and how to choose, checked ${CHECKED}.`,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const m = meta((await params).slug);
  return m ? pageMetadata({ path: m.path, title: m.title, description: m.description }) : {};
}

const HOW_TO_CHOOSE = [
  "Start with the question you ask most mornings. If it is \"what changed and what should I do\", you want a reading tool. If it is \"how many downloads did we get\", you want reporting.",
  "Check the free plan and the first paid tier against your app count. Per-app pricing is cheap for one app and expensive for a portfolio.",
  "Ask whether the tool writes to your store. Automated replies save time for support teams and are a risk for a solo founder.",
  "Look for windows and samples on every number. A percentage without a denominator is a guess with a decimal point.",
];

export default async function AlternativesPage({ params }: { params: Promise<{ slug: string }> }) {
  const m = meta((await params).slug);
  if (!m) notFound();
  const { c, path, title, description } = m;
  const others = competitors.filter((o) => o.slug !== c.slug);

  const faq = [
    {
      q: `What is the best ${c.name} alternative for an indie developer?`,
      a: `For one founder or a small studio that wants reviews, rankings, releases, revenue, and competitors read daily with evidence, Appfox: a free plan and a $29 Indie tier. ${others
        .map((o) => `${o.name} is the stronger choice if ${o.chooseThem[0].charAt(0).toLowerCase()}${o.chooseThem[0].slice(1)}`)
        .join(". ")}.`,
    },
    {
      q: `Is there a free ${c.name} alternative?`,
      a: `Appfox has a free plan covering one app and one market. ${others
        .filter((o) => o.pricing.free)
        .map((o) => `${o.name} also offers a free plan`)
        .join(", ")}${others.some((o) => !o.pricing.free) ? `. ${others.filter((o) => !o.pricing.free).map((o) => o.name).join(" and ")} offer trials rather than free plans` : ""}, as listed ${CHECKED}.`,
    },
    {
      q: `Why do people switch from ${c.name}?`,
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
            Start Appfox free
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
          lead={`We build Appfox, so it is listed first and labeled as ours. The others are described from their own websites, checked ${CHECKED}.`}
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
                  <dd className="text-ink">Yes</dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-line py-2.5">
                  <dt className="text-quiet">Paid from</dt>
                  <dd className="text-right text-ink">$29 a month</dd>
                </div>
              </dl>
            </div>
            <div>
              <p className="text-[16px] leading-[26px] text-muted">
                Best for {APPFOX.bestFor.charAt(0).toLowerCase()}
                {APPFOX.bestFor.slice(1)}. Appfox reads App Store and Google Play reviews, rankings, releases, revenue,
                and competitors every day and ranks what changed with the evidence attached. It adds AI research briefs
                for new ideas and privacy-masked session replay, and it never writes to a store or provider.
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
                    <dd className="text-ink">{o.pricing.free ? "Yes" : "No, trial"}</dd>
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

      <CtaBand title="Try the alternative that shows its evidence." lead="Start free. Public store data works from day one, and nothing is ever written back." />
    </>
  );
}
