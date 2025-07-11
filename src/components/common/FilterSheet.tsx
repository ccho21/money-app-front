'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';
import { Timeframe } from '@/modules/transaction/types/types';

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const accountList = [
  { id: 'bank', label: 'Bank Account' },
  { id: 'cash', label: 'Cash' },
  { id: 'card', label: 'Card' },
];

const categoryList = [
  { id: 'food', label: 'Food' },
  { id: 'transport', label: 'Transport' },
  { id: 'shopping', label: 'Shopping' },
];

export default function FilterSheet({ open, onOpenChange }: FilterSheetProps) {
  const { query, setQuery } = useTransactionFilterStore();
  const [localQuery, setLocalQuery] = useState({ ...query });

  const toggleIdArray = (key: 'accountId' | 'categoryId', id: string) => {
    const current = localQuery[key]?.split(',') ?? [];
    const updated = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    setLocalQuery((prev) => ({ ...prev, [key]: updated.join(',') }));
  };

  const handleReset = () => {
    setLocalQuery({
      ...query,
      transactionType: undefined,
      categoryId: '',
      accountId: '',
      timeframe: 'monthly',
    });
  };

  const handleApply = () => {
    setQuery(() => ({
      ...localQuery,
      version: Date.now(),
    }));

    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side='right'
        className='pb-safe h-full overflow-y-auto px-4 pt-10'
      >
        <SheetHeader className='p-0'>
          <SheetTitle className='text-lg'>Transaction Filter</SheetTitle>
          <SheetDescription className='text-sm text-muted-foreground'>
            You can filter transactions based on your criteria.
          </SheetDescription>
        </SheetHeader>

        <div className='space-y-4 pb-28'>
          <div className='space-y-2'>
            <p className='text-sm font-medium'>Date Filter Type</p>
            <ToggleGroup
              type='single'
              value={localQuery.timeframe}
              onValueChange={(value) =>
                setLocalQuery((prev) => ({
                  ...prev,
                  timeframe: value as Timeframe,
                }))
              }
              className='grid grid-cols-4 gap-2'
            >
              {/* <ToggleGroupItem value='daily' className='text-sm'>
                Daily
              </ToggleGroupItem> */}
              {/* <ToggleGroupItem value='weekly' className='text-sm'>
                Weekly
              </ToggleGroupItem> */}
              <ToggleGroupItem value='monthly' className='text-xs'>
                Monthly
              </ToggleGroupItem>
              <ToggleGroupItem value='yearly' className='text-sm'>
                Yearly
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className='space-y-2'>
            <p className='text-sm font-medium'>Select Accounts</p>
            <div className='space-y-2'>
              {accountList.map(({ id, label }) => (
                <div key={id} className='flex items-center gap-2'>
                  <Checkbox
                    id={`account-${id}`}
                    checked={(localQuery.accountId ?? '')
                      .split(',')
                      .includes(id)}
                    onCheckedChange={() => toggleIdArray('accountId', id)}
                  />
                  <label htmlFor={`account-${id}`} className='text-sm'>
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className='space-y-2'>
            <p className='text-sm font-medium'>Select Categories</p>
            <div className='space-y-2'>
              {categoryList.map(({ id, label }) => (
                <div key={id} className='flex items-center gap-2'>
                  <Checkbox
                    id={`category-${id}`}
                    checked={(localQuery.categoryId ?? '')
                      .split(',')
                      .includes(id)}
                    onCheckedChange={() => toggleIdArray('categoryId', id)}
                  />
                  <label htmlFor={`category-${id}`} className='text-sm'>
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='sticky bottom-0 bg-background border-t px-4 py-3'>
          <SheetFooter className='flex justify-between'>
            <Button size='sm' className='text-sm' onClick={handleApply}>
              Apply
            </Button>
            <Button
              variant='ghost'
              size='sm'
              className='text-sm'
              onClick={handleReset}
            >
              Reset
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
