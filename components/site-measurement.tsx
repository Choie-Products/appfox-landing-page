"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";
import { track } from "@/lib/track";
import { CTA_HREF } from "@/lib/site";

/** Adds measurement without changing any rendered element or layout. */
export default function SiteMeasurement() {
  useEffect(() => {
    captureAttribution();
    function onClick(event: MouseEvent) {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link || link.getAttribute("href") !== CTA_HREF) return;
      const placement = link.closest("header") ? "header" : link.closest("footer") ? "footer" : "content";
      track("request_access_click", { page_path: window.location.pathname, placement });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
