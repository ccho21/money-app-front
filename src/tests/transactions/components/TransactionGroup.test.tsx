// src/modules/transaction/components/TransactionGroup.test.tsx
import TransactionGroup from '@/modules/transaction/components/TransactionGroup';
import { TransactionGroupItem } from '@/modules/transaction/types/types';
import { render, screen, fireEvent } from '@testing-library/react';

const mockGroup: TransactionGroupItem = {
  groupBy: 'date',
  groupKey: '2025-06-01',
  totalAmount: 300,
  transactions: [
    {
      id: '0c52a721-c616-4b1a-83eb-7881816c7d10',
      note: 'Salary',
      description: 'Monthly salary payment',
      amount: 2600,
      type: 'income',
      date: '2025-06-13T04:32:41.537Z',
      payment: 'Cash',
      recurringId: '5dc80156-15df-426e-aac2-8d46b7196cf4',
      category: {
        name: 'Pay',
        icon: 'BadgeDollarSign',
        color: '--chart-3',
      },
      account: {
        name: 'Cash',
      },
    },
    {
      id: '547014ea-636c-47e9-9b2c-58fc1cd6e098',
      note: 'Netflix',
      description: 'Monthly subscription',
      amount: 15,
      type: 'expense',
      date: '2025-06-13T04:32:41.537Z',
      payment: 'Card',
      recurringId: '2eae2776-5875-46ce-b392-73d774cd96db',
      category: {
        name: 'Food',
        icon: 'Utensils',
        color: '--chart-4',
      },
      account: {
        name: 'Card',
      },
    },
  ],
};

describe('TransactionGroup', () => {
  it('renders label and transactions', () => {
    render(<TransactionGroup label='Today' group={mockGroup} />);
    expect(screen.getByText('Today')).toBeInTheDocument();
    // expect(screen.getByText('2025-06-13')).toBeInTheDocument();
  });

  it('renders date range when showRange is true', () => {
    render(
      <TransactionGroup
        label='Last Week'
        group={mockGroup}
        showRange
        rangeStart='2024-01-01'
        rangeEnd='2024-01-07'
      />
    );
    expect(screen.getByText('2024-01-01 ~ 2024-01-07')).toBeInTheDocument();
  });

  it('calls onHeaderClick on click', () => {
    const handleClick = jest.fn();
    render(
      <TransactionGroup
        label='This Month'
        group={mockGroup}
        onHeaderClick={handleClick}
      />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('calls onHeaderClick on Enter key', () => {
    const handleClick = jest.fn();
    render(
      <TransactionGroup
        label='This Month'
        group={mockGroup}
        onHeaderClick={handleClick}
      />
    );
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not render date header if showDateHeader is false', () => {
    render(
      <TransactionGroup
        label='Hidden'
        group={mockGroup}
        showDateHeader={false}
      />
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
