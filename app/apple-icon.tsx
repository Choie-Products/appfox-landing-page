import { ImageResponse } from "next/og";
import { FOX_PATH } from "@/components/fox-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <svg width="112" height="118" viewBox="0 0 134 141">
          <path d={FOX_PATH} fill="#fe5000" />
        </svg>
      </div>
    ),
    size,
  );
}
