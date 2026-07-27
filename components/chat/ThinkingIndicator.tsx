import React from 'react';

export function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm w-fit mr-12 text-slate-500 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-sm font-medium tracking-wide">Thinking</span>
    </div>
  );
}
