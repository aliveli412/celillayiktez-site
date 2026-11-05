import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articleSlugFromHref, fetchArticleHtml, findArticleBySlug } from "@/lib/articles";
import { articles } from "@/lib/site";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: articleSlugFromHref(a.href) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticleBySlug(slug);
  return { title: article?.title || "Makale" };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = findArticleBySlug(slug);
  if (!article) notFound();

  const body = await fetchArticleHtml(article);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <Link
        href="/makaleler"
        className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ember)]"
      >
        ← Makaleler
      </Link>
      <h1 className="mt-5 font-display text-4xl tracking-tight md:text-5xl">{article.title}</h1>
      <div className="ember-rule mt-6" />

      {body ? (
        <article
          className="prose-archive mt-10 text-[1.05rem] leading-8 text-[color:var(--ink)] [&_a]:text-[color:var(--ember)] [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-3xl [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-2xl [&_img]:my-8 [&_img]:h-auto [&_img]:max-w-full [&_p]:my-5"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      ) : (
        <div className="mt-10 rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-8">
          <p className="text-sm leading-7 text-[color:var(--ink-soft)]">
            Bu yazının metni şu an çekilemedi. WordPress’teki orijinal sayfadan okuyabilirsiniz.
          </p>
          <a
            href={article.href}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex text-sm font-semibold text-[color:var(--ember)]"
          >
            WordPress’te aç →
          </a>
        </div>
      )}
    </div>
  );
}
