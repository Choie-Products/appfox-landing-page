import { SITE_URL } from "@/lib/site";

/**
 * robots.txt, written by hand so it can carry explicit groups for search and AI crawlers
 * and the Content-Signal line that search, AI answers, and AI training are all permitted.
 * Only the API is kept out of the index.
 */

const SEARCH_BOTS = ["Googlebot", "Bingbot", "DuckDuckBot", "Applebot", "YandexBot", "Baiduspider"];

const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "Amazonbot",
  "CCBot",
  "cohere-ai",
  "DuckAssistBot",
  "YouBot",
  "MistralAI-User",
  "Bytespider",
];

function group(agents: string[]) {
  return [...agents.map((a) => `User-agent: ${a}`), "Allow: /", "Disallow: /api/", ""].join("\n");
}

const body = [
  `# Appfox, ${SITE_URL}`,
  "# Search engines and AI assistants are welcome to read and cite this site.",
  "",
  "User-agent: *",
  "Allow: /",
  "Disallow: /api/",
  "",
  "# Search crawlers",
  group(SEARCH_BOTS),
  "# AI crawlers and answer engines",
  group(AI_BOTS),
  "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
  "",
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  `Host: ${SITE_URL.replace(/^https?:\/\//, "")}`,
  "",
].join("\n");

export const dynamic = "force-static";

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
