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
        <div className={cn("flex items-center gap-3 mb-4", align === "center" ? "justify-center" : "justify-start")}>
          {align === "center" && <span className="h-px w-8 bg-primary" />}
          <span className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-primary" />
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
