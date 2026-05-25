import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}

export function SectionTitle({ eyebrow, title, description, align = "left", className, dark }: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <div className={cn("flex items-center gap-2.5 mb-4", align === "center" ? "justify-center" : "justify-start")}>
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className={cn(
            "text-[11px] uppercase tracking-[0.22em] font-semibold",
            dark ? "text-white/55" : "text-muted-foreground",
          )}>
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance",
          dark ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg",
            dark ? "text-white/60" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
