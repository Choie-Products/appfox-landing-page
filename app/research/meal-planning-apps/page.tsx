import LearningArticle from "@/components/learning-article";
import { mealPlanningSnapshot } from "@/content/market-snapshot";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(mealPlanningSnapshot);

export default function MealPlanningResearchPage() {
  return <LearningArticle resource={mealPlanningSnapshot} />;
}
