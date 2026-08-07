import React from 'react';
import { ToolInvocation } from 'ai';
import { Loader2, CheckCircle2, XCircle, Search } from 'lucide-react';

interface ToolResultProps {
  toolInvocation: ToolInvocation;
}

export function ToolResult({ toolInvocation }: ToolResultProps) {
  const { toolName, state } = toolInvocation;

  if (toolName !== 'auditPage') return null;

  // State 1: input-streaming
  if (state === 'partial-call') {
    return (
      <div className="my-4 p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 animate-pulse flex items-center gap-3">
        <Search className="w-5 h-5 text-purple-400" />
        <span className="text-purple-200">Preparing to audit...</span>
      </div>
    );
  }

  // State 2: input-available
  if (state === 'call') {
    const args = toolInvocation.args;
    return (
      <div className="my-4 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 flex items-center gap-3">
        <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
        <span className="text-blue-200">
          Auditing {args?.url || 'URL'}...
        </span>
      </div>
    );
  }

  // State 3 & 4: output-available (success or error)
  if (state === 'result') {
    const { result, args } = toolInvocation;

    if (result.error) {
      // output-error
      return (
        <div className="my-4 p-5 rounded-xl border border-red-500/30 bg-red-500/10">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-5 h-5 text-red-400" />
            <h3 className="font-semibold text-red-200">Audit Failed</h3>
          </div>
          <p className="text-red-300 text-sm">{result.error}</p>
        </div>
      );
    }

    // output-available (success)
    return (
      <div className="my-4 p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 glass-panel shadow-lg">
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-emerald-500/20">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h3 className="font-semibold text-emerald-100">Audit Complete: {result.url}</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm text-emerald-400/80 mb-1 uppercase tracking-wider font-semibold">Title</h4>
            <p className="text-slate-200">{result.title}</p>
          </div>
          
          <div>
            <h4 className="text-sm text-emerald-400/80 mb-1 uppercase tracking-wider font-semibold">Description</h4>
            <p className="text-slate-200 text-sm leading-relaxed">{result.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/20 p-3 rounded-lg border border-white/5">
              <h4 className="text-xs text-emerald-400/60 mb-1 uppercase tracking-wider font-semibold">H1 Tags</h4>
              <p className="text-xl font-medium text-white">{result.h1Count}</p>
            </div>
            
            <div className="bg-black/20 p-3 rounded-lg border border-white/5">
              <h4 className="text-xs text-emerald-400/60 mb-1 uppercase tracking-wider font-semibold">Images</h4>
              <p className="text-sm text-white">
                <span className="font-medium text-xl">{result.totalImages}</span> total
              </p>
              <p className="text-xs mt-1 text-slate-400">
                <span className={result.imagesMissingAlt > 0 ? "text-amber-400" : "text-emerald-400"}>
                  {result.imagesMissingAlt}
                </span> missing alt
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
