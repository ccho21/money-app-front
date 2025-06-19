// src/modules/transaction/components/__tests__/TransactionItem.test.tsx
import TransactionItem from '@/modules/transaction/components/TransactionItem';
import {
  TransactionItem as TransactionItemDTO,
  TransactionType,
} from '@/modules/transaction/types/types';
import { render, screen, fireEvent } from '@testing-library/react';

const baseTx: TransactionItemDTO = {
  id: 'tx1',
  note: 'Lunch with coworkers',
  description: 'Korean BBQ at Seoul House',
  amount: 12345, // $12,345.00
  payment: 'card',
  date: '2025-06-01T12:00:00.000Z',
  type: 'expense',
  recurringId: undefined,
  category: {
    name: 'Food & Drink',
    icon: 'utensils',
    color: '#FF5722',
  },
  account: {
    name: 'Visa Card',
  },
  balanceAfter: 457800, // $457,800.00
};

describe('TransactionItem', () => {
  it('renders basic transaction info', () => {
    render(<TransactionItem tx={baseTx} />);
    expect(screen.getByText('Lunch with coworkers')).toBeInTheDocument();
    expect(screen.getByText(/Food & Drink/)).toBeInTheDocument();
    expect(screen.getByText('$12,345.00')).toBeInTheDocument(); // amount
    expect(screen.getByText('$457,800.00')).toBeInTheDocument(); // balanceAfter
  });

  it('renders "Transfer" when type is transfer and showTransferLabel = true', () => {
    const transferTx = {
      ...baseTx,
      type: 'transfer' as TransactionType,
      category: null,
    };
    render(<TransactionItem tx={transferTx} showTransferLabel />);
    expect(screen.getByText(/Transfer/)).toBeInTheDocument();
  });

  it('hides Transfer label if showTransferLabel is false', () => {
    const transferTx = {
      ...baseTx,
      type: 'transfer' as TransactionType,
      category: null,
    };
    render(<TransactionItem tx={transferTx} showTransferLabel={false} />);
    expect(screen.queryByText(/Transfer/)).not.toBeInTheDocument();
  });

  it('calls onClick with tx when clicked', () => {
    const handleClick = jest.fn();
    render(<TransactionItem tx={baseTx} onClick={handleClick} />);
    fireEvent.click(screen.getByTestId('transaction-item'));
    expect(handleClick).toHaveBeenCalledWith(baseTx);
  });

  it('shows balanceAfter if provided and hides time', () => {
    const tx = { ...baseTx, balanceAfter: 12345 }; // $12,345.00
    render(<TransactionItem tx={tx} />);

    const matches = screen.getAllByText('$12,345.00');
    expect(matches.length).toBeGreaterThanOrEqual(1);

    expect(screen.queryByText(/12:00/)).not.toBeInTheDocument();
  });

  it('uses "Uncategorized" if no category', () => {
    const tx = { ...baseTx, category: null };
    render(<TransactionItem tx={tx} />);
    expect(screen.getByText(/Uncategorized/)).toBeInTheDocument();
  });
});
