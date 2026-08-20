"use client";

import { useEffect, useState } from "react";

type ReviewCardProps = {
  name: string;
  tagline?: string;
  logo?: string;
  accent: string;
  reviewUrl: string;
};

export default function ReviewCard({
  name,
  tagline,
  logo,
  accent,
  reviewUrl,
}: ReviewCardProps) {
  const [filled, setFilled] = useState(0);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const starDelay = 140;
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 1; i <= 5; i++) {
      timers.push(
        setTimeout(() => setFilled(i), 300 + i * starDelay)
      );
    }
    timers.push(
      setTimeout(() => setCtaVisible(true), 300 + 6 * starDelay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className="review-card"
      style={{ ["--accent" as string]: accent }}
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={`${name} logo`} className="review-card__logo" />
      ) : (
        <div className="review-card__mark" aria-hidden="true">
          {name.charAt(0)}
        </div>
      )}

      <h1 className="review-card__name">{name}</h1>
      {tagline ? <p className="review-card__tagline">{tagline}</p> : null}

      <div className="review-card__stars" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={`star ${i < filled ? "star--filled" : ""}`}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <path d="M12 2.5l2.94 6.4 6.93.78-5.18 4.77 1.4 6.9L12 17.98l-6.09 3.37 1.4-6.9L2.13 9.68l6.93-.78L12 2.5z" />
          </svg>
        ))}
      </div>

      <p className="review-card__prompt">
        Share your experience with us
      </p>

      <a
        href={reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`review-card__cta ${ctaVisible ? "review-card__cta--visible" : ""}`}
      >
        <svg className="google-g" viewBox="0 0 48 48" aria-hidden="true">
          <path
            fill="#FFC107"
            d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
          />
          <path
            fill="#FF3D00"
            d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.4 0 10.3-2.1 13.9-5.4l-6.4-5.4C29.4 34.9 26.8 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.6 39.6 16.3 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.7l6.4 5.4C39.9 37 44 31.4 44 24c0-1.3-.1-2.7-.4-3.5z"
          />
        </svg>
        Review us on Google
      </a>

      <p className="review-card__footnote">
        Takes less than a minute — thank you.
      </p>
    </div>
  );
}
