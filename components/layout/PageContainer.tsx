import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Consistent page width and spacing. Page content only: the <main> element lives in SiteShell. */
export function PageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12 sm:py-16", className)}>
      {children}
    </div>
  );
}
