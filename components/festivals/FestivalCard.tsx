import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { MockFestival } from "@/lib/festivals/types";
import { DateNotVerified } from "./DateNotVerified";

/** One festival in a list. Renders an <li>, so place it inside a <ul>. */
export function FestivalCard({ festival }: { festival: MockFestival }) {
  return (
    <Card as="li" className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">
        <Link href={`/festivals/${festival.slug}`} className="hover:underline">
          {festival.name}
        </Link>
      </h2>
      <p className="text-ink-muted">{festival.subtitle}</p>
      {festival.aliases.length > 0 && (
        <p className="text-sm text-ink-muted">Also known as {festival.aliases.join(", ")}</p>
      )}
      <div className="mt-1">
        <DateNotVerified />
      </div>
    </Card>
  );
}
