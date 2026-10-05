import LearningArticle from "@/components/learning-article";
import { methodology } from "@/content/resources";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(methodology);

export default function MethodologyPage() {
  return <LearningArticle resource={methodology} />;
}
