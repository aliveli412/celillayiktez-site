import Link from "next/link";
import { communityKitchen, site } from "@/lib/site";

export default function CommunityKitchen({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`border-t border-[color:var(--line)] ${compact ? "bg-white py-14" : "bg-[color:var(--ink)] py-20 text-white"}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`grid gap-10 ${compact ? "md:grid-cols-1" : "md:grid-cols-[1.1fr_0.9fr] md:items-start"}`}>
          <div>
            <p
              className={`text-sm font-semibold uppercase tracking-[0.28em] ${
                compact ? "text-[color:var(--brand)]" : "text-white/70"
              }`}
            >
              {communityKitchen.eyebrow}
            </p>
            <h2
              className={`mt-3 font-display font-semibold tracking-tight ${
                compact ? "text-3xl text-[color:var(--ink)] md:text-4xl" : "text-4xl md:text-5xl"
              }`}
            >
              {communityKitchen.title}
            </h2>
            <p className={`mt-5 text-lg leading-8 ${compact ? "text-[color:var(--ink-soft)]" : "text-white/80"}`}>
              {communityKitchen.lead}
            </p>
            <p className={`mt-4 text-base leading-7 ${compact ? "text-[color:var(--ink-soft)]" : "text-white/75"}`}>
              {communityKitchen.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/visit"
                className={
                  compact
                    ? "bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white"
                    : "bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white hover:bg-[color:var(--brand-deep)]"
                }
              >
                Visit us
              </Link>
              <a
                href={site.umwUrl}
                target="_blank"
                rel="noreferrer"
                className={
                  compact
                    ? "border border-[color:var(--ink)]/25 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em]"
                    : "border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white hover:bg-white/10"
                }
              >
                About UMW
              </a>
            </div>
          </div>

          {!compact ? (
            <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              {communityKitchen.points.map((point) => (
                <li key={point} className="border border-white/15 bg-white/5 px-5 py-4 text-sm leading-6 text-white/90">
                  <span className="mr-2 text-[color:var(--brand)]">★</span>
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
