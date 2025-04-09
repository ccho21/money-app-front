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
import { parseLocalDate } from '@/lib/date.util';
import { useDateFilterStore } from '@/stores/useDateFilterStore';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const accountId = useParams().id;
  const router = useRouter();

  const current = pathname.split('/')[4]   || 'daily';
  const dateParam = searchParams.get('date');

  const {
    state: { date },
    actions: { setDate },
  } = useDateFilterStore();

  useEffect(() => {
    if (!dateParam) return;

    try {
      const parsed = parseLocalDate(dateParam); // YYYY / YYYY-MM / YYYY-MM-DD
      if (format(parsed, 'yyyy-MM-dd') !== format(date, 'yyyy-MM-dd')) {
        setDate(parsed);
      }
    } catch (err) {
      console.log('### ERR', err);
    }
  }, [dateParam, setDate, router, current, date]);

  const tabs = [
    { key: 'daily', label: 'Daily' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'yearly', label: 'Yearly' },
  ];

  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full bg-white'>
      {/* 상단: 네비게이션 */}
      <div className=''>
        <DateNavigator />
        <TabMenu
          tabs={tabs}
          active={current}
          variant='underline'
          onChange={(key) => {
            router.replace(`/account/${accountId}/detail/${key}`);

            // const currentDate = format(date, 'yyyy-MM-dd');
            // router.push(`/dashboard/${key}?date=${currentDate}`);
          }}
        />
      </div>

      {/* 본문 */}
      <div className='flex-1 overflow-y-auto bg-gray-100'>{children}</div>

      {/* 하단: 탭 + 추가 버튼 */}
      <BottomTabBar />
      <Button
        variant='solid'
        className='fixed bottom-[16vh] right-4 w-10 h-10 bg-red-500 text-white rounded-full shadow-md z-50 text-center flex justify-center'
        onClick={() => router.push('/transaction/new')}
      >
        <Plus className='w-4 h-4' />
      </Button>
    </div>
  );
}
