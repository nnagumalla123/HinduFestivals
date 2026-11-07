import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DateNotVerified } from "@/components/festivals/DateNotVerified";
import { PageContainer } from "@/components/layout/PageContainer";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFestivalBySlug } from "@/lib/festivals/queries";
import { mockFestivals } from "@/lib/festivals/mock-data";

// In Next.js 16 a dynamic route's `params` arrives as a Promise, so we `await` it.
type Props = { params: Promise<{ slug: string }> };

// Pre-build a page for each known slug. Unknown slugs still reach the page and hit notFound().
export function generateStaticParams() {
  return mockFestivals.map((festival) => ({ slug: festival.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const festival = await getFestivalBySlug(slug);
  return { title: festival ? festival.name : "Festival not found" };
}

// Placeholder detail page. The full guide (stories, rituals, food, sources...) is Phase 2/3.
export default async function FestivalPage({ params }: Props) {
  const { slug } = await params;
  const festival = await getFestivalBySlug(slug);

  // Unknown slug: show the nearest not-found.tsx and send an HTTP 404.
  if (!festival) notFound();

  return (
    <PageContainer>
      <Link href="/explore" className="font-semibold text-saffron-deep underline underline-offset-4">
        All festivals
      </Link>

      <header className="flex flex-col gap-4">
        <SectionHeading level={1} title={festival.name} description={festival.subtitle} />
        {festival.aliases.length > 0 && (
          <p className="text-ink-muted">Also known as {festival.aliases.join(", ")}</p>
        )}
        <div>
          <DateNotVerified />
        </div>
      </header>

      <EmptyState
        title="Full guide not yet available"
        description="This is placeholder content. The sourced story, customs, food and fasting notes, and celebration ideas are still being prepared and reviewed."
      />
    </PageContainer>
  );
}
