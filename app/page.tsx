import type { Metadata } from "next";
import { connection } from "next/server";
import { FeaturedFestivals } from "@/components/home/FeaturedFestivals";
import { NextFestival } from "@/components/home/NextFestival";
import { PageContainer } from "@/components/layout/PageContainer";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RangoliMotif } from "@/components/ui/RangoliMotif";
import { buildEntries } from "@/lib/festivals/calendar";
import { FEATURED_SLUGS } from "@/lib/festivals/featured";
import { todayInReferenceZone } from "@/lib/festivals/next-festival";
import { listPublishedFestivals, listVerifiedOccurrences } from "@/lib/festivals/queries";

export const metadata: Metadata = {
  title: { absolute: "Desi Days | Hindu festival guides for the diaspora" },
  description:
    "Learn what Hindu festivals mean, how they are celebrated, and how to observe them away from home. Save the ones you care about.",
};

export default async function Home() {
  // "Today" changes, so this page must be built per visit and never frozen at build time.
  await connection();
  const today = todayInReferenceZone(new Date());

  const [festivals, occurrences] = await Promise.all([listPublishedFestivals(), listVerifiedOccurrences()]);
  const entries = buildEntries(occurrences, festivals);
  const featured = FEATURED_SLUGS.flatMap((slug) => festivals.filter((f) => f.slug === slug));

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-gold-tint to-ivory">
        <RangoliMotif className="-right-20 -top-20 size-64 sm:-right-8 sm:-top-12 sm:size-96" />
        <PageContainer className="relative gap-5 pb-8 pt-10 sm:gap-6 sm:pb-10 sm:pt-14">
          <div className="flex max-w-4xl flex-col gap-3 sm:gap-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-saffron-deep">Desi Days</p>
            {/* From `md` up, each half of the sentence gets its own line, so the heading is two balanced lines. */}
            <h1 className="text-[2rem] font-semibold min-[360px]:text-4xl sm:text-5xl lg:text-6xl">
              <span className="md:block">Your traditions,</span> <span className="md:block">wherever life takes you.</span>
            </h1>
            <div aria-hidden="true" className="h-0.5 w-16 rounded-full bg-gold" />
            <p className="max-w-4xl text-lg text-ink-muted sm:text-xl">
              A guide to Hindu festivals for young Indian Americans and the wider diaspora: when they happen, what
              they mean, and how to celebrate them, whether you are at home or in a dorm room far from family.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/explore" size="lg">
              Explore festivals
            </ButtonLink>
            <ButtonLink href="/calendar" variant="secondary" size="lg">
              View calendar
            </ButtonLink>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="gap-12 pt-2 sm:pt-4">
        <NextFestival entries={entries} today={today} />
        <FeaturedFestivals festivals={featured} occurrences={occurrences} />

        <section aria-labelledby="what-you-will-find" className="flex flex-col gap-4">
          <h2 id="what-you-will-find" className="text-3xl font-semibold">
            What you will find here
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            <Card as="li">
              <h3 className="text-xl font-semibold">When</h3>
              <p className="mt-2 text-ink-muted">
                Verified dates for a clearly stated location, and an honest note when a date is not confirmed.
              </p>
            </Card>
            <Card as="li">
              <h3 className="text-xl font-semibold">Why</h3>
              <p className="mt-2 text-ink-muted">
                Short, sourced explanations first, with deeper stories when you want them.
              </p>
            </Card>
            <Card as="li">
              <h3 className="text-xl font-semibold">How</h3>
              <p className="mt-2 text-ink-muted">
                Traditional customs and practical, dorm-friendly ways to celebrate.
              </p>
            </Card>
          </ul>
        </section>
      </PageContainer>
    </>
  );
}
