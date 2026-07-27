import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Sparkles } from 'lucide-react';
import { Message as AIMessage } from 'ai/react';

interface MessageProps {
  message: AIMessage;
}

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`flex gap-4 w-full p-2 md:p-4 mb-6 animate-in slide-in-from-bottom-2 fade-in duration-500 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 glass-panel rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.2)] border border-purple-500/20">
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>
      )}

      <div
        className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-6 py-5 shadow-lg leading-relaxed ${
          isUser
            ? 'user-bubble text-white rounded-br-sm'
            : 'glass-panel text-slate-200 rounded-bl-sm border-white/5'
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap">{message.content}</div>
        ) : (
          <div className="prose prose-invert max-w-none prose-sm md:prose-base 
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white 
              prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-purple-300
              prose-p:leading-relaxed prose-p:mb-4 last:prose-p:mb-0
              prose-ul:list-disc prose-ul:pl-5
              prose-ol:list-decimal prose-ol:pl-5
              prose-strong:font-semibold prose-strong:text-purple-200
              prose-code:text-purple-200 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
              prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 user-bubble rounded-full flex items-center justify-center ring-2 ring-purple-500/30">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
}
