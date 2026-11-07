import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Pick the HTML element that fits the content: `article` for a self-contained item such as a festival card. */
  as?: "div" | "article" | "section" | "li";
}

/** A soft ivory surface with a thin gold border. Content decides the layout inside. */
export function Card({ as: Tag = "div", className, ...props }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-lg border border-gold/60 bg-ivory-soft p-5 shadow-card sm:p-6",
        className,
      )}
      {...props}
    />
  );
}
