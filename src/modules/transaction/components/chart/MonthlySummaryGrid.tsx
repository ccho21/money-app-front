'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';
import { PeriodData } from '../../types/types';
import CurrencyDisplay from '@/components/ui/custom/currencyDisplay';

interface Props {
  periods: PeriodData[];
}

export function MonthlySummaryGrid({ periods }: Props) {
  return (
    <Accordion type='multiple' className='w-full space-y-element'>
      {periods.map((item, index) => {
        const { period, income, expense, saved, rate } = item;
        const positive = saved >= 0;

        return (
          <AccordionItem value={`month-${index}`} key={period}>
            <AccordionTrigger className='text-body font-medium py-element px-element rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors'>
              <div className='w-full flex justify-between items-center'>
                <span className='text-left'>{period}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent className='bg-card rounded-b-lg px-element py-element space-y-tight text-body'>
              <div className='flex justify-between text-muted-foreground'>
                <span className='text-label'>Income</span>
                <CurrencyDisplay
                  type='income'
                  amount={income}
                ></CurrencyDisplay>
              </div>

              <div className='flex justify-between text-muted-foreground'>
                <span className='text-label'>Expenses</span>
                <CurrencyDisplay
                  type='expense'
                  amount={expense}
                  className='text-destructive'
                ></CurrencyDisplay>
              </div>

              <div className='flex justify-between text-muted-foreground'>
                <span className='text-label'>
                  {positive ? 'Saved' : 'Overspent'}
                </span>
                <span
                  className={`font-medium ${
                    positive ? 'text-success' : 'text-destructive'
                  }`}
                >
                  <CurrencyDisplay
                    type='total'
                    amount={Math.abs(saved)}
                  ></CurrencyDisplay>
                </span>
              </div>

              <div className='flex gap-tight items-center font-medium'>
                {positive ? 'Well done – Budget saved' : 'Budget exceeded'}
                {positive ? (
                  <IconTrendingUp className='icon-sm text-success' />
                ) : (
                  <IconTrendingDown className='icon-sm text-destructive' />
                )}
              </div>

              <p className='text-caption text-muted-foreground'>
                {Math.abs(rate)}% of your income was{' '}
                {positive ? 'saved' : 'overspent'} this month.
              </p>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
