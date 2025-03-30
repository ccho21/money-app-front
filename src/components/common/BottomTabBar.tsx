'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BookText, BarChart2, Coins, MoreHorizontal } from 'lucide-react';

const tabs = [
  {
    label: '03-24',
    icon: <BookText className='w-5 h-5' />,
    path: '/dashboard/daily',
  },
  { label: 'Stats', icon: <BarChart2 className='w-5 h-5' />, path: '/stats' },
  {
    label: 'Accounts',
    icon: <Coins className='w-5 h-5' />,
    path: '/account-dashboard',
  },
  {
    label: 'More',
    icon: <MoreHorizontal className='w-5 h-5' />,
    path: '/more',
  },
];

export default function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-t border-gray-200 flex justify-around items-center h-[10vh]'>
      {tabs.map((tab) => {
        const isActive = pathname.startsWith(tab.path);
        return (
          <button
            key={tab.label}
            onClick={() => router.push(tab.path)}
            className='flex flex-col items-center text-xs text-gray-400 hover:text-black dark:hover:text-white'
          >
            <div className={isActive ? 'text-red-500' : ''}>{tab.icon}</div>
            <span className={isActive ? 'text-red-500 font-semibold' : ''}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
