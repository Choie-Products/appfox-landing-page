# Marketing content and launch verification

Pre-merge verification, 5 October 2026. These checks were completed on `full-website` before deployment.

## What was added

- `/how-it-works`: a five-step walkthrough grounded in the app repository, using the existing Split, SceneFrame, buttons, and illustrations.
- `/research/meal-planning-apps`: a dated editorial comparison of three US App Store descriptions. Includes primary-source links, a downloadable observation sheet, and explicit scope: three listings, zero coded reviews, zero usability tests. No customer results are claimed.
- Comparison and alternatives pages now cite vendor sources, distinguish billing terms and product tiers, disclose Appfox authorship, and label unverified features rather than asserting absence.
- Private-beta availability is consistent in comparison copy and structured data. Proposed plans are no longer emitted as in-stock offers or an available free subscription.
- Canonical URLs use `https://www.appfox.app`, matching the current public redirect. Sitemap, social URLs, JSON-LD, and crawler references share that host.
- Invisible measurement records access-request clicks, confirmed new saves, duplicates, submission errors, and successful optional role saves. First-arrival attribution survives internal navigation in the same browser tab.

Existing page sections, layouts, CSS, illustrations, and the dashboard preview were retained. The homepage hero copy was left as previously approved.

## App-code grounding

The separate `appfox` application repository was read as a reference and not modified. Code presence does not establish beta entitlement: the user-confirmed scope remains research briefs, daily findings, review themes, and competitor/rank tracking.

| Public description | App-code reference, relative to the app repository |
| --- | --- |
| Dashboard, Customers, Market, Keywords, Settings | `apps/web/lib/workspace-navigation.ts` |
| Research an idea / operate a live app | `apps/web/components/workspace-journey-picker.tsx`, `apps/web/components/onboarding-flow.tsx` |
| App / opportunity overview, comparison and feedback context | `apps/web/components/dashboard-overview.tsx` |
| Themes, sampled/classified counts, linked reviews | `apps/web/components/customer-voice.tsx`, `apps/web/components/customer-reviews.tsx` |
| Keyword observations, market scope, notes, provenance | `apps/web/components/keyword-monitor.tsx` |
| Research briefs, decisions, actions and evidence records | `apps/web/app/w/[slug]/markets/[marketId]/research/page.tsx`, `apps/web/app/w/[slug]/markets/[marketId]/evidence/[evidenceId]/page.tsx` |

RevenueCat, session replay, reply drafts, and Ask Fox remain explicitly planned. Existing illustrative UI is not a claim that all pictured features are available. No founder biography, legal company name, customer testimonial, independent benchmark, or public social profile was invented. The confirmed public identity is Appfox, based in Milan, Italy.

## Resend access requests

The API requires contact persistence before it returns `saved: true`. A new request receives a private-beta request receipt, not an invitation. Existing requests preserve unsubscribe preferences and first-touch attribution. The API does not silently retry a contact without its metadata or configured segment. A receipt failure leaves the saved request intact and is explained in the UI. Provider acceptance does not establish inbox delivery.

Production deployments run `setup:resend` automatically through the `npm run build` prebuild hook. The hook uses the sensitive key inside Vercel; it does not download or print it. It stops the deployment if the required configuration cannot be prepared. Local and preview builds skip this production setup. For a manual configuration check in an environment that already has the server-side Resend key:

```sh
npm run check:resend
# If the required contact properties are missing:
npm run setup:resend
```

The setup command creates only missing string properties: `source`, `role`, `utm_source`, `utm_medium`, `utm_campaign`, and `referrer`. It preserves existing properties, rejects incompatible types, checks the configured segment if present, and sends no emails. `RESEND_FROM` must use a verified sending domain (default `Appfox <hello@appfox.app>`). The key must support Contacts and sending; a sending-only key cannot persist requests.

The local check could not reach Resend because the sensitive Vercel key is unavailable locally. This is not evidence that the production key is missing. No production contacts were created and no live email was sent during verification. Keep keys in Vercel or an ignored local environment file, never in source control or chat.

Deployment verification still needed: submit an address you control, confirm its contact properties/segment and receipt, repeat the request to check duplicate handling, save a role, and inspect delivery status in Resend. The existing per-process IP rate limiter is a lightweight guard, not a distributed abuse-control system.

References: [Resend contact properties](https://resend.com/docs/api-reference/contact-properties/create-contact-property), [Resend rate limits](https://resend.com/docs/api-reference/rate-limit).

## Measurement

| Event | When it fires | Parameters added by this site |
| --- | --- | --- |
| `request_access_click` | A link to the configured access destination is clicked | `page_path`, `placement` |
| `waitlist_submit` | A locally valid email is submitted | `source` |
| `waitlist_success` | The server confirms a newly saved request | `source` |
| `waitlist_existing` | The server confirms an existing request | `source` |
| `waitlist_error` | A request or transport fails | `source`, `error_type` |
| `secondary_profile_completed` | The optional role is persisted | `role` |

No applicant email is included in custom event parameters. Campaign labels and the external referrer origin are stored with the Resend contact. The referrer's path/query is not collected by this attribution code. Session-storage failure must not block the form.

In GA4, mark `waitlist_success` as a key event and compare it with access clicks by landing page/source. Treat role selection as a qualification hint, not evidence of activation. Count unique saved applicants in Resend as the operational total; browser analytics can be blocked, retried, or sampled. Review invited and activated users separately in the product before claiming a channel produces qualified users. No GA administration changes were made in this pass.

## Public-site check and next deployment

On 5 October 2026:

- The apex domain redirected with 307 to `https://www.appfox.app`.
- The production homepage, robots file, and sitemap returned 200, but the homepage still had the older title and an apex canonical.
- `/product`, `/beta`, `/guides`, `/how-it-works`, and `/llms.txt` returned 404 on the live site. The full website is not yet deployed there.

After the normal Git-based deployment, verify the new URLs return 200, their canonicals match the served hostname, and deployment protection/firewall rules permit the intended crawlers. Submit `https://www.appfox.app/sitemap.xml` in Google Search Console and Bing Webmaster Tools, then inspect the homepage, walkthrough, research article, and a representative comparison URL. Existing verification environment hooks are already in `app/layout.tsx`; account ownership/indexing status was not verified in this task.

Search access and useful, source-linked text matter more than additional AI-specific files. `llms.txt` is supplementary and is not an indexing or citation guarantee. Search-crawler access and model-training permission are separate choices; the existing permissive robots policy was retained.

References: [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features), [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots), [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).

## Verification

- `npm test`: 17 tests passed, covering persistence failures, duplicate handling, partial email failures, segment/role failures, malformed input, attribution, and bounded rate-limit retries. Resend was mocked; these are not delivery tests.
- `npm run build`: passed, including TypeScript checks and 55 generated entries.
- Local content crawl: 45 sitemap pages, 2,211 links, no broken internal links or fragment targets; one H1, description, canonical, and parseable JSON-LD checked per page.
- Preservation check: 87 existing protected files matched the pre-pass hashes, including dashboard preview, illustrations, image assets, shared CSS, and homepage hero.
- Browser verification: desktop screenshots of the walkthrough and research page; mobile checks at 390px for the homepage, walkthrough, Product, a comparison, an alternatives page, and the research article, with no document overflow. The product-to-walkthrough link and invalid-email error passed; no browser warnings or errors were recorded. The temporary viewport override was reset.

Detailed verification output and screenshots are stored in the task's `appfox-quality-pass` artifact directory. The production server remains available at `http://localhost:3101` for review.
