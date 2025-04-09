'use client';

import EmptyMessage from '@/components/ui/EmptyMessage';
import PanelContent from '@/components/ui/PanelContent';
import PanelHeader from '@/components/ui/PanelHeader';
import SlideUpPanel from '@/components/ui/SlideUpPanel';
import { Transaction, TransactionSummary } from '@/features/transaction/types';
import { useTransactionStore } from '@/stores/useTransactionStore';
import { useRouter } from 'next/navigation';
import { PlusIcon, MinusIcon } from 'lucide-react';
import TransactionItem from '../../../../components/common/TransactionItem';
import { formatCurrency } from '@/lib/utils';

interface Props {
  open: boolean;
  date: Date;
  transactionSummary?: TransactionSummary;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function TransactionDetailView({
  open,
  date,
  transactionSummary,
  onClose,
}: Props) {
  const router = useRouter();
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}`;

  const {
    actions: { setSelectedTransaction },
  } = useTransactionStore();

  const onTransactionClick = (tx: Transaction) => {
    setSelectedTransaction(tx);
    router.push(`/transaction/${tx.id}/edit`);
  };

  return (
    <SlideUpPanel open={open} onClose={onClose}>
      <PanelHeader>
        <div className='grid grid-cols-12 items-center px-3 pt-3 pb-1'>
          {/* 날짜 (8칸) */}
          <div className='col-span-8 flex items-center gap-2'>
            <span className='text-2xl font-bold text-gray-900 dark:text-white'>
              {date.getDate()}
            </span>
            <div className='flex flex-col text-xs text-gray-500 dark:text-gray-400'>
              <span>{dateStr}</span>
              <span className='bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full w-fit'>
                {weekday}
              </span>
            </div>
          </div>

          {/* 수입/지출 요약 (4칸, 2:2 분할) */}
          <div className='col-span-4 grid grid-cols-2 gap-1 text-sm font-medium text-right text-gray-800 dark:text-gray-200'>
            <span className='inline-flex items-center justify-end text-blue-600'>
              <PlusIcon size={13} />
              <span>
                {transactionSummary
                  ? `${formatCurrency(transactionSummary.incomeTotal)}`
                  : `${formatCurrency(0)}`}
              </span>
            </span>
            <span className='inline-flex items-center justify-end text-red-400'>
              <MinusIcon size={13} />
              <span>
                {transactionSummary
                  ? `${formatCurrency(
                      Math.abs(transactionSummary.expenseTotal)
                    )}`
                  : '$0'}
              </span>
            </span>
          </div>
        </div>
      </PanelHeader>

      <PanelContent>
        {!transactionSummary ? (
          <EmptyMessage />
        ) : (
          <div className='overflow-y-auto space-y-3 pb-20'>
            <ul className='mt-1'>
              {transactionSummary.transactions.map((tx) => (
                <TransactionItem
                  key={tx.id}
                  tx={tx}
                  onClick={onTransactionClick}
                />
              ))}
            </ul>
          </div>
        )}
      </PanelContent>
    </SlideUpPanel>
  );
}
