import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FestivalDetail } from "@/components/festivals/detail/FestivalDetail";
import { PageContainer } from "@/components/layout/PageContainer";
import { getFestivalBySlug, getFestivalGuide, getOccurrencesForFestival, listPublishedFestivals } from "@/lib/festivals/queries";

// In Next.js 16 a dynamic route's `params` arrives as a Promise, so we `await` it.
type Props = { params: Promise<{ slug: string }> };

// Only the pre-built slugs are valid: anything else (unknown, partial, or the wrong letter case) is a
// real 404 from the router itself, the same on every request. Without this, a wrong-case slug such as
// /festivals/HOLI could get a 200 on its very first visit.
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await listPublishedFestivals()).map((festival) => ({ slug: festival.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const festival = await getFestivalBySlug(slug);
  if (!festival) return { title: "Festival not found" };
  // No dates here: none are verified yet, and the description must never imply one.
  const lead = festival.subtitle ? `${festival.name}: ${festival.subtitle}.` : `${festival.name}.`;
  return {
    title: festival.name,
    description: `${lead} A sourced guide to its meaning, traditions and how to celebrate it, including away from home.`,
  };
}

export default async function FestivalPage({ params }: Props) {
  // The page stays statically built (cacheable, and an unknown slug is a real HTTP 404). A date's countdown
  // is worked out in the browser (see Countdown), so it never freezes at build time. Reviewed content and
  // verified dates arrive with a deploy, since they live in the repository's content files.
  const { slug } = await params;
  const festival = await getFestivalBySlug(slug);

  // Unknown slug: show the nearest not-found.tsx and send an HTTP 404.
  if (!festival) notFound();

  const [occurrences, guide] = await Promise.all([getOccurrencesForFestival(slug), getFestivalGuide(slug)]);

  return (
    <PageContainer className="gap-8">
      <Link href="/explore" className="font-semibold text-saffron-deep underline underline-offset-4">
        All festivals
      </Link>
      <FestivalDetail festival={festival} occurrences={occurrences} guide={guide} />
    </PageContainer>
  );
}
