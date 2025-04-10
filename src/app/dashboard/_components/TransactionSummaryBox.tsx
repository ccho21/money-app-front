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

  const incomeColor = incomeTotal > 0 ? 'text-info' : 'text-muted-foreground';
  const expenseColor =
    expenseTotal > 0 ? 'text-error' : 'text-muted-foreground';

  return (
    <div className='grid grid-cols-12 text-sm px-3 pb-2 border-b border-border'>
      <div className='col-span-4 flex flex-col items-start'>
        <span className='text-xs text-muted-foreground'>Income</span>
        <span className={incomeColor}>${incomeTotal.toLocaleString()}</span>
      </div>

      <div className='col-span-4 flex flex-col items-center'>
        <span className='text-xs text-muted-foreground'>Exp.</span>
        <span className={expenseColor}>${expenseTotal.toLocaleString()}</span>
      </div>

      <div className='col-span-4 flex flex-col items-end'>
        <span className='text-xs text-muted-foreground'>Total</span>
        <span className='text-foreground'>${total.toLocaleString()}</span>
      </div>
    </div>
  );
}
