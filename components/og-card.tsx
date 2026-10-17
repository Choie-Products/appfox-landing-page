import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { FOX_PATH } from "@/components/fox-mark";
import { LOGO_MARK_PATH, LOGO_VIEWBOX, LOGO_WORDMARK_PATH } from "@/components/logo";

export const OG_SIZE = { width: 1200, height: 630 };

const INK = "#111111";
const ACCENT = "#fe5000";

/** Satori only bundles a regular-weight sans, so the brand faces are loaded from the repo. */
const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));

/**
 * A halftone field of fox marks, like the one under the homepage hero: staggered rows whose marks
 * grow toward the right edge, with a slow wave through the sizes. One mark is picked out in orange.
 */
const FIELD = { x0: 600, step: 70, rowGap: 64 };
const marks = Array.from({ length: 10 }, (_, r) => r).flatMap((r) => {
  const y = 22 + r * FIELD.rowGap;
  const offset = r % 2 ? FIELD.step / 2 : 0;
  return Array.from({ length: 11 }, (_, i) => {
    const x = FIELD.x0 + offset + i * FIELD.step;
    const t = Math.min(1, Math.max(0, (x - FIELD.x0) / (OG_SIZE.width - FIELD.x0)));
    const wave = 0.5 + 0.5 * Math.sin(i * 0.9 + r * 0.7);
    const size = 62 * t ** 2 * (0.8 + 0.2 * wave);
    return { key: `${r}-${i}`, x, y, size, hot: r === 4 && i === 7 };
  }).filter((m) => m.size >= 7 && m.x < OG_SIZE.width + 40);
});

/** The social card: landing-page logo, the tagline set large in Poppins Bold, and a halftone fox field. */
export async function ogCard() {
  const [poppinsBold, poppinsMedium, plexMono] = await Promise.all([
    font("Poppins-Bold.ttf"),
    font("Poppins-Medium.ttf"),
    font("IBMPlexMono-Medium.otf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(180deg, #fbfbfb 0%, #f2f2f1 100%)",
          color: INK,
          fontFamily: "Poppins",
        }}
      >
        <svg
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          viewBox={`0 0 ${OG_SIZE.width} ${OG_SIZE.height}`}
          style={{ position: "absolute", inset: 0 }}
        >
          {marks.map((m) => (
            <path
              key={m.key}
              d={FOX_PATH}
              fill={m.hot ? ACCENT : "#e2e2df"}
              transform={`translate(${m.x} ${m.y}) scale(${(m.size / 134).toFixed(4)}) translate(-67 -70.5)`}
            />
          ))}
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "64px 72px 60px",
            position: "relative",
          }}
        >
          <svg width={219} height={56} viewBox={LOGO_VIEWBOX}>
            <path d={LOGO_MARK_PATH} fill={ACCENT} />
            <path d={LOGO_WORDMARK_PATH} fill={INK} />
          </svg>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontFamily: "Plex Mono",
                fontSize: 20,
                letterSpacing: 1,
                color: "#55554f",
                paddingBottom: 18,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 10, background: ACCENT }} />
              APP INTELLIGENCE FOR iOS &amp; ANDROID
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 136,
                fontWeight: 700,
                lineHeight: 0.94,
                letterSpacing: -6.5,
              }}
            >
              <div>Your app,</div>
              <div style={{ color: ACCENT }}>explained.</div>
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 26, fontWeight: 500, letterSpacing: -0.4, color: "#55554f" }}>
            Research ideas. Understand reviews. Track competitors.
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Poppins", data: poppinsBold, weight: 700, style: "normal" },
        { name: "Poppins", data: poppinsMedium, weight: 500, style: "normal" },
        { name: "Plex Mono", data: plexMono, weight: 500, style: "normal" },
      ],
    },
  );
}
