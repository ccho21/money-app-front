'use client';

import EmptyMessage from '@/components/ui/EmptyMessage';
import PanelContent from '@/components/ui/PanelContent';
import PanelHeader from '@/components/ui/PanelHeader';
import SlideUpPanel from '@/components/ui/SlideUpPanel';
import { Transaction, TransactionSummary } from '@/features/transaction/types';
import { useTransactionStore } from '@/stores/useTransactionStore';
import { useRouter } from 'next/navigation';

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

  const handleClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    router.push(`/transaction/${transaction.id}/edit`);
  };

  return (
    <SlideUpPanel open={open} onClose={onClose}>
      <PanelHeader>
        {/* Top Summary */}
        <div className='grid grid-cols-12 items-start gap-2 px-5 pt-5'>
          {/* 날짜 */}
          <div className='col-span-4'>
            <div className='flex items-center gap-3'>
              <div className='text-3xl font-bold text-gray-900 dark:text-white'>
                {date.getDate()}
              </div>
              <div className='flex flex-col text-xs text-muted-foreground'>
                <span>{dateStr}</span>
                <span className='bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full'>
                  {weekday}
                </span>
              </div>
            </div>
          </div>

          {/* 수입 */}
          <div className='col-span-5 text-right text-sm text-[#3C50E0] mt-1'>
            +₩
            {transactionSummary
              ? transactionSummary.incomeTotal.toLocaleString()
              : 0}
          </div>

          {/* 지출 */}
          <div className='col-span-3 text-right text-sm text-[#fb5c4c] mt-1'>
            -₩
            {transactionSummary
              ? Math.abs(transactionSummary.expenseTotal).toLocaleString()
              : 0}
          </div>
        </div>
      </PanelHeader>

      <PanelContent>
        {/* 거래 리스트, 내용 */}
        {!transactionSummary ? (
          <EmptyMessage></EmptyMessage>
        ) : (
          <>
            {/* 거래 리스트 */}
            <div className='overflow-y-auto mt-5 px-5 space-y-3 pb-32'>
              {transactionSummary.transactions.map((t) => (
                <div
                  onClick={() => handleClick(t)}
                  key={t.id}
                  className='grid grid-cols-12 items-center border-b border-gray-200 dark:border-zinc-700 py-2 px-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800'
                >
                  <div className='col-span-2 text-[15px] text-gray-700 dark:text-gray-200'>
                    {t.category?.name}
                  </div>

                  <div className='col-span-6 overflow-hidden'>
                    <div className='text-xs text-muted-foreground truncate'>
                      {t.note}
                    </div>
                    <div className='text-xs text-gray-500 truncate'>•</div>
                  </div>

                  <div
                    className={`col-span-4 text-right text-sm ${
                      t.type === 'expense' ? 'text-[#fb5c4c]' : 'text-[#3C50E0]'
                    }`}
                  >
                    {t.type === 'expense' ? '-' : '+'}₩
                    {Math.abs(t.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </PanelContent>
    </SlideUpPanel>
  );
}
