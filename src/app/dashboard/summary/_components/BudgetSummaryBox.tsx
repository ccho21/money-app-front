'use client';

interface Props {
  total: number;
  used: number;
}

export default function BudgetSummaryBox({ total, used }: Props) {
  const percent = total > 0 ? Math.round((used / total) * 100) : 0;

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-zinc-900 shadow-sm space-y-2">
      <div className="font-medium">Budget</div>

      <div className="text-sm text-gray-500">Total Budget</div>

      <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded">
        <div
          className="bg-red-500 h-2 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-blue-500">₩{used.toLocaleString()}</span>
        <span>₩{total.toLocaleString()}</span>
      </div>

      <div className="text-right text-xs text-gray-400">{percent}%</div>
    </div>
  );
}
