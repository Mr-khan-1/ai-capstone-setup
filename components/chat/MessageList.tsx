import React, { useEffect, useRef, useState } from 'react';
import { Message as AIMessage } from 'ai/react';
import { Message } from './Message';
import { ThinkingIndicator } from './ThinkingIndicator';
import { ArrowDown } from 'lucide-react';

interface MessageListProps {
  messages: AIMessage[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // Auto-scroll when new messages/tokens arrive, if enabled
  useEffect(() => {
    if (isAutoScrollEnabled) {
      scrollToBottom();
    }
  }, [messages, isLoading, isAutoScrollEnabled]);

  // Handle manual scroll to detect if user scrolled up
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    
    // If the user scrolled up by more than 50px from the bottom, disable auto-scroll
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setIsAutoScrollEnabled(isAtBottom);
  };

  const showThinking = isLoading && (messages.length === 0 || messages[messages.length - 1].role !== 'assistant');

  return (
    <div className="relative flex-1 overflow-hidden flex flex-col bg-transparent">
      <div 
        ref={scrollRef} 
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-8 md:px-12 scroll-smooth hide-scrollbar"
      >
        <div className="max-w-4xl mx-auto flex flex-col w-full pb-32">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 mt-32 space-y-6">
              <div className="w-20 h-20 glass-panel rounded-3xl flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(79,70,229,0.3)] border border-purple-500/20">
                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="text-center space-y-2">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-sm">Awaiting URL...</p>
                <p className="text-sm text-slate-500 max-w-sm">Paste any link to begin the hyper-audit sequence for SEO, accessibility, and performance.</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))
          )}

          {showThinking && (
            <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ThinkingIndicator />
            </div>
          )}
        </div>
      </div>

      {!isAutoScrollEnabled && (
        <button
          onClick={() => {
            setIsAutoScrollEnabled(true);
            scrollToBottom();
          }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 glass-panel text-slate-200 border border-white/10 px-5 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-2 text-sm font-medium hover:bg-white/10 hover:text-white transition-all z-10 hover:-translate-y-1"
        >
          <ArrowDown className="w-4 h-4" />
          Jump to latest
        </button>
      )}
    </div>
  );
}
