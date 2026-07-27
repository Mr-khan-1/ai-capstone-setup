import React, { useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  stop: () => void;
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading, stop }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Only submit if not loading and input is not completely empty
      if (!isLoading && input.trim()) {
        const formEvent = new Event('submit', { cancelable: true, bubbles: true }) as unknown as React.FormEvent<HTMLFormElement>;
        handleSubmit(formEvent);
      }
    }
  };

  return (
    <div className="w-full relative drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {isLoading && (
          <button
            onClick={stop}
            className="absolute -top-14 flex items-center gap-2 px-5 py-2 glass-panel text-slate-200 text-sm font-medium rounded-full transition-all hover:bg-white/10 hover:-translate-y-0.5 shadow-lg shadow-purple-500/10"
          >
            <Square className="w-4 h-4 fill-slate-300" />
            Stop generating
          </button>
        )}

        <form 
          onSubmit={handleSubmit}
          className="relative w-full flex items-end gap-2 glass-input rounded-3xl overflow-hidden focus-within:ring-2 focus-within:ring-purple-500/40 focus-within:border-purple-500/50 transition-all shadow-2xl"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            placeholder="Paste a URL or ask a question about SEO..."
            className="w-full max-h-[200px] min-h-[64px] py-5 pl-6 pr-16 bg-transparent border-none focus:outline-none focus:ring-0 resize-none text-white placeholder:text-slate-500"
            rows={1}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-3 bottom-3 w-10 h-10 flex items-center justify-center user-bubble text-white rounded-2xl disabled:opacity-50 disabled:grayscale transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black hover:scale-105"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-4 text-center tracking-wide font-medium">
          SiteScope AI can make mistakes. Please verify critical SEO changes.
        </p>
      </div>
    </div>
  );
}
