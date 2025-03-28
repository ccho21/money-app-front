'use client';

import { formatCurrency } from '@/lib/utils';
import { CategoryListItem } from '../stats/_components/CategoryListItem';
import SummaryBox from '@/components/ui/SummaryBox';

const mockAccounts = [
  { id: '1', name: 'Cash', type: 'CASH', balance: 92 },
  { id: '2', name: 'Cash 2', type: 'CASH', balance: 8 },
  { id: '3', name: 'Cash 3', type: 'CASH', balance: 100 },
  { id: '4', name: 'Bank', type: 'BANK', balance: 4000 },
  { id: '5', name: 'Card', type: 'CARD', balance: -24.48 },
  { id: '6', name: 'Card 2', type: 'CARD', balance: -24.48 },
];

export default function AccountsPage() {
  const accounts = mockAccounts;

  const assetTotal = accounts
    .filter((a) => a.type !== 'CARD')
    .reduce((sum, a) => sum + a.balance, 0);

  const liabilityTotal = accounts
    .filter((a) => a.type === 'CARD')
    .reduce((sum, a) => sum + a.balance, 0);

  const netTotal = assetTotal + liabilityTotal;

  return (
    <div className='p-4 space-y-6'>
      {/* 상단 요약 */}
      <SummaryBox
        items={[
          {
            label: 'Assets',
            value: assetTotal,
            color: 'text-blue-600',
            prefix: '₩',
          },
          {
            label: 'Liabilities',
            value: liabilityTotal,
            color: 'text-red-500',
            prefix: '₩',
          },
          {
            label: 'Total',
            value: netTotal,
            color: 'text-black dark:text-white',
            prefix: '₩',
          },
        ]}
      />

      {/* 계좌 목록 */}
      <div className='space-y-6'>
        {['CASH', 'BANK', 'CARD'].map((type) => {
          const filtered = accounts.filter((a) => a.type === type);
          if (filtered.length === 0) return null;

          return (
            <div key={type}>
              <h3 className='text-sm font-semibold text-gray-500 mb-2'>
                {type === 'CASH' && 'Cash'}
                {type === 'BANK' && 'Bank Accounts'}
                {type === 'CARD' && 'Card'}
              </h3>
              <div className='divide-y'>
                {filtered.map((acc) => (
                  <CategoryListItem
                    key={acc.id}
                    name={acc.name}
                    amount={acc.balance}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
