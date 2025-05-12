// src/components/dashboard/DashboardView.tsx

'use client';

import { InsightBanner } from '@/components/insightBanner';
// import { BudgetProgress } from './BudgetProgress';
import RecentTransactionList from './RecentTransactionList';
import { InsightRow } from './InsightRow';
import { TotalExpenseCard } from './TotalExpenseCard';
import { CategoryChartCard } from './CategoryChartCard';
import { BudgetOveruseAlert } from './BudgetOveruseAlert';
export function DashboardView() {
  const metricsGroupA = [
    {
      id: 'monthlyIncome',
      title: 'Monthly Income',
      value: '$3,500.00',
      delta: '+5.2%',
      deltaDirection: 'up',
      description: 'Up from last month',
      subtext: 'Includes salary & interest',
    },
    {
      id: 'todayExpense',
      title: 'Today’s Spending',
      value: '$18.00',
      delta: '-12%',
      deltaDirection: 'down',
      description: 'Lower than yesterday',
      subtext: 'Mainly food',
    },
    {
      id: 'expenseToIncomeRatio',
      title: 'Spending-to-Income Ratio',
      value: '62%',
      description: '62% of income spent',
      subtext: 'Keep an eye on spending',
    },
  ];

  const metricsGroupB = [
    {
      id: 'budgetUsageRate',
      title: 'Budget Used',
      value: '75%',
      delta: '+10%',
      deltaDirection: 'up',
      description: 'Spending pace this month',
      subtext: '3/4 of budget used',
    },
    {
      id: 'overBudgetCategoryCount',
      title: 'Over-Budget Categories',
      value: '3',
      description: 'Food, Shopping, Transport',
      subtext: 'Over by $120.00 total',
    },
    {
      id: 'accountBalanceTotal',
      title: 'Total Account Balance',
      value: '$2,740.00',
      description: 'Across all accounts',
      subtext: '3 accounts combined',
    },
  ];

  const metricsGroupC = [
    {
      id: 'dailyAvgExpense',
      title: '평균 하루 지출액',
      value: '₩72,600',
      description: '이번 달 기준',
      subtext: '전월 평균: ₩68,000',
    },
    {
      id: 'topSpendingCategory',
      title: '가장 많은 소비 카테고리',
      value: '식비 ₩480,000',
      description: '식비 지출이 전체의 32%',
      subtext: '주 3회 외식 포함',
    },
    {
      id: 'monthlyExpenseGrowth',
      title: '지출 증가율 (전월 대비)',
      value: '+12.5%',
      delta: '+12.5%',
      deltaDirection: 'up',
      description: '전월 대비 총 지출 증가',
      subtext: '교통비 증가 영향',
    },
  ];

  return (
    <section className='space-y-6 px-component py-component'>
      {/* 💡 예산 관련 인사이트 */}
      <TotalExpenseCard
        totalExpense='$2,480.00'
        budgetUsage={{ value: '75%', delta: '+10%', deltaDirection: 'up' }}
        todayExpense={{
          value: '$18.00',
          delta: '-12%',
          deltaDirection: 'down',
        }}
      />
      <CategoryChartCard
        categoryList={[
          { name: 'Food', percent: 52, color: '#3b82f6' },
          { name: 'Transport', percent: 30, color: '#10b981' },
          { name: 'Shopping', percent: 18, color: '#f59e0b' },
        ]}
      />

      <BudgetOveruseAlert
        overCount={3}
        amount='$120.00'
        message='Food, Shopping, and Transport budgets exceeded.'
      />

      <InsightBanner
        icon={<span className='text-xl'>💰</span>}
        text="You've saved 32% of your budget this month!"
        variant='default'
      />

      <InsightRow
        icon='📈'
        label='Spending Growth'
        value='+12.5%'
        subtext='Compared to last month'
        variant='alert'
      />
      {/* 🧾 최근 거래 */}
      <RecentTransactionList transactions={[]} isLoading={false} />
    </section>
  );
}
