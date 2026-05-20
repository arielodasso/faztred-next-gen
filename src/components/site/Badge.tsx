import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "light" | "dark" | "solid" | "ghost";

interface Props {
  children: ReactNode;
  variant?: Variant;
  dot?: boolean;
  className?: string;
  as?: "span" | "div";
}

/**
 * Reusable industrial badge — thin border, uppercase tracking, optional red dot.
 * Used consistently in Home, Servicios y Proyectos.
 * Inspired by n8n.io chip language.
 */
export function Badge({
  children,
  variant = "light",
  dot = false,
  className,
  as: Tag = "span",
}: Props) {
  const base =
    "inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] border rounded-full whitespace-nowrap";
  const variants: Record<Variant, string> = {
    light: "bg-white/70 backdrop-blur border-border text-foreground",
    dark: "bg-white/5 border-white/15 text-white/80",
    solid: "bg-foreground border-foreground text-white",
    ghost: "bg-transparent border-primary/40 text-primary",
  };
  return (
    <Tag className={cn(base, variants[variant], className)}>
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
      )}
      {children}
    </Tag>
  );
}
