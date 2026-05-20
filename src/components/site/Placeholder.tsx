import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderProps {
  label?: string;
  className?: string;
  ratio?: "square" | "video" | "portrait" | "wide";
}

const ratioClass = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

export function Placeholder({ label = "Imagen real próximamente", className, ratio = "video" }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-muted border border-border flex items-center justify-center text-muted-foreground",
        ratioClass[ratio],
        className,
      )}
      aria-label={label}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_45%,rgba(0,0,0,0.04)_50%,transparent_55%)]" />
      <div className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest">
        <ImageIcon className="h-6 w-6 opacity-50" />
        <span className="opacity-60">{label}</span>
      </div>
    </div>
  );
}
