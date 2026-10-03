import { ART_HEIGHT, ART_WIDTH } from "@/components/home/journey-art";
import ScaleToFit from "@/components/mock/scale-to-fit";
import { cn } from "@/lib/utils";

/** Frames a homepage-style product scene: a soft card with the 400×330 scene scaled to fit, like the journey deck. */
export default function SceneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("deck-front flex items-center justify-center rounded-[32px] p-6 sm:p-10", className)}>
      <div className="w-full max-w-[420px]">
        <ScaleToFit width={ART_WIDTH} height={ART_HEIGHT}>
          {children}
        </ScaleToFit>
      </div>
    </div>
  );
}
