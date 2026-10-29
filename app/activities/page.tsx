import type { Metadata } from "next";
import Link from "next/link";
import { activities } from "@/lib/site";

export const metadata: Metadata = {
  title: "Activities",
};

export default function ActivitiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">What we do</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Food, activities and connection in one shared space
        </h1>
        <p className="mt-5 text-lg leading-8 text-[color:var(--ink-soft)]">
          Idea Fabrika brings together everyday hospitality and community activity, creating a space that feels both useful and welcoming.
        </p>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {activities.map((section, index) => (
          <article key={section.title} className="border border-[color:var(--line)] bg-white p-8">
            <div className="font-display text-3xl text-[color:var(--brand)]">0{index + 1}</div>
            <h2 className="mt-4 font-display text-2xl font-semibold">{section.title}</h2>
            <p className="mt-4 text-base leading-7 text-[color:var(--ink-soft)]">{section.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <Link href="/visit" className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">
          Visit the space →
        </Link>
      </div>
    </div>
  );
}
