type Props = {
  income: number;
  expense: number;
};

export default function DailySummaryRow({ income, expense }: Props) {
  const total = income - expense;

  return (
    <div className='grid grid-cols-3 text-sm font-medium mb-4 px-1'>
      <div className='flex flex-col items-end'>
        <span className='text-gray-500'>Income</span>
        <span className='text-blue-500'>₩{income.toLocaleString()}</span>
      </div>
      <div className='flex flex-col items-end'>
        <span className='text-gray-500'>Exp.</span>
        <span className='text-red-500'>₩{expense.toLocaleString()}</span>
      </div>
      <div className='flex flex-col items-end'>
        <span className='text-gray-500'>Total</span>
        <span className='text-black'>₩{total.toLocaleString()}</span>
      </div>
    </div>
  );
}
