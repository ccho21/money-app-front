'use client';

import { CategoryType } from '@/features/category/types';
import SummaryBox from '@/components/ui/SummaryBox';
import BudgetBarChart from '../_components/BudgetBarChart';
import { useParams } from 'next/navigation';
import { useStatsStore } from '@/stores/useStatsStore';
import { useDateFilterStore } from '@/stores/useDateFilterStore';
import { useEffect } from 'react';
import { getDateRangeKey } from '@/lib/date.util';
import { fetchStatsBudgetByCategoryId } from '@/services/statsService';
import EmptyMessage from '@/components/ui/EmptyMessage';
import TransactionGroup from '@/components/common/TransactionGroup';
import Panel from '@/components/ui/Panel';

const MOCK_BAR_DATA = [
  { month: 'Nov', value: 0 },
  { month: 'Dec', value: 0 },
  { month: 'Jan', value: 0 },
  { month: 'Feb', value: 0 },
  { month: 'Mar', value: 32.48 },
  { month: 'Apr', value: 0 },
  { month: 'May', value: 0 },
  { month: 'Jun', value: 0 },
  { month: 'July', value: 0 },
  { month: 'Aug', value: 0 },
  { month: 'Oct', value: 0 },
  { month: 'Sep', value: 0 },
];

export default function StatsBudgetDetailPage() {
  const categoryId = useParams().id;

  const {
    state: { budgetDetailResponse, isLoading },
  } = useStatsStore();

  const {
    state: { range, date, transactionType },
  } = useDateFilterStore();

  useEffect(() => {
    const run = async () => {
      if (!categoryId) return;
      const [startDate, endDate] = getDateRangeKey(date, {
        unit: range,
        amount: 0,
      }).split('_');

      await fetchStatsBudgetByCategoryId(String(categoryId), {
        startDate,
        endDate,
        type: transactionType as CategoryType,
        groupBy: range,
      });
    };

    run();
  }, [date, transactionType, range, categoryId]);

  if (isLoading)
    return <p className='text-center mt-10 text-gray-400'>Loading...</p>;

  if (!budgetDetailResponse || !budgetDetailResponse.data.length) {
    return <EmptyMessage />;
  }

  return (
    <div className='space-y-4'>
      <Panel>
        {/* 헤더 */}
        <div className='text-center space-y-1'>
          <h1 className='text-lg font-bold'>Food</h1>
          <p className='text-sm text-gray-500'>Mar 2025</p>
        </div>

        {/* 요약 */}
        <SummaryBox
          items={[
            {
              label: 'Income',
              value: budgetDetailResponse.incomeTotal,
              color:
                budgetDetailResponse.incomeTotal > 0
                  ? 'text-[#3C50E0]'
                  : 'text-gray-400',
              prefix: '$',
            },
            {
              label: 'Exp.',
              value: budgetDetailResponse.expenseTotal,
              color:
                budgetDetailResponse.expenseTotal > 0
                  ? 'text-[#fb5c4c]'
                  : 'text-gray-400',
              prefix: '$',
            },
            {
              label: 'Total',
              value:
                budgetDetailResponse.incomeTotal -
                budgetDetailResponse.expenseTotal,
              color: 'text-gray-900 dark:text-white',
              prefix: '$',
            },
          ]}
        />
      </Panel>
      <Panel>
        {/* 바 차트 */}
        <div className='w-full h-36'>
          <BudgetBarChart
            data={MOCK_BAR_DATA}
            selectedMonth='Mar'
            barColor='#FF6240'
          />
        </div>
      </Panel>
      <Panel>
        {/* 일별 거래 리스트 */}
        <div className='space-y-4'>
          {budgetDetailResponse.data.map((group) => (
            <TransactionGroup
              key={group.label}
              label={group.label}
              rangeStart={group.rangeStart}
              rangeEnd={group.rangeEnd}
              incomeTotal={group.incomeTotal}
              expenseTotal={group.expenseTotal}
              transactions={group.transactions}
              // onTransactionClick={(tx) => {
              //   setSelectedTransaction(tx);
              //   router.push(`/transaction/${tx.id}/edit`);
              // }}
              // onHeaderClick={() => {
              //   router.push(`/transaction/new?date=${group.label}`);
              // }}
            />
          ))}
        </div>
      </Panel>
    </div>
  );
}
