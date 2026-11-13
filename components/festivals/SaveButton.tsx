"use client";

import { Button } from "@/components/ui/Button";
import { useSavedFestivals } from "@/lib/festivals/use-saved-festivals";

/**
 * Save / unsave one festival in this browser. `mode="remove"` is for the My Festivals page,
 * where the only sensible action is removing. The festival name is read out to screen readers
 * only, so the visible label stays short on cards.
 */
export function SaveButton({
  slug,
  name,
  mode = "toggle",
  className,
}: {
  slug: string;
  name: string;
  mode?: "toggle" | "remove";
  className?: string;
}) {
  const { isSaved, save, unsave } = useSavedFestivals();
  const saved = mode === "remove" || isSaved(slug);

  return (
    <Button
      variant={saved && mode === "toggle" ? "primary" : "secondary"}
      onClick={() => (saved ? unsave(slug) : save(slug))}
      className={className}
    >
      <span aria-hidden="true" className="mr-2">
        {mode === "remove" ? "✕" : saved ? "★" : "☆"}
      </span>
      {mode === "remove" ? "Remove" : saved ? "Saved" : "Save"}{" "}
      <span className="sr-only">
        {name}
        {saved ? (mode === "remove" ? " from My Festivals" : ". Press to remove from My Festivals") : " to My Festivals"}
      </span>
    </Button>
  );
}
