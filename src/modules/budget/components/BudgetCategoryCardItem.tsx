import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import type { BudgetCategoryItemDTO } from '@/modules/budget/types';

export function BudgetCategoryCardItem({
  item,
  onClick,
}: {
  item: BudgetCategoryItemDTO;
  onClick: (categoryId: string, isNew: boolean) => void;
}) {
  return (
    <Card
      onClick={() => onClick(item.categoryId, item.amount === 0)}
      className='cursor-pointer hover:bg-accent transition'
    >
      <CardHeader className='flex items-center justify-between p-4'>
        <div className='flex flex-col space-y-1'>
          <CardTitle className='text-md'>{item.categoryName}</CardTitle>
          <span className='text-sm text-muted-foreground'>${item.amount}</span>
        </div>
        <Badge style={{ backgroundColor: `var(${item.color})` }} />
      </CardHeader>
    </Card>
  );
}
