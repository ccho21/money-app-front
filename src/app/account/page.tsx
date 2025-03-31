'use client';

import { useEffect, useMemo } from 'react';
import { fetchAccounts } from '@/services/accountService';
import { useAccountStore } from '@/stores/useAccountStore';
import { useRouter } from 'next/navigation';
import { Account } from '@/features/account/types';

export default function AccountEditPage() {
  const router = useRouter();
  const {
    state: { accounts },
    actions: { setSelectedAccount },
  } = useAccountStore();

  const accountGroups = useMemo(
    () => ({
      CARD: accounts.filter((acc) => acc.type === 'CARD'),
      BANK: accounts.filter((acc) => acc.type === 'BANK'),
      CASH: accounts.filter((acc) => acc.type === 'CASH'),
    }),
    [accounts]
  );

  useEffect(() => {
    const run = async () => {
      await fetchAccounts();
    };
    run();
  }, []);

  const handleClick = (acc: Account) => {
    setSelectedAccount(acc);
    router.push(`account/${acc.id}/edit`);
  };

  return (
    <div className='bg-white min-h-screen px-4 py-6'>
      <div className='space-y-6'>
        {Object.entries(accountGroups).map(([group, list]) => (
          <div key={group}>
            <h2 className='text-xs text-gray-500 font-semibold mb-2 px-1'>
              {group}
            </h2>

            <div className='divide-y divide-gray-200 rounded-lg border border-gray-200 overflow-hidden'>
              {list.map((acc) => (
                <div
                  onClick={() => handleClick(acc)}
                  key={acc.id}
                  className='grid grid-cols-12 gap-2 px-4 py-3 bg-white hover:bg-gray-50 transition items-center'
                >
                  {/* 이름: 한 줄 전체 */}
                  <div className='col-span-12 text-sm font-medium text-gray-900'>
                    {acc.name}
                  </div>

                  {/* 타입 */}
                  <div className='col-span-2 text-xs text-gray-500'>
                    {acc.type}
                  </div>

                  {/* 설명 */}
                  <div className='col-span-2 text-xs text-gray-400 truncate'>
                    {acc.description ?? ''}
                  </div>

                  {/* 잔액 */}
                  <div className='col-span-8 text-sm font-semibold text-gray-800 text-right'>
                    {acc.balance.toLocaleString()}원
                  </div>
                </div>
              ))}
              {list.length === 0 && (
                <div className='text-sm text-gray-400 px-4 py-3'>
                  No accounts
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
