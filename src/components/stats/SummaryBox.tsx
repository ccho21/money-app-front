'use client';

import { SummaryItem } from '@/common/types';
import { cn } from '@/lib/utils';
import CurrencyDisplay from '../ui/currency/CurrencyDisplay';
import { TrendingUp, DollarSign, CreditCard } from 'lucide-react';

interface SummaryBoxProps {
  items: SummaryItem[];
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
        'rounded-card shadow bg-card p-component space-y-element',
        onClick && 'cursor-pointer hover:bg-muted/5 transition-colors',
        className
      )}
      onClick={onClick}
    >
      {/* 상단 아이콘 + 라벨 */}
      <div className='flex items-center gap-element'>
        <div className='bg-primary/10 p-compact rounded-input'>
          <TrendingUp className='w-6 h-6 text-primary' />
        </div>
        <span className='text-heading font-semibold text-foreground'>
          {net.label}
        </span>
      </div>

      {/* Net Total 금액 */}
      <div className='text-[1.75rem] font-bold text-foreground'>
        <CurrencyDisplay amount={net.value} />
      </div>

      <div className='border-t border-border my-compact' />

      {/* 하단 Income / Expense */}
      <div className='flex justify-between text-label'>
        <div className='flex items-center gap-tight text-success'>
          <DollarSign className='w-5 h-5' />
          <span>{income.label}</span>
          <CurrencyDisplay amount={income.value} className='ml-1' />
        </div>
        <div className='flex items-center gap-tight text-error'>
          <CreditCard className='w-5 h-5' />
          <span>{expense.label}</span>
          <CurrencyDisplay amount={expense.value} className='ml-1' />
        </div>
      </div>
    </div>
  );
}
