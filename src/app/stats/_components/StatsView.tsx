'use client';

import { useMemo } from 'react';

import Panel from '@/components/ui/Panel';
import EmptyMessage from '@/components/ui/EmptyMessage';
import { CategoryListItem } from './CategoryListItem';
import CategoryPieChart from '@/components/ui/PieChart';

interface CategoryChartData {
  name: string;
  value: number;
  percent: number;
  color: string;
}

interface Props {
  isLoading: boolean;
  data: {
    categoryId: string;
    categoryName: string;
    expense: number;
    rate: number;
    color: string;
  }[];
  onItemClick: (categoryId: string) => void;
}

export default function StatsView({ isLoading, data, onItemClick }: Props) {
  const categoryChart: CategoryChartData[] = useMemo(() => {
    return (
      data.map((category) => ({
        name: category.categoryName,
        value: category.expense,
        percent: category.rate,
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
    <div className='bg-background min-h-screen pb-[10vh]'>
      <Panel className='mb-2 px-2 py-4'>
        <Panel className='mb-2 px-2 py-4'>
          <CategoryPieChart data={categoryChart} />
        </Panel>
      </Panel>

      <Panel>
        {data.map((item) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            percentage={item.rate}
            amount={item.expense}
            onClick={() => onItemClick(item.categoryId)}
            color={item.color}
          />
        ))}
      </Panel>
    </div>
  );
}
