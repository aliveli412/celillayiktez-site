import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">Latest updates</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          News, updates and stories from the space
        </h1>
        <p className="mt-5 text-lg leading-8 text-[color:var(--ink-soft)]">
          Updates, activities, announcements and stories from Idea Fabrika.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.slug} className="border border-[color:var(--line)] bg-white p-8">
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">
              <span>{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">{post.title}</h2>
            <p className="mt-4 text-base leading-7 text-[color:var(--ink-soft)]">{post.excerpt}</p>
            <div className="mt-6 text-sm font-medium text-[color:var(--brand)]">/{post.slug}</div>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)]">
          ← Back home
        </Link>
      </div>
    </div>
  );
}
