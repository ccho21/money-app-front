type Props = {
  incomeTotal: number;
  expenseTotal: number;
};

export default function DailySummaryRow({ incomeTotal, expenseTotal }: Props) {
  const total = incomeTotal - expenseTotal;

  const totalColor =
    total > 0
      ? 'text-green-600'
      : total < 0
      ? 'text-rose-600'
      : 'text-gray-400';

  const incomeColor = incomeTotal > 0 ? 'text-blue-600' : 'text-gray-400';
  const expenseColor = expenseTotal > 0 ? 'text-red-500' : 'text-gray-400';

  return (
    <div className='grid grid-cols-3 text-sm font-medium mb-4 px-2'>
      <div className='flex flex-col items-center'>
        <span className='text-gray-500'>Income</span>
        <span className={incomeColor}>₩{incomeTotal.toLocaleString()}</span>
      </div>
      <div className='flex flex-col items-center'>
        <span className='text-gray-500'>Exp.</span>
        <span className={expenseColor}>₩{expenseTotal.toLocaleString()}</span>
      </div>
      <div className='flex flex-col items-center'>
        <span className='text-gray-500'>Total</span>
        <span className={totalColor}>₩{total.toLocaleString()}</span>
      </div>
    </div>
  );
}
