import { notFound } from "next/navigation";
import LearningArticle from "@/components/learning-article";
import { getGuide, guides } from "@/content/guides";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  return guide ? pageMetadata(guide) : {};
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return <LearningArticle resource={guide} />;
}
