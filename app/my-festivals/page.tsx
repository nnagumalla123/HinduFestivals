import type { Metadata } from "next";
import { SavedFestivals } from "@/components/festivals/SavedFestivals";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listPublishedFestivals, listVerifiedOccurrences } from "@/lib/festivals/queries";

export const metadata: Metadata = {
  title: "My Festivals",
  description: "The festivals you have saved on this device. No account needed.",
};

// The saved list lives in this browser's localStorage, so the server can't know it:
// it passes every festival to a client component, which shows only the saved ones.
export default async function MyFestivalsPage() {
  const [festivals, occurrences] = await Promise.all([listPublishedFestivals(), listVerifiedOccurrences()]);
  return (
    <PageContainer>
      <SectionHeading
        level={1}
        title="My Festivals"
        description="The festivals you have saved. They are kept in this browser, so no account is needed."
      />
      <SavedFestivals festivals={festivals} occurrences={occurrences} />
    </PageContainer>
  );
}
