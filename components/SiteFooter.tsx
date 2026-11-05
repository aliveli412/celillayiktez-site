import Link from "next/link";
import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-[color:var(--surface)]">
      {/* Closing quote band */}
      <div className="mx-auto max-w-3xl px-5 pb-16 pt-20 text-center md:px-8 md:pb-20 md:pt-24">
        <div
          aria-hidden
          className="font-display text-5xl leading-none text-[color:var(--ember)] md:text-6xl"
        >
          ”
        </div>
        <p className="mt-4 font-display text-3xl italic leading-snug tracking-tight text-[color:var(--ink)] md:text-4xl">
          Hiçbir şey ölmez, her şey yaşar.
        </p>
        <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--ink-soft)]">
          Nihil est immortalis, vivit in omnia
        </p>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[color:var(--ink-soft)]">
          Eserleri bugün Celil Layiktez Müzesi ve Araştırma Kütüphanesi’nde (CLMAK) muhafaza
          ediliyor; bu dijital arşiv aynı mirasın herkese açık yüzüdür.
        </p>
        <Link
          href="/kronoloji"
          className="mt-7 inline-flex text-sm font-semibold text-[color:var(--ember)] transition hover:text-[color:var(--ember-deep)]"
        >
          Yaşam Kronolojisini Gör →
        </Link>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[color:var(--line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="flex items-center gap-3">
            <div
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-[color:var(--ember)] font-display text-sm font-semibold tracking-wide text-[color:var(--ember)]"
            >
              CL
            </div>
            <div>
              <div className="text-sm font-semibold text-[color:var(--ink)]">
                Pek. Muh. Celil Layiktez K∴ — Dijital Arşiv
              </div>
              <div className="mt-0.5 text-xs text-[color:var(--ink-soft)]">
                Hiçbir şey ölmez, her şey yaşar — 1935–2020
              </div>
            </div>
          </div>

          <div className="text-sm text-[color:var(--ink-soft)] md:text-right">
            <a
              href={site.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition hover:text-[color:var(--ember)]"
            >
              <span aria-hidden className="text-base leading-none">
                ⧉
              </span>
              Eski site: celillayiktez.com
              <span aria-hidden className="text-xs">
                ↗
              </span>
            </a>
            <div className="mt-1 text-xs">
              © {new Date().getFullYear()} Celil Layiktez Arşivi · CLMAK iş birliğiyle
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
