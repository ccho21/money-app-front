// components/BalanceOverview.tsx

interface OverviewData {
  name: string;
  percent: number;
  color: string;
}

interface OverviewDataProps {
  totalExpense: string;
  budgetUsage: {
    value: string;
    delta?: string;
    deltaDirection?: 'up' | 'down';
  };
  todayExpense: {
    value: string;
    delta?: string;
    deltaDirection?: 'up' | 'down';
  };
  categoryList: OverviewDataProps[];
  className?: string;
}

export function BalanceOverview({
  totalExpense,
  budgetUsage,
  todayExpense,
  categoryList,
  className,
}: OverviewDataProps) {
  return (
    <section className='space-y-2'>
      <div className='flex justify-between items-center'>
        <p className='text-sm font-medium text-gray-700'>My Balance</p>
        <span className='text-xs text-muted-foreground'>May 2025</span>
      </div>
      <div className='text-3xl font-extrabold tracking-tight'>{totalExpense}</div>
      <div className='grid grid-cols-2 text-sm text-muted-foreground gap-4'>
        <div className='flex justify-between'>
          <span>Sent</span>
          <span className='text-red-500 font-semibold'>– $1,240.00</span>
        </div>
        <div className='flex justify-between'>
          <span>Processing</span>
          <span className='text-yellow-500 font-semibold'>– $360.20</span>
        </div>
      </div>
    </section>
  );
}
