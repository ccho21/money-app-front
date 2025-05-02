// src/app/account/[id]/detail/yearly/page.tsx
'use client';

import { useEffect, useCallback } from 'react';
import { format, parse, startOfMonth } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';

import { useFilterStore } from '@/stores/useFilterStore';
import { useShallow } from 'zustand/shallow';

import YearlyView from '@/components/dashboard/YearlyView';
import { useAccountDetailSummary } from '@/modules/account/hooks';

export default function YearlyPage() {
  const { id: accountId } = useParams();
  const router = useRouter();

  const { summary, isLoading } = useAccountDetailSummary(
    accountId as string,
    'yearly'
  );

  const { query, setQuery } = useFilterStore(
    useShallow((s) => ({
      query: s.query,
      setQuery: s.setQuery,
    }))
  );

  const { groupBy } = query;

  useEffect(() => {
    if (groupBy !== 'yearly') {
      setQuery({ groupBy: 'yearly' });
    }
  }, [groupBy, setQuery]);

  const totalIncome = summary?.totalIncome ?? 0;
  const totalExpense = summary?.totalExpense ?? 0;

  const items = [
    {
      label: 'Income',
      value: totalIncome,
      color: totalIncome > 0 ? 'text-info' : 'text-muted',
      prefix: '$',
    },
    {
      label: 'Exp.',
      value: totalExpense,
      color: totalExpense > 0 ? 'text-error' : 'text-muted',
      prefix: '$',
    },
    {
      label: 'Total',
      value: totalIncome - totalExpense,
      color: 'text-foreground',
      prefix: '$',
    },
  ];

  const handleClick = useCallback(
    (dateStr: string) => {
      try {
        const parsed = parse(dateStr, 'yyyy', new Date());
        const formatted = format(startOfMonth(parsed), 'yyyy-MM-dd');
        router.push(
          `/account/${accountId}/detail/monthly?date=${formatted}&groupBy=yearly`
        );
      } catch {
        console.warn('Invalid year format in handleClick:', dateStr);
      }
    },
    [router, accountId]
  );

  return (
    <YearlyView
      isLoading={isLoading}
      data={summary}
      summaryItems={items}
      onItemClick={handleClick}
    />
  );
}
