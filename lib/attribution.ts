const KEY = "appfox_access_attribution";

export type Attribution = { utmSource?: string; utmMedium?: string; utmCampaign?: string; referrer?: string };

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const query = new URLSearchParams(window.location.search);
  const current: Attribution = {};
  for (const [field, key] of [["utmSource", "utm_source"], ["utmMedium", "utm_medium"], ["utmCampaign", "utm_campaign"]] as const) {
    const value = query.get(key)?.trim().slice(0, 200);
    if (value) current[field] = value;
  }
  try {
    const referrer = new URL(document.referrer);
    if (referrer.origin !== window.location.origin) current.referrer = referrer.origin;
  } catch { /* Direct visits have no referrer. */ }
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const clean: Attribution = {};
        for (const field of ["utmSource", "utmMedium", "utmCampaign", "referrer"] as const) {
          const value = (parsed as Record<string, unknown>)[field];
          if (typeof value === "string" && value.trim()) clean[field] = value.trim().slice(0, 200);
        }
        return clean;
      }
    }
    sessionStorage.setItem(KEY, JSON.stringify(current));
  } catch { /* Storage restrictions must never block access requests. */ }
  return current;
}
