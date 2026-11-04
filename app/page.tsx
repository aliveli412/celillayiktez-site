import Link from "next/link";
import { archives, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden bg-[color:var(--ink)] text-white">
        <div
          className="anim-kenburns absolute inset-0 bg-cover bg-[center_20%]"
          style={{ backgroundImage: `url(${site.heroPortraitQuality})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)] via-[color:var(--ink)]/55 to-[color:var(--ink)]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--ink)]/80 via-[color:var(--ink)]/35 to-transparent" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-20">
          <p className="anim-rise text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70">
            {site.dates}
          </p>
          <h1 className="anim-rise-2 mt-4 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            Celil Layiktez
          </h1>
          <p className="anim-rise-3 mt-6 max-w-xl text-base leading-8 text-white/80 md:text-lg">
            {site.homeLead}
          </p>
          <div className="anim-rise-3 mt-9 flex flex-wrap gap-3">
            <Link
              href="/hakkinda"
              className="bg-[color:var(--ember)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--ember-deep)]"
            >
              Yaşamöyküsü
            </Link>
            <Link
              href="/kitaplar"
              className="border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Kitaplar
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--ember)]">
              Kısa hatırlatma
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl">
              Araştıran, yazan, derleyen bir ömür.
            </h2>
            <div className="ember-rule mt-6" />
          </div>
          <p className="text-base leading-8 text-[color:var(--ink-soft)] md:text-lg">{site.homeIntro}</p>
        </div>
      </section>

      <section className="border-y border-[color:var(--line)] bg-[color:var(--surface)]/70 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--ember)]">
                Koleksiyonlar
              </p>
              <h2 className="mt-3 font-display text-4xl tracking-tight">Nereden başlamak istersiniz?</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[color:var(--ink-soft)]">
              Dergi sayıları ve kitap PDF’leri WordPress yüklemelerinde durur. Buradan temiz
              bağlantılarla açılır.
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-[color:var(--line)] md:grid-cols-3">
            {[
              {
                title: "Online Kitaplar",
                text: "Türkiye’de Masonluk Tarihi ve diğer yayınlar.",
                href: "/kitaplar",
              },
              {
                title: "Makaleler",
                text: "Mimar Sinan, Tesviye ve uluslararası yazılar.",
                href: "/makaleler",
              },
              {
                title: "Dergi Arşivleri",
                text: "Büyük Şark’tan Mimar Sinan’a uzanan dizi.",
                href: "/arsivler",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-[color:var(--surface)] p-8 transition hover:bg-white"
              >
                <h3 className="font-display text-3xl tracking-tight group-hover:text-[color:var(--ember)]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[color:var(--ink-soft)]">{item.text}</p>
                <span className="mt-8 inline-block text-sm font-semibold text-[color:var(--ink)]">
                  Aç →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--ember)]">
          Dergi arşivi
        </p>
        <h2 className="mt-3 font-display text-4xl tracking-tight">Süreklilik gösteren bellek</h2>
        <ul className="mt-10 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
          {archives.map((archive) => (
            <li key={archive.slug}>
              <Link
                href={`/arsivler/${archive.slug}`}
                className="flex flex-col gap-1 py-5 transition hover:bg-white/50 md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <span className="font-display text-2xl tracking-tight">{archive.title}</span>
                <span className="text-sm text-[color:var(--ink-soft)]">
                  {archive.years || "Arşiv"}
                  {archive.issues.length > 0 ? ` · ${archive.issues.length} sayı` : ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
