import { NextRequest, NextResponse } from "next/server";
import https from "node:https";

const WP_HOST = "www.celillayiktez.com";
const ALLOWED_PREFIX = "/wp-content/uploads/";

/**
 * Streams WordPress upload assets (covers, etc.) through this app so browsers
 * are not blocked by the origin's TLS quirks. Binaries are not stored in-repo;
 * dergi/kitap files remain on WP uploads.
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const relative = path.map(encodeURIComponent).join("/");
  const wpPath = `${ALLOWED_PREFIX}${relative}`;

  if (wpPath.includes("..")) {
    return new NextResponse("Bad path", { status: 400 });
  }

  const url = `https://${WP_HOST}${wpPath}`;

  try {
    const { statusCode, headers, body } = await fetchWp(url);
    if (statusCode && statusCode >= 400) {
      return new NextResponse("Upstream error", { status: statusCode });
    }

    const contentType = headers["content-type"] || "application/octet-stream";
    const contentLength = headers["content-length"];

    return new NextResponse(new Uint8Array(body), {
      status: 200,
      headers: {
        "Content-Type": Array.isArray(contentType) ? contentType[0] : contentType,
        ...(contentLength
          ? {
              "Content-Length": Array.isArray(contentLength)
                ? contentLength[0]
                : contentLength,
            }
          : {}),
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return new NextResponse("Media unavailable", { status: 502 });
  }
}

function fetchWp(url: string): Promise<{
  statusCode?: number;
  headers: NodeJS.Dict<string | string[]>;
  body: Buffer;
}> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        rejectUnauthorized: false,
        headers: { "User-Agent": "CelilLayiktezSite/1.0" },
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: Buffer.concat(chunks),
          });
        });
      },
    );
    req.on("error", reject);
  });
}
