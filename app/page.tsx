import Link from "next/link";
import { archives, site } from "@/lib/site";

const gateways = [
  {
    n: "01",
    title: "Hakkında...",
    text: site.homeIntro,
    href: "/hakkinda",
    heading: "Pek. Muh. Celil Layiktez K∴ hakkında",
    image: site.heroPanelKimdirOriginal,
  },
  {
    n: "02",
    title: "Online Kitaplar",
    text: "Pek Muh. Üstadımızın yayınlanmış kitaplarına dijital versiyonlarına bu linkten ulaşabilirsiniz.",
    href: "/kitaplar",
    heading: "Pek Muh. Üstadımızın yayınlanmış kitapları",
    image: site.heroPanelKitaplar,
  },
  {
    n: "03",
    title: "Makaleleri",
    text: "Pek Muh. Üstadımız Celil Layiktez’in yayınlanmış makalelerine buradaki linkten ulaşabilirsiniz.",
    href: "/makaleler",
    heading: "Makaleleri",
    image: site.heroPanelKimdirOriginal,
  },
] as const;

export default function HomePage() {
  const featured = gateways[0];

  return (
    <>
      {/*
        Use the live WP designed hero panel (emblem + tuxedo portrait) full-bleed —
        same composition as celillayiktez.com, without stacking the flash apron cutout.
      */}
      <section className="relative overflow-hidden text-white">
        <div
          className="motion-hero-media absolute inset-0 scale-[1.02] bg-cover bg-[center_right] md:bg-center"
          style={{ backgroundImage: `url(${featured.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--brand)] from-0% via-[color:var(--brand)]/75 via-45% to-transparent to-78%" />
        <div className="relative mx-auto flex min-h-[64vh] max-w-7xl items-center px-6 py-16 md:min-h-[68vh] md:py-20">
          <div className="max-w-xl md:max-w-2xl">
            <h1 className="motion-fade-up font-display text-3xl leading-[1.12] tracking-tight text-white md:text-[2.85rem] lg:text-5xl">
              {featured.heading}
            </h1>
            <p className="motion-fade-up-delay mt-5 text-[15px] leading-7 text-white md:text-base md:leading-8">
              {featured.text}
            </p>
            <Link
              href={featured.href}
              className="motion-fade-up-delay-2 mt-7 inline-flex bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/85"
            >
              devamı için tıkla →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[color:var(--line)] bg-white">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          {gateways.map((item, index) => (
            <Link
              key={item.n}
              href={item.href}
              className={`group relative px-6 py-7 transition hover:bg-[color:var(--paper-band)] ${
                index < gateways.length - 1 ? "md:border-r md:border-[color:var(--line)]" : ""
              }`}
            >
              {index === 0 ? (
                <span
                  aria-hidden
                  className="absolute -top-2 left-1/2 hidden h-0 w-0 -translate-x-1/2 border-x-[7px] border-b-[8px] border-x-transparent border-b-white md:block"
                />
              ) : null}
              <div
                className={`text-sm font-bold tracking-[0.12em] ${
                  index === 0 ? "text-[color:var(--brand)]" : "text-[#b9b9b9]"
                }`}
              >
                {item.n}
              </div>
              <div className="mt-2 font-display text-xl text-[color:var(--ink)] group-hover:text-[color:var(--brand)]">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-6">
          <div className="h-1 w-full bg-[color:var(--brand)]" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="overflow-hidden border border-[color:var(--line)] bg-[color:var(--paper-soft)]">
            <img
              src={site.heroPortraitQuality}
              alt="Pek Muh. Celil Layiktez"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--brand)]">Anı</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">
              Araştırmaları bu sitede yaşatılır
            </h2>
            <p className="mt-5 text-base leading-8 text-[color:var(--ink-soft)]">{site.homeLead}</p>
            <p className="mt-3 text-sm tracking-[0.08em] text-[color:var(--ink-soft)]">{site.dates}</p>
            <Link
              href="/hakkinda"
              className="mt-8 inline-flex text-sm font-bold text-[color:var(--brand)] hover:text-[color:var(--brand-deep)]"
            >
              Hakkında devamı →
            </Link>
          </div>
        </div>
      </section>

      <section className="archive-haze border-y border-[color:var(--line)] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--brand)]">Yayınlar</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">Kitaplar ve dergi arşivleri</h2>
            <p className="mt-5 text-base leading-8 text-[color:var(--ink-soft)]">
              Kitap kapakları ve dergi PDF’leri eski WordPress yüklemelerinde kalır; buradan güvenli
              bağlantılarla açılır.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {archives.map((archive) => (
              <Link
                key={archive.slug}
                href={`/arsivler/${archive.slug}`}
                className="border border-[color:var(--line)] bg-white px-5 py-4 transition hover:border-[color:var(--brand)]"
              >
                <div className="font-display text-lg">{archive.title}</div>
                {archive.years ? (
                  <div className="mt-1 text-xs tracking-wide text-[color:var(--ink-soft)]">{archive.years}</div>
                ) : null}
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/kitaplar"
              className="bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-black/85"
            >
              Online Kitaplar
            </Link>
            <Link
              href="/arsivler"
              className="border border-[color:var(--ink)]/20 px-6 py-3 text-sm font-semibold hover:border-[color:var(--brand)]"
            >
              Dergi Arşivleri
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
