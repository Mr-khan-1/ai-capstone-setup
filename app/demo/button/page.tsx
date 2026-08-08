'use client';

import React, { useRef } from 'react';
import { SendButton, type SendButtonRef } from '@/components/demo/SendButton';
import { Check, X } from 'lucide-react';

export default function ButtonDemoPage() {
  const sendButtonRef = useRef<SendButtonRef>(null);

  const forceSuccess = () => {
    sendButtonRef.current?.trigger('success');
  };

  const forceError = () => {
    sendButtonRef.current?.trigger('error');
  };

  return (
    <div className="min-h-screen bg-black/95 text-slate-200 flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-2xl glass-panel p-8 sm:p-12 rounded-3xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 mb-3">
              Buttons with a Brain
            </h1>
            <p className="text-slate-400 max-w-md mx-auto">
              A state-machine driven button with compositor-friendly transitions for rich, non-blocking feedback.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center w-full py-8 border-y border-white/10 gap-8">
            <div className="flex flex-col items-center gap-4">
              <span className="text-sm font-medium text-slate-500 uppercase tracking-widest">Normal (80% / 20%)</span>
              <SendButton ref={sendButtonRef} />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full mt-4 pt-8 border-t border-white/5">
              <span className="w-full sm:w-auto text-sm font-medium text-slate-500 uppercase tracking-widest text-center sm:text-left">
                Force Triggers:
              </span>
              <div className="flex gap-3">
                <button
                  onClick={forceSuccess}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-400 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500/50 outline-none"
                >
                  <Check className="w-4 h-4" />
                  Force Success
                </button>
                <button
                  onClick={forceError}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-red-400 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-red-500/50 outline-none"
                >
                  <X className="w-4 h-4" />
                  Force Error
                </button>
              </div>
            </div>
          </div>

          <div className="text-left text-sm text-slate-400 space-y-4 max-w-xl mx-auto leading-relaxed">
            <p>
              <strong className="text-slate-200 font-medium">Design & Motion rationale:</strong> Hover/focus transitions use 150ms ease-out for immediate responsiveness and a tactile feel. The loading-to-success handoff uses a 200ms crossfade on opacity and scale, rather than an instant swap, so the icon change reads as continuous and polished rather than jarring. 
            </p>
            <p>
              The error state uses a custom shake keyframe capped at 400ms total — long enough to register as intentional negative feedback, but short enough not to feel punishing. The button uses a fixed minimum width to contain the fading text and spinner without triggering expensive layout recalculations (width/margin animations).
            </p>
            <p>
              <strong className="text-slate-200 font-medium">Accessibility:</strong> When <code className="bg-white/10 px-1 py-0.5 rounded text-purple-300">prefers-reduced-motion</code> is active, the physical shake animation and transition durations are removed. However, the visual feedback—the red tinted background and the explicit &quot;Retry&quot; text label—remains intact instantly, ensuring critical feedback is never silently lost for users requiring less motion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
