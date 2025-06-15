import { QueryProvider } from '@/providers/QueryProvider';
import { render, screen } from '@testing-library/react';

describe('QueryProvider', () => {
  it('renders children correctly', () => {
    render(
      <QueryProvider>
        <div>Test Query Content</div>
      </QueryProvider>
    );

    expect(screen.getByText('Test Query Content')).toBeInTheDocument();
  });
});