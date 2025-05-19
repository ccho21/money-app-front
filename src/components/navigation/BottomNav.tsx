'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  BookText,
  ChartColumnBig,
  Settings,
  Wallet,
  Plus,
} from 'lucide-react';

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

  const handleNavigate = (path: string, isActive: boolean) => {
    const fullPath = isActive ? `${path}?refresh=${Date.now()}` : path;
    router.push(fullPath);
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50">
      <div className="relative flex justify-around items-center py-2">
        {tabs.map(({ key, label, icon: Icon, path, isCTA }) => {
          const isActive = pathname.startsWith(path);

          if (isCTA) {
            return (
              <button
                key={key}
                onClick={() => handleNavigate(path, isActive)}
                className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white rounded-full p-3 shadow-md"
              >
                <Icon className="w-6 h-6" />
              </button>
            );
          }

          return (
            <button
              key={key}
              onClick={() => handleNavigate(path, isActive)}
              className="text-xs flex flex-col items-center"
            >
              <Icon
                className={`w-5 h-5 mb-1 ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`}
              />
              <span
                className={`text-[11px] ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'
                }`}
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
