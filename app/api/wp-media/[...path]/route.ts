import { NextRequest, NextResponse } from "next/server";
import https from "node:https";

const WP_HOST = "www.celillayiktez.com";
const ALLOWED_PREFIX = "/wp-content/uploads/";

/**
 * Streams WordPress upload assets (especially PDFs) through this app.
 * Images should prefer direct WP URLs in the browser to avoid Hostinger
 * rate-limits on this API; PDFs stay proxied for CORS/pdf.js.
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const relative = path.map(encodeURIComponent).join("/");
  const wpPath = `${ALLOWED_PREFIX}${relative}`;

  if (wpPath.includes("..")) {
    return new NextResponse("Bad path", { status: 400 });
  }

  const url = `https://${WP_HOST}${wpPath}`;
  const range = request.headers.get("range") || undefined;

  try {
    const upstream = await fetchWpStream(url, range);
    if (upstream.statusCode && upstream.statusCode >= 400) {
      return new NextResponse("Upstream error", { status: upstream.statusCode });
    }

    const contentType = headerValue(upstream.headers["content-type"]) || "application/octet-stream";
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
