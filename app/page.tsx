"use client";

import { useEffect, useState } from "react";
export default function IdeaFabrikaWebsite() {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const site = {
    name: "Idea Fabrika",
    tagline: "Food • community • culture",
    heroBadge: "A warm and welcoming space in Stoke Newington",
    heroTitle: "Good food, warm company and a place to belong.",
    heroText:
      "Idea Fabrika is a community café and social space in Hackney where people come together to eat, meet, learn and feel at home. Alongside fresh Kurdish and Turkish food, we offer a welcoming environment shaped by culture, connection and everyday community life.",
    aboutTitle: "More than a café, a place shaped by community",
    aboutText1:
      "Idea Fabrika is a welcoming café and community space in Stoke Newington, created to bring people together through food, conversation, creativity and everyday support. It is a place where local residents, families and migrant communities can spend time, meet others and feel part of something warm and familiar.",
    aboutText2:
      "Some people come in for breakfast or tea, others join an activity, meet friends or simply enjoy being in a friendly environment. What matters most is that the space feels open, relaxed and genuinely community-led rather than formal or distant.",
    visitText:
      "Drop in for food, tea, activities or a quiet moment during the day. Whether you are visiting for the first time or already know the space well, Idea Fabrika is here to offer a warm welcome.",
  };

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Activities", href: "#activities" },
    { label: "Food & Café", href: "#menu" },
    { label: "Reviews", href: "#reviews" },
    { label: "Blog", href: "#blog" },
    { label: "Visit", href: "#visit" },
  ];

  const highlights = [
    "Fresh Kurdish & Turkish food",
    "Affordable community café",
    "English and skills sessions",
    "Creative and wellbeing activities",
    "Family-friendly atmosphere",
    "Based in Hackney, London",
  ];

  const activities = [
    {
      title: "Fresh Food & Everyday Hospitality",
      text: "We serve fresh Kurdish and Turkish food, tea and coffee in a relaxed setting that feels local, affordable and welcoming. For many visitors, the café is not just somewhere to eat, but somewhere to pause, meet people and feel comfortable.",
    },
    {
      title: "Activities That Bring People Together",
      text: "Alongside the café, the space hosts practical English, creative sessions, wellbeing activities and community-led gatherings. These activities help people build confidence, connect with others and take part in local life.",
    },
    {
      title: "A Trusted Local Space",
      text: "Idea Fabrika offers more than a service. It offers familiarity, warmth and a sense of belonging. It is a shared space where people from different backgrounds can feel seen, included and at ease.",
    },
  ];

  const cafeFeatures = [
    "Fresh Kurdish & Turkish dishes",
    "Traditional breakfasts",
    "Tea, coffee and homemade food",
    "Full food menu coming soon",
  ];

const googleUrl = "https://www.google.com/search?q=Idea+Fabrika+London+reviews";

const [googleReviewSummary, setGoogleReviewSummary] = useState({
  rating: 0,
  totalReviews: 0,
  placeName: "Idea Fabrika London",
});

const [featuredGoogleReviews, setFeaturedGoogleReviews] = useState<
  { name: string; rating: number; text: string; date: string }[]
>([]);

useEffect(() => {
  async function loadReviews() {
    try {
      const res = await fetch("/api/google-reviews");
      const data = await res.json();

      setGoogleReviewSummary({
        rating: data.rating || 0,
        totalReviews: data.totalReviews || 0,
        placeName: data.placeName || "Idea Fabrika London",
      });

      setFeaturedGoogleReviews(
        (data.reviews || []).filter((review: any) => review.rating >= 4).slice(0, 3)
      );
    } catch (error) {
      console.error("Failed to load reviews");
    }
  }

  loadReviews();
}, []);

  const blogPosts = [
    {
      slug: "welcome-to-idea-fabrika",
      title: "Welcome to Idea Fabrika",
      date: "March 2026",
      category: "News",
      excerpt:
        "A new chapter for our community café and activity space in Hackney, bringing together food, culture and learning.",
    },
    {
      slug: "community-activities-in-hackney",
      title: "Community Activities in Hackney",
      date: "March 2026",
      category: "Activities",
      excerpt:
        "From practical English sessions to creative workshops, we are building a place where people can connect and grow.",
    },
    {
      slug: "why-local-spaces-matter",
      title: "Why Local Spaces Matter",
      date: "March 2026",
      category: "Community",
      excerpt:
        "A welcoming local space can do more than serve food. It can help people feel safe, included and supported.",
    },
  ];

  const infoCards = [
    ["Location", "53 Stoke Newington High Street, London N16 8EL"],
    ["Focus", "Food, community and cultural connection"],
    ["Style", "Warm, inclusive, practical"],
    ["Audience", "Local residents, families and migrant communities"],
  ];

  const visitCards = [
    ["Location", "53 Stoke Newington High Street, London N16 8EL"],
    ["Perfect for", "Breakfast, lunch, tea, community activities and casual meet-ups"],
    ["Enquiries", "Get in touch for café information, collaborations and community activities"],
  ];

  const contactDetails = [
    ["Address", "53 Stoke Newington High Street, London N16 8EL"],
    ["Email", "info@ideafabrika.co.uk"],
    ["Phone", "020 3397 2266"],
    ["Opening Hours", "Weekdays: 8:00–20:00 | Weekends: 9:00–21:00"],
  ];

  const galleryImages = [
    {
      title: "Food & café",
      note: "Real food and café photos can be added here next.",
    },
    {
      title: "Community activities",
      note: "Add a real image from classes, workshops or a relaxed community moment.",
    },
    {
      title: "Inside the space",
      note: "Add an interior photo that shows the atmosphere and layout.",
    },
  ];

  const logoSrc = "/images/idea-fabrika-logo.webp";
  const storefrontSrc = "/images/idea-fabrika-storefront.webp";

  return (
    <div className="min-h-screen bg-stone-50 text-neutral-900">
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center overflow-hidden">
        <img src={logoSrc} alt="Idea Fabrika logo" className="h-20 w-auto object-contain" />
      </div>
      <div>
      </div>
    </div>

    <nav className="hidden gap-6 text-sm md:flex">
      {navItems.map((item) => (
        <a key={item.label} href={item.href} className="transition hover:opacity-70">
          {item.label}
        </a>
      ))}
    </nav>

    <button
  type="button"
  className="rounded-xl border border-neutral-300 bg-white p-2 md:hidden"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-label="Open menu"
>
  {mobileMenuOpen ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )}
</button>
  </div>

  {mobileMenuOpen && (
    <div className="border-t border-neutral-200 bg-white md:hidden">
      <div className="mx-auto flex max-w-7xl flex-col px-6 py-4">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="border-b border-neutral-100 py-3 text-sm last:border-b-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )}
</header>

      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-50 to-rose-100" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-orange-200 bg-white px-4 py-2 text-sm text-orange-700 shadow-sm">
              {site.heroBadge}
            </div>
            <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              {site.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-700">{site.heroText}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#visit"
                className="rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5"
              >
                Visit Us
              </a>
              <a
                href="#blog"
                className="rounded-2xl border border-neutral-300 bg-white px-6 py-3 text-sm font-medium shadow-sm transition hover:-translate-y-0.5"
              >
                Read Blog
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-xl ring-1 ring-black/5">
            <img src={storefrontSrc} alt="Idea Fabrika storefront" className="h-full min-h-[420px] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
            <img src={storefrontSrc} alt="Idea Fabrika storefront" className="h-[420px] w-full object-cover" />
          </div>
          <div className="grid gap-6">
            <div className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              <div className="flex h-[198px] items-center justify-center bg-white p-6">
                <img src={logoSrc} alt="Idea Fabrika logo" className="h-full w-full object-contain" />
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              <img src={storefrontSrc} alt="Idea Fabrika exterior" className="h-[198px] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">About Idea Fabrika</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{site.aboutTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-neutral-700">{site.aboutText1}</p>
            <p className="mt-4 text-lg leading-8 text-neutral-700">{site.aboutText2}</p>
          </div>
          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="text-lg font-semibold">At a glance</div>
            <div className="mt-6 grid gap-4">
              {infoCards.map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-stone-50 p-4">
                  <div className="text-xs uppercase tracking-wide text-neutral-500">{label}</div>
                  <div className="mt-1 font-medium text-neutral-900">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="activities" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">What we do</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Food, activities and connection in one shared space</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-700">
              Idea Fabrika brings together everyday hospitality and community activity, creating a space that feels both useful and welcoming.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {activities.map((section) => (
              <div
                key={section.title}
                className="rounded-[2rem] border border-neutral-200 bg-stone-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-xl font-semibold">{section.title}</h3>
                <p className="mt-4 text-base leading-7 text-neutral-700">{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 rounded-[2rem] bg-neutral-900 p-8 text-white md:grid-cols-2 md:p-12">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Food & café</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Fresh food now, full menu coming soon</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-300">
              We currently serve fresh Kurdish and Turkish food, tea and coffee in a setting that is relaxed, friendly and rooted in the local community. Our full food menu is being updated and will be added to the site soon.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {cafeFeatures.map((item) => (
              <div key={item} className="rounded-2xl bg-white/10 p-5 text-sm font-medium">
                {item}
              </div>
            ))}
            <div className="rounded-2xl border border-white/20 bg-white/5 p-5 text-sm leading-6 text-neutral-200 sm:col-span-2">
              We are currently refreshing our food offer. A dedicated menu page with dishes and drinks will be added soon.
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">Featured reviews</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">What people love about Idea Fabrika</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-700">
              A selection of positive Google reviews from visitors who enjoyed the atmosphere, food and community feel of the space.
            </p>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-medium uppercase tracking-wide text-neutral-500">Google rating</div>
                <div className="mt-2 flex items-end gap-3">
                  <div className="text-5xl font-bold tracking-tight text-neutral-900">{googleReviewSummary.rating}</div>
                  <div className="pb-1 text-amber-600">★★★★★</div>
                </div>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  Based on {googleReviewSummary.totalReviews} Google reviews for {googleReviewSummary.placeName}.
                </p>
              </div>

              <a
                href={googleUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5"
              >
                View on Google
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredGoogleReviews.map((review, index) => (
  <article
    key={`${review.name}-${index}`}
    className="flex h-full flex-col rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
  >
    <div className="mb-4 flex items-center justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">{review.name}</h3>
        <p className="text-sm text-neutral-500">{review.date}</p>
      </div>
      <div className="text-sm font-medium text-amber-600">{"★".repeat(review.rating)}</div>
    </div>

    <p
      className="overflow-hidden text-base leading-7 text-neutral-700"
      style={{
        display: "-webkit-box",
        WebkitLineClamp: 6,
        WebkitBoxOrient: "vertical",
      }}
    >
      “{review.text}”
    </p>

    <div className="mt-6 text-sm font-medium text-orange-700">
      Google review
    </div>
  </article>
))}
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-dashed border-neutral-300 bg-stone-50 p-5 text-sm leading-7 text-neutral-600">
          This reviews section is ready to connect to the Google Places API later. For now it uses sample review data and a live Google link. In the real project, the API key should be stored in an environment variable, not written directly into the component.
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">Gallery</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">A space that looks warm, lived-in and welcoming</h2>
          <p className="mt-5 text-lg leading-8 text-neutral-700">
            Good photos will do a lot of work on this site. Real images of the space, food and people will make the whole design feel alive.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {galleryImages.map((image) => (
            <div key={image.title} className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
              {image.title === "Food & café" ? (
                <img src={storefrontSrc} alt="Idea Fabrika gallery" className="h-72 w-full object-cover" />
              ) : (
                <div className="flex h-72 items-center justify-center bg-stone-100 px-8 text-center text-sm leading-7 text-neutral-500">
                  {image.note}
                </div>
              )}
              <div className="border-t border-neutral-200 p-5">
                <h3 className="text-lg font-semibold tracking-tight text-neutral-900">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="blog" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">Latest updates</div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">News, updates and stories from the space</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-700">
              This section can be used for updates, activities, announcements and stories from Idea Fabrika. Later we can connect it to WordPress so posts can be managed from an admin panel.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-[2rem] border border-neutral-200 bg-stone-50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-wide text-neutral-500">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{post.title}</h3>
                <p className="mt-4 text-base leading-7 text-neutral-700">{post.excerpt}</p>
                <div className="mt-6 text-sm font-medium text-orange-700">Slug: /blog/{post.slug}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="bg-orange-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">Visit Idea Fabrika</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Visit us in Stoke Newington</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-700">{site.visitText}</p>
            </div>
            <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
              <div className="space-y-5 text-sm text-neutral-700">
                {visitCards.map(([label, value]) => (
                  <div key={label}>
                    <div className="font-semibold text-neutral-900">{label}</div>
                    <div>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr]">
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center justify-center overflow-hidden">
                <img src={logoSrc} alt="Idea Fabrika logo" className="h-20 w-auto object-contain" />
              </div>
              <div className="text-sm text-neutral-600">{site.tagline}</div>
              <p className="max-w-md text-base leading-7 text-neutral-700">
                A warm, community-led space in Stoke Newington bringing together food, culture, conversation and everyday connection.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900">Contact</h3>
            <div className="mt-5 space-y-4 text-sm text-neutral-700">
  {contactDetails.map(([label, value]) => (
    <div key={label}>
      <div className="font-semibold text-neutral-900">{label}</div>

      {label === "Email" ? (
        <a href={`mailto:${value}`} className="transition hover:opacity-70">
          {value}
        </a>
      ) : label === "Phone" ? (
        <a href="tel:02033972266" className="transition hover:opacity-70">
          {value}
        </a>
      ) : (
        <div>{value}</div>
      )}
    </div>
  ))}
</div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900">Find us</h3>
              <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-stone-100 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2050.9516447575693!2d-0.07711342417442502!3d51.55868100695681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761dc13ad79247%3A0x772588f023f63158!2sIdea%20Fabrika%20London!5e1!3m2!1sen!2suk!4v1773407210877!5m2!1sen!2suk"
                  width="100%"
                  height="256"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Idea Fabrika London Map"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="font-semibold text-neutral-900">{site.name}</span> • Community café and activity space
            </div>
            <div>Built with warmth, culture and community at the centre.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
