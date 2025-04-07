'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import TopNav from '@/components/common/TopNav';
import BottomTabBar from '@/components/common/BottomTabBar';
import TabMenu from '@/components/common/TabMenu';
import DateNavigator from '@/components/ui/DateNavigator';
import { Button } from '@/components/ui/Button';

import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { parseLocalDate } from '@/lib/date.util';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { formatDate } from '@/lib/date.util';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const current = pathname.split('/')[2] || 'daily';
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
      const todayStr = formatDate(new Date());
      router.replace(`/dashboard/${current}?date=${todayStr}`);
    }
  }, [dateParam, setDate, router, current, date]);

  const tabs = [
    { key: 'daily', label: 'Daily' },
    { key: 'calendar', label: 'Calendar' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'summary', label: 'Summary' },
  ];

  return (
    <div className='min-h-screen pb-[10vh] flex flex-col h-full'>
      {/* 상단: 네비게이션 */}
      <div className=''>
        <TopNav title='Trans.' />
        <DateNavigator />
        <TabMenu
          tabs={tabs}
          active={current}
          variant='underline'
          onChange={(key) => {
            const currentDate = format(date, 'yyyy-MM-dd');
            router.push(`/dashboard/${key}?date=${currentDate}`);
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
