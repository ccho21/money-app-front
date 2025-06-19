import TransactionListView from '@/modules/transaction/components/view/TransactionListView';
import { render, screen, fireEvent } from '@testing-library/react';
import { wrapper } from '@/tests/test-utils';
import {
  TransactionGroupItem,
  TransactionGroupListResponse,
  TransactionItem,
} from '@/modules/transaction/types/types';

type TransactionGroupProps = {
  label: string;
  group: TransactionGroupItem;
  onHeaderClick?: () => void;
  onTransactionClick?: (tx: TransactionItem) => void;
};

jest.mock('@/modules/transaction/components/TransactionGroup', () => ({
  __esModule: true,
  default: ({
    label,
    group,
    onHeaderClick,
    onTransactionClick,
  }: TransactionGroupProps) => (
    <div data-testid={`group-${group.groupKey}`}>
      <button onClick={() => onHeaderClick?.()}>{label}</button>
      {group.transactions.map((tx) => (
        <button key={tx.id} onClick={() => onTransactionClick?.(tx)}>
          {tx.note}
        </button>
      ))}
    </div>
  ),
}));

describe('TransactionListView integration', () => {
  const baseData: TransactionGroupListResponse = {
    timeframe: 'monthly',
    startDate: '2025-06-01',
    endDate: '2025-06-30',
    groupBy: 'date',
    groups: [
      {
        groupBy: 'date',
        groupKey: '2025-06-10',
        totalAmount: 100,
        transactions: [
          {
            id: 'tx1',
            note: 'Tx1',
            amount: 100,
            type: 'expense',
            date: '2025-06-10',
            payment: 'cash',
            category: null,
            account: {
              name: 'Cash',
            },
          },
        ],
      },
      {
        groupBy: 'date',
        groupKey: '2025-06-11',
        totalAmount: 200,
        transactions: [
          {
            id: 'tx2',
            note: 'Tx2',
            amount: 200,
            type: 'income',
            date: '2025-06-11',
            payment: 'card',
            category: null,
            account: {
              name: 'Card',
            },
          },
        ],
      },
    ],
  };

  it('renders loading message', () => {
    render(<TransactionListView isLoading data={null} />, {
      wrapper: wrapper(),
    });
    expect(screen.getByText(/loading transactions/i)).toBeInTheDocument();
  });

  it('renders empty message when no groups', () => {
    render(
      <TransactionListView
        isLoading={false}
        data={{ ...baseData, groups: [] }}
      />,
      { wrapper: wrapper() }
    );
    expect(screen.getByText(/no transactions found/i)).toBeInTheDocument();
  });

  it('renders groups and handles clicks', () => {
    const onItemClick = jest.fn();
    const onGroupClick = jest.fn();

    render(
      <TransactionListView
        isLoading={false}
        data={baseData}
        onItemClick={onItemClick}
        onGroupClick={onGroupClick}
      />,
      { wrapper: wrapper() }
    );

    expect(screen.getByTestId('group-2025-06-10')).toBeInTheDocument();
    expect(screen.getByTestId('group-2025-06-11')).toBeInTheDocument();

    fireEvent.click(screen.getByText('2025-06-10'));
    fireEvent.click(screen.getByText('Tx1'));

    expect(onGroupClick).toHaveBeenCalledWith('2025-06-10');
    expect(onItemClick).toHaveBeenCalledWith(
      baseData.groups[0].transactions[0]
    );
  });
});
