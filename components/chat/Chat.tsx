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
  const [customError, setCustomError] = React.useState<string | null>(null);

  const handleRetry = async () => {
    if (!navigator.onLine) {
      setCustomError('No internet connection detected. Please check your network and try again.');
      return;
    }
    setCustomError(null);
    if (isRetrying) return;
    setIsRetrying(true);
    await reload();
    setIsRetrying(false);
  };

  const customHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!navigator.onLine) {
      setCustomError('No internet connection detected. Please check your network and try again.');
      return;
    }
    setCustomError(null);
    handleSubmit(e);
  };

  const customAppend = async (message: any, options?: any) => {
    if (!navigator.onLine) {
      setCustomError('No internet connection detected. Please check your network and try again.');
      return null;
    }
    setCustomError(null);
    return append(message, options);
  };

  const displayError = customError || (error ? error.message : null);

  return (
    <div className="flex flex-col h-full w-full bg-transparent relative">
      <MessageList 
        messages={messages} 
        isLoading={isLoading} 
        append={customAppend} 
        error={displayError}
        onRetry={handleRetry}
        isRetrying={isRetrying}
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
        <div className="max-w-4xl mx-auto pointer-events-auto">
          <ChatInput 
            input={input} 
            handleInputChange={handleInputChange} 
            handleSubmit={customHandleSubmit} 
            isLoading={isLoading} 
            stop={stop}
          />
        </div>
      </div>
    </div>
  );
}
