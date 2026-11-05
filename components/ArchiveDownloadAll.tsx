"use client";

import { useState } from "react";
import JSZip from "jszip";

export type DownloadableIssue = {
  slug: string;
  title: string;
  pdfProxyUrl: string;
};

type Props = {
  archiveTitle: string;
  archiveSlug: string;
  issues: DownloadableIssue[];
};

type Phase = "idle" | "working" | "done" | "error";

export default function ArchiveDownloadAll({ archiveTitle, archiveSlug, issues }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState({ done: 0, total: issues.length });
  const [message, setMessage] = useState<string | null>(null);

  if (issues.length === 0) return null;

  async function startDownload() {
    setPhase("working");
    setMessage(null);
    setProgress({ done: 0, total: issues.length });

    try {
      const zip = new JSZip();
      const folder = zip.folder(archiveSlug) || zip;
      let ok = 0;

      for (let i = 0; i < issues.length; i++) {
        const issue = issues[i];
        setProgress({ done: i, total: issues.length });
        try {
          const res = await fetch(issue.pdfProxyUrl);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const buf = await res.arrayBuffer();
          const safeName = `${String(i + 1).padStart(3, "0")}-${issue.slug}.pdf`;
          folder.file(safeName, buf);
          ok++;
        } catch {
          // Skip failed issues; continue pack.
        }
        setProgress({ done: i + 1, total: issues.length });
      }

      if (ok === 0) {
        setPhase("error");
        setMessage("PDF’ler indirilemedi. Lütfen daha sonra yeniden deneyin.");
        return;
      }

      setMessage("ZIP hazırlanıyor…");
      const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${archiveSlug}-arsiv.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setPhase("done");
      setMessage(
        ok === issues.length
          ? `${ok} sayı ZIP olarak indirildi.`
          : `${ok}/${issues.length} sayı ZIP’e eklendi; bazı PDF’ler atlandı.`,
      );
    } catch {
      setPhase("error");
      setMessage("İndirme sırasında bir hata oluştu.");
    }
  }

  const busy = phase === "working";
  const pct = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    <div className="mt-8 max-w-xl">
      <button
        type="button"
        onClick={startDownload}
        disabled={busy}
        className="inline-flex items-center justify-center gap-2 bg-[color:var(--ember)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--ember-deep)] disabled:cursor-wait disabled:opacity-70"
      >
        {busy ? `İndiriliyor… ${pct}%` : `Tüm sayıları indir (${issues.length})`}
      </button>

      {busy ? (
        <div className="mt-4 h-1 overflow-hidden bg-white/15">
          <div
            className="h-full bg-[color:var(--ember)] transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      ) : null}

      <p className="mt-3 text-xs leading-5 text-white/65">
        {busy
          ? `${progress.done}/${progress.total} · ${archiveTitle}`
          : message ||
            "Tüm sayılar tek ZIP dosyasında toplanır. Büyük arşivlerde birkaç dakika sürebilir."}
      </p>
    </div>
  );
}
