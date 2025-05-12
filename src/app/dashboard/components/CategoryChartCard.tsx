import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CategoryData {
  name: string;
  percent: number;
  color: string;
}

interface CategoryChartCardProps {
  categoryList: CategoryData[];
  className?: string;
}

export function CategoryChartCard({
  categoryList,
  className,
}: CategoryChartCardProps) {
  return (
    <Card className={cn('w-full gap-0', className)}>
      <CardHeader>
        <CardTitle className='text-base font-semibold text-muted-foreground'>
          Spending by Category
        </CardTitle>
      </CardHeader>

      <CardContent className='grid grid-cols-12 items-center gap-4'>
        {/* List */}
        <div className='col-span-6 sm:col-span-4'>
          <ul className='space-y-2 text-sm'>
            {categoryList.map((item) => (
              <li key={item.name} className='flex items-center gap-2'>
                <span
                  className='inline-block w-3 h-3 rounded-full'
                  style={{ backgroundColor: item.color }}
                />
                <span className='font-medium text-foreground'>{item.name}</span>
                <span className='ml-auto tabular-nums text-muted-foreground'>
                  {item.percent}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pie Chart */}
        <div className='col-span-6 sm:col-span-6 h-[140px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={categoryList}
                dataKey='percent'
                nameKey='name'
                cx='50%'
                cy='50%'
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
              >
                {categoryList.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
