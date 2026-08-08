import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatInput } from '../ChatInput';
import { vi, describe, it, expect } from 'vitest';

describe('ChatInput', () => {
  it('renders an input queryable via textbox role and placeholder', () => {
    render(<ChatInput input="" handleInputChange={vi.fn()} handleSubmit={vi.fn()} isLoading={false} stop={vi.fn()} />);
    const textbox = screen.getByRole('textbox');
    expect(textbox).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Paste a URL or ask a question about SEO...')).toBeInTheDocument();
  });

  it('submitting with empty input does not call handleSubmit', async () => {
    const handleSubmit = vi.fn();
    render(<ChatInput input="   " handleInputChange={vi.fn()} handleSubmit={handleSubmit} isLoading={false} stop={vi.fn()} />);
    
    // The button is disabled when empty, so we should test both clicking and enter key
    const form = screen.getByRole('textbox').closest('form')!;
    fireEvent.submit(form);
    
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('typing text and submitting calls the submit handler', async () => {
    const handleSubmit = vi.fn();
    render(<ChatInput input="test query" handleInputChange={vi.fn()} handleSubmit={handleSubmit} isLoading={false} stop={vi.fn()} />);
    
    const form = screen.getByRole('textbox').closest('form')!;
    fireEvent.submit(form);
    
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('stop button is queryable via getByRole and calls stop on click', async () => {
    const stopMock = vi.fn();
    render(<ChatInput input="test" handleInputChange={vi.fn()} handleSubmit={vi.fn()} isLoading={true} stop={stopMock} />);
    
    const stopButton = screen.getByRole('button', { name: /stop generating/i });
    expect(stopButton).toBeInTheDocument();
    
    await userEvent.click(stopButton);
    expect(stopMock).toHaveBeenCalled();
  });
});
