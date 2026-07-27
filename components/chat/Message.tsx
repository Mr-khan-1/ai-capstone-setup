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
      className={`flex gap-4 w-full p-4 md:p-6 mb-4 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
      )}

      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 shadow-sm leading-relaxed ${
          isUser
            ? 'bg-slate-800 text-white rounded-br-sm'
            : 'bg-white border border-slate-100 text-slate-800 rounded-bl-sm'
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap">{message.content}</div>
        ) : (
          <div className="prose prose-slate max-w-none prose-sm md:prose-base 
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-p:leading-relaxed prose-p:mb-4 last:prose-p:mb-0
              prose-ul:list-disc prose-ul:pl-5
              prose-ol:list-decimal prose-ol:pl-5
              prose-strong:font-semibold prose-strong:text-slate-900">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-slate-200 rounded-full flex items-center justify-center shadow-sm">
          <User className="w-5 h-5 text-slate-600" />
        </div>
      )}
    </div>
  );
}
