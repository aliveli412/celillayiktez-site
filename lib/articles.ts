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

export async function fetchArticleHtml(article: Article): Promise<string | null> {
  try {
    const html = await fetchWpText(article.href);
    const entry =
      html.match(
        /<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*(?:<div[^>]*class="[^"]*entry-footer|<!--|\s*<div id="comments")/i,
      )?.[1] ||
      html.match(/<article[\s\S]*?<div[^>]*class="[^"]*text entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i)?.[1];

    if (!entry) return null;

    // Strip scripts/forms; keep editorial markup; absolutize media
    return entry
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<form[\s\S]*?<\/form>/gi, "")
      .replace(/\sstyle="[^"]*"/gi, "")
      .replace(/(src|href)="(\/wp-content\/[^"]+)"/gi, '$1="https://www.celillayiktez.com$2"')
      .replace(/(src|href)="(wp-content\/[^"]+)"/gi, '$1="https://www.celillayiktez.com/$2"')
      .trim();
  } catch {
    return null;
  }
}
