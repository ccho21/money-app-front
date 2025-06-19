import { render, screen } from '@testing-library/react';
import BudgetProgressBar from '@/modules/budget/components/BudgetProgressBar';

jest.mock('@/components/ui/progress', () => ({
  Progress: ({ value, className }: { value: number; className?: string }) => (
    <div data-testid='progress' data-value={value} className={className} />
  ),
}));

describe('BudgetProgressBar', () => {
  it('returns null when total is 0 or less', () => {
    const { container } = render(<BudgetProgressBar used={50} total={0} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders correct percent when used < total', () => {
    render(<BudgetProgressBar used={25} total={100} />);
    const progress = screen.getByTestId('progress');
    expect(progress).toHaveAttribute('data-value', '25');
  });

  it('caps percent at 100 when used > total', () => {
    render(<BudgetProgressBar used={150} total={100} />);
    const progress = screen.getByTestId('progress');
    expect(progress).toHaveAttribute('data-value', '100');
  });

  it('applies destructive background when isOver is true', () => {
    render(<BudgetProgressBar used={80} total={100} isOver />);
    const progress = screen.getByTestId('progress');
    expect(progress.className).toMatch(/bg-destructive\/20/);
  });

  it('applies muted background when isOver is false', () => {
    render(<BudgetProgressBar used={80} total={100} />);
    const progress = screen.getByTestId('progress');
    expect(progress.className).toMatch(/bg-muted/);
  });
});
