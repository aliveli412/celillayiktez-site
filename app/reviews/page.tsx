"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export default function ReviewsPage() {
  const [googleReviewSummary, setGoogleReviewSummary] = useState({
    rating: 0,
    totalReviews: 0,
    placeName: "Idea Fabrika London",
  });

  const [featuredGoogleReviews, setFeaturedGoogleReviews] = useState<
    { name: string; rating: number; text: string; date: string }[]
  >([]);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch("/api/google-reviews");
        const data = await res.json();
        setGoogleReviewSummary({
          rating: data.rating || 0,
          totalReviews: data.totalReviews || 0,
          placeName: data.placeName || "Idea Fabrika London",
        });
        setFeaturedGoogleReviews(
          (data.reviews || []).filter((review: { rating: number }) => review.rating >= 4).slice(0, 6)
        );
      } catch {
        console.error("Failed to load reviews");
      }
    }
    loadReviews();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">Reviews</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            What people love about Idea Fabrika
          </h1>
          <p className="mt-5 text-lg leading-8 text-[color:var(--ink-soft)]">
            A selection of positive Google reviews from visitors who enjoyed the atmosphere, food and community feel of the space.
          </p>
        </div>

        <div className="border border-[color:var(--line)] bg-white p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">Google rating</div>
              <div className="mt-2 flex items-end gap-3">
                <div className="font-display text-5xl font-semibold">{googleReviewSummary.rating}</div>
                <div className="pb-1 text-[color:var(--brand)]">★★★★★</div>
              </div>
              <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
                Based on {googleReviewSummary.totalReviews} Google reviews for {googleReviewSummary.placeName}.
              </p>
            </div>
            <a
              href={site.googleUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex bg-[color:var(--ink)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
            >
              View on Google
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {featuredGoogleReviews.map((review, index) => (
          <article key={`${review.name}-${index}`} className="flex h-full flex-col border border-[color:var(--line)] bg-white p-8">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-semibold">{review.name}</h2>
                <p className="text-sm text-[color:var(--ink-soft)]">{review.date}</p>
              </div>
              <div className="text-sm text-[color:var(--brand)]">{"★".repeat(review.rating)}</div>
            </div>
            <p className="text-base leading-7 text-[color:var(--ink-soft)]">“{review.text}”</p>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/menu" className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">
          Browse the menu →
        </Link>
      </div>
    </div>
  );
}
