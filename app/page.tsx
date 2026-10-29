import Link from "next/link";
import { activities, galleryImages, highlights, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${site.storefrontSrc})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--ink)]/88 via-[color:var(--ink)]/72 to-[color:var(--brand)]/35" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-28 md:justify-center md:pb-24">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
            Idea Fabrika
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
            {site.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{site.heroText}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="bg-[color:var(--brand)] px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[color:var(--brand-deep)]"
            >
              View menu
            </Link>
            <Link
              href="/visit"
              className="border border-white/70 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
            >
              Visit us
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">Welcome</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Food, community and culture in Stoke Newington
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--ink-soft)]">
              Alongside fresh Kurdish and Turkish food, Idea Fabrika offers a welcoming space shaped by connection and everyday community life.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="border border-[color:var(--line)] bg-white/70 px-4 py-3 text-sm font-medium">
                  <span className="mr-2 text-[color:var(--brand)]">★</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden border border-[color:var(--line)]">
            <img
              src={site.cafeGatheringSrc}
              alt="People gathered around long tables inside Idea Fabrika"
              className="h-full min-h-[360px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--line)] bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">Life here</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">Moments from the space</h2>
            <p className="mt-5 text-lg leading-8 text-[color:var(--ink-soft)]">
              Shared meals, busy tables and creative workshops — the everyday life of Idea Fabrika.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {galleryImages.map((image) => (
              <figure key={image.title} className="group">
                <div className="overflow-hidden border border-[color:var(--line)]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-4">
                  <div className="font-display text-xl font-semibold">{image.title}</div>
                  <p className="mt-1 text-sm leading-6 text-[color:var(--ink-soft)]">{image.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div className="overflow-hidden border border-[color:var(--line)]">
              <img
                src={site.potterySrc}
                alt="Pottery workshop with people shaping clay at Idea Fabrika"
                className="h-full min-h-[420px] w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">What we do</p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">One shared space</h2>
              <div className="mt-8 space-y-6">
                {activities.map((section) => (
                  <article key={section.title}>
                    <h3 className="font-display text-2xl font-semibold">{section.title}</h3>
                    <p className="mt-2 text-base leading-7 text-[color:var(--ink-soft)]">{section.text}</p>
                  </article>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/activities" className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--brand)]">
                  Explore activities →
                </Link>
                <Link href="/about" className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--ink)]">
                  About Idea Fabrika →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-paper py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.45em] text-[color:var(--brand)]">
              M E N Ü &nbsp;·&nbsp; M E N U
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Our bilingual café menu
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[color:var(--ink-soft)]">
              Kahvaltı to icecekler — laid out in the spirit of our printed A4 menu, with Turkish names, English descriptions and prices.
            </p>
            <Link
              href="/menu"
              className="mt-8 inline-flex bg-[color:var(--brand)] px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[color:var(--brand-deep)]"
            >
              Open full menu
            </Link>
          </div>
          <div className="overflow-hidden border border-[color:var(--brand)]/25">
            <img
              src={site.breakfastSrc}
              alt="Community breakfast buffet at Idea Fabrika"
              className="h-full min-h-[380px] w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
