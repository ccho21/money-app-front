// 📄 경로: src/components/ui/DailySummaryRow.tsx
'use client';

type Props = {
  incomeTotal: number;
  expenseTotal: number;
};

export default function TransactionSummaryBox({
  incomeTotal,
  expenseTotal,
}: Props) {
  const total = incomeTotal - expenseTotal;

  const totalColor = 'text-gray-900 dark:text-white';

  const incomeColor = incomeTotal > 0 ? 'text-[#3C50E0]' : 'text-gray-400'; // TailAdmin 파랑
  const expenseColor = expenseTotal > 0 ? 'text-[#fb5c4c]' : 'text-gray-400'; // TailAdmin warning 빨강

  return (
    <div className='grid grid-cols-12 text-sm px-3 pb-2 border-b border-gray-200 dark:border-zinc-700'>
      <div className='col-span-4 flex flex-col items-start'>
        <span className='text-xs text-muted-foreground'>Income</span>
        <span className={incomeColor}>₩{incomeTotal.toLocaleString()}</span>
      </div>
      <div className='col-span-4 flex flex-col items-center'>
        <span className='text-xs text-muted-foreground'>Exp.</span>
        <span className={expenseColor}>₩{expenseTotal.toLocaleString()}</span>
      </div>
      <div className='col-span-4 flex flex-col items-end'>
        <span className='text-xs text-muted-foreground'>Total</span>
        <span className={totalColor}>₩{total.toLocaleString()}</span>
      </div>
    </div>
  );
}
