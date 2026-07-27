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
    <div className="w-full bg-white border-t border-slate-200 p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {isLoading && (
          <button
            onClick={stop}
            className="mb-4 flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-full transition-colors border border-slate-200 shadow-sm"
          >
            <Square className="w-4 h-4 fill-slate-700" />
            Stop generating
          </button>
        )}

        <form 
          onSubmit={handleSubmit}
          className="relative w-full flex items-end gap-2 bg-white border border-slate-300 rounded-2xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            placeholder="Paste a URL or ask a question about SEO..."
            className="w-full max-h-[200px] min-h-[56px] py-4 pl-4 pr-14 bg-transparent border-none focus:outline-none focus:ring-0 resize-none text-slate-900"
            rows={1}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 bottom-2 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-xl disabled:bg-slate-200 disabled:text-slate-400 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-xs text-slate-400 mt-3 text-center">
          SiteScope AI can make mistakes. Please verify critical SEO changes.
        </p>
      </div>
    </div>
  );
}
