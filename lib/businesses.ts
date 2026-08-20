/**
 * Business registry.
 *
 * Add one entry per client here. The `slug` is what appears in the QR code URL:
 *   review.yourdomain.com/r/<slug>
 *
 * `placeId` is the Google Place ID for that business's Google Business Profile.
 * Find it here: https://developers.google.com/maps/documentation/places/web-service/place-id
 *
 * Later, swap the body of `getBusiness()` for a DB / CMS / API call —
 * every consumer of this function already awaits it, so the switch is a one-file change.
 */

export type Business = {
  slug: string;
  name: string;
  /** Short line under the business name, e.g. cuisine or category */
  tagline?: string;
  /** Google Place ID used to build the "write a review" deep link */
  placeId: string;
  /** Optional path under /public, e.g. "/logos/sher-e-punjab.png" */
  logo?: string;
  /** Optional accent color override (hex). Falls back to the default theme. */
  accent?: string;
};

const businesses: Business[] = [
  {
    slug: "sher-e-punjab",
    name: "Sher-e-Punjab",
    tagline: "North Indian Kitchen",
    placeId: "ChIJrTLr-GyuEmsRBfy61i59si0", // replace with the real Place ID
    accent: "#C9A15C",
  },
  // Add more clients below:
  // {
  //   slug: "another-restaurant",
  //   name: "Another Restaurant",
  //   tagline: "Cafe & Bakery",
  //   placeId: "ChIJ...",
  // },
];

export async function getBusiness(slug: string): Promise<Business | null> {
  // Swap this for `await db.business.findUnique({ where: { slug } })` etc. when ready.
  return businesses.find((b) => b.slug === slug) ?? null;
}

export function buildGoogleReviewUrl(placeId: string): string {
  return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(
    placeId
  )}`;
}
