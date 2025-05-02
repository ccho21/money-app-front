// src/app/account/page.tsx
'use client';

import { useEffect, useMemo } from 'react';
import { fetchAccounts } from '@/modules/account/hooks';
import { useAccountStore } from '@/modules/account/store';
import { useRouter } from 'next/navigation';
import { AccountDetailDTO } from '@/modules/account/types';
import EmptyMessage from '@/components/ui/empty/EmptyMessage';

export default function AccountPage() {
  const router = useRouter();
  const { accounts, setSelectedAccount } = useAccountStore();

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

  const handleClick = (acc: AccountDetailDTO) => {
    setSelectedAccount(acc);
    router.push(`account/${acc.id}/edit`);
  };

  return (
    <div className='bg-surface min-h-screen px-component py-component text-foreground'>
      <div className='space-y-component'>
        {Object.entries(accountGroups).map(([group, list]) => (
          <div key={group}>
            {/* 그룹 타이틀 */}
            <h2 className='text-caption text-muted font-semibold mb-tight px-tight tracking-wide'>
              {group}
            </h2>

            <div className='rounded-default overflow-hidden border border-border divide-y divide-border'>
              {list.length > 0 ? (
                list.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => handleClick(acc)}
                    className='w-full text-left px-element py-element hover:bg-muted/10 dark:hover:bg-zinc-800 transition-colors'
                  >
                    <div className='text-label font-medium text-foreground truncate'>
                      {acc.name}
                    </div>
                  </button>
                ))
              ) : (
                <EmptyMessage />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
