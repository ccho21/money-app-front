// src/app/dashboard/components/TransactionDetailView.tsx
'use client';

import EmptyMessage from '@/components/ui/empty/EmptyMessage';
import BottomSheetPanel from '@/components/common/BottomSheetPanel';
import {
  TransactionDetailDTO,
  TransactionGroupItemDTO,
} from '@/modules/transaction/types';
import { useTransactionStore } from '@/modules/transaction/store';
import { useRouter } from 'next/navigation';
import TransactionGroup from '@/components/transaction/TransactionGroup';
import Panel from '@/components/ui/panel/Panel';

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
  transactionSummary,
  onClose,
}: Props) {
  const router = useRouter();
  const { setSelectedTransaction } = useTransactionStore();

  const onTransactionClick = (tx: TransactionDetailDTO) => {
    setSelectedTransaction(tx);
    router.push(`/transaction/${tx.id}/edit`);
  };

  return (
    <BottomSheetPanel
      isOpen={open}
      onClose={onClose}
      title={transactionSummary?.label}
    >
      {transactionSummary ? (
        <Panel>
          <TransactionGroup
            key={transactionSummary.label}
            label={transactionSummary.label}
            rangeStart={transactionSummary.rangeStart}
            rangeEnd={transactionSummary.rangeEnd}
            groupIncome={transactionSummary.groupIncome}
            groupExpense={transactionSummary.groupExpense}
            onTransactionClick={(tx: TransactionDetailDTO) =>
              onTransactionClick(tx)
            }
            group={transactionSummary}
          />
        </Panel>
      ) : (
        <EmptyMessage />
      )}
    </BottomSheetPanel>
  );
}
