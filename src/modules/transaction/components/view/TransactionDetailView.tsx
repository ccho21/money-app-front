'use client';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

import EmptyMessage from '@/components/ui/custom/emptyMessage';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components_backup/ui/drawer';
import { Button } from '@/components_backup/ui/button';
import { useConditionalRender } from '@/hooks/useConditionalRender';
import { TransactionItem } from '../../types/types';
import { useTransactionStore } from '../../stores/store';
import TransactionGroup from '../TransactionGroup';
import { useTransactionFilterStore } from '../../stores/filterStore';
import { useTransactionGroupsByCalendar } from '../../hooks/queries';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  open: boolean;
  date: Date;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function TransactionDetailView({
  open,
  date,
  onClose,
}: Props) {
  const router = useRouter();
  const { setSelectedTransaction } = useTransactionStore();
  const shouldRender = useConditionalRender(open);

  const { query } = useTransactionFilterStore();
  const { timeframe, groupBy, startDate, endDate } = query;

  const queryParams = {
    timeframe,
    groupBy,
    startDate,
    endDate,
  };

  const {
    data: group,
    isLoading,
    error,
  } = useTransactionGroupsByCalendar(date, queryParams);

  const formattedDate = format(date, 'PPP');

  const onTransactionClick = (tx: TransactionItem) => {
    setSelectedTransaction(tx);
    router.push(`/transaction/${tx.id}/edit`);
  };

  return (
    <Drawer open={open} onOpenChange={(open) => !open && onClose()}>
      {shouldRender && (
        <DrawerContent className='pb-[10vh]' aria-describedby={undefined}>
          <DrawerHeader className='text-center font-semibold text-sm pb-2'>
            <DrawerTitle>{formattedDate}</DrawerTitle>
          </DrawerHeader>

          <div className='px-4 pt-2 text-sm'>
            {isLoading ? (
              <Skeleton className='h-24 w-full' />
            ) : error ? (
              <div className='text-red-500'>데이터를 불러오지 못했습니다.</div>
            ) : group ? (
              <TransactionGroup
                key={group.groupKey}
                label={group.groupKey}
                onTransactionClick={onTransactionClick}
                group={group}
              />
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
