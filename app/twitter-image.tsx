import { OG_SIZE, ogCard } from "@/components/og-card";

export const alt = "Appfox: Your app, explained. The AI app tracker for iOS and Android founders.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function TwitterImage() {
  return ogCard();
}
