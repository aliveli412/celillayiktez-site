import type { Metadata } from "next";
import Link from "next/link";
import { menuMeta, menuSections } from "@/lib/menu";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Idea Fabrika bilingual café menu — Kurdish and Turkish breakfast, mains, daily dishes, drinks and more.",
};

function StarDivider() {
  return (
    <div className="my-10 flex items-center justify-center gap-4 text-[color:var(--brand)]" aria-hidden>
      <span className="h-px w-16 bg-[color:var(--brand)]/40 sm:w-28" />
      <span className="text-lg">★</span>
      <span className="h-px w-16 bg-[color:var(--brand)]/40 sm:w-28" />
    </div>
  );
}

export default function MenuPage() {
  return (
    <div className="menu-paper min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
        <header className="text-center">
          <img
            src={site.logoSrc}
            alt="Idea Fabrika"
            className="mx-auto h-16 w-auto object-contain md:h-20"
          />
          <p className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.55em] text-[color:var(--brand)] md:text-sm">
            M E N Ü
          </p>
          <h1 className="mt-2 font-display text-5xl font-semibold tracking-[0.35em] text-[color:var(--ink)] md:text-6xl md:tracking-[0.42em]">
            MENU
          </h1>
          <p className="mt-5 text-sm tracking-[0.12em] text-[color:var(--ink-soft)]">
            {menuMeta.venue}
          </p>
          <p className="mt-1 text-sm tracking-[0.12em] text-[color:var(--ink-soft)]">
            {menuMeta.hours} · {menuMeta.web}
          </p>
        </header>

        <StarDivider />

        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
          {menuSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="font-semibold uppercase tracking-[0.14em] text-[color:var(--brand)] transition hover:text-[color:var(--brand-deep)]"
            >
              {section.number === "★" ? "★" : section.number} {section.tr}
            </a>
          ))}
        </nav>

        <StarDivider />

        <div className="space-y-14">
          {menuSections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <div className="border-b border-[color:var(--brand)]/35 pb-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-3xl font-semibold text-[color:var(--brand)] md:text-4xl">
                    {section.number}
                  </span>
                  <h2 className="font-display text-3xl font-semibold tracking-tight text-[color:var(--ink)] md:text-4xl">
                    {section.tr.toUpperCase()}
                    <span className="ml-3 text-xl font-medium tracking-[0.08em] text-[color:var(--ink-soft)] md:text-2xl">
                      / {section.en.toUpperCase()}
                    </span>
                  </h2>
                </div>
                {section.intro ? (
                  <p className="mt-3 text-sm italic leading-6 text-[color:var(--ink-soft)]">{section.intro}</p>
                ) : null}
              </div>

              <ul
                className={`mt-6 grid gap-x-10 gap-y-5 ${
                  section.id === "kahvalti" || section.id === "icecekler" || section.id === "gunluk-yemek"
                    ? "md:grid-cols-2"
                    : "max-w-3xl"
                }`}
              >
                {section.items.map((item) => (
                  <li key={`${section.id}-${item.tr}`}>
                    <div className="flex items-baseline gap-3">
                      <div className="min-w-0 font-semibold text-[color:var(--ink)]">{item.tr}</div>
                      <div className="menu-dots min-h-[0.7em] flex-1" aria-hidden />
                      <div className="shrink-0 font-display text-base font-semibold tabular-nums text-[color:var(--brand)]">
                        {item.price}
                      </div>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-[color:var(--ink-soft)]">{item.en}</p>
                    {item.note ? (
                      <p className="mt-1 text-xs font-medium tracking-wide text-[color:var(--brand)]">{item.note}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <StarDivider />

        <footer className="pb-8 text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">
            {menuMeta.taglineTr} ★ {menuMeta.taglineEn}
          </p>
          <p className="mt-3 text-sm text-[color:var(--ink-soft)]">
            Instagram {menuMeta.instagram} · {menuMeta.web}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/visit"
              className="border border-[color:var(--brand)] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand)] transition hover:bg-[color:var(--brand)] hover:text-white"
            >
              Visit us
            </Link>
            <Link
              href="/"
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--ink-soft)] transition hover:text-[color:var(--ink)]"
            >
              ← Home
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
