import type { Metadata } from "next";
import Link from "next/link";
import { infoCards, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">About Idea Fabrika</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">{site.aboutTitle}</h1>
          <p className="mt-6 text-lg leading-8 text-[color:var(--ink-soft)]">{site.aboutText1}</p>
          <p className="mt-4 text-lg leading-8 text-[color:var(--ink-soft)]">{site.aboutText2}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/menu" className="bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white">
              See the menu
            </Link>
            <Link href="/visit" className="border border-[color:var(--ink)]/25 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em]">
              Plan a visit
            </Link>
          </div>
        </div>

        <aside className="border border-[color:var(--line)] bg-white p-8">
          <h2 className="font-display text-2xl font-semibold">At a glance</h2>
          <div className="mt-6 grid gap-4">
            {infoCards.map(([label, value]) => (
              <div key={label} className="border-t border-[color:var(--line)] pt-4 first:border-t-0 first:pt-0">
                <div className="text-xs uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">{label}</div>
                <div className="mt-1 font-medium text-[color:var(--ink)]">{value}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-16 overflow-hidden border border-[color:var(--line)]">
        <img src={site.storefrontSrc} alt="Idea Fabrika storefront" className="h-[420px] w-full object-cover" />
      </div>
    </div>
  );
}
