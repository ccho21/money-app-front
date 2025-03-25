'use client';

interface AlertItem {
  category: string;
  budget: number;
  spent: number;
  exceededBy: number;
}

interface Props {
  alerts: AlertItem[];
}

export default function BudgetOverAlertList({ alerts }: Props) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-zinc-900 shadow-sm space-y-3">
      <div className="text-sm text-gray-500 font-medium">
        예산 초과 경고 목록
      </div>

      {alerts.map((alert) => (
        <div
          key={alert.category}
          className="text-sm flex justify-between items-center border-b pb-2 last:border-none"
        >
          <div>
            <p className="font-semibold">{alert.category}</p>
            <p className="text-xs text-gray-500">
              예산: ₩{alert.budget.toLocaleString()} / 사용: ₩
              {alert.spent.toLocaleString()}
            </p>
          </div>
          <div className="text-red-500 text-xs font-semibold">
            +₩{alert.exceededBy.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
