// src/app/budget/settings/page.tsx
'use client';

import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

import DateNavigator from '@/components/navigation/DateNavigator';
// import Panel from '@/components/ui/temp/panel';

// import type { BudgetCategoryItemDTO } from '@/modules/budget/types';
// import { CategoryListItem } from '@/modules/category/components/CategoryListItem';
// import EmptyMessage from '@/components/ui/custom/emptyMessage';
// import LoadingMessage from '@/components/ui/custom/loadingMessage';

export default function BudgetSettingsPage() {
  // const router = useRouter();

  useEffect(() => {}, []);

  // const handleClick = (categoryId: string, isNew: boolean) => {
  //   router.push(
  //     isNew
  //       ? `/budget/settings/${categoryId}/new`
  //       : `/budget/settings/${categoryId}/list`
  //   );
  // };

  return (
    <div className='bg-surface text-foreground min-h-screen'>
      <DateNavigator variant='dropdown' />
      {/* <Panel>
        {budgets.items.map((item: BudgetCategoryItemDTO) => (
          <CategoryListItem
            key={item.categoryId}
            name={item.categoryName}
            amount={item.amount}
            color={item.color}
            onClick={() => handleClick(item.categoryId, item.amount === 0)}
            showProgress={false}
          />
        ))}
      </Panel> */}
    </div>
  );
}
