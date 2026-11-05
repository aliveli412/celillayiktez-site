import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import fsp from "node:fs/promises";
import https from "node:https";
import path from "node:path";
import { Readable } from "node:stream";

const WP_HOST = "www.celillayiktez.com";
const ALLOWED_PREFIX = "/wp-content/uploads/";

/**
 * Serves upload assets for pdf.js / downloads.
 * Prefer local disk (Hostinger public_html or UPLOADS_ROOT) so redeploys
 * that break self-HTTP still work when files exist on disk.
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: parts } = await context.params;
  const relative = parts.map((p) => decodeURIComponent(p)).join("/");
  if (!relative || relative.includes("..") || path.isAbsolute(relative)) {
    return new NextResponse("Bad path", { status: 400 });
  }

  const range = request.headers.get("range") || undefined;

  try {
    const local = await tryLocalFile(relative, range);
    if (local) return local;
  } catch {
    /* fall through to HTTP */
  }

  const url = `https://${WP_HOST}${ALLOWED_PREFIX}${parts.map(encodeURIComponent).join("/")}`;
  try {
    const upstream = await fetchWpStream(url, range);
    if (upstream.statusCode && upstream.statusCode >= 400) {
      return new NextResponse("Upstream error", { status: upstream.statusCode });
    }

    const contentType =
      headerValue(upstream.headers["content-type"]) || guessContentType(relative);
    const headers = new Headers({
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "Accept-Ranges": "bytes",
    });
    const length = headerValue(upstream.headers["content-length"]);
    if (length) headers.set("Content-Length", length);
    const contentRange = headerValue(upstream.headers["content-range"]);
    if (contentRange) headers.set("Content-Range", contentRange);

    return new NextResponse(upstream.stream, {
      status: upstream.statusCode || 200,
      headers,
    });
  } catch {
    return new NextResponse("Media unavailable", { status: 502 });
  }
}

function candidateRoots(): string[] {
  const roots: string[] = [];
  if (process.env.UPLOADS_ROOT) roots.push(process.env.UPLOADS_ROOT);
  // Hostinger Node app cwd ≈ .../hbuilds/current/nodejs
  roots.push(path.resolve(process.cwd(), "../../public_html/wp-content/uploads"));
  roots.push(path.resolve(process.cwd(), "../../../public_html/wp-content/uploads"));
  roots.push(path.resolve(process.cwd(), "public/wp-content/uploads"));
  roots.push(path.resolve(process.cwd(), "../shared/uploads"));
  roots.push(path.resolve(process.cwd(), "../../shared/uploads"));
  return roots;
}

async function tryLocalFile(relative: string, range?: string): Promise<NextResponse | null> {
  for (const root of candidateRoots()) {
    const full = path.resolve(root, relative);
    if (!full.startsWith(path.resolve(root))) continue;
    try {
      const stat = await fsp.stat(full);
      if (!stat.isFile()) continue;

      const contentType = guessContentType(relative);
      const headers = new Headers({
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "Accept-Ranges": "bytes",
      });

      if (range) {
        const m = range.match(/bytes=(\d*)-(\d*)/);
        if (m) {
          const start = m[1] ? Number(m[1]) : 0;
          const end = m[2] ? Number(m[2]) : stat.size - 1;
          if (start <= end && end < stat.size) {
            const length = end - start + 1;
            headers.set("Content-Length", String(length));
            headers.set("Content-Range", `bytes ${start}-${end}/${stat.size}`);
            const nodeStream = fs.createReadStream(full, { start, end });
            return new NextResponse(Readable.toWeb(nodeStream) as ReadableStream, {
              status: 206,
              headers,
            });
          }
        }
      }

      headers.set("Content-Length", String(stat.size));
      const nodeStream = fs.createReadStream(full);
      return new NextResponse(Readable.toWeb(nodeStream) as ReadableStream, {
        status: 200,
        headers,
      });
    } catch {
      /* try next root */
    }
  }
  return null;
}

function guessContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".pdf":
      return "application/pdf";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    case ".json":
      return "application/json";
    default:
      return "application/octet-stream";
  }
}

function headerValue(value: string | string[] | undefined): string | undefined {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
}

function fetchWpStream(
  url: string,
  range?: string,
): Promise<{
  statusCode?: number;
  headers: NodeJS.Dict<string | string[]>;
  stream: ReadableStream<Uint8Array>;
}> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        rejectUnauthorized: false,
        headers: {
          "User-Agent": "CelilLayiktezSite/1.0",
          ...(range ? { Range: range } : {}),
        },
      },
      (res) => {
        const stream = new ReadableStream<Uint8Array>({
          start(controller) {
            res.on("data", (chunk: Buffer) => {
              controller.enqueue(new Uint8Array(chunk));
            });
            res.on("end", () => controller.close());
            res.on("error", (err) => controller.error(err));
          },
          cancel() {
            res.destroy();
          },
        });
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          stream,
        });
      },
    );
    req.on("error", reject);
  });
}
