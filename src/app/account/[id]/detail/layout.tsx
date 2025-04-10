'use client';

import { ReactNode, useEffect } from 'react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import BottomTabBar from '@/components/common/BottomTabBar';
import TabMenu from '@/components/common/TabMenu';
import DateNavigator from '@/components/ui/DateNavigator';
import { Button } from '@/components/ui/Button';

import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { parseLocalDate, formatDate } from '@/lib/date.util';
import { useFilterStore } from '@/stores/useFilterStore';
import { useUIStore } from '@/stores/useUIStore';
import { useAccountFormStore } from '@/stores/useAccountFormStore';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const accountId = useParams().id;
  const router = useRouter();

  const current = pathname.split('/')[4] || 'daily';
  const dateParam = searchParams.get('date');

  const { query, setDateFromString } = useFilterStore();
  const { date } = query;

  const {
    actions: { reset },
  } = useAccountFormStore();

  useEffect(() => {
    if (!dateParam) return;

    try {
      const parsed = parseLocalDate(dateParam);
      if (format(parsed, 'yyyy-MM-dd') !== format(date, 'yyyy-MM-dd')) {
        setDateFromString(dateParam);
      }
    } catch (err) {
      console.log('### ERR', err);
    }
  }, [dateParam, setDateFromString, router, current, date]);

  const tabs = [
    { key: 'daily', label: 'Daily' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'yearly', label: 'Yearly' },
  ];

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
            router.replace(
              `/account/${accountId}/detail/${key}?date=${currentDate}`
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
