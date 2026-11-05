"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  pdfUrl: string;
  downloadUrl?: string;
};

type PdfDoc = {
  numPages: number;
  getPage: (n: number) => Promise<{
    getViewport: (opts: { scale: number }) => { width: number; height: number };
    render: (opts: {
      canvasContext: CanvasRenderingContext2D;
      viewport: { width: number; height: number };
    }) => { promise: Promise<void> };
  }>;
};

export default function MagazineReader({ title, pdfUrl, downloadUrl }: Props) {
  const [doc, setDoc] = useState<PdfDoc | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [doublePage, setDoublePage] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [showThumbs, setShowThumbs] = useState(false);
  const leftRef = useRef<HTMLCanvasElement>(null);
  const rightRef = useRef<HTMLCanvasElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const pdfjs = await import("pdfjs-dist");
        // Hostinger serves /pdfjs/*.mjs as text/plain (breaks module workers).
        // Use CDN so MIME is correct; version must match pdfjs-dist.
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
        const loadingTask = pdfjs.getDocument({
          url: pdfUrl,
          withCredentials: false,
        });
        const pdf = (await loadingTask.promise) as unknown as PdfDoc;
        if (cancelled) return;
        setDoc(pdf);
        setPage(1);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Dergi yüklenemedi.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  const renderPage = useCallback(async (pageNum: number, canvas: HTMLCanvasElement | null) => {
    if (!doc || !canvas || pageNum < 1 || pageNum > doc.numPages) {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }
    const pdfPage = await doc.getPage(pageNum);
    const viewport = pdfPage.getViewport({ scale: 1.35 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    await pdfPage.render({ canvasContext: ctx, viewport }).promise;
  }, [doc]);

  useEffect(() => {
    if (!doc) return;
    void renderPage(page, leftRef.current);
    if (doublePage) void renderPage(page + 1, rightRef.current);
  }, [doc, page, doublePage, renderPage]);

  const total = doc?.numPages ?? 0;
  const maxStart = doublePage ? Math.max(1, total - (total % 2 === 0 ? 1 : 0)) : total;

  function playFlip() {
    if (!soundOn) return;
    try {
      const ctx = new AudioContext();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.value = 420;
      g.gain.value = 0.03;
      o.start();
      o.stop(ctx.currentTime + 0.05);
    } catch {
      /* ignore */
    }
  }

  function go(delta: number) {
    setPage((p) => {
      const step = doublePage ? 2 : 1;
      const next = Math.min(maxStart, Math.max(1, p + delta * step));
      if (next !== p) playFlip();
      return next;
    });
  }

  async function toggleFullscreen() {
    const el = shellRef.current;
    if (!el) return;
    if (!document.fullscreenElement) await el.requestFullscreen();
    else await document.exitFullscreen();
  }

  const pageLabel = total
    ? doublePage
      ? `${page}${page + 1 <= total ? `–${page + 1}` : ""} / ${total}`
      : `${page} / ${total}`
    : "- / -";

  return (
    <div ref={shellRef} className="overflow-hidden rounded-2xl bg-[#ececec] shadow-[0_12px_40px_rgba(16,20,26,0.08)]">
      <div className="relative flex min-h-[62vh] items-center justify-center gap-3 px-3 py-8 md:gap-6 md:px-8 md:py-10">
        <button
          type="button"
          aria-label="Önceki sayfa"
          onClick={() => go(-1)}
          disabled={!doc || page <= 1}
          className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[color:var(--ink)] shadow disabled:opacity-40 md:left-6 md:h-14 md:w-14"
        >
          ‹
        </button>

        <div className="flex max-w-full items-start justify-center gap-2 overflow-auto">
          {loading ? (
            <div className="flex aspect-[3/4] w-[min(420px,70vw)] flex-col items-center justify-center rounded bg-white shadow">
              <span className="h-10 w-10 animate-spin rounded-full border-2 border-[color:var(--ember)] border-t-transparent" />
              <p className="mt-4 text-sm text-[color:var(--ink-soft)]">Gazete yükleniyor...</p>
            </div>
          ) : error ? (
            <div className="flex aspect-[3/4] w-[min(420px,70vw)] flex-col items-center justify-center rounded bg-white p-6 text-center shadow">
              <p className="text-sm text-[color:var(--ink-soft)]">{error}</p>
              {downloadUrl ? (
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 text-sm font-semibold text-[color:var(--ember)]"
                >
                  PDF olarak aç →
                </a>
              ) : null}
            </div>
          ) : (
            <>
              <canvas ref={leftRef} className="max-h-[70vh] w-auto max-w-[46vw] bg-white shadow" />
              {doublePage ? (
                <canvas ref={rightRef} className="hidden max-h-[70vh] w-auto max-w-[46vw] bg-white shadow md:block" />
              ) : null}
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Sonraki sayfa"
          onClick={() => go(1)}
          disabled={!doc || page >= maxStart}
          className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[color:var(--ink)] shadow disabled:opacity-40 md:right-6 md:h-14 md:w-14"
        >
          ›
        </button>
      </div>

      {showThumbs && doc ? (
        <div className="max-h-40 overflow-x-auto border-t border-black/5 bg-white/80 px-4 py-3">
          <div className="flex gap-2">
            {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setPage(n);
                  setShowThumbs(false);
                }}
                className={`min-w-10 rounded px-2 py-1 text-xs ${
                  n === page ? "bg-[color:var(--ember)] text-white" : "bg-[#f3f3f3] text-[color:var(--ink-soft)]"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/5 bg-white px-3 py-3 md:px-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Önceki"
            onClick={() => go(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-sm"
          >
            ‹
          </button>
          <span className="min-w-16 text-center text-xs tabular-nums text-[color:var(--ink-soft)]">{pageLabel}</span>
          <button
            type="button"
            aria-label="Sonraki"
            onClick={() => go(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f0f0f0] text-sm"
          >
            ›
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
          <ToolbarButton active={showThumbs} onClick={() => setShowThumbs((v) => !v)} label="Sayfalar">
            ▦
          </ToolbarButton>
          <ToolbarButton active={doublePage} onClick={() => setDoublePage((v) => !v)} label="Çift sayfa">
            ⧉
          </ToolbarButton>
          <ToolbarButton active={soundOn} onClick={() => setSoundOn((v) => !v)} label="Ses">
            ♪
          </ToolbarButton>
          <ToolbarButton onClick={() => void toggleFullscreen()} label="Tam ekran">
            ⛶
          </ToolbarButton>
          {downloadUrl ? (
            <a
              href={downloadUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-[color:var(--ink-soft)] hover:bg-[#f7f0f1] hover:text-[color:var(--ember)]"
            >
              <span aria-hidden>↓</span> İndir
            </a>
          ) : null}
        </div>
      </div>

      <p className="sr-only">{title}</p>
    </div>
  );
}

function ToolbarButton({
  children,
  label,
  active,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
        active
          ? "bg-[#f7e8ea] text-[color:var(--ember)]"
          : "text-[color:var(--ink-soft)] hover:bg-[#f3f3f3]"
      }`}
    >
      <span aria-hidden>{children}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
