import type { Metadata } from "next";
import Link from "next/link";
import { chronology, chronologyIntro, type ChronologyItem } from "@/lib/chronology";

export const metadata: Metadata = {
  title: "Yaşam Kronolojisi",
  description: "Pek Muh. Celil Layiktez — yaşam kronolojisi",
};

function Icon({ type }: { type: ChronologyItem["icon"] }) {
  const common = "h-4 w-4";
  switch (type) {
    case "life":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 19c1.6-3.2 4-4.8 6.5-4.8S17 15.8 18.5 19" strokeLinecap="round" />
        </svg>
      );
    case "edu":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 9.5 12 5l9 4.5-9 4.5L3 9.5Z" strokeLinejoin="round" />
          <path d="M7 12v4.5c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5V12" strokeLinecap="round" />
          <path d="M21 10v6" strokeLinecap="round" />
        </svg>
      );
    case "career":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3.5" y="8" width="17" height="11" rx="1.5" />
          <path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8" />
          <path d="M3.5 13h17" />
        </svg>
      );
    case "work":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14 4c-2.5 2-3.5 5-3.5 8.5 0 2 .6 3.8 1.7 5.5" strokeLinecap="round" />
          <path d="M10.5 12.5c-1.8.4-3.4 1.6-4.5 3.5" strokeLinecap="round" />
          <path d="M15.5 5.5c1.6-.2 3 .8 3.2 2.4.2 1.3-.6 2.3-1.7 2.8" strokeLinecap="round" />
        </svg>
      );
    case "legacy":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 19h16" strokeLinecap="round" />
          <path d="M6 19V9l6-4 6 4v10" strokeLinejoin="round" />
          <path d="M10 19v-5h4v5" />
        </svg>
      );
  }
}

function badgeClass(category: ChronologyItem["category"]) {
  if (category === "Yaşam" || category === "Eser") {
    return "bg-[color:var(--ember)] text-white";
  }
  return "bg-[color:var(--paper-deep)] text-[color:var(--ink-soft)]";
}

function nodeClass(icon: ChronologyItem["icon"]) {
  if (icon === "career" || icon === "legacy") {
    return "bg-[#4a4f57] text-white";
  }
  return "bg-[color:var(--ember)] text-white";
}

export default function KronolojiPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <div className="text-center">
        <div className="inline-flex items-center gap-3">
          <span className="h-px w-8 bg-[color:var(--ember)]" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--ember)]">
            Bir ömür
          </p>
          <span className="h-px w-8 bg-[color:var(--ember)]" />
        </div>
        <h1 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">Yaşam Kronolojisi</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[color:var(--ink-soft)] md:text-base">
          {chronologyIntro}
        </p>
      </div>

      <ol className="relative mt-14 space-y-6 pl-2 md:pl-4">
        <span
          aria-hidden
          className="absolute bottom-3 left-[1.35rem] top-3 w-px bg-[color:var(--line)] md:left-[1.6rem]"
        />
        {chronology.map((item) => (
          <li key={`${item.year}-${item.title}`} className="relative grid grid-cols-[2.7rem_1fr] gap-4 md:grid-cols-[3.2rem_1fr] md:gap-5">
            <div className="relative z-10 flex justify-center pt-5">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm ${nodeClass(item.icon)}`}
              >
                <Icon type={item.icon} />
              </span>
            </div>

            <article className="rounded-xl border border-[color:var(--line)] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(16,20,26,0.05)] md:px-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-xl font-semibold text-[color:var(--ember)] md:text-2xl">
                  {item.year}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${badgeClass(item.category)}`}
                >
                  {item.category}
                </span>
                {item.date ? (
                  <span className="text-xs text-[color:var(--ink-soft)]">{item.date}</span>
                ) : null}
              </div>
              <h2 className="mt-3 font-display text-xl tracking-tight text-[color:var(--ink)] md:text-2xl">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-[color:var(--ink-soft)]">{item.text}</p>
            </article>
          </li>
        ))}
      </ol>

      <div className="mt-12 text-center">
        <Link
          href="/hakkinda"
          className="inline-flex text-sm font-semibold text-[color:var(--ember)] hover:text-[color:var(--ember-deep)]"
        >
          Tam yaşamöyküsü →
        </Link>
      </div>
    </div>
  );
}
