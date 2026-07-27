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
    <div className="relative flex-1 overflow-hidden flex flex-col bg-slate-50/50">
      <div 
        ref={scrollRef} 
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-8 md:px-12 scroll-smooth"
      >
        <div className="max-w-4xl mx-auto flex flex-col w-full pb-10">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 mt-32 space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-xl font-medium text-slate-700">Paste a URL to start the audit</p>
              <p className="text-sm">SiteScope AI will analyze SEO, accessibility, and performance.</p>
            </div>
          ) : (
            messages.map((message) => (
              <Message key={message.id} message={message} />
            ))
          )}

          {showThinking && (
            <div className="mt-4 animate-in fade-in duration-300">
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
          className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-slate-600 border border-slate-200 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium hover:bg-slate-50 hover:text-blue-600 transition-all z-10"
        >
          <ArrowDown className="w-4 h-4" />
          Jump to latest
        </button>
      )}
    </div>
  );
}
