import Image from "next/image";
import { ArrowUpRight, Check, Star } from "lucide-react";

/**
 * A market view in the style of the Appfox Market page: a tracked competitor set with store details.
 * Ratings, prices, and release dates are the apps' public US App Store values as of October 2026.
 */

type Row = {
  icon: string;
  name: string;
  seller: string;
  scope: "Direct" | "Adjacent";
  category: string;
  rating: string;
  ratings: string;
  price: string;
  released: string;
  tracking: boolean;
};

const ROWS: Row[] = [
  {
    icon: "mealime",
    name: "Mealime Meal Plans & Recipes",
    seller: "Mealime Meal Plans Inc",
    scope: "Direct",
    category: "Food & Drink",
    rating: "4.8",
    ratings: "54.1K",
    price: "Free",
    released: "Feb 24, 2016",
    tracking: true,
  },
  {
    icon: "plantoeat",
    name: "Plan to Eat",
    seller: "Plan to Eat, LLC",
    scope: "Direct",
    category: "Food & Drink",
    rating: "4.8",
    ratings: "6.1K",
    price: "Free",
    released: "Jul 19, 2017",
    tracking: true,
  },
  {
    icon: "eatthismuch",
    name: "Eat This Much - Meal Planner",
    seller: "Eat This Much Inc.",
    scope: "Direct",
    category: "Health & Fitness",
    rating: "4.7",
    ratings: "22.1K",
    price: "Free",
    released: "Jun 15, 2015",
    tracking: true,
  },
  {
    icon: "paprika",
    name: "Paprika Recipe Manager 3",
    seller: "Hindsight Labs LLC",
    scope: "Adjacent",
    category: "Food & Drink",
    rating: "4.9",
    ratings: "53.9K",
    price: "$4.99",
    released: "Nov 15, 2017",
    tracking: true,
  },
  {
    icon: "anylist",
    name: "AnyList: Grocery Shopping List",
    seller: "Purple Cover, Inc.",
    scope: "Adjacent",
    category: "Productivity",
    rating: "4.9",
    ratings: "80.7K",
    price: "Free",
    released: "May 11, 2012",
    tracking: true,
  },
  {
    icon: "bring",
    name: "Bring! Grocery Shopping List",
    seller: "Bring! Labs AG",
    scope: "Adjacent",
    category: "Productivity",
    rating: "4.8",
    ratings: "9.8K",
    price: "Free",
    released: "Sep 1, 2014",
    tracking: false,
  },
];

const TABS = ["Competitors", "Top free", "Top paid", "New entrants"];

export default function MarketTable() {
  return (
    <div className="window overflow-hidden text-ink" aria-hidden="true">
      <div className="flex flex-wrap items-start justify-between gap-4 px-5 pb-4 pt-5 sm:px-6">
        <div>
          <p className="text-[18px] font-semibold leading-6">Market</p>
          <p className="pt-0.5 text-[14px] leading-5 text-muted">Meal planning · US App Store</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-[#f3f3f2] p-1 text-[13px] font-medium leading-4">
          <span className="rounded-full bg-white px-3 py-1.5 text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06)]">App Store</span>
          <span className="px-3 py-1.5 text-quiet">Google Play · soon</span>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto px-5 pb-4 sm:px-6">
        {TABS.map((tab, i) => (
          <span
            key={tab}
            className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium leading-4 ${
              i === 0 ? "bg-ink text-white" : "bg-[#f6f6f5] text-muted"
            }`}
          >
            {tab}
            {i === 0 ? <span className="text-[12px] text-white/60">{ROWS.length}</span> : null}
          </span>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-y border-line font-mono text-[11px] uppercase leading-4 text-quiet">
              <th className="py-3 pl-5 pr-3 font-normal sm:pl-6">App</th>
              <th className="px-3 py-3 font-normal">Category</th>
              <th className="px-3 py-3 font-normal">Rating</th>
              <th className="px-3 py-3 font-normal">Price</th>
              <th className="px-3 py-3 font-normal">Released</th>
              <th className="py-3 pl-3 pr-5 font-normal sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.name} className="border-b border-line last:border-b-0">
                <td className="py-3 pl-5 pr-3 sm:pl-6">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`/icons/${row.icon}.jpg`}
                      alt=""
                      width={36}
                      height={36}
                      className="size-9 shrink-0 rounded-[22%] ring-1 ring-black/5"
                    />
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 text-[14px] font-semibold leading-5">
                        <span className="truncate">{row.name}</span>
                        <span
                          className={`shrink-0 rounded-md px-1.5 py-0.5 text-[11px] font-medium leading-3 ${
                            row.scope === "Direct" ? "bg-accent-soft text-accent-ink" : "bg-[#f3f3f2] text-muted"
                          }`}
                        >
                          {row.scope}
                        </span>
                      </p>
                      <p className="truncate text-[12px] leading-4 text-muted">{row.seller}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-[13px] leading-5 text-muted">{row.category}</td>
                <td className="px-3 py-3">
                  <p className="flex items-center gap-1 text-[13px] font-medium leading-5">
                    <Star className="size-3.5 text-ink" strokeWidth={1.8} />
                    {row.rating}
                  </p>
                  <p className="text-[11px] leading-4 text-quiet">{row.ratings}</p>
                </td>
                <td className="px-3 py-3 text-[13px] leading-5">{row.price}</td>
                <td className="px-3 py-3 text-[13px] leading-5 text-ink-soft">{row.released}</td>
                <td className="py-3 pl-3 pr-5 sm:pr-6">
                  <div className="flex items-center justify-end gap-3">
                    <ArrowUpRight className="size-4 text-quiet" strokeWidth={1.8} />
                    {row.tracking ? (
                      <span className="flex items-center gap-1 rounded-full bg-[#f3f3f2] px-3 py-1.5 text-[12px] font-medium leading-4 text-ink">
                        <Check className="size-3.5 text-accent" strokeWidth={2.4} />
                        Tracking
                      </span>
                    ) : (
                      <span className="rounded-full border border-line px-3 py-1.5 text-[12px] font-medium leading-4 text-ink">
                        Track
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
