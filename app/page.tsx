import Link from "next/link";

export default function Home() {
  return (
    <main className="page">
      <div className="review-card" style={{ maxWidth: 460 }}>
        <h1 className="review-card__name">Review Landing Pages</h1>
        <p className="review-card__prompt" style={{ marginTop: 16 }}>
          This app serves per-business review pages at{" "}
          <code>/r/[slug]</code> (registered in{" "}
          <code>lib/businesses.ts</code>), or fully dynamically at{" "}
          <code>/review?placeid=...&amp;name=...</code>.
        </p>
        <Link
          href="/r/sher-e-punjab"
          className="review-card__cta review-card__cta--visible"
          style={{ marginTop: 8 }}
        >
          View example →
        </Link>
      </div>
    </main>
  );
}
