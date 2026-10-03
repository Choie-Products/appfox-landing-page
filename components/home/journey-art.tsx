import type { ReactNode } from "react";
import Image from "next/image";
import {
  Activity,
  BadgeCheck,
  Check,
  Copy,
  ListOrdered,
  Lock,
  MessageSquareText,
  Send,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Target,
  X,
} from "lucide-react";
import AppleLogo from "@/components/apple-logo";
import FoxMark from "@/components/fox-mark";

/**
 * Small product scenes for the "What that lets you do" panel. Each is drawn at 400×330 and scaled to fit.
 * Scenes are static; only the deck around them moves.
 */

export const ART_WIDTH = 400;
export const ART_HEIGHT = 330;

const CARD = "rounded-[16px] border border-ink bg-white text-ink";
const DARK = "rounded-[14px] bg-[#111] text-white";

function Scene({ children }: { children: ReactNode }) {
  return (
    <div className="relative font-sans" style={{ width: ART_WIDTH, height: ART_HEIGHT }} aria-hidden="true">
      {children}
    </div>
  );
}

function Tile({ label, bg, size = 32, children }: { label?: string; bg: string; size?: number; children?: ReactNode }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[28%] text-[13px] font-bold text-white"
      style={{ width: size, height: size, background: bg }}
    >
      {children ?? label}
    </span>
  );
}

function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold leading-3 ${className}`}>
      {children}
    </span>
  );
}

/* 1 · Research an idea ------------------------------------------------------------------------ */

/** Real App Store icons for the candidate set; the grocery list app is the one you leave out. */
const CANDIDATES = [
  { id: "mealime", name: "Mealime" },
  { id: "plantoeat", name: "Plan to Eat" },
  { id: "eatthismuch", name: "Eat This Much" },
  { id: "paprika", name: "Paprika" },
  { id: "bring", name: "Bring!", rejected: true },
];

export function ResearchArt() {
  return (
    <Scene>
      <div className={`absolute left-0 top-0 w-[330px] p-4 ${CARD}`}>
        <p className="font-mono text-[10px] uppercase leading-3 text-quiet">New idea</p>
        <div className="mt-2 flex items-center rounded-[10px] bg-[#f6f6f6] px-3 py-2.5 text-[13px] font-semibold leading-4">
          <span className="overflow-hidden whitespace-nowrap">
            Meal planner for busy parents
          </span>
          <span className="ml-0.5 h-4 w-[1.5px] bg-accent" />
        </div>
        <div className="mt-2 flex gap-1.5">
          {["App Store", "United States", "Food & Drink"].map((chip, i) => (
            <span key={chip}>
              <Pill className="border border-[#e6e6e4] text-ink">{chip}</Pill>
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[12px] font-semibold leading-4">Candidates</p>
          <p className="text-[10px] leading-3 text-quiet">You confirm the set</p>
        </div>
        <div className="mt-2.5 flex gap-2.5">
          {CANDIDATES.map((c, i) => (
            <span key={c.id} className="relative">
              <Image
                src={`/icons/${c.id}.jpg`}
                alt=""
                width={36}
                height={36}
                className={`block size-9 rounded-[22%] ring-1 ring-[#e6e6e4] ${c.rejected ? "opacity-40 grayscale" : ""}`}
              />
              <span
                className={`absolute -right-1 -top-1 flex size-[15px] items-center justify-center rounded-full ring-2 ring-white ${
                  c.rejected ? "bg-[#c8c8c4]" : "bg-accent"
                }`}
              >
                {c.rejected ? (
                  <X className="size-2.5 text-white" strokeWidth={3.5} />
                ) : (
                  <Check className="size-2.5 text-white" strokeWidth={3.5} />
                )}
              </span>
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            { label: "Listings read", value: "38", width: "100%" },
            { label: "Reviews read", value: "1,204", width: "72%" },
          ].map((row, i) => (
            <div key={row.label}>
              <div className="flex justify-between text-[11px] leading-4">
                <span className="text-quiet">{row.label}</span>
                <span className="font-semibold">{row.value}</span>
              </div>
              <span className="mt-1 block h-1.5 rounded-full bg-[#f0f0ee]">
                <span
                  className="block h-1.5 rounded-full bg-ink"
                  style={{ width: row.width }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[196px]">
        <div className={`p-3.5 ${DARK}`}>
          <p className="font-mono text-[10px] uppercase leading-3 text-[#ff8a4c]">Evidence against</p>
          <p className="pt-1.5 text-[12px] font-semibold leading-4">Three strong apps already sell for under $5 a month</p>
          <p className="pt-2 text-[10px] leading-3 text-dark-muted">Brief ready · 12 sources</p>
        </div>
      </div>
    </Scene>
  );
}

/* 2 · Operate a live app ---------------------------------------------------------------------- */

const FEED = [
  { title: "Pricing complaints rose after v2.8", meta: "High · 47 reviews · v2.8", hot: true },
  { title: "Snapfit raised its annual price", meta: "Medium · Market · 2 days ago" },
  { title: "Slipped to #14 in Food & Drink", meta: "Low · Charts · United States" },
];

export function OperateArt() {
  return (
    <Scene>
      <div className={`absolute left-0 top-0 w-[352px] p-4 ${CARD}`}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[13px] font-semibold leading-4">
            <ListOrdered className="size-4" strokeWidth={1.9} />
            Today
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase leading-3 text-quiet">
            <span className="size-1.5 rounded-full bg-accent" />
            Live
          </span>
        </div>
        <p className="pt-1 text-[11px] leading-4 text-quiet">3 things need you today, ranked by what matters</p>
        <div className="mt-3 flex flex-col gap-2">
          {FEED.map((row, i) => (
            <div
              key={row.title}
              className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 ${
                row.hot ? "bg-accent-soft ring-1 ring-[rgba(254,80,0,0.3)]" : "bg-[#f7f7f6]"
              }`}
            >
              <span
                className={`flex size-[22px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                  row.hot ? "bg-accent text-white" : "bg-[#e6e6e4] text-ink"
                }`}
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[12px] font-semibold leading-4">{row.title}</span>
                <span className="block text-[10px] leading-[14px] text-quiet">{row.meta}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[232px]">
        <div className={`p-3.5 ${DARK}`}>
          <p className="text-[12px] font-semibold leading-4">Review annual-plan framing</p>
          <p className="text-[10px] leading-[14px] text-dark-muted">impact high · effort low · 0.86</p>
          <div className="mt-2.5 flex items-center justify-between border-t border-dark-line pt-2.5">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold leading-4">
              <span className="flex size-4 items-center justify-center rounded-full bg-accent">
                <Check className="size-2.5" strokeWidth={3.5} />
              </span>
              Task created
            </span>
            <span className="text-[10px] leading-3 text-dark-muted">Follow-up in 14 days</span>
          </div>
        </div>
      </div>
    </Scene>
  );
}

/* 3 · Track competitors ----------------------------------------------------------------------- */

const HISTORY = [
  { date: "Sep 12", text: "Annual price", value: "$29.99 → $39.99", hot: true },
  { date: "Aug 28", text: "New screenshots", value: "6 changed" },
  { date: "Aug 03", text: "Rating", value: "4.6 → 4.5" },
];

export function CompetitorsArt() {
  return (
    <Scene>
      <div className={`absolute left-[14px] top-0 w-[372px] p-4 ${CARD}`}>
        <div className="flex items-center gap-2.5">
          <Tile label="S" bg="#111" size={32} />
          <span className="flex-1">
            <span className="block text-[13px] font-semibold leading-4">Snapfit</span>
            <span className="block text-[10px] leading-[14px] text-quiet">Health &amp; Fitness · #8</span>
          </span>
          <Pill className="bg-[#f3f3f2] text-quiet">Tracked since March</Pill>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <span>
            <span className="block text-[10px] leading-3 text-quiet">Annual price</span>
            <span className="flex items-center gap-2 pt-0.5">
              <span className="text-[20px] font-semibold leading-6 tracking-[-0.01em]">$39.99</span>
              <Pill className="bg-accent-soft text-accent-ink">↑ $10.00</Pill>
            </span>
          </span>
          <span className="flex items-center gap-3 pb-1 text-[10px] leading-3 text-quiet">
            <span className="flex items-center gap-1">
              <span className="h-[2px] w-3 rounded bg-ink" />
              Snapfit
            </span>
            <span className="flex items-center gap-1">
              <span className="h-0 w-3 border-t-2 border-dashed border-[#bdbdb9]" />
              You
            </span>
          </span>
        </div>

        <div className="relative mt-2">
          <svg viewBox="0 0 340 66" className="block h-[66px] w-[340px] overflow-visible">
            {[8, 34, 60].map((y) => (
              <line key={y} x1="0" x2="340" y1={y} y2={y} stroke="#efefed" strokeDasharray="2 4" />
            ))}
            <path d="M0 34 H340" stroke="#bdbdb9" strokeWidth="2" strokeDasharray="5 5" fill="none" />
            <path
             
              d="M0 56 H118 V51 H206 V14 H340"
              pathLength={1}
              stroke="#111"
              strokeWidth="2.25"
              fill="none"
              strokeLinejoin="round"
            />
            <circle cx="206" cy="14" r="5" fill="#fe5000" stroke="#fff" strokeWidth="2" />
          </svg>
          <span
            className="absolute left-[104px] top-[5px] rounded-full bg-[#111] px-2 py-1 text-[10px] font-semibold leading-3 text-white"
          >
            Sep 12 · +33%
          </span>
          <div className="flex justify-between pt-1.5 font-mono text-[9px] uppercase leading-3 text-quiet">
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
          </div>
        </div>

        <div className="mt-3 flex flex-col">
          {HISTORY.map((row, i) => (
            <div
              key={row.date}
              className={`flex items-center gap-3 py-1.5 text-[11px] leading-4 ${i ? "border-t border-[#f0f0ee]" : ""}`}
            >
              <span className="w-12 font-mono text-[10px] text-quiet">{row.date}</span>
              <span className="flex-1">{row.text}</span>
              <span className={`font-semibold ${row.hot ? "text-accent-ink" : ""}`}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Scene>
  );
}

/* 4 · Group reviews into themes --------------------------------------------------------------- */

const THEMES = [
  { name: "Pricing", count: 13, color: "#fe5000" },
  { name: "Bug", count: 11, color: "#111" },
  { name: "Support question", count: 9, color: "#9b9b97" },
  { name: "Quality", count: 8, color: "#ffa24d" },
  { name: "Praise", count: 5, color: "#d6d6d3" },
];

function Donut() {
  const total = THEMES.reduce((sum, t) => sum + t.count, 0);
  let offset = 0;
  return (
    <svg viewBox="0 0 120 120" className="size-[118px] shrink-0">
      {THEMES.map((t) => {
        const length = (t.count / total) * 100;
        const seg = (
          <circle
            key={t.name}
            cx="60"
            cy="60"
            r="46"
            fill="none"
            stroke={t.color}
            strokeWidth="16"
            pathLength={100}
            strokeDasharray={`${length - 1.6} ${100 - length + 1.6}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 60 60)"
          />
        );
        offset += length;
        return seg;
      })}
      <text x="60" y="60" textAnchor="middle" fontSize="19" fontWeight="600" fill="#111">
        52%
      </text>
      <text x="60" y="76" textAnchor="middle" fontSize="10" fill="#8a8a8a">
        Pricing
      </text>
    </svg>
  );
}

export function ThemesArt() {
  return (
    <Scene>
      <div className={`absolute left-0 top-0 w-[360px] p-4 ${CARD}`}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[13px] font-semibold leading-4">
            <MessageSquareText className="size-4" strokeWidth={1.9} />
            Why people write
          </span>
          <Pill className="bg-[#f3f3f2] text-quiet">25 reviews</Pill>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <span>
            <Donut />
          </span>
          <div className="flex flex-1 flex-col gap-0.5">
            {THEMES.map((t, i) => (
              <div
                key={t.name}
                className={`flex items-center gap-2 rounded-md px-1.5 py-1 text-[11px] leading-4 ${
                  i === 0 ? "bg-accent-soft" : ""
                }`}
              >
                <span className="size-2 rounded-full" style={{ background: t.color }} />
                <span className="flex-1">{t.name}</span>
                <span className="font-semibold tabular-nums">
                  {t.count}
                  <span className="font-normal text-quiet">/25</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="pt-3 text-[10px] leading-3 text-quiet">A review can give several reasons, so shares add up past 100%.</p>
      </div>

      <div className="absolute bottom-0 right-0 w-[236px]">
        <div className={`p-3.5 ${CARD}`}>
          <div className="flex items-center justify-between">
            <span className="text-[12px] leading-3 tracking-[1px] text-accent">
              ★★<span className="text-[#dcdcd9]">★★★</span>
            </span>
            <Pill className="bg-accent-soft text-accent-ink">Pricing</Pill>
          </div>
          <p className="pt-2 text-[12px] font-semibold leading-4">
            &ldquo;The annual plan doubled overnight, with no warning.&rdquo;
          </p>
          <p className="pt-1.5 text-[10px] leading-3 text-quiet">App Store · v2.8 · 3 days ago</p>
        </div>
      </div>
    </Scene>
  );
}

/* 5 · Connect RevenueCat ---------------------------------------------------------------------- */

const METRICS = [
  { label: "Revenue", value: "$12.4K", spark: "0,18 12,15 24,16 36,11 48,12 60,7 72,4" },
  { label: "Active subscriptions", value: "1,860", spark: "0,14 12,13 24,12 36,12 48,9 60,9 72,7" },
  { label: "Trials", value: "312", spark: "0,8 12,11 24,9 36,13 48,10 60,12 72,9" },
  { label: "Paid conversions", value: "38%", spark: "0,16 12,14 24,15 36,10 48,11 60,8 72,6" },
];

export function RevenueArt() {
  return (
    <Scene>
      <div className={`absolute left-[16px] top-0 w-[368px] p-4 ${CARD}`}>
        <div className="flex items-center gap-2 px-3 pt-1">
          <span className="flex flex-col items-center gap-1.5">
            <Image src="/icons/revenuecat.jpg" alt="" width={40} height={40} className="size-10 rounded-[28%]" />
            <span className="text-[10px] font-semibold leading-3">RevenueCat</span>
          </span>
          <span className="relative mb-4 flex flex-1 items-center">
            <svg viewBox="0 0 200 4" preserveAspectRatio="none" className="h-1 w-full">
              <line x1="0" y1="2" x2="200" y2="2" stroke="#fe5000" strokeWidth="2" strokeDasharray="4 5" />
            </svg>
            <span className="absolute left-1/2 -translate-x-1/2">
              <span className="block">
                <Pill className="border border-[#e6e6e4] bg-white py-1 text-ink">
                  <Lock className="size-3" strokeWidth={2.2} />
                  Read-only
                </Pill>
              </span>
            </span>
          </span>
          <span className="flex flex-col items-center gap-1.5">
            <Tile bg="#fe5000" size={40}>
              <FoxMark className="h-[21px] w-5 text-white" />
            </Tile>
            <span className="text-[10px] font-semibold leading-3">Appfox</span>
          </span>
        </div>

        <div
          className="mt-3 flex items-center gap-2 rounded-[10px] bg-[#f6f6f6] px-3 py-2"
        >
          <BadgeCheck className="size-4 text-accent" strokeWidth={2} />
          <span className="flex-1 text-[11px] font-semibold leading-4">Verified binding</span>
          <span className="text-[10px] leading-3 text-quiet">Project · iOS app</span>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className="rounded-[10px] border border-[#efefed] px-3 py-2.5"
            >
              <p className="text-[10px] leading-3 text-quiet">{m.label}</p>
              <div className="flex items-end justify-between pt-1">
                <span className="text-[16px] font-semibold leading-5 tracking-[-0.01em]">{m.value}</span>
                <svg viewBox="0 0 72 20" className="h-5 w-[60px] overflow-visible">
                  <polyline
                   
                    points={m.spark}
                    pathLength={1}
                    fill="none"
                    stroke={i === 0 ? "#fe5000" : "#111"}
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-[28px] top-[262px]">
        <span className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold leading-4 ${DARK} rounded-full`}>
          <Lock className="size-3" strokeWidth={2.4} />
          Nothing is written back
        </span>
      </div>
    </Scene>
  );
}

/* 6 · Draft replies and store copy ------------------------------------------------------------ */

const REPLY = [
  "Sorry about the double charge. It came from a",
  "billing bug in v2.8, now fixed in v2.8.1.",
  "Support can refund you today.",
];

export function DraftsArt() {
  return (
    <Scene>
      <div className={`absolute left-0 top-[14px] w-[290px] p-3.5 ${CARD}`}>
        <div className="flex items-center justify-between">
          <span className="text-[12px] leading-3 tracking-[1px] text-accent">
            ★<span className="text-[#dcdcd9]">★★★★</span>
          </span>
          <span className="text-[10px] leading-3 text-quiet">App Store · 2 days ago</span>
        </div>
        <p className="pt-2 text-[12px] font-semibold leading-4">Charged twice after the update</p>
        <p className="pt-1 text-[11px] leading-4 text-quiet">
          Paid for the annual plan and got billed again this morning. Please fix this.
        </p>
      </div>

      <div className={`absolute right-0 top-[108px] w-[330px] p-3.5 ${CARD}`}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 rounded-full bg-[#f3f3f2] p-0.5 text-[10px] font-semibold leading-3">
            <span className="rounded-full bg-[#111] px-2.5 py-1 text-white">Reply</span>
            <span className="px-2.5 py-1 text-quiet">Store copy</span>
          </span>
          <Pill className="bg-accent-soft text-accent-ink">
            <Sparkles className="size-3" strokeWidth={2.2} />
            Draft
          </Pill>
        </div>
        <div className="pt-3 text-[12px] leading-[18px]">
          {REPLY.map((line, i) => (
            <span
              key={line}
              className="block whitespace-nowrap"
            >
              {line}
              {i === REPLY.length - 1 ? <span className="ml-0.5 inline-block h-3.5 w-[1.5px] translate-y-0.5 bg-accent" /> : null}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#f0f0ee] pt-3">
          <span className="text-[10px] leading-3 text-quiet">Your call. Appfox never posts it.</span>
          <span className="flex gap-1.5">
            <span className="rounded-full border border-[#e6e6e4] px-2.5 py-1 text-[10px] font-semibold leading-3">Edit</span>
            <span className="flex items-center gap-1 rounded-full bg-[#111] px-2.5 py-1 text-[10px] font-semibold leading-3 text-white">
              <Copy className="size-3" strokeWidth={2.2} />
              Copy reply
            </span>
          </span>
        </div>
      </div>
    </Scene>
  );
}

/* 7 · Ask Fox --------------------------------------------------------------------------------- */

export function AskFoxArt() {
  return (
    <Scene>
      <div className={`absolute left-[10px] top-0 flex h-[330px] w-[380px] flex-col p-4 ${CARD}`}>
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-accent">
            <FoxMark className="h-[15px] w-3.5 text-white" />
          </span>
          <span className="flex-1 text-[13px] font-semibold leading-4">Ask Fox</span>
          <Pill className="bg-[#f3f3f2] text-quiet">Answers from your evidence</Pill>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-3">
          <p
            className="max-w-[230px] self-end rounded-[14px] rounded-br-[4px] bg-[#111] px-3 py-2 text-[12px] leading-4 text-white"
          >
            Why did ratings drop last week?
          </p>
          <div
            className="max-w-[320px] self-start rounded-[14px] rounded-bl-[4px] bg-[#f6f6f6] px-3 py-2.5"
          >
            <p className="text-[12px] leading-[18px]">
              Mostly photo upload failures after v2.8. <strong className="font-semibold">14 of 25</strong> one-star
              reviews mention HEIC photos.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {["14 reviews", "v2.8 release", "Ratings · 7d"].map((chip, i) => (
                <span key={chip}>
                  <Pill className="border border-[#e6e6e4] bg-white text-ink">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {chip}
                  </Pill>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-[#e6e6e4] py-1.5 pl-3.5 pr-1.5">
          <span className="flex-1 text-[11px] leading-4 text-quiet">Ask about your app…</span>
          <span className="flex size-7 items-center justify-center rounded-full bg-accent text-white">
            <Send className="size-3.5" strokeWidth={2.2} />
          </span>
        </div>
      </div>
    </Scene>
  );
}

/* Outcome · used on the live-app page ---------------------------------------------------------- */

const OUTCOME_BARS = [
  { label: "Before", value: "9.4%", width: "94%", bar: "bg-[#c8c8c4]" },
  { label: "After", value: "6.0%", width: "60%", bar: "bg-accent" },
];

export function OutcomeArt() {
  return (
    <Scene>
      <div className={`absolute left-0 top-0 w-[360px] p-4 ${CARD}`}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[13px] font-semibold leading-4">
            <Target className="size-4" strokeWidth={1.9} />
            Actions · outcome
          </span>
          <Pill className="bg-[#f3f3f2] text-quiet">Completed</Pill>
        </div>
        <p className="pt-3 text-[15px] font-semibold leading-5">Fix HEIC upload failures</p>
        <p className="text-[11px] leading-4 text-quiet">Linked to the upload-failures topic and release v2.8.1</p>
        <div className="flex flex-col gap-2 pt-3">
          {OUTCOME_BARS.map((row) => (
            <div key={row.label} className="flex items-center gap-3 text-[11px] leading-4">
              <span className="w-10 text-quiet">{row.label}</span>
              <span className="h-2 flex-1 rounded-full bg-[#f0f0ee]">
                <span className={`block h-2 rounded-full ${row.bar}`} style={{ width: row.width }} />
              </span>
              <span className="w-9 text-right font-semibold">{row.value}</span>
            </div>
          ))}
        </div>
        <p className="flex items-baseline gap-2 pt-3">
          <span className="text-[22px] font-medium leading-6 text-accent">−3.4 pts</span>
          <span className="text-[11px] leading-4 text-quiet">mention rate</span>
        </p>
        <p className="pt-1 text-[11px] leading-4 text-muted">Observed decrease; cause not established.</p>
        <div className="mt-3 flex items-center gap-3 border-t border-[#f0f0ee] pt-3">
          <span className="text-[10px] leading-3 text-quiet">Your assessment</span>
          <span className="flex gap-1.5 text-[10px] font-semibold leading-3">
            <span className="rounded-full bg-[#111] px-2.5 py-1 text-white">Helped</span>
            <span className="rounded-full border border-[#e6e6e4] px-2.5 py-1">Unclear</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[196px]">
        <div className={`p-3.5 ${DARK}`}>
          <p className="font-mono text-[10px] uppercase leading-3 text-[#ff8a4c]">Matched windows</p>
          <p className="pt-1.5 text-[12px] font-semibold leading-4">500 reviews before, 100 after</p>
          <p className="pt-2 text-[10px] leading-3 text-dark-muted">Same topic, same denominators</p>
        </div>
      </div>
    </Scene>
  );
}

/* My App · used on the product page ------------------------------------------------------------ */

export function MyAppArt() {
  return (
    <Scene>
      <div className={`absolute left-0 top-0 w-[372px] p-4 ${CARD}`}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[13px] font-semibold leading-4">
            <Smartphone className="size-4" strokeWidth={1.9} />
            My App
          </span>
          <Pill className="bg-[#f3f3f2] text-quiet">iOS · US</Pill>
        </div>
        <div className="flex items-center gap-2.5 pt-3">
          <Image src="/icons/leanbites.jpg" alt="" width={32} height={32} className="size-8 rounded-[22%]" />
          <span>
            <span className="block text-[13px] font-semibold leading-4">LeanBites - Healthy Dining</span>
            <span className="block text-[10px] leading-[14px] text-quiet">Chorus Labs LLC (CA)</span>
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-3">
          {[
            { label: "Store rating", value: "4.64" },
            { label: "Vs. peers", value: "−0.17" },
            { label: "Revenue", value: "<$5K" },
          ].map((m) => (
            <div key={m.label} className="rounded-lg bg-[#f6f6f5] px-2.5 py-2">
              <p className="text-[10px] leading-3 text-quiet">{m.label}</p>
              <p className="pt-1 text-[15px] font-semibold leading-5">{m.value}</p>
            </div>
          ))}
        </div>
        <p className="pt-3 text-[10px] leading-3 text-quiet">Rating, last 90 days · releases marked</p>
        <div className="relative pt-4">
          {[
            { left: "38%", label: "v1.3.1" },
            { left: "76%", label: "v1.3.2" },
          ].map((r) => (
            <span
              key={r.label}
              className="absolute top-0 -translate-x-1/2 font-mono text-[9px] leading-3 text-accent-ink"
              style={{ left: r.left }}
            >
              {r.label}
            </span>
          ))}
          <svg viewBox="0 0 340 52" className="block h-[52px] w-full overflow-visible">
            {[129, 258].map((x) => (
              <line key={x} x1={x} x2={x} y1="0" y2="52" stroke="#fe5000" strokeDasharray="3 3" />
            ))}
            <polyline
              points="0,18 34,16 68,20 102,14 136,12 170,16 204,10 238,12 272,26 306,30 340,28"
              fill="none"
              stroke="#111"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[200px]">
        <div className={`p-3.5 ${DARK}`}>
          <p className="font-mono text-[10px] uppercase leading-3 text-[#ff8a4c]">Sources merged</p>
          <p className="pt-1.5 text-[12px] font-semibold leading-4">Listing, reviews, releases, and RevenueCat</p>
          <p className="pt-2 text-[10px] leading-3 text-dark-muted">One overview, exact scope</p>
        </div>
      </div>
    </Scene>
  );
}

/* Connection card · used on the integrations page ---------------------------------------------- */

const CONNECTION_ROWS = [
  { k: "Reads", v: "Revenue, subscriptions, trials, conversions" },
  { k: "Can write", v: "Nothing" },
  { k: "Credential", v: "Vault, server-side only" },
  { k: "Last sync", v: "Today 09:40" },
];

export function ConnectionArt() {
  return (
    <Scene>
      <div className={`absolute left-0 top-0 w-[372px] p-4 ${CARD}`}>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold leading-4">Integrations</span>
          <Pill className="bg-[#f3f3f2] text-quiet">1 connected</Pill>
        </div>
        <div className="flex items-center gap-2.5 pt-3">
          <Image src="/icons/revenuecat.jpg" alt="" width={36} height={36} className="size-9 rounded-[28%]" />
          <span className="flex-1">
            <span className="block text-[13px] font-semibold leading-4">RevenueCat</span>
            <span className="block text-[10px] leading-[14px] text-quiet">Project Fitly · app Fitly iOS</span>
          </span>
          <Pill className="bg-[#e6f4ec] text-good">Connected</Pill>
        </div>
        <div className="mt-3">
          {CONNECTION_ROWS.map((row) => (
            <div key={row.k} className="flex gap-3 border-t border-[#f0f0ee] py-1.5 text-[11px] leading-4">
              <span className="w-[68px] shrink-0 text-quiet">{row.k}</span>
              <span className={row.k === "Can write" ? "font-semibold" : ""}>{row.v}</span>
            </div>
          ))}
          <div className="flex items-center gap-3 border-t border-[#f0f0ee] py-1.5 text-[11px] leading-4">
            <span className="w-[68px] shrink-0 text-quiet">Usage</span>
            <span className="h-1.5 w-20 rounded-full bg-[#f0f0ee]">
              <span className="block h-1.5 w-[90%] rounded-full bg-ink" />
            </span>
            <span>18 of 20 reads this hour</span>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-3 border-t border-[#f0f0ee] pt-3 text-[10px] font-semibold leading-3">
          <span className="rounded-full border border-[#e6e6e4] px-2.5 py-1">Re-verify binding</span>
          <span className="text-danger">Disconnect</span>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[180px]">
        <div className={`p-3.5 ${DARK}`}>
          <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase leading-3 text-[#ff8a4c]">
            <Lock className="size-3" strokeWidth={2.4} />
            Read-only
          </p>
          <p className="pt-1.5 text-[12px] font-semibold leading-4">Appfox never writes to RevenueCat</p>
        </div>
      </div>
    </Scene>
  );
}

/* The founder's morning · used on the about page ------------------------------------------------ */

const MORNING_TABS = [
  { name: "App Store Connect", note: "Downloads, crashes", icon: <AppleLogo className="size-3.5" /> },
  {
    name: "RevenueCat",
    note: "Trials, MRR",
    icon: <Image src="/icons/revenuecat.jpg" alt="" width={20} height={20} className="size-5 rounded-[28%]" />,
  },
  { name: "Reviews", note: "1-star spike?", icon: <Star className="size-3.5" strokeWidth={2} /> },
  { name: "Competitor listing", note: "New price?", icon: <Store className="size-3.5" strokeWidth={2} /> },
  { name: "Crash dashboard", note: "Since v2.8", icon: <Activity className="size-3.5" strokeWidth={2} /> },
];

export function MorningArt() {
  return (
    <Scene>
      {MORNING_TABS.map((tab, i) => (
        <div
          key={tab.name}
          className={`absolute w-[290px] px-3.5 py-3 ${CARD}`}
          style={{ left: 8 + i * 20, top: 10 + i * 46, transform: `rotate(${[-4, 2, -2, 3, -1][i]}deg)` }}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f3f3f2] text-ink">
              {tab.icon}
            </span>
            <span className="flex-1 whitespace-nowrap text-[12px] font-semibold leading-4">{tab.name}</span>
            <span className="text-[10px] leading-3 text-quiet">{tab.note}</span>
          </div>
        </div>
      ))}

      <div className="absolute bottom-0 right-0 w-[190px]">
        <div className={`p-3.5 ${DARK}`}>
          <p className="font-mono text-[10px] uppercase leading-3 text-[#ff8a4c]">Every morning</p>
          <p className="pt-1.5 text-[12px] font-semibold leading-4">You are the integration layer between five tools</p>
        </div>
      </div>
    </Scene>
  );
}
