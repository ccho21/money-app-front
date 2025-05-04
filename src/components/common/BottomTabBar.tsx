'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  BookText,
  MoreHorizontal,
  ChartColumnBigIcon,
  Wallet,
} from 'lucide-react';
import { format } from 'date-fns';
import Panel from '../ui/panel/Panel';
import { cn } from '@/lib/utils';

const baseTabs = [
  {
    key: 'daily',
    label: 'Today',
    icon: BookText,
    basePath: '/dashboard/daily',
  },
  {
    key: 'stats',
    label: 'Stats',
    icon: ChartColumnBigIcon,
    basePath: '/stats/category',
  },
  {
    key: 'accounts',
    label: 'Accounts',
    icon: Wallet,
    basePath: '/account/dashboard',
  },
  {
    key: 'more',
    label: 'More',
    icon: MoreHorizontal,
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
    <nav className='fixed bottom-0 left-0 right-0 z-50 h-[10vh] bg-card border-t border-border'>
      <Panel>
        <div className='flex justify-around items-center m-component'>
          {baseTabs.map((tab) => {
            const isTodayTab = tab.key === 'daily';
            const tabPath = isTodayTab
              ? `${tab.basePath}?date=${todayDateParam}`
              : tab.basePath;

            const isActive = pathname.startsWith(tab.basePath);

            const handleClick = () => {
              if (isActive) {
                const refreshedURL = `${tabPath}&refresh=${Date.now()}`;
                router.replace(refreshedURL);
              } else {
                router.push(tabPath);
              }
            };

            const Icon = tab.icon;

            return (
              <button
                key={tab.key}
                onClick={handleClick}
                className={cn(
                  'flex flex-col items-center gap-tight text-caption text-muted transition-colors',
                  isActive && 'text-primary font-semibold'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive && 'text-primary')} />
                <span>{isTodayTab ? todayLabel : tab.label}</span>
              </button>
            );
          })}
        </div>
      </Panel>
    </nav>
  );
}
