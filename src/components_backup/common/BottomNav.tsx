'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BookText, ChartColumnBig, Settings, Wallet, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
    path: '/transaction/list',
  },
  {
    key: 'add',
    label: '',
    icon: Plus,
    path: '/transaction/new',
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

  const handleNavigate = (path: string, isActive: boolean) => {
    const fullPath = isActive ? `${path}?refresh=${Date.now()}` : path;
    router.push(fullPath);
  };

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border'>
      <Card className='rounded-none px-4 py-2'>
        <div className='relative flex justify-around items-center h-14'>
          {tabs.map(({ key, label, icon: Icon, path, isCTA }) => {
            const isActive = pathname.startsWith(path);

            if (isCTA) {
              return (
                <Button
                  key={key}
                  onClick={() => handleNavigate(path, isActive)}
                  size='icon'
                  className='absolute -top-6 left-1/2 -translate-x-1/2 rounded-full p-4 bg-primary text-primary-foreground shadow-md hover:bg-primary/90'
                >
                  <Icon className='w-5 h-5' />
                </Button>
              );
            }

            return (
              <Button
                key={key}
                variant='ghost'
                size='icon'
                onClick={() => handleNavigate(path, isActive)}
                className='flex flex-col items-center gap-[2px] px-1 py-1 h-auto'
                data-active={isActive}
              >
                <Icon
                  className={cn(
                    'w-5 h-5',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
                <span
                  className={cn(
                    'text-[11px] leading-tight',
                    isActive
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  )}
                >
                  {label}
                </span>
              </Button>
            );
          })}
        </div>
      </Card>
    </nav>
  );
}
