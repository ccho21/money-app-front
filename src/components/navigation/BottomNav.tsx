'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  BookText,
  ChartColumnBig,
  Settings,
  Wallet,
  Plus,
} from 'lucide-react';
import { cn } from '@/modules/shared/lib/utils';

const tabs = [
  {
    key: 'home',
    label: 'Home',
    icon: BookText,
    path: '/dashboard',
  },
  {
    key: 'transactions',
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
    <nav className="fixed bottom-0 left-0 w-full border-t border-border bg-background z-50">
      <div className="relative flex justify-around items-center py-2">
        {tabs.map(({ key, label, icon: Icon, path, isCTA }) => {
          const isActive = pathname.startsWith(path);

          if (isCTA) {
            return (
              <button
                key={key}
                onClick={() => handleNavigate(path)}
                className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full p-3 shadow-md transition-colors"
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          }

          return (
            <button
              key={key}
              onClick={() => handleNavigate(path)}
              className="flex flex-col items-center text-label gap-0.5"
            >
              <Icon
                className={cn(
                  'w-5 h-5',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              <span
                className={cn(
                  'text-label',
                  isActive ? 'text-primary font-normal' : 'text-muted-foreground font-normal'
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
