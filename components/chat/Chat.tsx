'use client';

import React from 'react';
import { useChat } from 'ai/react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, stop, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <div className="flex flex-col h-full w-full bg-slate-50">
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput 
        input={input} 
        handleInputChange={handleInputChange} 
        handleSubmit={handleSubmit} 
        isLoading={isLoading} 
        stop={stop} 
      />
    </div>
  );
}
