import type { MetadataRoute } from "next";
import { competitors } from "@/content/competitors";
import { terms } from "@/content/glossary";
import { solutions } from "@/content/solutions";
import { guides } from "@/content/guides";
import { SITE_URL } from "@/lib/site";

type Route = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  /** The date the page's content last changed. Bump it when you edit the page. */
  updated: string;
};

const MARKETING_UPDATED = "2026-10-05";
const LEGAL_UPDATED = "2026-09-18";
/** Comparison, solution, and glossary pages. */
const CONTENT_UPDATED = "2026-10-05";

const routes: Route[] = [
  { path: "", priority: 1, changeFrequency: "weekly", updated: MARKETING_UPDATED },
  { path: "/product", priority: 0.9, changeFrequency: "monthly", updated: MARKETING_UPDATED },
  { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly", updated: MARKETING_UPDATED },
  { path: "/research/meal-planning-apps", priority: 0.7, changeFrequency: "monthly", updated: "2026-10-05" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly", updated: MARKETING_UPDATED },
  { path: "/research", priority: 0.8, changeFrequency: "monthly", updated: MARKETING_UPDATED },
  { path: "/live-app", priority: 0.8, changeFrequency: "monthly", updated: MARKETING_UPDATED },
  { path: "/replay", priority: 0.7, changeFrequency: "monthly", updated: MARKETING_UPDATED },
  { path: "/integrations", priority: 0.7, changeFrequency: "monthly", updated: MARKETING_UPDATED },
  { path: "/waitlist", priority: 0.7, changeFrequency: "monthly", updated: MARKETING_UPDATED },
  { path: "/about", priority: 0.6, changeFrequency: "monthly", updated: MARKETING_UPDATED },
  { path: "/security", priority: 0.6, changeFrequency: "monthly", updated: MARKETING_UPDATED },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly", updated: MARKETING_UPDATED },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", updated: "2026-10-05" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly", updated: LEGAL_UPDATED },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly", updated: "2026-10-05" },
  { path: "/solutions", priority: 0.7, changeFrequency: "monthly", updated: CONTENT_UPDATED },
  ...solutions.map((s) => ({ path: `/solutions/${s.slug}`, priority: 0.8, changeFrequency: "monthly" as const, updated: CONTENT_UPDATED })),
  { path: "/compare", priority: 0.7, changeFrequency: "monthly", updated: CONTENT_UPDATED },
  ...competitors.map((c) => ({ path: `/compare/${c.slug}`, priority: 0.8, changeFrequency: "monthly" as const, updated: CONTENT_UPDATED })),
  ...competitors.map((c) => ({ path: `/alternatives/${c.slug}`, priority: 0.7, changeFrequency: "monthly" as const, updated: CONTENT_UPDATED })),
  { path: "/glossary", priority: 0.6, changeFrequency: "monthly", updated: CONTENT_UPDATED },
  ...terms.map((t) => ({ path: `/glossary/${t.slug}`, priority: 0.6, changeFrequency: "yearly" as const, updated: CONTENT_UPDATED })),
  { path: "/sample-report", priority: 0.8, changeFrequency: "monthly", updated: "2026-10-05" },
  { path: "/methodology", priority: 0.7, changeFrequency: "monthly", updated: "2026-10-05" },
  { path: "/beta", priority: 0.7, changeFrequency: "monthly", updated: "2026-10-05" },
  { path: "/guides", priority: 0.7, changeFrequency: "monthly", updated: "2026-10-05" },
  ...guides.map((guide) => ({ path: guide.path, priority: 0.7, changeFrequency: "monthly" as const, updated: guide.updated })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(r.updated),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
