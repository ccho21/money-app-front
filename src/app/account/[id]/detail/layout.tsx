'use client';

import { ReactNode, useEffect, useRef } from 'react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import BottomTabBar from '@/components/common/BottomTabBar';
import TabMenu from '@/components/common/TabMenu';
import DateNavigator from '@/components/ui/check/DateNavigator';
import { Button } from '@/components/ui/check/Button';

import { Plus } from 'lucide-react';
import { parseLocalDate, formatDate } from '@/lib/date.util';

import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';
import { useAccountFormStore } from '@/modules/account/formStore';

import type { GroupBy } from '@/shared/types';

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

  const {
    actions: { reset },
  } = useAccountFormStore();

  const hasInitialized = useRef(false);

  useEffect(() => {
    const partialQuery: Partial<typeof query> = {};
    let parsedDate: Date | null = null;

    if (!hasInitialized.current) {
      if (dateParam) {
        try {
          parsedDate = parseLocalDate(dateParam);
          if (formatDate(parsedDate) !== formatDate(date)) {
            partialQuery.date = parsedDate;
          }
        } catch (err) {
          console.log('❌ Invalid dateParam', err);
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
    }
  }, [dateParam, rangeParam, date, groupBy, current, setQuery]);

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

  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full bg-surface text-foreground'>
      <div>
        <DateNavigator />
        <TabMenu
          tabs={tabs}
          active={current}
          variant='underline'
          onChange={(key) => {
            const currentDate = formatDate(date);
            const rangeParam = `groupBy=${groupBy}`;
            router.replace(
              `/account/${accountId}/detail/${key}?date=${currentDate}&${rangeParam}`
            );
          }}
        />
      </div>

      <div className='flex-1 overflow-y-auto'>{children}</div>

      <BottomTabBar />
      <Button
        variant='solid'
        className='fixed bottom-[16vh] right-4 w-10 h-10 bg-primary text-onPrimary rounded-full shadow-md z-50 flex justify-center items-center'
        onClick={() => router.push('/transaction/new')}
      >
        <Plus className='w-4 h-4' />
      </Button>
    </div>
  );
}
