"use client";

import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import Container from "@/components/ui/container";
import ScaleToFit from "@/components/mock/scale-to-fit";
import {
  ART_HEIGHT,
  ART_WIDTH,
  AskFoxArt,
  CompetitorsArt,
  DraftsArt,
  OperateArt,
  ResearchArt,
  RevenueArt,
  ThemesArt,
} from "@/components/home/journey-art";

type Journey = {
  title: string;
  body: string;
  href: string;
  soon?: boolean;
  Art: ComponentType;
};

const JOURNEYS: Journey[] = [
  {
    title: "Research an idea before you build it",
    body: "Describe the idea, the store, and the country. Appfox discovers candidates, you confirm the set, and a brief is written from real listings and reviews, including the evidence against the idea.",
    href: "/research",
    Art: ResearchArt,
  },
  {
    title: "Operate a live app from one ranked feed",
    body: "Today ranks what changed across reviews, ratings, rankings, and the market, with the evidence attached. Each recommendation becomes one task you can follow up.",
    href: "/live-app",
    Art: OperateArt,
  },
  {
    title: "Track competitors with full history",
    body: "Confirm your competitors once. Every listing, rating, and price change is kept as history, so you can see what moved and when.",
    href: "/product",
    Art: CompetitorsArt,
  },
  {
    title: "Group reviews into exact themes",
    body: "Reviews are grouped into themes with exact counts and denominators. Every number links back to the customer's own words.",
    href: "/product",
    Art: ThemesArt,
  },
  {
    title: "Connect RevenueCat, read-only",
    body: "Appfox verifies the project and app binding, then reads revenue, active subscriptions, trials, and paid conversions. Nothing is written back.",
    href: "/integrations",
    Art: RevenueArt,
  },
  {
    title: "Draft replies and store copy",
    body: "Appfox drafts review replies and store copy from the evidence, for you to copy. It never posts or submits anything.",
    href: "/product",
    soon: true,
    Art: DraftsArt,
  },
  {
    title: "Ask Fox about your evidence",
    body: "Ask a question in plain words and get an answer built from your own reviews, releases, and metrics, with the sources linked.",
    href: "/product",
    soon: true,
    Art: AskFoxArt,
  },
];

function Soon() {
  return (
    <span className="shrink-0 whitespace-nowrap rounded-full bg-accent-soft px-2 py-0.5 font-sans text-[10px] font-bold normal-case leading-3 text-accent-ink">
      Coming soon
    </span>
  );
}

/** The soft card that holds the active scene on small screens, scaled to fit its width. */
function Stage({ index, className = "" }: { index: number; className?: string }) {
  const { Art } = JOURNEYS[index];
  return (
    <div
      className={`deck-front items-center justify-center ${className}`}
    >
      <div className="w-full max-w-[400px]">
        <ScaleToFit width={ART_WIDTH} height={ART_HEIGHT}>
          <Art key={index} />
        </ScaleToFit>
      </div>
    </div>
  );
}


/** Where each card sits in the deck: the front card, then four cards fanned out behind it. */
const POSES = [
  { transform: "translate(0px, 0px) rotate(0deg)", opacity: 1, z: 50 },
  { transform: "translate(-13px, 10px) rotate(-2.5deg)", opacity: 1, z: 40 },
  { transform: "translate(-25px, 19px) rotate(-5deg)", opacity: 1, z: 30 },
  { transform: "translate(-36px, 27px) rotate(-7.5deg)", opacity: 1, z: 20 },
  { transform: "translate(-46px, 34px) rotate(-10deg)", opacity: 1, z: 10 },
];
const HIDDEN_POSE = { ...POSES[POSES.length - 1], opacity: 0, z: 0 };
const SHUFFLE_MS = 700;

function ProgressRing({ value }: { value: number }) {
  return (
    <svg viewBox="0 0 32 32" className="size-8 -rotate-90" aria-hidden="true">
      <circle cx="16" cy="16" r="13" fill="none" stroke="#d6d6d3" strokeWidth="1.5" />
      <circle
        cx="16"
        cy="16"
        r="13"
        fill="none"
        stroke="#111"
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1 1"
        strokeDashoffset={1 - value}
        className="transition-[stroke-dashoffset] duration-500 ease-out"
      />
    </svg>
  );
}

function DeckButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="soft-key flex size-10 items-center justify-center rounded-full text-ink"
    >
      {children}
    </button>
  );
}

/**
 * A stack of cards, one per journey. The front card holds the active scene; switching sends it
 * up and behind the deck while the next card moves forward.
 */
function Deck({
  active,
  leaving,
  onPrev,
  onNext,
}: {
  active: number;
  leaving: number | null;
  onPrev: () => void;
  onNext: () => void;
}) {
  const count = JOURNEYS.length;
  return (
    <div className="hidden flex-col lg:flex">
      <div className="ml-auto flex w-[calc(100%-60px)] max-w-[460px] items-center justify-between">
        <div className="flex items-center gap-3">
          <ProgressRing value={(active + 1) / count} />
          <span className="font-mono text-[14px] leading-5 text-ink" aria-live="polite">
            {active + 1} / {count}
          </span>
        </div>
        <div className="flex gap-2">
          <DeckButton label="Previous" onClick={onPrev}>
            <ArrowLeft className="size-4" strokeWidth={2} aria-hidden="true" />
          </DeckButton>
          <DeckButton label="Next" onClick={onNext}>
            <ArrowRight className="size-4" strokeWidth={2} aria-hidden="true" />
          </DeckButton>
        </div>
      </div>

      <div className="relative isolate mb-[72px] ml-auto mt-8 aspect-[23/20] w-[calc(100%-60px)] max-w-[460px]">
        {JOURNEYS.map((journey, i) => {
          const pos = (i - active + count) % count;
          const pose = POSES[pos] ?? HIDDEN_POSE;
          const isFront = pos === 0;
          const isLeaving = i === leaving;
          const { Art } = journey;
          return (
            <div
              key={journey.title}
              aria-hidden="true"
              className={`deck-card absolute inset-0 flex items-center justify-center overflow-hidden rounded-[32px] p-8 ${
                isFront ? "deck-front" : "deck-back"
              } ${isLeaving ? "deck-leaving" : ""}`}
              style={
                {
                  transform: pose.transform,
                  opacity: pose.opacity,
                  zIndex: pose.z,
                  "--to-transform": pose.transform,
                  "--to-opacity": pose.opacity,
                } as CSSProperties
              }
            >
              {isFront || isLeaving ? (
                <div className="w-full max-w-[400px]">
                  <ScaleToFit width={ART_WIDTH} height={ART_HEIGHT}>
                    <Art />
                  </ScaleToFit>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Journeys() {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function go(next: number) {
    if (next === active) return;
    setLeaving(active);
    setActive(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLeaving(null), SHUFFLE_MS);
  }

  return (
    <Container as="section" className="py-24 lg:py-40">
      <h2 className="text-display-md text-ink">What that lets you do.</h2>
      <p className="pt-2 text-[16px] leading-[26px] text-muted">
        Two journeys, one workspace, one evidence ledger. Start wherever you are.
      </p>
      <div className="mt-10 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
        <div className="flex flex-col self-start">
          {JOURNEYS.map((journey, i) => {
            const isActive = i === active;
            return (
              <div key={journey.title} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-expanded={isActive}
                  aria-controls={`journey-${i}`}
                  className={`flex w-full items-center gap-2.5 text-left font-mono text-[14px] font-medium uppercase leading-5 tracking-normal text-ink transition-[padding] duration-300 ${
                    isActive ? "pb-1.5 pt-5" : "py-4"
                  }`}
                >
                  {journey.title}
                  {journey.soon ? <Soon /> : null}
                  <Plus
                    className={`ml-auto size-4 shrink-0 text-quiet transition-transform duration-300 ${isActive ? "rotate-45" : ""}`}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={`journey-${i}`}
                  inert={!isActive}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[560px] text-[16px] leading-[26px] text-muted">{journey.body}</p>
                    <Link
                      href={journey.href}
                      className="mb-5 mt-3 inline-flex items-center gap-1 text-[14px] font-semibold leading-5 text-accent-ink hover:underline"
                    >
                      Learn more
                      <ArrowRight className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
                    </Link>
                    {isActive ? <Stage index={i} className="mb-5 flex rounded-[32px] p-5 lg:hidden" /> : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Deck
          active={active}
          leaving={leaving}
          onPrev={() => go((active - 1 + JOURNEYS.length) % JOURNEYS.length)}
          onNext={() => go((active + 1) % JOURNEYS.length)}
        />
      </div>
    </Container>
  );
}
