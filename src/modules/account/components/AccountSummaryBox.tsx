'use client';

import { Card, CardContent } from '@/components/ui/card';
import CurrencyDisplay from '@/components/ui/custom/currencyDisplay';
import { cn } from '@/modules/shared/lib/utils';
import type { AccountDetailDTO } from '../types/types';

interface AccountSummaryBoxProps {
  account: AccountDetailDTO;
  className?: string;
}

export default function AccountSummaryBox({
  account,
  className,
}: AccountSummaryBoxProps) {
  const icon =
    account.type === 'CARD' ? '💳' : account.type === 'BANK' ? '🏦' : '👛';
  const isNegative = account.balance < 0;

  const cardInfo =
    account.type === 'CARD' &&
    account.autoPayment &&
    `Auto-pay: ${account.paymentDate}th · Settlement: ${account.settlementDate}th`;

  const description = account.description || '(No description)';
  return (
    <Card className={cn('', className)}>
      <CardContent className=' space-y-component'>
        {/* 금액 강조 영역 */}
        <div className='flex justify-between items-start'>
          <div className='space-y-tight'>
            <h2 className='text-heading font-semibold'>
              <span
                className='w-3 h-3 rounded-full inline-block mr-element'
                style={{ backgroundColor: `var(${account.color})` }}
              ></span>
              {account.name}
            </h2>
            <div className='flex items-center gap-2 text-label text-muted-foreground uppercase tracking-wide'>
              <span>{icon}</span>
              <span>{description}</span>
            </div>
          </div>
          <CurrencyDisplay
            type={isNegative ? 'expense' : 'income'}
            amount={Math.abs(account.balance)}
            className={cn('!text-display')}
          />
        </div>
        <div>
          <span className='text-caption text-muted-foreground'>
            {account.type}
          </span>
          {cardInfo && (
            <p className='text-caption text-muted-foreground'>{cardInfo}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
