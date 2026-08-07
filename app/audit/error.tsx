"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Audit route error:", error);
  }, [error]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center px-6">
      <div className="glass-panel rounded-3xl p-8 border border-red-500/20 max-w-md">
        <h2 className="text-xl font-semibold text-red-200 mb-2">Something went wrong</h2>
        <p className="text-slate-400 mb-6 text-sm">The audit page hit an unexpected error. This is separate from a failed message — try reloading.</p>
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-colors"
        >
          Reload
        </button>
      </div>
    </div>
  );
}
