import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Home placeholder. The real "next festival" countdown and featured cards arrive in Phase 2,
// once verified dates exist. Until then we show an honest empty state, never an invented date.
export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-b from-gold-tint/60 to-transparent">
        <PageContainer className="gap-6">
          <SectionHeading
            level={1}
            title="Your traditions, wherever life takes you."
            description="Learn when Hindu festivals happen, what they mean, and how to celebrate them, whether you are at home or in a dorm room far from family."
          />
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

      <PageContainer className="pt-0">
        <section aria-labelledby="next-festival" className="flex flex-col gap-4">
          <h2 id="next-festival" className="text-3xl font-semibold">
            Next festival
          </h2>
          <EmptyState
            headingLevel={3}
            title="No verified dates yet"
            description="We show a countdown only after a date has been checked against a reliable calendar source. Until then, you can still explore every festival."
            action={
              <ButtonLink href="/explore" variant="secondary">
                Browse the festivals
              </ButtonLink>
            }
          />
        </section>

        <section aria-labelledby="what-you-will-find" className="flex flex-col gap-4">
          <h2 id="what-you-will-find" className="text-3xl font-semibold">
            What you will find here
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            <Card as="li">
              <h3 className="text-xl font-semibold">When</h3>
              <p className="mt-2 text-ink-muted">
                Verified dates for a clearly stated location, and an honest note when a date is
                not confirmed.
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
