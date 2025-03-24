import { ReactNode } from 'react';

interface Props {
  icon?: ReactNode;
  title: string;
  description?: string;
  amount: number;
}

export default function SummaryBox({ icon, title, description, amount }: Props) {
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <div className="font-medium">{title}</div>
            {description && <div className="text-xs text-gray-500">{description}</div>}
          </div>
        </div>
        <div className="font-semibold text-sm">
          ₩{amount.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
