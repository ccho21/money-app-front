'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { fetchAccounts } from '@/modules/account/hooks';
import { useAccountStore } from '@/modules/account/store';
import { AccountDetailDTO } from '@/modules/account/types';

import EmptyMessage from '@/components/ui/custom/emptyMessage';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components_backup/ui/card';
import { Button } from '@/components_backup/ui/button';
import { cn } from '@/lib/utils';

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

  const renderAccountItem = (acc: AccountDetailDTO) => {
    const colorDot = acc.color || '#999';

    return (
      <button
        key={acc.id}
        onClick={() => handleClick(acc)}
        className='flex items-center gap-3 px-element py-element w-full hover:bg-muted/5 transition text-left'
      >
        <div
          className='w-2.5 h-2.5 rounded-full border border-border'
          style={{ backgroundColor: colorDot }}
        />
        <div className='flex flex-col min-w-0 flex-1'>
          <span className='text-body font-medium text-foreground truncate'>
            {acc.name}
          </span>
          {acc.description && (
            <span className='text-caption text-muted-foreground truncate'>
              {acc.description}
            </span>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className='bg-surface text-foreground min-h-screen px-component py-element space-y-component'>
      {Object.entries(accountGroups).map(([group, list]) => {
        const label =
          group === 'CASH'
            ? 'Cash'
            : group === 'BANK'
            ? 'Bank Accounts'
            : 'Card Accounts';

        return (
          <Card key={group} className='p-element'>
            <CardHeader className='bg-muted/10 px-compact py-tight border-b border-border p-element'>
              <CardTitle className='text-label text-muted-foreground uppercase tracking-wide'>
                {label}
              </CardTitle>
            </CardHeader>

            <CardContent className='p-0 divide-y divide-border'>
              {list.length > 0 ? (
                list.map((acc) => renderAccountItem(acc))
              ) : (
                <div className='text-center text-muted-foreground text-sm'>
                  <EmptyMessage message='No accounts in this group.' />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
