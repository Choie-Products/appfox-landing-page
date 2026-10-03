import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Appfox",
    short_name: "Appfox",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#f2f2f1",
    theme_color: "#fbfbfb",
    icons: [
      { src: "/icon", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
