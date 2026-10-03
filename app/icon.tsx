import { ImageResponse } from "next/og";
import { FOX_PATH } from "@/components/fox-mark";

/** 192px PNG favicon, a multiple of 48px as Google asks, and the Organization logo in structured data. */
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: 40,
        }}
      >
        <svg width="124" height="130" viewBox="0 0 134 141">
          <path d={FOX_PATH} fill="#fe5000" />
        </svg>
      </div>
    ),
    size,
  );
}
