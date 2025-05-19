'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';
import { PeriodData } from '../../types/types'; // DTO 기준으로 경로 맞춰줘

interface Props {
  periods: PeriodData[];
}

export function MonthlySummaryGrid({ periods }: Props) {
  const formatCAD = (value: number) =>
    new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <Accordion type="multiple" className="w-full space-y-2">
      {periods.map((item, index) => {
        const { period, income, expense, saved, rate } = item;
        const positive = saved >= 0;

        return (
          <AccordionItem value={`month-${index}`} key={period}>
            <AccordionTrigger className="text-sm font-medium py-3 px-4 rounded-lg bg-gray-50 hover:bg-gray-100 ">
              <div className="w-full flex justify-between items-center">
                <span className="text-left">{period}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="bg-white rounded-b-lg px-4 py-3 text-sm space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Income</span>
                <span className="text-gray-900 font-medium">
                  {formatCAD(income)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Expenses</span>
                <span className="text-red-600 font-medium">
                  {formatCAD(expense)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>{positive ? 'Saved' : 'Overspent'}</span>
                <span
                  className={`font-medium ${
                    positive ? 'text-green-600' : 'text-destructive'
                  }`}
                >
                  {formatCAD(Math.abs(saved))}
                </span>
              </div>
              <div className="flex gap-2 items-center font-medium">
                {positive ? 'Well done – Budget saved' : 'Budget exceeded'}
                {positive ? (
                  <IconTrendingUp className="size-4 text-green-600" />
                ) : (
                  <IconTrendingDown className="size-4 text-destructive" />
                )}
              </div>
              <p className="text-muted-foreground text-sm">
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
