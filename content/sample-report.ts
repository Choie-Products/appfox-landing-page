/** Fictional, hand-labeled teaching data. No records were collected from real apps or users. */
export type SampleReview = {
  id: string;
  period: "before" | "after";
  date: string;
  version: string;
  text: string;
  themes: string[];
};

export const sampleReviews: SampleReview[] = [
  {
    "id": "before-01",
    "period": "before",
    "date": "2026-09-14",
    "version": "2.0",
    "text": "Sharing a list with my partner takes a long time to update.",
    "themes": [
      "sync"
    ]
  },
  {
    "id": "before-02",
    "period": "before",
    "date": "2026-09-14",
    "version": "2.0",
    "text": "An item I added on my phone did not appear on the shared list.",
    "themes": [
      "sync"
    ]
  },
  {
    "id": "before-03",
    "period": "before",
    "date": "2026-09-15",
    "version": "2.0",
    "text": "Planning weekday dinners is much easier now.",
    "themes": [
      "planning"
    ]
  },
  {
    "id": "before-04",
    "period": "before",
    "date": "2026-09-15",
    "version": "2.0",
    "text": "The recipe categories help me decide what to cook.",
    "themes": [
      "planning"
    ]
  },
  {
    "id": "before-05",
    "period": "before",
    "date": "2026-09-16",
    "version": "2.0",
    "text": "I like having all my meals for the week in one place.",
    "themes": [
      "planning"
    ]
  },
  {
    "id": "before-06",
    "period": "before",
    "date": "2026-09-16",
    "version": "2.0",
    "text": "Could the app support larger text?",
    "themes": [
      "accessibility"
    ]
  },
  {
    "id": "before-07",
    "period": "before",
    "date": "2026-09-17",
    "version": "2.0",
    "text": "The shopping categories save me time in the store.",
    "themes": [
      "shopping"
    ]
  },
  {
    "id": "before-08",
    "period": "before",
    "date": "2026-09-17",
    "version": "2.0",
    "text": "I want to move items between shopping categories.",
    "themes": [
      "shopping"
    ]
  },
  {
    "id": "before-09",
    "period": "before",
    "date": "2026-09-18",
    "version": "2.0",
    "text": "The annual plan price was not clear to me.",
    "themes": [
      "pricing"
    ]
  },
  {
    "id": "before-10",
    "period": "before",
    "date": "2026-09-18",
    "version": "2.0",
    "text": "The recipe search should handle ingredient substitutions.",
    "themes": [
      "search"
    ]
  },
  {
    "id": "before-11",
    "period": "before",
    "date": "2026-09-19",
    "version": "2.0",
    "text": "I use the weekly plan every Sunday.",
    "themes": [
      "planning"
    ]
  },
  {
    "id": "before-12",
    "period": "before",
    "date": "2026-09-19",
    "version": "2.0",
    "text": "I would like the list available without a connection.",
    "themes": [
      "offline"
    ]
  },
  {
    "id": "after-01",
    "period": "after",
    "date": "2026-09-21",
    "version": "2.1",
    "text": "My partner cannot see the item I just added to our list.",
    "themes": [
      "sync"
    ]
  },
  {
    "id": "after-02",
    "period": "after",
    "date": "2026-09-21",
    "version": "2.1",
    "text": "Our shared list still shows yesterday’s items after reopening.",
    "themes": [
      "sync"
    ]
  },
  {
    "id": "after-03",
    "period": "after",
    "date": "2026-09-22",
    "version": "2.1",
    "text": "The list on my tablet is different from the one on my phone.",
    "themes": [
      "sync"
    ]
  },
  {
    "id": "after-04",
    "period": "after",
    "date": "2026-09-22",
    "version": "2.1",
    "text": "We keep buying duplicates because the shared list updates late.",
    "themes": [
      "sync",
      "shopping"
    ]
  },
  {
    "id": "after-05",
    "period": "after",
    "date": "2026-09-23",
    "version": "2.1",
    "text": "Changes I make to the family list do not show for the other account.",
    "themes": [
      "sync"
    ]
  },
  {
    "id": "after-06",
    "period": "after",
    "date": "2026-09-23",
    "version": "2.1",
    "text": "Weekly planning is great, but shared changes only appear after I restart.",
    "themes": [
      "sync",
      "planning"
    ]
  },
  {
    "id": "after-07",
    "period": "after",
    "date": "2026-09-24",
    "version": "2.1",
    "text": "The new recipe cards are easier to scan.",
    "themes": [
      "planning"
    ]
  },
  {
    "id": "after-08",
    "period": "after",
    "date": "2026-09-24",
    "version": "2.1",
    "text": "Please add more vegetarian recipes to search.",
    "themes": [
      "search"
    ]
  },
  {
    "id": "after-09",
    "period": "after",
    "date": "2026-09-25",
    "version": "2.1",
    "text": "The shopping categories are still useful.",
    "themes": [
      "shopping"
    ]
  },
  {
    "id": "after-10",
    "period": "after",
    "date": "2026-09-25",
    "version": "2.1",
    "text": "I want an offline version of my saved list.",
    "themes": [
      "offline"
    ]
  },
  {
    "id": "after-11",
    "period": "after",
    "date": "2026-09-26",
    "version": "2.1",
    "text": "The subscription options could be clearer.",
    "themes": [
      "pricing"
    ]
  },
  {
    "id": "after-12",
    "period": "after",
    "date": "2026-09-26",
    "version": "2.1",
    "text": "The weekly overview helps me plan ahead.",
    "themes": [
      "planning"
    ]
  }
];

export function summarizeSample(period: SampleReview["period"]) {
  const reviews = sampleReviews.filter((review) => review.period === period);
  const mentions = reviews.filter((review) => review.themes.includes("sync"));
  return { reviews, mentions, share: mentions.length / reviews.length };
}
