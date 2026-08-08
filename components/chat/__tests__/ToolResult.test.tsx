import { render, screen } from '@testing-library/react';
import { ToolResult } from '../ToolResult';
import { describe, it, expect } from 'vitest';

describe('ToolResult', () => {
  it('renders loading/preparing UI given a mock partial-call state', () => {
    render(<ToolResult toolInvocation={{ toolCallId: '1', toolName: 'auditPage', state: 'partial-call' } as any} />);
    expect(screen.getByText('Preparing to audit...')).toBeInTheDocument();
  });

  it('renders successful result score and checks', () => {
    const result = { score: 95, checks: [{ label: 'Performance', detail: 'Good', status: 'success' }] };
    render(<ToolResult toolInvocation={{ toolCallId: '1', toolName: 'auditPage', state: 'result', result, args: { url: 'test.com' } } as any} />);
    
    expect(screen.getByText('95')).toBeInTheDocument();
    expect(screen.getByText('Performance')).toBeInTheDocument();
  });

  it('renders the error-styled card distinctly given a mock error result', () => {
    const result = { error: 'Network timeout' };
    render(<ToolResult toolInvocation={{ toolCallId: '1', toolName: 'auditPage', state: 'result', result, args: { url: 'test.com' } } as any} />);
    
    expect(screen.getByText('Audit Failed')).toBeInTheDocument();
    expect(screen.getByText('Network timeout')).toBeInTheDocument();
  });

  it('does not crash and renders fallback given an unexpectedly-shaped result', () => {
    const result = { completely: 'wrong format' };
    render(<ToolResult toolInvocation={{ toolCallId: '1', toolName: 'auditPage', state: 'result', result, args: { url: 'test.com' } } as any} />);
    
    expect(screen.getByText('Audit Format Error')).toBeInTheDocument();
    expect(screen.getByText('The tool returned an unexpected result format.')).toBeInTheDocument();
  });
});
