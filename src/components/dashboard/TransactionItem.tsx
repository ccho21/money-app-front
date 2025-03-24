// src/components/dashboard/TransactionItem.tsx

interface TransactionItemProps {
    type: 'income' | 'expense';
    amount: number;
    note?: string;
  }
  
  export default function TransactionItem({ type, amount, note }: TransactionItemProps) {
    const color = type === 'income' ? 'text-blue-500' : 'text-red-500';
  
    return (
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-sm text-gray-700 dark:text-gray-300">{note || '(메모 없음)'}</div>
        <div className={`font-medium ${color}`}>
          {type === 'income' ? '+' : '-'} ₩{amount.toLocaleString()}
        </div>
      </div>
    );
  }
  