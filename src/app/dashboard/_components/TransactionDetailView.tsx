'use client';

import EmptyMessage from '@/components/ui/check/EmptyMessage';
import PanelContent from '@/components/ui/check/PanelContent';
import PanelHeader from '@/components/ui/check/PanelHeader';
import BottomSheetPanel from '@/components/ui/check/BottomSheetPanel';
import {
  TransactionDetailDTO,
  TransactionGroupItemDTO,
} from '@/modules/transaction/types';
import { useTransactionStore } from '@/modules/transaction/store';
import { useRouter } from 'next/navigation';
import { PlusIcon, MinusIcon } from 'lucide-react';
import TransactionItem from '@/components/transaction/TransactionItem';

import CurrencyDisplay from '@/components/ui/check/CurrencyDisplay';

interface Props {
  open: boolean;
  date: Date;
  transactionSummary?: TransactionGroupItemDTO;
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

  const onTransactionClick = (tx: TransactionDetailDTO) => {
    setSelectedTransaction(tx);
    router.push(`/transaction/${tx.id}/edit`);
  };

  return (
    <BottomSheetPanel isOpen={open} onClose={onClose}>
      {/* ✅ 헤더: 날짜 + 요일 + 수입/지출 요약 */}
      <PanelHeader>
        <div className='grid grid-cols-12 items-center pt-4 pb-2'>
          {/* 날짜 + 요일 */}
          <div className='col-span-8 flex items-center gap-2'>
            <span className='text-2xl font-bold text-text'>
              {date.getDate()}
            </span>
            <div className='flex flex-col text-xs'>
              <span>{dateStr}</span>
              <span className='px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground dark:bg-zinc-70'>
                {weekday}
              </span>
            </div>
          </div>

          {/* 수입/지출 요약 */}
          <div className='col-span-4 grid grid-cols-2 gap-1 text-sm font-medium text-right'>
            <span className='inline-flex items-center justify-end text-primary'>
              <PlusIcon size={13} />
              <span>
                <CurrencyDisplay
                  amount={transactionSummary?.incomeTotal ?? 0}
                />
              </span>
            </span>
            <span className='inline-flex items-center justify-end text-error'>
              <MinusIcon size={13} />
              <span>
                <CurrencyDisplay
                  amount={Math.abs(transactionSummary?.expenseTotal ?? 0)}
                />
                {}
              </span>
            </span>
          </div>
        </div>
      </PanelHeader>

      {/* ✅ 본문 */}
      <PanelContent>
        {!transactionSummary ? (
          <EmptyMessage />
        ) : (
          <div className='overflow-y-auto space-y-3 pb-20'>
            <ul className='space-y-2'>
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
    </BottomSheetPanel>
  );
}
