'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { AddAccountDrawer } from '@/modules/account/components/AddAccountDrawer';
import { EditAccountDrawer } from '@/modules/account/components/EditAccountDrawer';
import { AccountDetailDTO } from '@/modules/account/types/types';
import { fetchAccounts } from '@/modules/account/hooks/queries';

import { useTopNavPreset } from '@/modules/shared/hooks/useTopNavPreset';
import EmptyMessage from '@/components/ui/custom/emptyMessage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

  const accountGroups = useMemo(() => {
    return {
      Card: accounts.filter((acc) => acc.type === 'CARD'),
      Bank: accounts.filter((acc) => acc.type === 'BANK'),
      Cash: accounts.filter((acc) => acc.type === 'CASH'),
    };
  }, [accounts]);

  const handleEdit = (acc: AccountDetailDTO) => {
    setEditId(acc.id);
  };

  const renderGroup = (title: string, list: AccountDetailDTO[]) => (
    <div className='space-y-2'>
      <h3 className='text-sm font-semibold text-muted-foreground tracking-wide uppercase px-1'>
        {title}
      </h3>
      <Card className='shadow-sm border border-border'>
        <CardContent className='p-0 divide-y divide-border'>
          {list.length === 0 ? (
            <EmptyMessage />
          ) : (
            list.map((acc) => (
              <Button
                key={acc.id}
                variant='ghost'
                onClick={() => handleEdit(acc)}
                className='w-full justify-start px-4 py-3 text-sm font-medium text-left hover:bg-muted transition'
              >
                <span className='flex items-center gap-3 truncate'>
                  <span
                    className='inline-block w-2 h-2 rounded-full'
                    style={{ backgroundColor: acc.color }}
                  />
                  <span className='truncate'>{acc.name}</span>
                </span>
              </Button>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      <section className='space-y-1 mb-4'>
        <h2 className='text-xl font-semibold'>Account List</h2>
        <p className='text-sm text-muted-foreground'>
          Tap to edit. Long press to reorder.
        </p>
      </section>

      <div className='space-y-6'>
        {Object.entries(accountGroups).map(([group, list]) => (
          <div key={group}>{renderGroup(group, list)}</div>
        ))}
      </div>

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
    </>
  );
}
