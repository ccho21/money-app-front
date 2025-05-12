'use client';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

import EmptyMessage from '@/components/ui/custom/emptyMessage';
import TransactionGroup from '@/components_backup/transaction/TransactionGroup';
import {
  TransactionDetailDTO,
  TransactionGroupItemDTO,
} from '@/modules/transaction/types';
import { useTransactionStore } from '@/modules/transaction/store';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components_backup/ui/drawer';
import { Button } from '@/components_backup/ui/button';
import { useConditionalRender } from '@/hooks/useConditionalRender';

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

  const shouldRender = useConditionalRender(open);

  return (
    <Drawer open={open} onOpenChange={(open) => !open && onClose()}>
      {shouldRender && (
        <DrawerContent className='pb-[10vh]' aria-describedby={undefined}>
          <DrawerHeader className='text-center font-semibold text-sm pb-2'>
            <DrawerTitle>{formattedDate}</DrawerTitle>
          </DrawerHeader>

          <div className='px-4 pt-2 text-sm'>
            {transactionSummary ? (
              <div className='space-y-1'>
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
              </div>
            ) : (
              <EmptyMessage />
            )}
          </div>

          <DrawerClose asChild>
            <Button
              variant='ghost'
              className='absolute top-4 right-4 text-sm'
              onClick={onClose}
            >
              Close
            </Button>
          </DrawerClose>
        </DrawerContent>
      )}
    </Drawer>
  );
}
