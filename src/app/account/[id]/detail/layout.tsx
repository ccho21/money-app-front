// src/app/account/[id]/detail/layout.tsx
'use client';

import { ReactNode, useEffect, useRef, useCallback } from 'react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import BottomTabBar from '@/components/common/BottomTabBar';
import TabMenu from '@/components/common/TabMenu';
import DateNavigator from '@/components/common/DateNavigator';
import { Button } from '@/components/ui/button/Button';

import { Plus } from 'lucide-react';
import { parseLocalDate, formatDate } from '@/lib/date.util';

import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';
import { useAccountFormStore } from '@/modules/account/formStore';

import type { GroupBy } from '@/common/types';

const validRanges: GroupBy[] = ['daily', 'weekly', 'monthly', 'yearly'];

export default function AccountDetailDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const accountId = useParams().id;

  const current = pathname.split('/')[4] || 'daily';
  const dateParam = searchParams.get('date');
  const rangeParam = searchParams.get('groupBy');

  const { query, setQuery } = useFilterStore();
  const { date, groupBy } = query;

  const { reset } = useAccountFormStore();
  const hasInitialized = useRef(false);

  // URL → Zustand 초기화
  useEffect(() => {
    if (hasInitialized.current) return;

    const partialQuery: Partial<typeof query> = {};

    if (dateParam) {
      try {
        const parsedDate = parseLocalDate(dateParam);
        if (formatDate(parsedDate) !== formatDate(date)) {
          partialQuery.date = parsedDate;
        }
      } catch (err) {
        console.warn('❌ Invalid dateParam', err);
      }
    }

    if (rangeParam && validRanges.includes(rangeParam as GroupBy)) {
      if (groupBy !== rangeParam) {
        partialQuery.groupBy = rangeParam as GroupBy;
      }
    }

    if (Object.keys(partialQuery).length > 0) {
      setQuery(partialQuery);
    }

    hasInitialized.current = true;
  }, [dateParam, rangeParam, date, groupBy, setQuery]);

  // TopNav 구성
  useEffect(() => {
    useUIStore.getState().setTopNav({
      title: 'Accounts.',
      onBack: () => router.back(),
      onAdd: () => {
        reset();
        router.push('/account/new');
      },
      onEdit: () => router.push(`/account/${accountId}/edit`),
    });

    return () => {
      useUIStore.getState().resetTopNav();
    };
  }, [router, reset, accountId]);

  const tabs = [
    { key: 'daily', label: 'Daily' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'yearly', label: 'Yearly' },
  ];

  const handleTabChange = useCallback(
    (key: string) => {
      const currentDate = formatDate(date);
      const rangeParam = `groupBy=${groupBy}`;
      router.replace(
        `/account/${accountId}/detail/${key}?date=${currentDate}&${rangeParam}`
      );
    },
    [router, accountId, date, groupBy]
  );

  return (
    <div className='min-h-screen pb-tabbar flex flex-col h-full bg-surface text-foreground'>
      <div>
        <DateNavigator />
        <TabMenu
          tabs={tabs}
          active={current}
          variant='underline'
          onChange={handleTabChange}
        />
      </div>

      <div className='flex-1 overflow-y-auto'>{children}</div>

      <BottomTabBar />
    </div>
  );
}
