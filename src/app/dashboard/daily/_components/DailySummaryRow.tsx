type Props = {
  incomeTotal: number;
  expenseTotal: number;
};

export default function DailySummaryRow({ incomeTotal, expenseTotal }: Props) {
  const total = incomeTotal - expenseTotal;
  const totalColor =
    total > 0 ? 'text-blue-500' : total < 0 ? 'text-red-500' : 'text-gray-500';

  return (
    <div className="grid grid-cols-3 text-sm font-medium mb-4 px-1">
      <div className="flex flex-col items-end">
        <span className="text-gray-500">Income</span>
        <span className="text-blue-500">₩{incomeTotal.toLocaleString()}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-gray-500">Exp.</span>
        <span className="text-red-500">₩{expenseTotal.toLocaleString()}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-gray-500">Total</span>
        <span className={totalColor}>₩{total.toLocaleString()}</span>
      </div>
    </div>
  );
}
