import Container from "@/components/ui/container";

const legend = [
  {
    name: "Facts",
    tone: "text-[#9b9b97]",
    body: "Listings, reviews, ranks, releases, and metrics. Stored once, reproducible, never backdated.",
  },
  {
    name: "Signals",
    tone: "text-accent",
    body: "Deterministic detections. A threshold, a minimum sample, and a cooldown, so one noisy day cannot page you.",
  },
  {
    name: "Insights",
    tone: "text-ink",
    body: "AI connects independent sources into one plain-language explanation and cites the evidence it used.",
  },
  {
    name: "Outcomes",
    tone: "text-accent",
    body: "You accept, dismiss, or snooze. Afterwards, matched windows and your own assessment say whether it helped.",
  },
];

// [cx, cy, r] per layer, as drawn in the design.
const facts: [number, number, number][] = [
  [40, 120, 5], [70, 150, 4], [95, 100, 6], [120, 170, 3], [150, 130, 5], [180, 90, 4], [205, 160, 6],
  [230, 115, 3], [260, 140, 5], [290, 105, 4], [60, 200, 3], [135, 60, 3], [245, 195, 4], [310, 170, 3],
];
const signals: [number, number, number][] = [
  [400, 130, 7], [430, 100, 5], [455, 150, 6], [480, 120, 8], [505, 90, 4], [530, 140, 6], [560, 110, 5],
  [585, 160, 7], [615, 125, 5], [640, 95, 4], [420, 180, 3], [545, 60, 3], [600, 200, 4],
];
const insights: [number, number, number][] = [
  [740, 130, 4], [775, 115, 8], [810, 140, 5], [850, 120, 10], [890, 135, 6], [930, 110, 4], [965, 130, 7],
  [760, 180, 3], [905, 70, 3],
];
const outcomes: [number, number, number][] = [[1080, 125, 12], [1140, 125, 6], [1190, 125, 4], [1230, 125, 3]];

function Dots({ points, fill }: { points: [number, number, number][]; fill: string }) {
  return (
    <g fill={fill}>
      {points.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
      ))}
    </g>
  );
}

export default function Layers() {
  return (
    <Container as="section" className="border-t border-line py-16 lg:py-24">
      <h2 className="text-display-md text-ink">So we built it in four layers.</h2>
      <p className="max-w-[560px] pt-2 text-[16px] leading-[26px] text-muted">
        Each layer is stored on its own, so you can always trace a recommendation back to the review, the release,
        or the metric it came from.
      </p>
      <svg
        viewBox="0 0 1360 260"
        xmlns="http://www.w3.org/2000/svg"
        className="mt-6 h-auto w-full"
        role="img"
        aria-label="Four groups of dots: scattered gray facts, orange signals, a few larger black insights, and a single line of orange outcomes."
      >
        <Dots points={facts} fill="#9b9b97" />
        <Dots points={signals} fill="#fe5000" />
        <Dots points={insights} fill="#111111" />
        <Dots points={outcomes} fill="#fe5000" />
      </svg>
      <div className="grid grid-cols-2 gap-6 pt-4 lg:grid-cols-4">
        {legend.map((item) => (
          <div key={item.name} className="flex flex-col gap-1">
            <h3 className={`font-mono text-[14px] font-medium uppercase leading-5 tracking-normal ${item.tone}`}>
              {item.name}
            </h3>
            <p className="text-[12px] leading-[17px] text-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
