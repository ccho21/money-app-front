'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { AddAccountDrawer } from '@/modules/account/components/AddAccountDrawer';
import { EditAccountDrawer } from '@/modules/account/components/EditAccountDrawer';
import { AccountDetailDTO } from '@/modules/account/types/types';
import { fetchAccounts } from '@/modules/account/hooks/queries';

import { useTopNavPreset } from '@/modules/shared/hooks/useTopNavPreset';
import EmptyMessage from '@/components/ui/custom/emptyMessage';
import { Card } from '@/components/ui/card';

export default function AccountPage() {
  const router = useRouter();
  const { data: accounts = [] } = fetchAccounts();
  const [editId, setEditId] = useState<string | null>(null);
  const [isNewDrawerOpen, setIsNewDrawerOpen] = useState(false);

  useTopNavPreset({
    title: 'Accounts',
    onAdd: () => setIsNewDrawerOpen(true),
    onBack: () => router.back(),
  });

  const accountGroups = useMemo(
    () => ({
      CARD: accounts.filter((acc) => acc.type === 'CARD'),
      BANK: accounts.filter((acc) => acc.type === 'BANK'),
      CASH: accounts.filter((acc) => acc.type === 'CASH'),
    }),
    [accounts]
  );

  const handleClick = (acc: AccountDetailDTO) => {
    setEditId(acc.id);
  };

  const renderGroup = (title: string, list: AccountDetailDTO[]) => (
    <div className='space-y-2'>
      <h3 className='text-label text-muted-foreground font-semibold uppercase tracking-wide pl-2'>
        {title}
      </h3>
      <Card className='rounded-md bg-white divide-y divide-border p-0 shadow-xs gap-0'>
        {list.length === 0 ? (
          <EmptyMessage />
        ) : (
          list.map((acc) => (
            <button
              key={acc.id}
              onClick={() => handleClick(acc)}
              className='w-full text-left px-3 py-3 flex justify-between items-center text-body text-foreground hover:bg-muted/10 transition'
            >
              <span className='truncate'>
                <span
                  className='inline-block w-2 h-2 rounded-full mr-3'
                  style={{ backgroundColor: `${acc.color}` }}
                ></span>
                {acc.name}
              </span>
            </button>
          ))
        )}
      </Card>
    </div>
  );

  return (
    <div className='layout-shell'>
      <div className='space-y-2 p-component'>
        <div className='flex justify-between items-center'>
          <h2 className='text-heading font-semibold'>Account List</h2>
        </div>
        <p className='text-subheading text-muted-foreground'>
          Tap to edit. Long press to reorder.
        </p>
      </div>
      <div className='pt-4 px-4 space-y-8'>
        {Object.entries(accountGroups).map(([group, list]) => (
          <div key={group}>{renderGroup(group, list)}</div>
        ))}
      </div>

      {/* Drawers */}
      {editId && (
        <EditAccountDrawer
          open={!!editId}
          accountId={editId}
          onClose={() => setEditId(null)}
        />
      )}
      {isNewDrawerOpen && (
        <AddAccountDrawer
          open={isNewDrawerOpen}
          onClose={() => setIsNewDrawerOpen(false)}
        />
      )}
    </div>
  );
}
