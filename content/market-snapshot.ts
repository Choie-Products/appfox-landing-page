import type { LearningResource } from "@/content/learning";

export const mealPlanningSnapshot: LearningResource = {
  slug: "meal-planning-apps",
  path: "/research/meal-planning-apps",
  title: "Meal-planning apps: three approaches to the same weekly task",
  description: "An Appfox editorial snapshot of Mealime, Paprika, and Plan to Eat's US App Store listings. Three positioning approaches, source links, and questions to test before building.",
  kicker: "Market research · US App Store",
  lead: "A meal plan and a grocery list are already common promises. We read three app listings to see how they frame the work differently—and turn those differences into better questions for a new app idea.",
  updated: "2026-10-05",
  sections: [
    {
      id: "scope", title: "What we examined",
      paragraphs: [
        "Appfox reviewed the English descriptions of three US App Store listings on 5 October 2026: Mealime, Paprika Recipe Manager 3, and Plan to Eat. We deliberately selected these examples to compare different starting points for meal planning. They are not a ranked or representative sample of the category.",
        "Scope: 3 listing descriptions, 0 reviews coded, 0 in-app usability sessions, and no private usage or revenue data. The observations below describe what each developer advertises. We did not independently test the features. This is an editorial research exercise, not an Appfox customer result or an exported product report.",
      ],
      links: [{ label: "Download the three-row observation sheet (CSV)", href: "/research/meal-planning-listings-2026-10-05.csv" }],
    },
    {
      id: "mealime", title: "Mealime: start with a suggested plan",
      paragraphs: [
        "The listing emphasizes personalized meal plans, dietary preferences, guided cooking, and a grocery list generated from chosen meals. Its central promise is to reduce the work of choosing meals and shopping for them.",
        "Our interpretation: this starting point is useful to investigate when the customer says, “I do not know what to cook.” The next research question is how well the suggestions fit a household's actual week. The description alone cannot establish whether people follow the plan or keep using the app.",
      ],
      links: [{ label: "Source: Mealime's US App Store listing", href: "https://apps.apple.com/us/app/mealime-meal-plans-recipes/id1079999103" }],
    },
    {
      id: "paprika", title: "Paprika: start with your recipe collection",
      paragraphs: [
        "Paprika's listing describes importing recipes from websites, organizing a personal recipe collection, scheduling meals, tracking pantry items, and creating grocery lists. It also describes syncing data across devices and working offline.",
        "Our interpretation: the starting point is the collection the customer wants to keep and use. A useful next question is whether a newcomer already has recipes worth organizing, or needs help choosing recipes first. That distinction could change both onboarding and the people you recruit for a prototype test.",
      ],
      links: [{ label: "Source: Paprika Recipe Manager 3's US iOS listing", href: "https://apps.apple.com/us/app/paprika-recipe-manager-3/id1303222868" }],
    },
    {
      id: "plan-to-eat", title: "Plan to Eat: start with the weekly schedule",
      paragraphs: [
        "Plan to Eat's listing describes importing and storing recipes, scheduling them, scaling servings, planning leftovers and frozen meals, and generating an organized shopping list. It also describes syncing the recipe book, planner, and shopping list across devices.",
        "Our interpretation: the interesting research question is how a household manages changes after making a plan. A canceled dinner, different serving count, or leftover meal could be a useful prototype scenario. The listing does not tell us how frequently those situations cause problems.",
      ],
      links: [{ label: "Source: Plan to Eat's US App Store listing", href: "https://apps.apple.com/us/app/plan-to-eat/id1215348056" }],
    },
    {
      id: "finding", title: "The useful finding: choose a starting problem",
      paragraphs: [
        "All three reviewed descriptions connect planning meals to creating a grocery list. In this small set, that feature pair is shared. It is weak evidence for differentiation on its own.",
        "Our editorial reading highlights three starting problems: choosing meals, organizing recipes, and adapting a schedule. These are lenses for further research, not exclusive categories or missing-feature claims about the apps. A new builder can use them to make an idea more specific before writing code.",
        "For example: “Help a household update tonight's meal and shopping list after plans change” is a testable proposition. We have not established an unmet need for it. The next step is to see what people already do and whether that workaround is inconvenient enough to change.",
      ],
    },
    {
      id: "next-test", title: "A practical follow-up research plan",
      paragraphs: ["Use the same task across your research so the answers are comparable. Keep observations, interpretations, and proposed experiments in separate notes."],
      items: [
        "Read recent reviews from a declared time window and storefront. Record the number collected and coded; do not turn a few comments into a category-wide percentage.",
        "Ask people to show how they last planned, shopped, and changed a meal. Include the paper list or group chat they already use.",
        "Try the same changed-plan scenario in each app before making a usability or missing-feature claim. Record app versions and the steps you tested.",
        "Test one narrow prototype task. Decide in advance what observable result would justify another iteration, and record counterexamples.",
      ],
      links: [{ label: "Use the app-idea research guide", href: "/guides/validate-an-app-idea" }, { label: "See how Appfox connects findings to sources", href: "/how-it-works" }],
    },
    {
      id: "limits", title: "What this snapshot cannot tell you",
      paragraphs: [
        "This does not measure market size, demand, willingness to pay, feature quality, retention, or customer satisfaction. We did not collect Google Play data, rank the apps, estimate revenue, or audit every feature. Descriptions can omit capabilities and change after publication.",
        "The three apps are independent of Appfox; inclusion is not an endorsement or a customer relationship. Follow the source links for current details. Send corrections to hello@appfox.app with the listing URL and the observation that needs updating.",
      ],
    },
  ],
  related: [
    { label: "Research an app idea", href: "/guides/validate-an-app-idea" },
    { label: "Evidence and methodology", href: "/methodology" },
    { label: "Fictional review report example", href: "/sample-report" },
  ],
};
