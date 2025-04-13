'use client';

import { useEffect, useMemo } from 'react';
import { fetchAccounts } from '@/features/account/hooks';
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
    fetchAccounts();
  }, []);

  const handleClick = (acc: Account) => {
    setSelectedAccount(acc);
    router.push(`account/${acc.id}/edit`);
  };

  return (
    <div className='bg-surface min-h-screen px-4 py-6 text-foreground'>
      <div className='space-y-8'>
        {Object.entries(accountGroups).map(([group, list]) => (
          <div key={group}>
            {/* 그룹 타이틀 */}
            <h2 className='text-xs text-muted font-semibold mb-2 px-1 tracking-wide'>
              {group}
            </h2>

            <div>
              {list.map((acc) => (
                <div
                  key={acc.id}
                  onClick={() => handleClick(acc)}
                  className='flex justify-between items-center px-2 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800 transition cursor-pointer border-b border-border'
                >
                  {/* 왼쪽: 이름 + 설명 */}
                  <div className='flex flex-col overflow-hidden'>
                    <div className='text-sm font-medium text-foreground truncate'>
                      {acc.name}
                    </div>
                  </div>
                </div>
              ))}

              {/* 빈 그룹 처리 */}
              {list.length === 0 && (
                <div className='text-sm text-muted-foreground px-2 py-3 border-b border-border'>
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
