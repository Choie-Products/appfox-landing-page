import type { LearningResource } from "@/content/learning";

export const methodology: LearningResource = {
  "slug": "methodology",
  "path": "/methodology",
  "title": "How to read the evidence behind an Appfox finding",
  "description": "Understand Appfox findings, review-theme counts, research limits, source coverage, and the difference between an observation and a conclusion.",
  "kicker": "Methodology & evidence",
  "lead": "Treat a finding as a question backed by sources. Check what was collected, how it was compared, and what remains unknown before deciding what to do next.",
  "updated": "2026-10-05",
  "sections": [
    {
      "id": "three-parts",
      "title": "Separate the observation, interpretation, and next step",
      "paragraphs": [
        "An observation describes the source data: six collected reviews mention trouble sharing a list. An interpretation explains why that might matter: a core task may be failing for some reviewers. A next step proposes a check: reproduce sharing with two accounts on the reported version.",
        "Those statements have different levels of certainty. An exact count can be verified against a sample even when the explanation is uncertain. A recommendation should stay open to revision when you inspect the original sources or learn more about the app."
      ],
      "links": [
        {
          "label": "Inspect a complete fictional example",
          "href": "/sample-report"
        }
      ]
    },
    {
      "id": "sources",
      "title": "Know what public store data can tell you",
      "paragraphs": [
        "Appfox’s current beta focuses on public App Store and Google Play evidence: listings, collected reviews, competitors, and tracked rankings. Research briefs and daily findings organize that evidence around an idea or an existing app.",
        "A listing describes what a publisher presents publicly. A review describes one person’s account. A rank is an observation for a query and market at a time. None of these alone gives you a complete view of sessions, retention, revenue, or every potential customer.",
        "The product preview shows the dashboard interface. Treat figures in marketing illustrations as examples of presentation, not audited revenue figures, evidence about the pictured apps, customer endorsements, or measured results from using Appfox."
      ]
    },
    {
      "id": "coverage",
      "title": "Read the scope before the conclusion",
      "paragraphs": [
        "When assessing a finding, check the store, country, language, dates, number of collected records, and freshness of the collection. Missing scope is a reason to investigate further. Do not fill in an unknown field from an assumption.",
        "A collected sample can miss older reviews, other languages, countries, or records unavailable from the source. Collection limits can also change which observations appear. Compare equivalent scopes before describing a trend.",
        "Google Play documents several review filters and notes that some reviews include device or version details. That is a useful reminder to distinguish available fields from missing ones; it is not a claim that Appfox has access to every field in an owner’s console."
      ],
      "items": [
        "Same store, country, language, and collection rule in both periods.",
        "A source date and a collection date, where known.",
        "A visible numerator and denominator for each percentage.",
        "An explicit “unknown” when data was not observed."
      ],
      "links": [
        {
          "label": "Google Play: ratings and review fields",
          "href": "https://support.google.com/googleplay/android-developer/answer/138230?hl=en"
        }
      ]
    },
    {
      "id": "review-themes",
      "title": "What a theme count means",
      "paragraphs": [
        "A theme is a grouping of reviews that discuss a similar subject. A mention count should count reviews, not repetitions of a word. If one review repeats “sync” four times, it is still one review mentioning sync.",
        "The denominator matters: 6 of 12 collected reviews is 50% of that sample. It is not 50% of active users, paying customers, or installs. If reviews can belong to more than one theme, theme shares can add up to more than 100%.",
        "AI classification can misread sarcasm, translations, mixed sentiment, or two similar-sounding problems. Inspect the original text before prioritizing a theme. The worked example uses hand-labeled fictional records so every label and calculation can be checked."
      ],
      "links": [
        {
          "label": "Review the sample records and labels",
          "href": "/sample-report#evidence"
        }
      ]
    },
    {
      "id": "comparisons",
      "title": "A before-and-after change is not a causal result",
      "paragraphs": [
        "Compare periods with matching durations and collection rules. Record releases, campaigns, outages, pricing changes, and other events that may affect the result. A small sample can be useful for finding a concrete problem while remaining too weak for a broad conclusion.",
        "A review theme rising after a release does not establish that the release caused it. A decline after a fix does not isolate the effect of that fix. Look for reproduction steps and independent evidence; use an appropriate experiment when you need a causal answer.",
        "Rating summaries need their own context. Apple permits resetting an overview rating when releasing a new version, while written reviews continue to display. A comparison that ignores that reset can mix incompatible measurements."
      ],
      "links": [
        {
          "label": "Apple: overview-rating resets",
          "href": "https://developer.apple.com/help/app-store-connect/monitor-ratings-and-reviews/reset-an-app-overview-rating/"
        }
      ]
    },
    {
      "id": "research-limits",
      "title": "What a research brief cannot establish",
      "paragraphs": [
        "Reviews can reveal recurring frustrations, appreciated features, and language customers use. Listings can show positioning and visible offers. Together, they can help you choose a hypothesis worth testing.",
        "They cannot by themselves establish market size, willingness to pay, competitor profit, or whether a business will succeed. An absent complaint does not prove that a problem is solved. A feature absent from a listing may still exist inside the app.",
        "Take the strongest open question into an interview, task test, or small experiment. Record what evidence would change your mind before you invest in the full implementation."
      ],
      "links": [
        {
          "label": "Use the app-idea research guide",
          "href": "/guides/validate-an-app-idea"
        }
      ]
    },
    {
      "id": "beta-boundaries",
      "title": "What is confirmed in the beta",
      "paragraphs": [
        "Invited users can use research briefs, daily findings, review themes, and competitor and rank tracking. RevenueCat, session replay, and reply drafts are planned. This page explains how to assess evidence; it does not guarantee refresh intervals, retention, or coverage in every market.",
        "Ask about the specific store and country you need when discussing beta access. Prices and allowances shown on the pricing page are proposed, and no release dates are announced for planned capabilities."
      ],
      "links": [
        {
          "label": "Read the beta feature reference",
          "href": "/beta"
        },
        {
          "label": "Contact Appfox about your use case",
          "href": "/contact"
        }
      ]
    }
  ],
  "related": [
    {
      "label": "The sample report",
      "href": "/sample-report"
    },
    {
      "label": "Investigate a review change",
      "href": "/guides/analyze-reviews-after-a-release"
    },
    {
      "label": "All developer guides",
      "href": "/guides"
    }
  ]
};

export const beta: LearningResource = {
  "slug": "beta",
  "path": "/beta",
  "title": "Appfox private beta: what is available today",
  "description": "See which Appfox features are available in private beta, which are planned, how to request an invitation, and what to prepare before you start.",
  "kicker": "Private beta · Feature reference",
  "lead": "Appfox is available by invitation. The current beta includes research briefs, daily findings, review themes, and competitor and rank tracking for mobile-app research and monitoring.",
  "updated": "2026-10-05",
  "sections": [
    {
      "id": "available",
      "title": "Available to invited beta users",
      "paragraphs": [
        "You can start with an app idea or with an app you have already launched. These are the capabilities confirmed for the current beta."
      ],
      "items": [
        "Research briefs: organize evidence from listings and reviews around an app idea.",
        "Daily findings: review meaningful changes and the evidence behind them.",
        "Review themes: understand recurring complaints, requests, and praise in collected reviews.",
        "Competitor and rank tracking: follow the apps and store queries relevant to your market."
      ],
      "links": [
        {
          "label": "Research an app idea",
          "href": "/research"
        },
        {
          "label": "Monitor a live app",
          "href": "/live-app"
        }
      ]
    },
    {
      "id": "planned",
      "title": "Planned, with no release dates announced",
      "paragraphs": [
        "The following capabilities are not available in the current beta. Illustrations and proposed pricing may describe the intended experience, but they do not make these features current entitlements."
      ],
      "items": [
        "RevenueCat: an optional, read-only connection for revenue and subscription context.",
        "Mobile session replay: a planned way to review sessions from your own app.",
        "Reply and store-copy drafts: prepared text for you to review and publish yourself.",
        "Ask Fox: questions and answers over your app evidence."
      ],
      "links": [
        {
          "label": "Explore the integration roadmap",
          "href": "/integrations"
        },
        {
          "label": "Read the planned replay approach",
          "href": "/replay"
        }
      ]
    },
    {
      "id": "prepare",
      "title": "What to bring to the beta",
      "paragraphs": [
        "For an idea, describe the customer, the problem, and the store and country you want to research. Bring a few apps or workarounds that people already use, if you know them. You do not need a published app to begin researching.",
        "For a live app, have its App Store or Google Play URL and a short list of questions ready. For example: what do reviewers repeatedly struggle with, which competitors should I follow, and which queries matter to my listing?",
        "The current store-data features do not require you to install an SDK or connect private revenue data. Appfox helps you understand evidence; building the app, testing changes, and submitting releases stay in your existing tools."
      ],
      "links": [
        {
          "label": "Read the beginner research guide",
          "href": "/guides/validate-an-app-idea"
        },
        {
          "label": "Build a feedback loop after launch",
          "href": "/guides/first-app-feedback-loop"
        }
      ]
    },
    {
      "id": "invitations",
      "title": "How invitations and pricing work",
      "paragraphs": [
        "Submit your email through the request-access form. Appfox will contact you when an invitation is available. Sending the form is a request, not immediate workspace access, and it does not start a paid subscription.",
        "No guaranteed invitation date is published. The Free, Indie, and Studio plans on the pricing page are proposals, not final beta terms. Confirm any charges, limits, and access conditions in your invitation before you accept.",
        "For a specific store, country, workflow, or capability, contact Appfox before assuming support. You can also read the public sample and guides without requesting an invitation."
      ],
      "links": [
        {
          "label": "Request beta access",
          "href": "/waitlist"
        },
        {
          "label": "Review proposed pricing",
          "href": "/pricing"
        },
        {
          "label": "Contact the team",
          "href": "/contact"
        }
      ]
    },
    {
      "id": "before-you-rely-on-a-finding",
      "title": "What to check before acting on a finding",
      "paragraphs": [
        "Check the original source, collection scope, sample size, and date. A pattern in collected reviews can help choose an investigation; it does not prove demand, revenue potential, or the cause of a change.",
        "No customer outcome is implied by the sample report. It uses fictional data to explain how evidence can support a next step. The methodology guide covers how to interpret counts and comparisons."
      ],
      "links": [
        {
          "label": "See the fictional sample report",
          "href": "/sample-report"
        },
        {
          "label": "Read the evidence guide",
          "href": "/methodology"
        }
      ]
    }
  ],
  "related": [
    {
      "label": "All developer guides",
      "href": "/guides"
    },
    {
      "label": "Product overview",
      "href": "/product"
    }
  ]
};
