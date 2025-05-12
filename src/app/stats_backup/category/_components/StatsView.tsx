// src/app/stats/category/_components/StatsView.tsx
import { useMemo } from 'react';

import Panel from '@/components_backup/ui/panel/Panel';
import EmptyMessage from '@/components/ui/custom/emptyMessage';
import { CategoryListItem } from '../../../../components/category/CategoryListItem';
import CategoryPieChart from '@/components_backup/common/PieChart';
import { StatsCategoryGroupItemDTO } from '@/modules/stats/types';
import LoadingMessage from '@/components/ui/custom/loadingMessage';
import { Card } from '@/components_backup/ui/card';

interface CategoryChartData {
  name: string;
  value: number;
  rate: number;
  color: string;
}

interface Props {
  isLoading: boolean;
  data: StatsCategoryGroupItemDTO[];
  onItemClick: (categoryId: string) => void;
}

export default function StatsView({ isLoading, data, onItemClick }: Props) {
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
    return <LoadingMessage />;
  }

  if (data.every((item) => !item.amount)) {
    return <EmptyMessage />;
  }

  return (
    <>
      <div className=''>
        <CategoryPieChart data={categoryChart} />
      </div>
      <div className='m-compact'>
        {data.map((item) => (
          <CategoryListItem
            name={item.categoryName}
            rate={item.rate}
            amount={item.amount}
            color={item.color}
            startDate={item.rangeStart}
            endDate={item.rangeEnd}
            onClick={() => onItemClick(item.categoryId)}
            showProgress={false}
            key={item.categoryId}
          />

          // CATEGORY ITEM 이니까, 카테고리 버젯 을 보여주는 정보들만있으면 되겠네.
          // Category ID, name,
          // 버젯이 있으면,
          // amount, rate
          // 기한이있으면?? startDate, endDate progress 에 필요함.
          //
        ))}
      </div>
    </>
  );
}
