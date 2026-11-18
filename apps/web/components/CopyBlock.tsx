"use client";

import { useState } from "react";

/** A code/config block with a copy button — used for MCP install snippets. */
export default function CopyBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl bg-charcoal">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/60">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-coral"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[0.83rem] leading-relaxed text-white/90">
        <code>{text}</code>
      </pre>
    </div>
  );
}
