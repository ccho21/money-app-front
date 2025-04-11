'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  BookText,
  MoreHorizontal,
  ChartColumnBigIcon,
  Wallet,
} from 'lucide-react';
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
    icon: <ChartColumnBigIcon className='w-5 h-5' />,
    basePath: '/stats/category',
  },
  {
    key: 'accounts',
    label: 'Accounts',
    icon: <Wallet className='w-5 h-5' />,
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
    <nav className='fixed bottom-0 left-0 right-0 z-50 bg-surface dark:bg-surface border-t border-border flex justify-around items-center h-[10vh]'>
      {baseTabs.map((tab) => {
        const isTodayTab = tab.key === 'daily';
        const tabPath = isTodayTab
          ? `${tab.basePath}?date=${todayDateParam}`
          : tab.basePath;

        const isActive = pathname.startsWith(tab.basePath);

        const handleClick = () => {
          if (pathname.startsWith(tab.basePath)) {
            const refreshedURL = `${tabPath}&refresh=${Date.now()}`;
            router.replace(refreshedURL);
          } else {
            router.push(tabPath);
          }
        };

        return (
          <button
            key={tab.key}
            onClick={handleClick}
            className='flex flex-col items-center text-xs text-muted hover:text-muted/80'
          >
            <div className={isActive ? 'text-primary' : ''}>{tab.icon}</div>
            <span className={isActive ? 'text-primary font-semibold' : ''}>
              {isTodayTab ? todayLabel : tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
