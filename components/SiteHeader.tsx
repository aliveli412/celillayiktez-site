"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, site } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--surface)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
          aria-label={site.name}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.logoSrc}
            alt={site.name}
            width={150}
            height={71}
            className="h-9 w-auto transition group-hover:opacity-85 md:h-10"
          />
          <span className="hidden flex-col sm:flex">
            <span className="font-display text-lg leading-none tracking-tight text-[color:var(--ink)] transition group-hover:text-[color:var(--ember)] md:text-xl">
              {site.name}
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-[color:var(--ink-soft)]">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-[13px] font-medium text-[color:var(--ink-soft)] lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition hover:text-[color:var(--ember)] ${
                  active ? "text-[color:var(--ember)]" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="border border-[color:var(--line)] px-3 py-2 text-sm lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menü"
        >
          {open ? "Kapat" : "Menü"}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[color:var(--line)] bg-[color:var(--surface)] lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-[color:var(--line)] py-3 text-sm last:border-0"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
