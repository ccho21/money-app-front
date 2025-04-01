'use client';

import { ReactNode, useEffect } from 'react';
import BottomTabBar from '@/components/common/BottomTabBar';
import TopNav from '@/components/common/TopNav';
import TabMenu from '@/components/common/TabMenu';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DateNavigator from '@/components/ui/DateNavigator';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import { useDateFilterStore } from '@/stores/useDateFilterStore';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const current = pathname.split('/')[2] || 'daily';

  const dateParam = searchParams.get('date');
  const {
    actions: { setDate },
  } = useDateFilterStore();

  // ✅ URL의 date → store 반영
  useEffect(() => {
    if (dateParam) {
      const parsed = new Date(dateParam);
      if (!isNaN(parsed.getTime())) {
        setDate(parsed);
      }
    }
  }, [dateParam, setDate]);

  const tabs = [
    { key: 'daily', label: 'Daily' },
    { key: 'calendar', label: 'Calendar' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'summary', label: 'Summary' },
  ];

  return (
    <div className="min-h-screen pb-[10vh] flex flex-col h-full">
      {/* Top Section */}
      <div className="mb-3">
        <TopNav title="Trans." />
        <DateNavigator />
        <TabMenu
          tabs={tabs}
          active={current}
          variant="underline"
          onChange={(key) => router.push(`/dashboard/${key}`)}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">{children}</div>

      {/* Bottom Components */}
      <BottomTabBar />
      <Button
        variant={'solid'}
        className="fixed bottom-[16vh] right-4 w-10 h-10 bg-red-500 text-white rounded-full shadow-md z-50 text-center flex justify-center"
        onClick={() => router.push('/transaction/new')}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}
