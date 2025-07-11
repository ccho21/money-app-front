'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BookText, ChartColumnBig, Settings, Wallet, Plus } from 'lucide-react';
import { cn } from '@/modules/shared/util/style.utils';

const tabs = [
  {
    key: 'dashboard',
    label: 'Home',
    icon: BookText,
    path: '/dashboard',
  },
  {
    key: 'transaction',
    label: 'Transaction',
    icon: ChartColumnBig,
    path: '/transaction/view/list',
  },
  {
    key: 'add',
    label: '',
    icon: Plus,
    path: '/transaction/manage/new',
    isCTA: true,
  },
  {
    key: 'insights',
    label: 'Insights',
    icon: Wallet,
    path: '/insights',
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/settings',
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <nav className='fixed bottom-0 left-0 w-full border-t border-border bg-background z-50'>
      <div className='relative flex justify-around items-center py-2'>
        {tabs.map(({ key, label, icon: Icon, path, isCTA }) => {
          const isActive = pathname === path;

          return (
            <button
              key={key}
              onClick={() => handleNavigate(path)}
              className={cn(
                'flex flex-col items-center text-label gap-0.5 transition',
                isCTA && 'rounded-full bg-primary text-primary-foreground p-2'
              )}
            >
              <Icon
                className={cn(
                  'w-5 h-5',
                  isCTA
                    ? 'text-primary-foreground'
                    : isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              />
              {!isCTA && (
                <span
                  className={cn(
                    'text-label text-xs',
                    isActive
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground font-normal'
                  )}
                >
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
