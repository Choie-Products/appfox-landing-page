import { setTimeout as delay } from "node:timers/promises";

/** Retry only an explicit rate-limit rejection; never retry a quota or ambiguous write. */
export async function resendRequest<T extends { error: { name?: string; statusCode?: number | null } | null; headers?: Record<string, string> | null }>(request: () => Promise<T>): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    const response = await request();
    if (response.error?.name !== "rate_limit_exceeded" || attempt >= 2) return response;
    const retryAfter = Number(response.headers?.["retry-after"]);
    const wait = Math.max(1000 * (attempt + 1), Number.isFinite(retryAfter) ? retryAfter * 1000 : 0);
    if (wait > 8000) return response;
    await delay(wait);
  }
}
