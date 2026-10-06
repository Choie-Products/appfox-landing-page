import type { LearningResource } from "@/content/learning";

export const guides: LearningResource[] = [
  {
    "slug": "validate-an-app-idea",
    "path": "/guides/validate-an-app-idea",
    "title": "How to research an app idea before you build",
    "description": "Research an app idea with competitor listings, review themes, and a small validation plan. A practical guide for first-time and experienced mobile developers.",
    "kicker": "Guide · Before you build",
    "lead": "Start with a specific customer problem, compare the alternatives people already use, and turn review patterns into questions you can test. Store research can sharpen an idea; it cannot prove people will pay for it.",
    "updated": "2026-10-05",
    "sections": [
      {
        "id": "define-the-job",
        "title": "Start with the job, not a feature list",
        "paragraphs": [
          "Write one sentence that names the person, the moment, and the outcome: “Help a parent turn a week of family meals into one shared grocery list.” This is easier to investigate than “an AI meal app.” A useful research question stays meaningful even if your implementation changes.",
          "List what the person does today. That might be another app, a spreadsheet, a group chat, or a paper list. A technically simple workaround can be your strongest competitor. You are looking for a reason to switch, not just a feature you could build."
        ],
        "items": [
          "Who experiences this problem, and when?",
          "What is their current workaround?",
          "What would be noticeably easier if your idea worked?",
          "What observation would make you abandon or narrow the idea?"
        ]
      },
      {
        "id": "compare-alternatives",
        "title": "Choose competitors for the same customer and task",
        "paragraphs": [
          "Pick a small, deliberately varied set: a direct competitor, a popular broader product, a specialist, and a manual workaround. Record why each belongs in the set. Compare within the same store, country, and language before expanding to another market.",
          "Search several phrases a customer might use. A single query is a discovery method, not a census of the market. Apple describes search as using both text relevance and user behavior, so a high placement should not be read as proof of commercial success.",
          "Keep observations separate from interpretation. A listing that mentions a paid tier shows an offer exists. It does not tell you how many people buy it, what they pay after promotions, or whether the app is profitable."
        ],
        "items": [
          "Capture the app URL, date, store, country, and visible price.",
          "Record the core promise and the workflow shown in screenshots.",
          "Note what you actually tried versus what a listing merely describes."
        ],
        "links": [
          {
            "label": "Apple: how App Store search works",
            "href": "https://developer.apple.com/app-store/search/"
          }
        ]
      },
      {
        "id": "read-the-reviews",
        "title": "Read praise as carefully as complaints",
        "paragraphs": [
          "Look for recurring situations, not a bag of keywords. “Sharing is confusing” and “my partner never sees the new list” may describe different problems. Keep the original text alongside your label so you can revisit that decision.",
          "Record praise too. If customers consistently love fast setup, a redesign that adds a long onboarding flow could damage the very reason they chose the app. A gap is useful only when you understand the strengths people would give up by switching.",
          "For each theme, record how many collected reviews mention it and how many reviews you examined. Avoid selecting only one-star reviews and presenting the result as the view of all users. Written reviews are a self-selected sample, and an unmentioned feature is not necessarily absent."
        ],
        "items": [
          "Problem: what happened, to whom, and in which situation?",
          "Workaround: did the reviewer explain how they handled it?",
          "Frequency: how many collected reviews mention the same issue?",
          "Counterevidence: who likes the existing approach, and why?"
        ]
      },
      {
        "id": "write-a-brief",
        "title": "Turn the evidence into a one-page research brief",
        "paragraphs": [
          "Use the following outline in a document or spreadsheet. Keep source links next to each observation. The brief should help you make a decision, not make the idea sound inevitable.",
          "A fictional example: several reviewers struggle to coordinate a grocery list with a partner. Your hypothesis might be that clear sharing status matters more than adding recipe recommendations. The next question is whether your intended users experience that problem often enough to change their routine."
        ],
        "items": [
          "Audience and job: one person, one recurring situation, one desired outcome.",
          "Alternatives: what people use now and what those options do well.",
          "Observed friction: review patterns with counts, scope, and source links.",
          "Proposed difference: one workflow you would make easier.",
          "Reasons it may fail: small sample, strong incumbent, occasional need, or an acceptable workaround.",
          "Next test: a task someone can try and a decision you will make from the result."
        ],
        "links": [
          {
            "label": "Inspect the fictional sample report",
            "href": "/sample-report"
          }
        ]
      },
      {
        "id": "test-the-assumption",
        "title": "Test the riskiest assumption before building the whole app",
        "paragraphs": [
          "Ask intended users to walk through the last time the problem occurred. Look for what they actually did, where they stopped, and what the workaround cost them in effort. “Would you use this?” is weaker evidence than a concrete account of a recent task.",
          "Next, test one small workflow with a sketch, a clickable prototype, or a manually delivered result. For the shared-list idea, ask two people to add and update items together. Observe whether they can tell whose changes are saved. Do not explain the interface while measuring whether they understand it.",
          "Decide what would justify another iteration before you run the test. You might continue if the core task can be completed without help, narrow the audience if only one group cares, or stop if the current workaround is already good enough. These are product decisions, not a universal statistical threshold."
        ]
      },
      {
        "id": "use-appfox",
        "title": "Where Appfox fits",
        "paragraphs": [
          "Invited Appfox beta users can produce research briefs from store evidence, explore review themes, and track competitors and rankings. You can start with an idea before you have a published app. A brief can organize the evidence; customer conversations and hands-on tests are still your work.",
          "RevenueCat, session replay, and reply drafts are planned. Use the beta feature reference to check current scope before relying on a capability for your workflow."
        ],
        "links": [
          {
            "label": "Explore app idea research",
            "href": "/research"
          },
          {
            "label": "Check the beta feature reference",
            "href": "/beta"
          }
        ]
      }
    ],
    "related": [
      {
        "label": "How to read Appfox evidence",
        "href": "/methodology"
      },
      {
        "label": "A feedback loop for your first app",
        "href": "/guides/first-app-feedback-loop"
      }
    ]
  },
  {
    "slug": "analyze-reviews-after-a-release",
    "path": "/guides/analyze-reviews-after-a-release",
    "title": "How to investigate app reviews after a release",
    "description": "Investigate a review change after an app release using comparable periods, review themes, version context, and a concrete next test.",
    "kicker": "Guide · After you ship",
    "lead": "Compare like with like, inspect the original reviews, and test a specific explanation. More complaints after a release are a reason to investigate—not proof that the release caused them.",
    "updated": "2026-10-05",
    "sections": [
      {
        "id": "define-the-change",
        "title": "Name the change you are investigating",
        "paragraphs": [
          "Start with a narrow observation: “More collected reviews mention a missing shared list this week.” Avoid beginning with a conclusion such as “the release broke sync.” The narrower observation makes it easier to look for evidence that could support or contradict it.",
          "Write down the release date and version, store, country, language, and collection dates. Keep the review’s publication or update date separate from the date you collected it. A review arriving in your dataset today may describe an older experience."
        ]
      },
      {
        "id": "compare-periods",
        "title": "Use comparable periods and visible denominators",
        "paragraphs": [
          "Compare periods of equal length with the same collection rules. A seven-day window before a release and a seven-day window after it is a useful starting point, not a guarantee of a fair experiment. Campaigns, weekends, seasonal changes, and phased rollout can still affect who uses and reviews the app.",
          "In the fictional sample report, list-sync complaints appear in 2 of 12 reviews before a release and 6 of 12 afterward. That is about 17% versus 50% of these collected reviews, a difference of about 33 percentage points. It is not the percentage of all app users affected.",
          "Keep raw counts next to percentages. When the sample is this small, a few reviews can change the apparent trend dramatically. If the earlier period has no comparable data, report the current observations and say that a trend cannot yet be established."
        ],
        "links": [
          {
            "label": "Check every row behind this example",
            "href": "/sample-report#evidence"
          }
        ]
      },
      {
        "id": "check-the-reviews",
        "title": "Read the source text and version context",
        "paragraphs": [
          "Open each review behind the theme. Check whether it describes the same failure, whether it is a request rather than a bug, and whether the reported version is known. Do not infer an app version from a date alone. A single review can contain both praise and a complaint.",
          "Google Play Console supports filters including date, language, rating, and app version. These can help owners inspect a narrower group of reviews. That does not mean every public review feed, including a third-party collection, contains every field.",
          "A store rating and a written-review sample are different measurements. Apple allows an app’s overview rating to be reset with a release while written reviews remain. A before-and-after rating comparison can therefore be misleading if you ignore a reset."
        ],
        "items": [
          "Count an updated review once within the same snapshot.",
          "Keep the original language available when a translation seems ambiguous.",
          "Mark missing version or device information as unknown."
        ],
        "links": [
          {
            "label": "Google Play: view and analyze ratings and reviews",
            "href": "https://support.google.com/googleplay/android-developer/answer/138230?hl=en"
          },
          {
            "label": "Apple: resetting an app overview rating",
            "href": "https://developer.apple.com/help/app-store-connect/monitor-ratings-and-reviews/reset-an-app-overview-rating/"
          }
        ]
      },
      {
        "id": "investigate",
        "title": "Turn the pattern into a reproducible question",
        "paragraphs": [
          "For the shared-list example, try the smallest reproduction: two accounts, one shared list, one person adding an item, and the other reopening the app. Record device, app version, network state, and the exact point where the result differs from what you expected.",
          "Then compare other explanations. Did permissions change? Is the complaint about invitation setup rather than synchronization? Did a promotion bring users who expected a different feature? A coincident competitor price change is context, not evidence that it caused your review pattern.",
          "Use your existing crash, support, or product-analytics tools where relevant. Public store reviews cannot reveal what happened in every session. Appfox’s current beta does not include session replay or a RevenueCat connection."
        ]
      },
      {
        "id": "choose-the-next-step",
        "title": "Choose a next step and a way to check it",
        "paragraphs": [
          "A reproducible failure in a core task deserves a different response from a speculative feature request. Record the evidence, impact, proposed action, and who will check the result. The first action may be diagnosis or clarification rather than a new release.",
          "Before shipping a fix, repeat the original reproduction. After release, watch a comparable period and keep the same theme definition. If complaints fall, describe that as an observed improvement. Changes in traffic, rollout, or collection can still affect the comparison.",
          "Use this short investigation note to keep the next review focused."
        ],
        "items": [
          "Observation: what changed, in which sample, during which dates?",
          "Hypothesis: what might explain it, and what evidence would contradict it?",
          "Check: what exact steps will you reproduce or inspect?",
          "Decision: fix, clarify, investigate further, or monitor.",
          "Follow-up: when to review, which metric to compare, and what remains uncertain."
        ]
      },
      {
        "id": "use-appfox",
        "title": "Where Appfox fits",
        "paragraphs": [
          "Appfox’s private beta groups reviews into themes and brings daily findings together with competitor and rank tracking. Use it to identify a question and inspect its evidence. Keep diagnosis, experiments, and release decisions grounded in what you can verify.",
          "A quiet feed does not establish that every customer is happy. Check collection coverage and freshness before treating an absence of findings as an absence of problems."
        ],
        "links": [
          {
            "label": "Explore review monitoring",
            "href": "/solutions/app-review-monitoring"
          },
          {
            "label": "Understand coverage and limitations",
            "href": "/methodology"
          }
        ]
      }
    ],
    "related": [
      {
        "label": "The fictional sample report",
        "href": "/sample-report"
      },
      {
        "label": "A feedback loop for your first app",
        "href": "/guides/first-app-feedback-loop"
      }
    ]
  },
  {
    "slug": "first-app-feedback-loop",
    "path": "/guides/first-app-feedback-loop",
    "title": "What to improve after launching your first app",
    "description": "A practical feedback loop for first-time developers and vibe coders: collect evidence, choose one problem, test a change, and review what happened.",
    "kicker": "Guide · Your first live app",
    "lead": "Start with one customer problem you can understand and test. Combine app reviews, direct feedback, and hands-on checks to choose a useful next release—even when your app has very few users.",
    "updated": "2026-10-05",
    "sections": [
      {
        "id": "choose-a-task",
        "title": "Choose the task your app must get right",
        "paragraphs": [
          "Write down the core job in ordinary language: save a workout, send an invoice, or share a grocery list. Someone should be able to try it without hearing your product pitch. If you built with AI, this is also a useful way to check that generated code delivers the experience you intended.",
          "Walk through that task as a new user on a device you support. Try an empty account, a denied permission, a slow connection, and returning after the app has been closed. Check the result, not just whether the screen looks finished. Store intelligence can highlight a problem; it cannot replace testing your app."
        ]
      },
      {
        "id": "gather-feedback",
        "title": "Give each kind of feedback the right weight",
        "paragraphs": [
          "A review tells you what one reviewer chose to report. A support message can provide detail if the person is willing to explain. A usability session can show where someone gets stuck. Your analytics may show how often a task completes, if you have implemented and validated that measurement. These sources answer different questions.",
          "With only a few reviews, treat each concrete account as something to inspect rather than a percentage to optimize. No reviews means little public feedback is available; it does not mean there are no problems. Ask a willing tester to attempt the core task and observe without guiding every tap.",
          "Keep feedback in a simple log. You do not need an elaborate scoring system to avoid losing a useful observation."
        ],
        "items": [
          "Date and source: review, support conversation, or observed test.",
          "User task: what the person was trying to do.",
          "Observed problem: what happened, in their words.",
          "Reproduction: confirmed, not reproduced, or not yet checked.",
          "Next action and owner: who will investigate or follow up."
        ]
      },
      {
        "id": "prioritize",
        "title": "Pick a problem before picking a solution",
        "paragraphs": [
          "Prioritize failures that block the core task, especially data loss or an inability to complete it. A low-frequency issue can still be serious. Keep safety and privacy problems out of a popularity contest with cosmetic requests.",
          "For ordinary product improvements, compare the strength of the evidence, the impact on the task, and the effort needed to learn more. “Three people cannot find sharing” suggests first testing how sharing is presented. It does not automatically justify rebuilding the sync system.",
          "Choose one primary question for the next change. A dozen unrelated improvements make it hard to learn which one mattered. Record a counterexample too: an experienced user might already complete the task easily, so the issue could be onboarding rather than the feature itself."
        ]
      },
      {
        "id": "use-ai-deliberately",
        "title": "Give your coding assistant an evidence-based brief",
        "paragraphs": [
          "Describe the observed behavior, the expected behavior, and a small set of acceptance checks. Ask the assistant to explain which assumptions it is making. Review and test its changes before shipping, particularly around accounts, saved data, and payments.",
          "For example: “Two testers could not tell whether the shared list saved. Keep the existing layout. Make the saved state clear after a successful save, show a useful failure message, and verify that reopening the app keeps the saved items.” This is a narrower, testable task than “make the app more professional.”",
          "Use a minimal reproduction and fictional test data when sharing examples. Include only the context needed to investigate. Appfox does not build or edit your app; its beta helps you research and monitor store evidence."
        ]
      },
      {
        "id": "review-the-result",
        "title": "Make learning part of the release",
        "paragraphs": [
          "Before releasing, repeat the task that exposed the issue and check nearby behavior for regressions. Afterward, review whether new evidence supports the improvement. Keep the release date, version, and the question you intended to answer in the same note.",
          "Look at the same kind of evidence before and after. If you changed a label because testers could not find a control, ask new testers to attempt the same task. If you are investigating review themes, use comparable dates and keep the sample size visible.",
          "A lower complaint count does not by itself prove a fix worked: fewer users may have reviewed the app, the sample may be incomplete, or the new version may not have reached everyone. Keep what you observed separate from why you think it happened."
        ],
        "links": [
          {
            "label": "Investigate reviews after a release",
            "href": "/guides/analyze-reviews-after-a-release"
          }
        ]
      },
      {
        "id": "watch-the-market",
        "title": "Watch competitors without copying their roadmap",
        "paragraphs": [
          "Use competitor changes to ask better questions about your own positioning. A new feature may matter to a different audience. A price change does not reveal a competitor’s revenue, costs, or strategy.",
          "Keep a small set of competitors that serve the same customer task. Record the date and market when comparing their listings or ranks. Apple’s search guidance describes several relevance and behavior factors; rank movement alone is not a verdict on product quality.",
          "Appfox’s private beta provides research briefs, daily findings, review themes, and competitor and rank tracking. You can use those to decide what to investigate while continuing to test and ship with your existing development tools."
        ],
        "links": [
          {
            "label": "Apple: how App Store search works",
            "href": "https://developer.apple.com/app-store/search/"
          },
          {
            "label": "See current beta capabilities",
            "href": "/beta"
          }
        ]
      }
    ],
    "related": [
      {
        "label": "Research an idea before you build",
        "href": "/guides/validate-an-app-idea"
      },
      {
        "label": "Read a sample finding",
        "href": "/sample-report"
      }
    ]
  }
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
