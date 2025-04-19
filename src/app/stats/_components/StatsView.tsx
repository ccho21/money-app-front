'use client';

import { useMemo } from 'react';

import Panel from '@/components/ui/check/Panel';
import EmptyMessage from '@/components/ui/check/EmptyMessage';
import { CategoryListItem } from './CategoryListItem';
import CategoryPieChart from '@/components/ui/check/PieChart';

interface CategoryChartData {
  name: string;
  value: number;
  rate: number;
  color: string;
}

interface Props {
  isLoading: boolean;
  startDate?: string;
  endDate?: string;
  data: {
    categoryId: string;
    categoryName: string;
    amount: number;
    rate: number;
    color: string;
  }[];
  onItemClick: (categoryId: string) => void;
}

export default function StatsView({
  isLoading,
  data,
  startDate,
  endDate,
  onItemClick,
}: Props) {
  const categoryChart: CategoryChartData[] = useMemo(() => {
    return (
      data
        .filter((c) => c.amount > 0)
        .map((category) => ({
          name: category.categoryName,
          value: category.amount,
          rate: category.rate,
          color: category.color,
        })) || []
    );
  }, [data]);

  if (isLoading) {
    return <p className='text-center mt-10 text-muted'>Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <EmptyMessage />;
  }

  return (
    <div className=''>
      <Panel>
        <CategoryPieChart data={categoryChart} />
      </Panel>
      <Panel>
        {data.map((item) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            rate={item.rate}
            startDate={startDate}
            endDate={endDate}
            amount={item.amount}
            onClick={() => onItemClick(item.categoryId)}
            color={item.color}
            showProgress={item.amount > 0}
          />
        ))}
      </Panel>
    </div>
  );
}
