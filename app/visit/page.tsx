import type { Metadata } from "next";
import Link from "next/link";
import { communityKitchen, contactDetails, site, visitCards } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit",
};

export default function VisitPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-[1fr_0.95fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">Visit Idea Fabrika</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Visit us in Stoke Newington
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--ink-soft)]">{site.visitText}</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--ink-soft)]">
            As the community kitchen of Unity of Migrant Workers (Charity No. 1213132), we welcome everyone — including people facing economic hardship — to affordable, healthy food in a warm, calm space. If you need support with a free meal, please speak to the team when you visit.
          </p>

          <div className="mt-10 space-y-5 border border-[color:var(--line)] bg-white p-8">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">Community kitchen</div>
              <div className="mt-1 font-medium text-[color:var(--ink)]">{communityKitchen.title}</div>
            </div>
            {visitCards.map(([label, value]) => (
              <div key={label}>
                <div className="text-xs uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">{label}</div>
                <div className="mt-1 font-medium text-[color:var(--ink)]">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/menu" className="bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white">
              View menu
            </Link>
            <a href="mailto:info@ideafabrika.co.uk" className="border border-[color:var(--ink)]/25 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em]">
              Email us
            </a>
          </div>
        </div>

        <div>
          <div className="overflow-hidden border border-[color:var(--line)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2050.9516447575693!2d-0.07711342417442502!3d51.55868100695681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761dc13ad79247%3A0x772588f023f63158!2sIdea%20Fabrika%20London!5e1!3m2!1sen!2suk!4v1773407210877!5m2!1sen!2suk"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Idea Fabrika London Map"
            />
          </div>

          <div className="mt-6 space-y-4 border border-[color:var(--line)] bg-white p-6 text-sm">
            {contactDetails.map(([label, value]) => (
              <div key={label}>
                <div className="font-semibold text-[color:var(--ink)]">{label}</div>
                {label === "Email" ? (
                  <a href={`mailto:${value}`} className="text-[color:var(--ink-soft)]">
                    {value}
                  </a>
                ) : label === "Phone" ? (
                  <a href="tel:02033972266" className="text-[color:var(--ink-soft)]">
                    {value}
                  </a>
                ) : (
                  <div className="text-[color:var(--ink-soft)]">{value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
