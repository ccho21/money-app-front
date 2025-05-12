'use client';

import { ReactNode, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const years = ['2024', '2023', '2022'];

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
    router.push(`/transaction/chart/${value}`);
  };

  return (
    <div className='w-full min-h-screen px-component pb-[10vh] pt-component space-y-component'>
      {/* Header: Title + Year Selector */}
      <div className='flex items-center justify-between'>
        <h1 className='text-heading font-semibold'>Spending Analysis</h1>

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className='w-[130px]'>
            <SelectValue placeholder='Select year' />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <ToggleGroup
        type='single'
        value={tab}
        onValueChange={(value) => value && handleTabChange(value)}
        className='w-full grid grid-cols-4 gap-1'
      >
        <ToggleGroupItem value='flow' className='w-full justify-center'>
          📈 Flow
        </ToggleGroupItem>
        <ToggleGroupItem value='category' className='w-full justify-center'>
          🧾 Category
        </ToggleGroupItem>
        <ToggleGroupItem value='account' className='w-full justify-center'>
          💳 Account
        </ToggleGroupItem>
        <ToggleGroupItem value='budget' className='w-full justify-center'>
          💰 Budget
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Tab Content */}
      <div className='space-y-component'>{children}</div>
    </div>
  );
}

// 'use client';

// import { useEffect, useCallback } from 'react';
// import { parse, isValid } from 'date-fns';

// import { useTransactionStore } from '@/modules/transaction/store';
// import { useFilterStore } from '@/stores/useFilterStore';

// import { fetchTransactionSummary } from '@/modules/transaction/hooks';

// import type { DateFilterParams } from '@/common/types';

// import { useShallow } from 'zustand/shallow';
// import dynamic from 'next/dynamic';
// import DateNavigator from '@/components/common/DateNavigator';
// import { useRouter } from 'next/navigation';
// import TransactionYearChart from '../components/chart/TransactionYearChart';
// const ChartView = dynamic(
//   () => import('@/app/transaction/components/chart/ChartView'),
//   {
//     ssr: false,
//   }
// );

// export default function ChartPage() {
//   const router = useRouter();

//   const { summary, isLoading } = useTransactionStore(
//     useShallow((s) => ({
//       summary: s.summary,
//       isLoading: s.isLoading,
//     }))
//   );

//   const { query, setQuery, getDateRangeKey, isInitialized } = useFilterStore();
//   const { groupBy, date } = query;

//   useEffect(() => {
//     if (groupBy !== 'yearly') {
//       setQuery({ groupBy: 'yearly' });
//     }
//   }, [groupBy, setQuery]);

//   useEffect(() => {
//     if (!isInitialized) return;

//     const [startDate, endDate] = getDateRangeKey().split('_');
//     const params: DateFilterParams = {
//       groupBy: 'monthly',
//       startDate,
//       endDate,
//     };
//     fetchTransactionSummary(params);
//   }, [getDateRangeKey, date, isInitialized]);

//   const handleMonthClick = useCallback(
//     (label: string) => {
//       const parsed = parse(`${label}-01`, 'yyyy-MM-dd', new Date());
//       if (isValid(parsed)) {
//         useFilterStore.getState().setQuery({ date: parsed });
//         router.push('');
//       }
//     },
//     [router]
//   );

//   // const summaryItems = useSummaryBoxItems('monthly');

//   return (
//     <div className='bg-background'>
//       <DateNavigator />

//       <TransactionYearChart />
//       <div className='m-compact'>
//         <ChartView
//           isLoading={isLoading}
//           data={summary}
//           onMonthClick={handleMonthClick}
//         />
//       </div>
//     </div>
//   );
// }
