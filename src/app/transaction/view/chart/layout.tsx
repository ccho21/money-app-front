'use client';

import { ReactNode, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const years = ['2025', '2024', '2023', '2022'];

export default function ChartLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedYear, setSelectedYear] = useState('2024');
  const [tab, setTab] = useState(() => {
    if (pathname.includes('/flow')) return 'flow';
    if (pathname.includes('/category')) return 'category';
    if (pathname.includes('/account')) return 'account';
    if (pathname.includes('/budget')) return 'budget';
    return 'flow';
  });

  const handleTabChange = (value: string) => {
    setTab(value);
    router.push(`/transaction/view/chart/${value}`);
  };

  const tabs = ['flow', 'category', 'account', 'budget'];

  const labels: Record<string, string> = {
    flow: 'Flow',
    category: 'Category',
    account: 'Account',
    budget: 'Budget',
  };

  return (
    <div className='w-full min-h-screen px-element pb-[10vh] pt-element space-y-component'>
      {/* Header: Title + Year Selector */}
      <section className='space-y-2'>
        <div className='flex justify-between items-center'>
          <h2 className='text-base font-semibold'>Overview</h2>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className='flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 w-auto bg-transparent border-none px-0 focus:ring-0 focus:outline-none focus-visible:ring-0 shadow-none'>
              <span>{selectedYear}</span>
            </SelectTrigger>
            <SelectContent align='start'>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className='text-xs text-gray-500'>
          Your income and expense trends across the year
        </p>
      </section>

      {/* Tabs */}
      <ToggleGroup
        type='single'
        value={tab}
        onValueChange={(value) => value && handleTabChange(value)}
        className='flex items-center text-sm font-sm text-gray-500'
      >
        {tabs.map((value) => (
          <ToggleGroupItem
            key={value}
            value={value}
            className={cn(
              'px-4 text-sm h-7',
              'data-[state=on]:bg-blue-100',
              'data-[state=on]:text-blue-600',
              'data-[state=on]:font-semibold',
              'data-[state=on]:rounded-full'
            )}
          >
            {labels[value]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* Tab Content */}
      <div className='space-y-component'>{children}</div>
    </div>
  );
}
