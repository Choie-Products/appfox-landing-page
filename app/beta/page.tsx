import LearningArticle from "@/components/learning-article";
import { beta } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(beta);

export default function BetaPage() {
  return <LearningArticle resource={beta} />;
}
