type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: string, event: string, params?: TrackParams) => void;
  }
}

export function track(event: string, params?: TrackParams) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}
