'use client';

import React from 'react';
import { useChat } from 'ai/react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, stop, isLoading, error, reload, append } = useChat({
    api: '/api/chat',
  });

  const [isRetrying, setIsRetrying] = React.useState(false);

  const handleRetry = async () => {
    if (isRetrying) return;
    setIsRetrying(true);
    await reload();
    setIsRetrying(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-transparent relative">
      {error && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 glass-panel border border-red-500/50 text-red-400 px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.2)]" role="alert">
          <strong className="font-bold drop-shadow-md">Connection Error: </strong>
          <span className="block sm:inline ml-2">{error.message || 'Generation failed.'}</span>
          <button 
            onClick={handleRetry} 
            disabled={isRetrying}
            className="ml-4 underline text-red-300 hover:text-white transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRetrying ? 'Retrying...' : 'Retry last message'}
          </button>
        </div>
      )}
      <MessageList messages={messages} isLoading={isLoading} append={append} />
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
        <div className="max-w-4xl mx-auto pointer-events-auto">
          <ChatInput 
            input={input} 
            handleInputChange={handleInputChange} 
            handleSubmit={handleSubmit} 
            isLoading={isLoading} 
            stop={stop}
          />
        </div>
      </div>
    </div>
  );
}
