'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BookText, BarChart2, Coins, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';

const baseTabs = [
  {
    key: 'daily',
    label: 'Today',
    icon: <BookText className='w-5 h-5' />,
    basePath: '/dashboard/daily',
  },
  {
    key: 'stats',
    label: 'Stats',
    icon: <BarChart2 className='w-5 h-5' />,
    basePath: '/stats/category',
  },
  {
    key: 'accounts',
    label: 'Accounts',
    icon: <Coins className='w-5 h-5' />,
    basePath: '/account/dashboard',
  },
  {
    key: 'more',
    label: 'More',
    icon: <MoreHorizontal className='w-5 h-5' />,
    basePath: '/more',
  },
];

export default function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();

  const today = new Date();
  const todayLabel = format(today, 'MM-dd');
  const todayDateParam = format(today, 'yyyy-MM-dd');

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border flex justify-around items-center h-[10vh]'>
      {baseTabs.map((tab) => {
        const isTodayTab = tab.key === 'daily';
        const tabPath = isTodayTab
          ? `${tab.basePath}?date=${todayDateParam}`
          : tab.basePath;
        const isActive = pathname.startsWith(tab.basePath);

        return (
          <button
            key={tab.key}
            onClick={() => router.push(tabPath)}
            className='flex flex-col items-center text-xs'
          >
            <div className={isActive ? 'text-primary' : 'text-muted'}>
              {tab.icon}
            </div>
            <span
              className={`mt-1 ${
                isActive ? 'text-primary font-semibold' : 'text-muted'
              }`}
            >
              {isTodayTab ? todayLabel : tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
