import React from 'react';

export function ThinkingIndicator() {
  return (
    <div role="status" className="flex items-center gap-3 px-5 py-3 glass-panel rounded-2xl w-fit text-purple-200 animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-[0_0_20px_rgba(147,51,234,0.15)] border-white/5">
      <div className="flex gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce shadow-[0_0_8px_rgba(168,85,247,0.8)]" style={{ animationDelay: '0ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce shadow-[0_0_8px_rgba(168,85,247,0.8)]" style={{ animationDelay: '150ms' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce shadow-[0_0_8px_rgba(168,85,247,0.8)]" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="text-sm font-semibold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Processing</span>
    </div>
  );
}
