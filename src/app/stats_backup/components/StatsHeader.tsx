'use client';

// import { useState } from 'react';
import { cn } from '@/lib/utils';
import { RANGE_OPTIONS, GroupBy } from '@/common/types';
import { Tabs, TabsList, TabsTrigger } from '@/components_backup/ui/tabs';
import { Filter } from 'lucide-react';
import { Button } from '@/components_backup/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components_backup/ui/drawer';
import TabMenu from '@/components/navigation/TabMenu';
import { TransactionType } from '@/modules/transaction/types';
import { useConditionalRender } from '@/hooks/useConditionalRender';
import { useState } from 'react';

type StatsHeaderProps = {
  pathname: string;
  groupBy: string;
  transactionType: TransactionType;
  onTabChange: (href: string) => void;
  onRangeSelect: (range: GroupBy) => void;
  onTypeChange: (key: string) => void;
};

const tabs = [
  { name: 'Stats', href: '/stats/category' },
  { name: 'Budget', href: '/stats/budget' },
  { name: 'Note', href: '/stats/note' },
];

const types = [
  { key: 'expense', label: 'Expense' },
  { key: 'income', label: 'Income' },
];

export default function StatsHeader({
  pathname,
  groupBy,
  transactionType,
  onTabChange,
  onRangeSelect,
  onTypeChange,
}: StatsHeaderProps) {
  const [open, setOpen] = useState(false);
  const shouldRender = useConditionalRender(open);

  return (
    <div className='p-compact'>
      <div className='flex justify-between items-center rounded-md bg-surface py-1 px-2'>
        <Tabs value={pathname} onValueChange={onTabChange} className='w-full'>
          <TabsList className='bg-muted/30 rounded-md p-1 w-full max-w-[calc(100%-40px)]'>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.href}
                value={tab.href}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors flex-1 text-center',
                  'data-[state=active]:bg-white'
                )}
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              type='button'
              variant='ghost'
              onClick={(e) => {
                e.currentTarget.blur(); // 👈 포커스 강제 제거
              }}
            >
              <Filter className='w-5 h-5' />
            </Button>
          </DrawerTrigger>

          {shouldRender && (
            <DrawerContent className='bg-white' aria-describedby={undefined}>
              <DrawerHeader className='text-center font-semibold text-sm pb-2'>
                <DrawerTitle>Select Filter</DrawerTitle>
              </DrawerHeader>

              <TabMenu
                tabs={types}
                active={transactionType}
                onChange={onTypeChange}
              />
              <div className='text-sm p-compact space-y-1 pb-[10vh]'>
                {RANGE_OPTIONS.map((option) => {
                  const isSelected = option === groupBy;
                  return (
                    <DrawerClose asChild key={option}>
                      <Button
                        onClick={() => onRangeSelect(option)}
                        variant='outline'
                        className={cn(
                          'w-full flex items-center justify-between px-4 py-3 min-h-[48px] rounded-md text-sm',
                          isSelected
                            ? 'bg-muted font-semibold text-foreground border-border'
                            : 'text-muted-foreground border-border hover:bg-muted/20',
                          'transition-colors duration-150'
                        )}
                      >
                        <span>{option}</span>
                        {isSelected && (
                          <svg
                            className='w-4 h-4 text-primary'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                          >
                            <path d='M5 13l4 4L19 7' />
                          </svg>
                        )}
                      </Button>
                    </DrawerClose>
                  );
                })}
              </div>
            </DrawerContent>
          )}
        </Drawer>
      </div>
    </div>
  );
}
