'use client';

import { SummaryItem } from '@/common/types';
import { cn } from '@/lib/utils';
import CurrencyDisplay from '../ui/currency/CurrencyDisplay';
import { TrendingUp, DollarSign, CreditCard } from 'lucide-react';

interface SummaryBoxProps {
  items: SummaryItem[]; // [0]: Net Total, [1]: Income, [2]: Expense
  className?: string;
  onClick?: () => void;
}

export default function SummaryBox({
  items,
  className,
  onClick,
}: SummaryBoxProps) {
  if (!items || items.length < 3) return null;

  const [net, income, expense] = items;

  return (
    <div
      className={cn(
        'rounded-xl shadow bg-white p-5 space-y-3',
        onClick && 'cursor-pointer hover:bg-muted/5 transition-colors',
        className
      )}
      onClick={onClick}
    >
      {/* 상단 아이콘 + 라벨 */}
      <div className='flex items-center gap-3'>
        <div className='bg-success/10 p-2 rounded-md'>
          <TrendingUp className='w-6 h-6 text-success' />
        </div>
        <span className='text-lg font-medium text-foreground'>{net.label}</span>
      </div>

      {/* Net Total 금액 */}
      <div className='text-3xl font-bold text-foreground'>
        <CurrencyDisplay amount={net.value} />
      </div>

      <div className='border-t my-2' />

      {/* 하단 Income / Expense */}
      <div className='flex justify-between text-sm'>
        <div className='flex items-center gap-2 text-success'>
          <DollarSign className='w-5 h-5' />
          <span>{income.label}</span>
          <CurrencyDisplay amount={income.value} className='ml-1' />
        </div>
        <div className='flex items-center gap-2 text-error'>
          <CreditCard className='w-5 h-5' />
          <span>{expense.label}</span>
          <CurrencyDisplay amount={expense.value} className='ml-1' />
        </div>
      </div>
    </div>
  );
}
