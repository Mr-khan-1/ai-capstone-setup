import React from 'react';
import { ToolInvocation } from 'ai';
import { Loader2, CheckCircle2, XCircle, Search, AlertTriangle } from 'lucide-react';

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

    if (typeof result.score !== 'number' || !Array.isArray(result.checks)) {
      return (
        <div className="my-4 p-5 rounded-xl border border-red-500/30 bg-red-500/10">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-5 h-5 text-red-400" />
            <h3 className="font-semibold text-red-200">Audit Format Error</h3>
          </div>
          <p className="text-red-300 text-sm">The tool returned an unexpected result format.</p>
        </div>
      );
    }

    // output-available (success)
    const scoreColor = result.score >= 80 ? 'text-emerald-400' : result.score >= 50 ? 'text-amber-400' : 'text-red-400';
    const scoreBorder = result.score >= 80 ? 'border-emerald-500/30' : result.score >= 50 ? 'border-amber-500/30' : 'border-red-500/30';
    const scoreBg = result.score >= 80 ? 'bg-emerald-500/10' : result.score >= 50 ? 'bg-amber-500/10' : 'bg-red-500/10';

    return (
      <div className={`my-4 p-5 rounded-xl border ${scoreBorder} ${scoreBg} glass-panel shadow-lg`}>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <h3 className="font-semibold text-white">Audit Complete: {result.url}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-300 uppercase tracking-wider font-semibold">Score</span>
            <span className={`text-2xl font-bold ${scoreColor}`}>{result.score}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {result.checks?.map((check: any, idx: number) => {
            let Icon = CheckCircle2;
            let iconColor = 'text-emerald-400';
            let bgClass = 'bg-emerald-500/5';
            let borderClass = 'border-emerald-500/20';

            if (check.status === 'warning') {
              Icon = AlertTriangle;
              iconColor = 'text-amber-400';
              bgClass = 'bg-amber-500/5';
              borderClass = 'border-amber-500/20';
            } else if (check.status === 'critical') {
              Icon = XCircle;
              iconColor = 'text-red-400';
              bgClass = 'bg-red-500/5';
              borderClass = 'border-red-500/20';
            }

            return (
              <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg border ${borderClass} ${bgClass}`}>
                <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconColor}`} />
                <div>
                  <h4 className="text-sm font-semibold text-white">{check.label}</h4>
                  <p className="text-sm text-slate-300 mt-1">{check.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
