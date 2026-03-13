import { NextResponse } from "next/server";

const PLACE_ID = "ChIJR5LXOsEddkgRWDH2I_CIJXc";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GOOGLE_PLACES_API_KEY" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=displayName,rating,userRatingCount,reviews&key=${apiKey}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Google Places API error", details: text },
        { status: res.status }
      );
    }

    const data = await res.json();

    const transformed = {
      placeName: data.displayName?.text || "Idea Fabrika London",
      rating: data.rating || 0,
      totalReviews: data.userRatingCount || 0,
      reviews: (data.reviews || []).map((review: any) => ({
        name: review.authorAttribution?.displayName || "Google User",
        rating: review.rating || 0,
        text: review.text?.text || "",
        date: review.relativePublishTimeDescription || "Google Review",
      })),
    };

    return NextResponse.json(transformed);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Google reviews" },
      { status: 500 }
    );
  }
}