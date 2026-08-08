import { render, screen } from '@testing-library/react';
import { Chat } from '../Chat';
import { vi, describe, it, expect } from 'vitest';
import { Message as AIMessage } from 'ai/react';

// Mock ai/react
vi.mock('ai/react', () => {
  return {
    useChat: vi.fn(() => ({
      messages: [],
      input: '',
      handleInputChange: vi.fn(),
      handleSubmit: vi.fn(),
      stop: vi.fn(),
      isLoading: false,
      error: undefined,
      reload: vi.fn(),
      append: vi.fn(),
    })),
  };
});

import { useChat } from 'ai/react';

describe('Chat / Message / MessageList', () => {
  it('Pending state: renders the thinking indicator when isLoading is true and no assistant message started', () => {
    vi.mocked(useChat).mockReturnValue({
      messages: [{ id: '1', role: 'user', content: 'test request' } as AIMessage],
      input: '',
      handleInputChange: vi.fn(),
      handleSubmit: vi.fn(),
      stop: vi.fn(),
      isLoading: true,
      error: undefined,
      reload: vi.fn(),
      append: vi.fn(),
    } as any);

    render(<Chat />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('Streaming/success state: user message and assistant message render with correct role-based distinction', () => {
    vi.mocked(useChat).mockReturnValue({
      messages: [
        { id: '1', role: 'user', content: 'hello' },
        { id: '2', role: 'assistant', content: 'world' }
      ] as AIMessage[],
      input: '',
      handleInputChange: vi.fn(),
      handleSubmit: vi.fn(),
      stop: vi.fn(),
      isLoading: false,
      error: undefined,
      reload: vi.fn(),
      append: vi.fn(),
    } as any);

    render(<Chat />);
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('world')).toBeInTheDocument();
  });

  it('Error state: renders Connection Error banner and Retry last message button', () => {
    vi.mocked(useChat).mockReturnValue({
      messages: [{ id: '1', role: 'user', content: 'hello' }] as AIMessage[],
      input: '',
      handleInputChange: vi.fn(),
      handleSubmit: vi.fn(),
      stop: vi.fn(),
      isLoading: false,
      error: new Error('Simulated network error'),
      reload: vi.fn(),
      append: vi.fn(),
    } as any);

    render(<Chat />);
    expect(screen.getByText(/connection error/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry last message/i })).toBeInTheDocument();
  });

  it('Empty state: renders example URL buttons when messages is empty', () => {
    vi.mocked(useChat).mockReturnValue({
      messages: [] as AIMessage[],
      input: '',
      handleInputChange: vi.fn(),
      handleSubmit: vi.fn(),
      stop: vi.fn(),
      isLoading: false,
      error: undefined,
      reload: vi.fn(),
      append: vi.fn(),
    } as any);

    render(<Chat />);
    expect(screen.getByRole('button', { name: /example\.com/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /vercel\.com/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /github\.com/i })).toBeInTheDocument();
  });
});
