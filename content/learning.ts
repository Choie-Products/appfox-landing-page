export type ResourceLink = { label: string; href: string };
export type ResourceSection = {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
  links?: ResourceLink[];
};
export type LearningResource = {
  slug: string;
  path: string;
  title: string;
  description: string;
  kicker: string;
  lead: string;
  updated: string;
  sections: ResourceSection[];
  related: ResourceLink[];
};
