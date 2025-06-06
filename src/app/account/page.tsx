'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { AddAccountDrawer } from '@/modules/account/components/AddAccountDrawer';
import { EditAccountDrawer } from '@/modules/account/components/EditAccountDrawer';
import { AccountDetailDTO } from '@/modules/account/types/types';
import { useAccounts } from '@/modules/account/hooks/queries';

import { useTopNavPreset } from '@/modules/shared/hooks/useTopNavPreset';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/modules/shared/lib/utils';
import { ChevronRight } from 'lucide-react';
import CurrencyDisplay from '@/components/ui/custom/currencyDisplay';

export default function AccountPage() {
  const router = useRouter();
  const { data: accounts = [] } = useAccounts();

  const [editId, setEditId] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useTopNavPreset({
    title: 'Accounts',
    onAdd: () => setIsAddOpen(true),
    onBack: () => router.back(),
  });

  const accountGroups = useMemo(() => {
    return {
      Card: accounts.filter((acc) => acc.type === 'CARD'),
      Bank: accounts.filter((acc) => acc.type === 'BANK'),
      Cash: accounts.filter((acc) => acc.type === 'CASH'),
    };
  }, [accounts]);

  const handleEdit = (acc: AccountDetailDTO) => {
    router.push(`/settings/account/${acc.id}`);
    // setEditId(acc.id);
  };

  const renderGroup = (title: string, list: AccountDetailDTO[]) => (
    <div className='mt-component'>
      <h3 className='text-subheading text-muted-foreground uppercase tracking-wide'>
        {title}
      </h3>
      {list.map((acc) => {
        const icon =
          acc.type === 'CARD' ? '💳' : acc.type === 'BANK' ? '🏦' : '👛';
        const borderColor = acc.color ? `var(${acc.color})` : acc.color;

        const subtitle =
          acc.type === 'CARD' && acc.autoPayment
            ? `Auto-pay: ${acc.paymentDate}th · Settlement: ${acc.settlementDate}th`
            : acc.description || '(No description)';

        return (
          <Card
            key={acc.id}
            onClick={() => handleEdit(acc)}
            data-slot='account-item'
            className={cn(
              'px-element py-compact shadow-2xs border-none rounded-none cursor-pointer'
            )}
            style={{ borderLeft: `4px solid ${borderColor}` }}
          >
            <CardContent className='p-0 flex items-center justify-between'>
              <div className='flex items-center gap-element'>
                <div className='space-y-tight'>
                  <p className='text-body font-medium truncate text-foreground flex items-center gap-1'>
                    <span>{icon}</span>
                    <span>{acc.name}</span>
                  </p>
                  <p className='text-label text-muted-foreground'>{subtitle}</p>
                </div>
              </div>

              <div className='flex justify-between items-center'>
                <div
                  className={cn(
                    'text-right space-y-tight text-body',
                    acc.balance < 0 ? 'text-destructive font-medium' : ''
                  )}
                >
                  <CurrencyDisplay
                    type={acc.balance >= 0 ? 'income' : 'expense'}
                    variant='default'
                    amount={Math.abs(acc.balance)}
                  />
                </div>
                <div className='ml-3'>
                  <ChevronRight className='text-primary h-5 w-5' />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <ScrollArea>
      <section>
        <h2 className='text-heading font-semibold'>Accounts Overview</h2>
        <p className='text-subheading text-muted-foreground'>
          Tap to edit. Long press to reorder.
        </p>
      </section>

      {Object.entries(accountGroups).map(([group, list]) => (
        <div key={group}>{renderGroup(group, list)}</div>
      ))}

      {editId && (
        <EditAccountDrawer
          open={!!editId}
          accountId={editId}
          onClose={() => setEditId(null)}
        />
      )}

      {isAddOpen && (
        <AddAccountDrawer
          open={isAddOpen}
          onClose={() => setIsAddOpen(false)}
        />
      )}
    </ScrollArea>
  );
}
