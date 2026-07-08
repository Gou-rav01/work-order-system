import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PriorityBadge, StatusBadge } from '@/components/badge';

describe('Badge Components', () => {
  it('should render priority badge with correct text', () => {
    render(<PriorityBadge priority="High" />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('should render status badge with correct text', () => {
    render(<StatusBadge status="In Progress" />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('should render all priority levels', () => {
    const { rerender } = render(<PriorityBadge priority="Low" />);
    expect(screen.getByText('Low')).toBeInTheDocument();

    rerender(<PriorityBadge priority="Medium" />);
    expect(screen.getByText('Medium')).toBeInTheDocument();

    rerender(<PriorityBadge priority="High" />);
    expect(screen.getByText('High')).toBeInTheDocument();
  });

  it('should render all status levels', () => {
    const { rerender } = render(<StatusBadge status="Open" />);
    expect(screen.getByText('Open')).toBeInTheDocument();

    rerender(<StatusBadge status="In Progress" />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();

    rerender(<StatusBadge status="Done" />);
    expect(screen.getByText('Done')).toBeInTheDocument();
  });
});
