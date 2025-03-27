interface Props {
  transaction: {
    category: string;
    memo: string;
    method: string;
    amount: number;
  };
}

export default function TransactionItem({ transaction }: Props) {
  return (
    <div className='flex justify-between items-center py-2 border-b'>
      <div>
        <div className='text-sm font-medium text-gray-700'>
          {transaction.category}
        </div>
        <div className='text-xs text-gray-500'>{transaction.memo}</div>
        <div className='text-xs text-gray-400'>{transaction.method}</div>
      </div>
      <div className='text-sm font-semibold text-red-500'>
        ${Math.abs(transaction.amount).toFixed(2)}
      </div>
    </div>
  );
}
