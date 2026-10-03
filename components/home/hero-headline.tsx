/**
 * Hero headline drawn as SVG text so it can animate on load ("ink rise"):
 * a light gray outline is there from the first frame, a black outline draws over it,
 * then black ink with a thin orange surface rises through the letters in a gentle wave.
 * The real text stays in the heading for screen readers and search engines, and under
 * reduced-motion settings the static headline is shown instead.
 */

const TEXT = "Your app, Explained.";
const WIDTH = 1060;
const HEIGHT = 134;
const BASELINE = 100;

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
  const Text = ({ fill, className }: { fill?: string; className?: string }) => (
    <text
      x={WIDTH / 2}
      y={BASELINE}
      textAnchor="middle"
      fontSize={120}
      letterSpacing={-6}
      fill={fill}
      className={className}
    >
      {TEXT}
    </text>
  );

  return (
    <h1 className="font-display text-[34px] font-bold text-black sm:text-[48px]">
      <span className="sr-only">Your app, explained.</span>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="hero-title block w-auto max-w-full overflow-visible"
        style={{ height: `${HEIGHT / 120}em` }}
        aria-hidden="true"
        focusable="false"
      >
        <g className="hl-anim">
          <defs>
            <RisingClip id="hero-ink-orange" begin="1.55s" height={HEIGHT} />
            <RisingClip id="hero-ink-black" begin="1.72s" height={HEIGHT} />
            {/* Hides every stroke inside the letters, so only the outer outline shows on any background */}
            <mask id="hero-outline-mask" maskUnits="userSpaceOnUse" x={-40} y={-40} width={WIDTH + 80} height={HEIGHT + 80}>
              <rect x={-40} y={-40} width={WIDTH + 80} height={HEIGHT + 80} fill="white" />
              <Text fill="black" />
            </mask>
          </defs>
          <g mask="url(#hero-outline-mask)">
            <Text className="hl-outline hl-outline-base" />
            <Text className="hl-outline hl-outline-draw" />
          </g>
          <g clipPath="url(#hero-ink-orange)">
            <Text fill="#fe5000" />
          </g>
          <g clipPath="url(#hero-ink-black)">
            <Text fill="currentColor" />
          </g>
        </g>
        <g className="hl-static">
          <Text fill="currentColor" />
        </g>
      </svg>
    </h1>
  );
}
