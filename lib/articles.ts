import { articles, type Article } from "@/lib/site";
import { fetchWpText } from "@/lib/wp-fetch";

export function articleSlugFromHref(href: string): string {
  try {
    const path = new URL(href).pathname.replace(/\/+$/, "");
    const base = path.split("/").filter(Boolean).pop() || "";
    return base.replace(/\.html?$/i, "");
  } catch {
    return href;
  }
}

export function findArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => articleSlugFromHref(a.href) === slug);
}

/** Extract editorial body from the live WordPress article HTML. */
export function extractArticleBody(html: string): string | null {
  const open = html.match(/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>/i);
  if (!open || open.index === undefined) return null;

  const start = open.index + open[0].length;
  const rest = html.slice(start);
  const end =
    rest.search(/<div[^>]*class="[^"]*entry-footer[^"]*"/i) >= 0
      ? rest.search(/<div[^>]*class="[^"]*entry-footer[^"]*"/i)
      : rest.search(/<\/article>/i);
  if (end < 0) return null;

  let entry = rest.slice(0, end);

  // Theme wraps title + meta + body in entry-content. Prefer content after .post_data.
  const afterMeta = entry.match(
    /<\/div>\s*<!--\s*\/\s*end div\s*\.post_data\s*-->\s*(?:<!--\s*content\s*-->)?\s*([\s\S]*)/i,
  );
  if (afterMeta?.[1]) {
    entry = afterMeta[1];
  } else {
    entry = entry
      .replace(/<!--\s*title\s*-->[\s\S]*?<h2[\s\S]*?<\/h2>/i, "")
      .replace(
        /<!--\s*meta data\s*-->[\s\S]*?<div[^>]*class="[^"]*post_data[^"]*"[^>]*>[\s\S]*?<\/div>\s*(?:<!--[\s\S]*?-->)?/i,
        "",
      )
      .replace(/<!--\s*content\s*-->/i, "");
  }

  // Drop theme chrome after the article prose.
  entry = entry
    .replace(/<!--\s*pagination\s*-->[\s\S]*$/i, "")
    .replace(/<!--\s*updated\s*-->[\s\S]*$/i, "")
    .replace(/<span[^>]*class="[^"]*updated[^"]*"[^>]*>[\s\S]*?<\/span>/gi, "")
    .replace(/<\/div>\s*$/i, "");

  const cleaned = entry
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<form[\s\S]*?<\/form>/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/(src|href)="(\/wp-content\/[^"]+)"/gi, '$1="https://www.celillayiktez.com$2"')
    .replace(/(src|href)="(wp-content\/[^"]+)"/gi, '$1="https://www.celillayiktez.com/$2"')
    .trim();

  // Require real prose, not just title/meta leftovers.
  if (cleaned.length < 80 || !/<p[\s>]/i.test(cleaned)) return null;
  return cleaned;
}

export async function fetchArticleHtml(article: Article): Promise<string | null> {
  try {
    const html = await fetchWpText(article.href);
    return extractArticleBody(html);
  } catch {
    return null;
  }
}
