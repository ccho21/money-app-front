'use client';

import { useMemo } from 'react';

import Panel from '@/components/ui/Panel';
import EmptyMessage from '@/components/ui/EmptyMessage';
import { CategoryListItem } from './CategoryListItem';
import CategoryPieChart from '@/components/ui/PieChart';
import Divider from '@/components/ui/Divider';

interface CategoryChartData {
  name: string;
  value: number;
  rate: number;
  color: string;
}

interface Props {
  isLoading: boolean;
  data: {
    categoryId: string;
    categoryName: string;
    amount: number;
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
      <Panel >
        <CategoryPieChart data={categoryChart} />
      </Panel>
      <Panel>
        {data.map((item) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            rate={item.rate}
            amount={item.amount}
            onClick={() => onItemClick(item.categoryId)}
            color={item.color}
          />
        ))}
      </Panel>
    </div>
  );
}
