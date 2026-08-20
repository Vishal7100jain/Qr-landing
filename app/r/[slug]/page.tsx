import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBusiness, buildGoogleReviewUrl } from "@/lib/businesses";
import ReviewCard from "@/components/ReviewCard";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ placeid?: string; placeId?: string }>;
};

const DEFAULT_ACCENT = "#C9A15C";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusiness(slug);
  return {
    title: business ? `Review ${business.name}` : "Leave a review",
  };
}

export default async function ReviewPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;

  const business = await getBusiness(slug);

  // Allow a placeId passed directly in the URL (?placeid=... or ?placeId=...)
  // to override or stand in for a registered business — handy for testing
  // or for clients you haven't added to the registry yet.
  const overridePlaceId = sp.placeid ?? sp.placeId;

  if (!business && !overridePlaceId) {
    notFound();
  }

  const name = business?.name ?? slug.replace(/-/g, " ");
  const tagline = business?.tagline;
  const logo = business?.logo;
  const accent = business?.accent ?? DEFAULT_ACCENT;
  const placeId = overridePlaceId ?? business!.placeId;
  const reviewUrl = buildGoogleReviewUrl(placeId);

  return (
    <main className="page">
      <ReviewCard
        name={name}
        tagline={tagline}
        logo={logo}
        accent={accent}
        reviewUrl={reviewUrl}
      />
    </main>
  );
}
