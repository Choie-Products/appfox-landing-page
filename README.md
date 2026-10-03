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
| `/privacy`, `/terms`, `/cookies` | Legal |

Copy is sourced from the product specification in the `appfox` repository (`spec/docs`). Mockup data is illustrative and mirrors the spec's own examples; the site makes no customer, traffic, or revenue claims.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 3 with tokens in `app/globals.css`
- Inter, Jost, and IBM Plex Mono (Google Fonts): body, display headlines, and mono labels
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

## Structure

```text
app/                 routes, layout, metadata, sitemap, robots
components/          header, footer, hero, CTA band, FAQ, waitlist form
components/mock/     product UI mockups (Today feed, brief, competitors, themes, task, integration, replay)
components/ui/       container, button, section heading, page intro
lib/                 site constants, waitlist persistence, email helpers, analytics
```
