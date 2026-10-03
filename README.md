# Appfox website

Marketing site for **Appfox**, an intelligence layer for mobile apps. It watches an app, its customers, its competitors, and its market, then turns meaningful changes into evidence-backed actions.

Live at [appfox.app](https://appfox.app).

## Pages

| Route | Purpose |
|---|---|
| `/` | Home: hero with the Today feed, the problem, before/after, the facts-to-outcomes chain, the two journeys, surfaces, principles, replay, FAQ |
| `/product` | The six surfaces, alert levels, progressive disclosure |
| `/research` | Research-an-idea journey and what a brief can and cannot claim |
| `/live-app` | Operate-a-live-app journey, RevenueCat scope, empty states, closed loop |
| `/replay` | Mobile session replay SDK, privacy controls, exclusions |
| `/integrations` | Launch and planned integrations, connection-card contract |
| `/pricing` | Open-beta plan and how metering works |
| `/security` | Isolation, credentials, read-only, fail-closed, retention |
| `/about` | Thesis, category, roadmap levels |
| `/contact` | Email and waitlist |
| `/solutions`, `/solutions/[slug]` | Intent pages: review monitoring, competitor tracking, idea validation, RevenueCat analytics, rank tracking |
| `/compare`, `/compare/[slug]`, `/alternatives/[slug]` | Comparisons with Appfigures, AppFollow, Appbot, AppTweak, and alternatives hubs |
| `/glossary`, `/glossary/[slug]` | Definitions: app tracker, mobile app intelligence, ASO, review monitoring, competitor tracking, session replay |
| `/privacy`, `/terms`, `/cookies` | Legal |

Copy is sourced from the product specification in the `appfox` repository (`spec/docs`). Mockup data is illustrative and mirrors the spec's own examples; the site makes no customer, traffic, or revenue claims.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 3 with tokens in `app/globals.css`
- Inter, Boldonse, and IBM Plex Mono (Google Fonts): body, display headlines, and mono labels
- Resend for waitlist contacts and the confirmation email
- Google Analytics via `gtag`

## Develop

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set `RESEND_API_KEY`. Set `NEXT_PUBLIC_APP_URL` to show a "Sign in" link in the header once the product is reachable.

```bash
npm run lint
npm run build
```

## SEO and AI discoverability

Everything crawlers and answer engines read lives in a few files:

| File | What it does |
|---|---|
| `lib/seo.ts` | Site title, description, keywords, the `pageMetadata()` helper (canonical, Open Graph, Twitter), and the schema.org builders |
| `components/json-ld.tsx` | `<PageJsonLd>` (WebPage + breadcrumb) and `<FaqJsonLd>`; the root layout emits Organization, WebSite, and SoftwareApplication with the plan offers |
| `app/robots.txt/route.ts` | Explicit allow groups for search and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, and others) plus a `Content-Signal` line |
| `app/sitemap.ts` | One entry per route with a fixed `updated` date; bump it when a page changes |
| `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx` | Social card and PNG icons rendered from the fox mark at request time |
| `app/manifest.ts` | Web app manifest |
| `public/llms.txt`, `public/llms-full.txt` | The site in Markdown for language models; update them when the product copy changes |
| `content/competitors.ts`, `content/solutions.ts`, `content/glossary.ts` | Copy for the comparison and alternatives pages, the intent landing pages under `/solutions`, and the glossary; the routes under `app/compare`, `app/alternatives`, `app/solutions`, and `app/glossary` are templates over this data |

Set `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` in the environment to emit the ownership meta tags. After deploying, submit `https://appfox.app/sitemap.xml` in Google Search Console and Bing Webmaster Tools (Bing also feeds DuckDuckGo, Yahoo, and ChatGPT search).

## Structure

```text
app/                 routes, layout, metadata, sitemap, robots, social images, icons, manifest
components/          header, footer, hero, CTA band, FAQ, waitlist form
components/mock/     product UI mockups (Today feed, brief, competitors, themes, task, integration, replay)
components/ui/       container, button, section heading, page intro
lib/                 site constants, SEO metadata and structured data, waitlist persistence, email helpers, analytics
```
