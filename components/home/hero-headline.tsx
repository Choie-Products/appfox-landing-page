/**
 * Hero headline drawn as SVG text so it can animate on load ("ink rise"):
 * a light gray outline is there from the first frame, a black outline draws over it,
 * then black ink with a thin orange surface rises through the letters in a gentle wave.
 * The real text stays in the heading for screen readers and search engines, and under
 * reduced-motion settings the static headline is shown instead.
 */

const LINES = [
  { text: "Your app,", y: 100 },
  { text: "Explained.", y: 212 },
];
const WIDTH = 580;
const HEIGHT = 246;
/** Extra room below the text for the hand-drawn underline. */
const UNDERLINE_SPACE = 56;

/** Hand-drawn orange swoosh under "Explained.", drawn in once the ink has risen. */
const UNDERLINE = "M14 292 C 96 258, 300 240, 560 250";
const UNDERLINE_DELAY = 2.75;

/** A wide shape with a gently waving top edge, used as a rising liquid clip. */
function wavePath() {
  let d = "M-200 0 Q-160 -7 -120 0";
  for (let x = -120; x < 1160; x += 80) d += ` T${x + 80} 0`;
  return `${d} V460 H-200 Z`;
}

function RisingClip({ id, begin, height }: { id: string; begin: string; height: number }) {
  const start = `0 ${height + 28}`;
  return (
    <clipPath id={id}>
      <path d={wavePath()} transform={`translate(${start})`}>
        <animateTransform
          attributeName="transform"
          type="translate"
          from={start}
          to="-160 -30"
          begin={begin}
          dur="1.25s"
          fill="freeze"
          calcMode="spline"
          keyTimes="0;1"
          keySplines="0.45 0 0.25 1"
        />
      </path>
    </clipPath>
  );
}

export default function HeroHeadline() {
  const totalHeight = HEIGHT + UNDERLINE_SPACE;
  const Lines = ({ fill, className }: { fill?: string; className?: (line: number) => string }) => (
    <>
      {LINES.map((line, l) => (
        <text
          key={line.text}
          x={4}
          y={line.y}
          fontSize={120}
          letterSpacing={-2.4}
          fill={fill}
          className={className?.(l)}
        >
          {line.text}
        </text>
      ))}
    </>
  );

  return (
    <h1 className="font-display text-[46px] font-bold text-black sm:text-[76px] lg:text-[96px]">
      <span className="sr-only">Your app, explained.</span>
      <svg
        viewBox={`0 0 ${WIDTH} ${totalHeight}`}
        className="hero-title block w-auto overflow-visible"
        style={{ height: `${totalHeight / 120}em` }}
        aria-hidden="true"
        focusable="false"
      >
        <g className="hl-anim">
          <defs>
            <RisingClip id="hero-ink-orange" begin="1.55s" height={HEIGHT} />
            <RisingClip id="hero-ink-black" begin="1.72s" height={HEIGHT} />
            {/* Hides every stroke inside the letters, so only the outer outline shows on any background */}
            <mask
              id="hero-outline-mask"
              maskUnits="userSpaceOnUse"
              x={-40}
              y={-40}
              width={WIDTH + 80}
              height={HEIGHT + 80}
            >
              <rect x={-40} y={-40} width={WIDTH + 80} height={HEIGHT + 80} fill="white" />
              <Lines fill="black" />
            </mask>
          </defs>
          <g mask="url(#hero-outline-mask)">
            <Lines className={() => "hl-outline hl-outline-base"} />
            <Lines className={(l) => `hl-outline hl-outline-draw hl-outline-draw-${l + 1}`} />
          </g>
          <g clipPath="url(#hero-ink-orange)">
            <Lines fill="#fe5000" />
          </g>
          <g clipPath="url(#hero-ink-black)">
            <Lines fill="currentColor" />
          </g>
        </g>
        <g className="hl-static">
          <Lines fill="currentColor" />
        </g>
        <path
          className="hl-underline"
          d={UNDERLINE}
          pathLength={1}
          fill="none"
          stroke="#fe5000"
          strokeWidth={12}
          strokeLinecap="round"
          style={{ animationDelay: `${UNDERLINE_DELAY}s` }}
        />
      </svg>
    </h1>
  );
}
