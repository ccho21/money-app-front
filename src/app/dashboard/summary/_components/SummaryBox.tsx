'use client';

import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  amount: number;
}

export default function SummaryBox({ icon, title, description, amount }: Props) {
  return (
    <div className="flex justify-between items-center border rounded-lg p-4 bg-white dark:bg-zinc-900 shadow-sm">
      <div>
        <div className="flex items-center gap-2 font-medium">
          {icon}
          <span>{title}</span>
        </div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>

      <div className="text-right text-sm text-blue-500 font-semibold">
        ₩{amount.toLocaleString()}
      </div>
    </div>
  );
}
