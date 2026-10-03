import { ImageResponse } from "next/og";
import { FOX_PATH } from "@/components/fox-mark";
import { SITE_DESCRIPTION } from "@/lib/seo";

export const OG_SIZE = { width: 1200, height: 630 };

/** The social card: fox mark, wordmark, tagline, and the one-line definition, on the hero background. */
export function ogCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(180deg, #fbfbfb 0%, #f2f2f1 100%)",
          color: "#111111",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="58" height="61" viewBox="0 0 134 141">
            <path d={FOX_PATH} fill="#fe5000" />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>Appfox</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Your app, explained.</div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: "#55554f", maxWidth: 1000 }}>{SITE_DESCRIPTION}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#8a8a87" }}>
          <div>AI app tracker for iOS and Android</div>
          <div>appfox.app</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
