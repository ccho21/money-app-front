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
import { format } from 'date-fns';

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
  const { setSelectedTransaction } = useTransactionStore();

  const formattedDate = format(date, 'PPP');

  const onTransactionClick = (tx: TransactionDetailDTO) => {
    setSelectedTransaction(tx);
    router.push(`/transaction/${tx.id}/edit`);
  };

  return (
    <BottomSheetPanel isOpen={open} onClose={onClose} title={formattedDate}>
      {transactionSummary ? (
        <Panel>
          <TransactionGroup
            key={transactionSummary.label}
            label={transactionSummary.label}
            rangeStart={transactionSummary.rangeStart}
            rangeEnd={transactionSummary.rangeEnd}
            groupIncome={transactionSummary.groupIncome}
            groupExpense={transactionSummary.groupExpense}
            onTransactionClick={onTransactionClick}
            group={transactionSummary}
          />
        </Panel>
      ) : (
        <EmptyMessage />
      )}
    </BottomSheetPanel>
  );
}
