import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildGoogleReviewUrl } from "@/lib/businesses";
import ReviewCard from "@/components/ReviewCard";

type PageProps = {
  searchParams: Promise<{
    placeid?: string;
    placeId?: string;
    name?: string;
    tagline?: string;
    accent?: string;
    logo?: string;
  }>;
};

const DEFAULT_ACCENT = "#C9A15C";

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  return { title: sp.name ? `Review ${sp.name}` : "Leave a review" };
}

/**
 * Fully dynamic, registry-free version of the review page.
 * Example: /review?placeid=ChIJ...&name=Sher-e-Punjab&tagline=North+Indian+Kitchen&accent=%23C9A15C
 */
export default async function ReviewQueryPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const placeId = sp.placeid ?? sp.placeId;

  if (!placeId) {
    notFound();
  }

  const name = sp.name ?? "our restaurant";
  const reviewUrl = buildGoogleReviewUrl(placeId);

  return (
    <main className="page">
      <ReviewCard
        name={name}
        tagline={sp.tagline}
        logo={sp.logo}
        accent={sp.accent ?? DEFAULT_ACCENT}
        reviewUrl={reviewUrl}
      />
    </main>
  );
}
