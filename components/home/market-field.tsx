import Image from "next/image";
import { FOX_PATH } from "@/components/fox-mark";
import Container from "@/components/ui/container";

/** Real App Store icons in /public/icons. */
const APPS = [
  "strava", "yuka", "sweetgreen", "anylist", "bring", "eatthismuch", "fitme", "leanbites", "mealime", "menufit",
  "paprika", "plantoeat", "myfitnesspal", "loseit", "headspace", "calm", "flo", "fitbod", "cronometer", "lifesum",
  "duolingo", "todoist", "things", "bear", "flighty", "halide", "dayone", "streaks", "notion", "canva", "vsco",
  "overcast", "pocketcasts", "carrot", "fantastical", "structured", "opal", "finch", "bearable", "waterllama",
  "gentlerstreak", "sleepcycle", "alltrails", "komoot", "nikerun", "toogoodtogo", "happycow", "kitchenstories",
  "crouton", "splitwise", "copilot", "ynab",
];

const COLUMNS = 18;
/** Each row drifts at its own very slow pace; odd rows run the other way. */
const ROW_SECONDS = [400, 330, 430, 350, 410, 370];

/** Stepping through the list by 7 (coprime with its length) scatters icons so neighbors rarely repeat. */
const ROWS: string[][] = ROW_SECONDS.map((_, r) =>
  Array.from({ length: COLUMNS }, (_, c) => APPS[((r * COLUMNS + c) * 7) % APPS.length]),
);

/** The floor the tiles lie on: turned 12° and tipped back, so rows run gently down to the right. */
const FLOOR_M = [0.978, 0.141, -0.208, 0.665] as const;
const FLOOR = `matrix(${FLOOR_M.join(", ")}, 0, 0)`;

/** How thick the orange tile is, in screen pixels. */
const TILE_DEPTH = 30;

type Rgb = [number, number, number];

/** The floating tile's colors: a bright orange face lit from above, its sides from top to bottom, and its shading. */
const PALETTE = {
  face: "radial-gradient(90% 75% at 30% 15%, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0) 70%), linear-gradient(140deg, #ff8746 0%, #fe6a1e 55%, #f75f12 100%)",
  sideTop: [255, 138, 74] as Rgb,
  sideBottom: [228, 98, 34] as Rgb,
  rim: "#ffd0b2",
  /** Shade color (r,g,b) for the bevel's lower inner edge and the fox's drop shadow. */
  shade: "200,80,15",
  contact: "rgba(160,60,10,0.24)",
};

/**
 * The tile's sides, as stacked shadows that drop straight down on screen (each step is mapped back
 * through the floor matrix). A thin lit rim sits right under the face, the sides darken toward the
 * bottom, and a soft contact shadow finishes the base. The face gets a bevel on top.
 */
const TILE_SHADOW = (() => {
  const p = PALETTE;
  const [a, b, c, d] = FLOOR_M;
  const det = a * d - b * c;
  const step = (px: number) => [(-c * px) / det, (a * px) / det].map((n) => n.toFixed(2));
  const layers = 24;
  const sides = Array.from({ length: layers }, (_, i) => {
    const t = (i + 1) / layers;
    const [dx, dy] = step(TILE_DEPTH * t);
    const rgb = p.sideTop.map((v, k) => Math.round(v + (p.sideBottom[k] - v) * t ** 0.8)).join(",");
    return `${dx}px ${dy}px 0 rgb(${rgb})`;
  });
  const [rx, ry] = step(1.5);
  const [cx, cy] = step(TILE_DEPTH + 10);
  const bevel = [
    "inset 0 3px 1px rgba(255,255,255,0.6)",
    "inset 3px 0 2px rgba(255,255,255,0.22)",
    `inset -3px 0 4px rgba(${p.shade},0.16)`,
    `inset 0 -7px 10px rgba(${p.shade},0.26)`,
  ];
  return [...bevel, `${rx}px ${ry}px 0 ${p.rim}`, ...sides, `${cx}px ${cy}px 26px ${p.contact}`].join(", ");
})();

const TILE = "relative flex size-[264px] items-center justify-center overflow-hidden rounded-[48px]";

function Tile({ app }: { app: string }) {
  return (
    <span className="mr-[18px] flex size-[120px] shrink-0 items-center justify-center rounded-[26px] bg-white">
      <Image src={`/icons/${app}.jpg`} alt="" width={68} height={68} className="size-[68px] rounded-[23%]" />
    </span>
  );
}

function Fox({ shade }: { shade: string }) {
  return (
    <svg
      viewBox="0 0 134 141"
      className="relative h-[126px] w-[120px]"
      style={{ filter: `drop-shadow(0 3px 0 rgba(${shade},0.4)) drop-shadow(0 10px 12px rgba(${shade},0.2))` }}
    >
      <path d={FOX_PATH} fill="#ffffff" />
    </svg>
  );
}

/** Something lying on the floor, centered under the tile. */
function OnFloor({ children, at = "-50%, -46%" }: { children: React.ReactNode; at?: string }) {
  return (
    <div className="absolute left-0 top-0" style={{ transform: `translate(${at}) ${FLOOR}` }}>
      {children}
    </div>
  );
}

function FloorGlow() {
  return (
    <OnFloor>
      <div className="fox-glow size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(254,80,0,0.2),rgba(254,80,0,0.08)_55%,rgba(254,80,0,0))]" />
    </OnFloor>
  );
}

function FloorShadow() {
  return (
    <OnFloor at="-42%, -30%">
      <div className="fox-shadow size-[264px] rounded-[48px] bg-ink/25 blur-[22px]" />
    </OnFloor>
  );
}

/** The Appfox tile floats above the floor and sends slow orange rings out across the apps, as if scanning the market. */
function FloatingTile() {
  return (
    <>
      <FloorGlow />
      {[0, 1, 2].map((i) => (
        <OnFloor key={i} at="-50%, -40%">
          <div
            className="fox-ring size-[264px] rounded-[56px] border-2 border-accent"
            style={{ animationDelay: `${i * -5}s` }}
          />
        </OnFloor>
      ))}
      <FloorShadow />
      <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-[62%]">
        <div className="fox-float">
          <div style={{ transform: FLOOR }}>
            <div className={TILE} style={{ background: PALETTE.face, boxShadow: TILE_SHADOW }}>
              <Fox shade={PALETTE.shade} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/** App icons drift past on a tilted floor while the Appfox tile floats above them. */
export default function MarketField() {
  return (
    <section className="overflow-hidden py-24 lg:py-40">
      <Container className="flex flex-col items-center text-center">
        <p className="label-mono text-ink">Your market</p>
        <h2 className="max-w-[640px] text-balance pt-4 text-display-md text-ink">
          <span className="block">Every app you compete with,</span>
          <span className="block text-quiet">watched while you build.</span>
        </h2>
        <p className="max-w-[640px] text-balance pt-4 text-[16px] leading-[26px] text-muted">
          Confirm your competitors once. Appfox keeps reading their listings, reviews, rankings, and releases, and
          tells you when something changes.
        </p>
      </Container>

      <div
        className="relative mt-12 h-[360px] sm:h-[460px] lg:mt-20 lg:h-[580px]"
        style={{
          maskImage: "radial-gradient(ellipse 52% 58% at 50% 50%, #000 52%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 52% 58% at 50% 50%, #000 52%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 scale-[0.55] sm:scale-75 lg:scale-100">
          {/* The floor of drifting tiles */}
          <div className="absolute left-0 top-0" style={{ transform: `translate(-50%, -50%) ${FLOOR}` }}>
            <div className="flex flex-col gap-[18px]">
              {ROWS.map((row, r) => (
                <div key={r} className="w-[2484px] overflow-visible">
                  <div
                    className={`app-row flex w-max ${r % 2 ? "app-row-reverse" : ""}`}
                    style={{ animationDuration: `${ROW_SECONDS[r]}s`, animationDelay: `-${r * 7}s` }}
                  >
                    {[...row, ...row].map((app, i) => (
                      <Tile key={i} app={app} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <FloatingTile />
        </div>
      </div>
    </section>
  );
}
