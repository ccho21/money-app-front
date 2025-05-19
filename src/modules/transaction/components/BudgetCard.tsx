// src/components/common/BudgetCard.tsx
'use client';

import CurrencyDisplay from '@/components_backup/ui/currency/CurrencyDisplay';
import Progress from '@/components_backup/ui/progress/ProgressWithToday';
import { ChartBar } from 'lucide-react';

interface BudgetCardProps {
  name?: string;
  budget: number;
  spent: number;
  rate: number;
  startDate: string;
  endDate: string;
  label?: string;
  hasBudget?: boolean;
  variant?: 'summary' | 'item';
  onClick?: () => void;
}

export default function BudgetCard({
  name,
  budget,
  spent,
  rate,
  startDate,
  endDate,
  label,
  hasBudget = true,
  variant = 'item',
  onClick,
}: BudgetCardProps) {
  const remaining = budget - spent;

  return (
    <div className='px-component py-component' onClick={onClick}>
      {variant === 'summary' && (
        <h2 className='text-label mb-compact flex items-center gap-tight'>
          <ChartBar className='w-4 h-4' />
          Budget
        </h2>
      )}

      <div className='bg-surface dark:bg-gray-800 rounded-default p-element text-label grid grid-cols-12 gap-component items-center'>
        {hasBudget ? (
          <>
            {/* 좌측 예산 표시 */}
            <div className='col-span-3'>
              <div className='text-caption text-muted mb-tight'>
                {label ?? 'Total Budget'}
              </div>
              <div className='text-body font-semibold'>
                <CurrencyDisplay amount={budget} />
              </div>
            </div>

            {/* 우측 프로그레스 + 지출 + 남은 금액 */}
            <div className='col-span-9'>
              <Progress value={rate} startDate={startDate} endDate={endDate} />
              <div className='flex justify-between text-caption text-muted mb-tight'>
                <span className='text-primary'>
                  <CurrencyDisplay amount={spent} />
                </span>
                <span className='text-muted'>
                  <CurrencyDisplay amount={remaining} />
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className='col-span-12'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-element'>
                <span className='text-label font-medium text-foreground'>
                  {name}
                </span>
              </div>
              <span>
                <CurrencyDisplay amount={spent} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
