import Link from "next/link";
import { communityKitchen, contactDetails, navItems, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--ink-soft)]/15 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr]">
          <div className="flex flex-col items-start gap-4">
            <img src={site.logoSrc} alt="Idea Fabrika logo" className="h-20 w-auto object-contain" />
            <div className="font-[family-name:var(--font-display)] text-sm tracking-[0.18em] text-[color:var(--brand)]">
              {site.tagline}
            </div>
            <p className="max-w-md text-base leading-7 text-[color:var(--ink-soft)]">
              Community kitchen and café of Unity of Migrant Workers — affordable, healthy food in a warm, library-like space for neighbours, families and anyone who needs a place to belong.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-sm">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-[color:var(--ink)] transition hover:text-[color:var(--brand)]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--ink)]">Contact</h3>
            <div className="mt-5 space-y-4 text-sm text-[color:var(--ink-soft)]">
              {contactDetails.map(([label, value]) => (
                <div key={label}>
                  <div className="font-semibold text-[color:var(--ink)]">{label}</div>
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
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[color:var(--ink)]">Find us</h3>
            <div className="mt-5 overflow-hidden border border-[color:var(--ink-soft)]/20 bg-[color:var(--paper)] shadow-sm">
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

        <div className="mt-10 space-y-3 border-t border-[color:var(--ink-soft)]/15 pt-6 text-sm text-[color:var(--ink-soft)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="font-semibold text-[color:var(--ink)]">{site.name}</span> · Community kitchen of{" "}
              <a href={site.umwUrl} target="_blank" rel="noreferrer" className="font-semibold text-[color:var(--brand)] hover:opacity-80">
                Unity of Migrant Workers
              </a>
            </div>
            <div>Registered charity in England &amp; Wales No. 1213132</div>
          </div>
          <p className="max-w-4xl leading-6">
            {communityKitchen.body}
          </p>
        </div>
      </div>
    </footer>
  );
}
