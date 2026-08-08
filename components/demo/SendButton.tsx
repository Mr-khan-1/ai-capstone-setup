'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return reduced;
}

interface SendButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  forceOutcome?: 'success' | 'error';
}

export interface SendButtonRef {
  trigger: (outcome?: 'success' | 'error') => void;
}

export const SendButton = React.forwardRef<SendButtonRef, SendButtonProps>(
  ({ forceOutcome, disabled, className, ...props }, ref) => {
    const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const prefersReducedMotion = useReducedMotion();
    const timeoutRef = useRef<NodeJS.Timeout>(null);
    const isExecuting = useRef(false);

    const executeAction = async (outcomeOverride?: 'success' | 'error') => {
      if (isExecuting.current || disabled) return;
      
      isExecuting.current = true;
      setState('loading');

      // Fake async call
      await new Promise((res) => setTimeout(res, 800 + Math.random() * 700));

      const outcome = outcomeOverride || forceOutcome || (Math.random() > 0.2 ? 'success' : 'error');
      
      setState(outcome);

      // Both success and error go back to idle after a delay
      timeoutRef.current = setTimeout(() => {
        setState('idle');
        isExecuting.current = false;
      }, 1200);
    };

    React.useImperativeHandle(ref, () => ({
      trigger: (outcome?: 'success' | 'error') => {
        if (!isExecuting.current && !disabled) {
          executeAction(outcome || forceOutcome);
        }
      }
    }));

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onClick) props.onClick(e);
      executeAction();
    };

    const isIdle = state === 'idle';
    const isLoading = state === 'loading';
    const isSuccess = state === 'success';
    const isError = state === 'error';

    const durationClass = prefersReducedMotion ? 'duration-0' : 'duration-150';

    return (
      <button
        onClick={handleClick}
        disabled={disabled || isLoading}
        className={cn(
          'relative overflow-hidden flex items-center justify-center min-w-[140px] h-12 rounded-2xl font-medium text-white shadow-lg transition-all ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
          durationClass,
          (!isLoading && !disabled) && 'hover:scale-[1.05] focus-visible:scale-[1.05] active:scale-[0.97]',
          disabled && 'opacity-50 cursor-not-allowed grayscale',
          (isIdle || isLoading) && 'user-bubble',
          isSuccess && 'bg-gradient-to-br from-emerald-500 to-green-600 shadow-[0_4px_20px_rgba(16,185,129,0.3)]',
          isError && 'bg-gradient-to-br from-red-500 to-rose-600 shadow-[0_4px_20px_rgba(239,68,68,0.3)]',
          isError && !prefersReducedMotion && 'animate-shake',
          className
        )}
        aria-live="polite"
      >
        <div className="relative flex items-center justify-center w-full h-full">
          
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center gap-2 transition-all',
              prefersReducedMotion ? 'duration-0' : 'duration-200',
              (isIdle || isError) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
            )}
          >
            {isError ? (
              <>
                <AlertCircle className="w-5 h-5" />
                <span>Retry</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 ml-1" />
                <span>Send</span>
              </>
            )}
          </div>

          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-all',
              prefersReducedMotion ? 'duration-0' : 'duration-200',
              isLoading ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
            )}
          >
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>

          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-all',
              prefersReducedMotion ? 'duration-0' : 'duration-200 delay-100',
              isSuccess ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
            )}
          >
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </button>
    );
  }
);
SendButton.displayName = 'SendButton';
