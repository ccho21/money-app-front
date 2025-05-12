'use client';

import { SummaryItem } from '@/common/types';
import CurrencyDisplay from '../../components_backup/ui/currency/CurrencyDisplay';
import { TrendingUp, DollarSign, CreditCard } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface SummaryBoxProps {
  items: SummaryItem[];
  className?: string;
  onClick?: () => void;
}

export default function SummaryBox({ items, onClick }: SummaryBoxProps) {
  if (!items || items.length < 3) return null;

  const [net, income, expense] = items;

  return (
    <Card className='p-component gap-0' onClick={onClick}>
      <CardHeader className='p-0'>
        <div className='flex items-center'>
          <div className='bg-primary/10 rounded-input pr-tight'>
            <TrendingUp className='w-[1.5rem] h-[1.5rem] text-primary' />
          </div>
          <CardTitle className='text-heading text-foreground font-semibold'>
            {net.label}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className='p-0 space-y-element'>
        <div className='text-[1.75rem] font-bold text-foreground'>
          <CurrencyDisplay amount={net.value} />
        </div>

        <div className='my-compact border-t border-border' />

        <div className='flex justify-between text-label'>
          <div className='flex items-center gap-tight text-success'>
            <DollarSign className='w-[1.25rem] h-[1.25rem]' />
            <span>{income.label}</span>
            <CurrencyDisplay amount={income.value} className='ml-tight' />
          </div>
          <div className='flex items-center gap-tight text-error'>
            <CreditCard className='w-[1.25rem] h-[1.25rem]' />
            <span>{expense.label}</span>
            <CurrencyDisplay amount={expense.value} className='ml-tight' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
