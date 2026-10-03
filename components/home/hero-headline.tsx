/**
 * Hero headline drawn as SVG text so it can animate on load ("ink rise"):
 * a light gray outline is there from the first frame, a black outline draws over it,
 * then black ink with a thin orange surface rises through the letters in a gentle wave.
 * The real text stays in the heading for screen readers and search engines, and under
 * reduced-motion settings the static headline is shown instead.
 */

const TEXT = "Your app, Explained.";
const TEXT_ID = "hero-headline-text";
const WIDTH = 1000;
const HEIGHT = 144;
const BASELINE = 120;

/** A wide shape with a gently waving top edge, used as a rising liquid clip. */
function wavePath() {
  let d = "M-200 0 Q-160 -7 -120 0";
  for (let x = -120; x < 1600; x += 80) d += ` T${x + 80} 0`;
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
  // The headline text exists once, in <defs>; every layer draws it with <use>, so the
  // heading's text content is not repeated for crawlers and assistive technology.
  const Layer = ({ fill, className }: { fill?: string; className?: string }) => (
    <use href={`#${TEXT_ID}`} fill={fill} className={className} />
  );

  return (
    <h1 className="font-display text-[44px] font-normal text-black sm:text-[64px]">
      <span className="sr-only">{TEXT}</span>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="hero-title block w-auto max-w-full overflow-visible"
        style={{ height: `${HEIGHT / 120}em` }}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <text id={TEXT_ID} x={WIDTH / 2} y={BASELINE} textAnchor="middle" fontSize={120} letterSpacing={0}>
            {TEXT}
          </text>
        </defs>
        <g className="hl-anim">
          <defs>
            <RisingClip id="hero-ink-orange" begin="1.55s" height={HEIGHT} />
            <RisingClip id="hero-ink-black" begin="1.72s" height={HEIGHT} />
            {/* Hides every stroke inside the letters, so only the outer outline shows on any background */}
            <mask id="hero-outline-mask" maskUnits="userSpaceOnUse" x={-40} y={-40} width={WIDTH + 80} height={HEIGHT + 80}>
              <rect x={-40} y={-40} width={WIDTH + 80} height={HEIGHT + 80} fill="white" />
              <Layer fill="black" />
            </mask>
          </defs>
          <g mask="url(#hero-outline-mask)">
            <Layer className="hl-outline hl-outline-base" />
            <Layer className="hl-outline hl-outline-draw" />
          </g>
          <g clipPath="url(#hero-ink-orange)">
            <Layer fill="#fe5000" />
          </g>
          <g clipPath="url(#hero-ink-black)">
            <Layer fill="currentColor" />
          </g>
        </g>
        <g className="hl-static">
          <Layer fill="currentColor" />
        </g>
      </svg>
    </h1>
  );
}
