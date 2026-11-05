import https from "node:https";

/** Fetch from celillayiktez.com despite Origin CA TLS quirks. */
export function fetchWpText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        rejectUnauthorized: false,
        headers: { "User-Agent": "CelilLayiktezSite/1.0" },
      },
      (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchWpText(res.headers.location).then(resolve, reject);
          return;
        }
        const chunks: Buffer[] = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`WP fetch ${res.statusCode}`));
            return;
          }
          resolve(Buffer.concat(chunks).toString("utf8"));
        });
      },
    );
    req.on("error", reject);
  });
}

export function uploadsProxyPath(absoluteUrl: string): string | null {
  const marker = "/wp-content/uploads/";
  const idx = absoluteUrl.indexOf(marker);
  if (idx < 0) return null;
  return `/api/wp-media/${absoluteUrl.slice(idx + marker.length)}`;
}
