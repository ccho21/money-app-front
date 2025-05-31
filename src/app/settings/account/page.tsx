'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { AddAccountDrawer } from '@/modules/account/components/AddAccountDrawer';
import { EditAccountDrawer } from '@/modules/account/components/EditAccountDrawer';
import { AccountDetailDTO } from '@/modules/account/types/types';
import { fetchAccounts } from '@/modules/account/hooks/queries';

import { useTopNavPreset } from '@/modules/shared/hooks/useTopNavPreset';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/modules/shared/lib/utils';

function formatBalance(balance: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(balance);
}

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
    <div className='mt-component'>
      <h3 className='text-subheading text-muted-foreground uppercase tracking-wide'>
        {title}
      </h3>
      {list.map((acc) => {
        const icon =
          acc.type === 'CARD' ? '💳' : acc.type === 'BANK' ? '🏦' : '👛';
        const borderColor = acc.color ? `var(${acc.color})` : acc.color;
        return (
          <Card
            key={acc.id}
            className='border border-transparent border-l-4 shadow rounded-lg px-component py-component gap-compact'
            style={{ borderColor }}
          >
            <CardHeader className='px-0'>
              <CardTitle className='flex items-center gap-element text-heading p-0'>
                <span>{icon}</span>
                <span className='text-heading'>{acc.name}</span>
              </CardTitle>
              <CardDescription
                className={cn(
                  'text-body',
                  `${acc.balance < 0 ? 'text-destructive font-medium' : ''}`
                )}
              >
                <span className='text-body'>Balance: {formatBalance(acc.balance)}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className='text-label text-muted-foreground p-0 mt-2 leading-relaxed'>
              {acc.type === 'CARD' && acc.autoPayment ? (
                <div className='flex items-center space-x-2'>
                  <span className='text-blue-500 text-base'>🗓️</span>
                  <p>
                    <span className='font-medium text-gray-800'>Auto-pay:</span>{' '}
                    {acc.paymentDate}th
                    <span className='mx-1 text-gray-400'>·</span>
                    <span className='font-medium text-gray-800'>
                      Settlement:
                    </span>{' '}
                    {acc.settlementDate}th
                  </p>
                </div>
              ) : acc.description ? (
                <div className='flex items-center space-x-2'>
                  <span className='text-yellow-500 text-base'>💬</span>
                  <p className='text-gray-700'>{acc.description}</p>
                </div>
              ) : (
                <div className='flex items-center space-x-2'>
                  <span className='text-gray-400 text-base'>📝</span>
                  <p className='italic text-gray-400'>(No description)</p>
                </div>
              )}
            </CardContent>

            <CardFooter className='flex justify-end text-label px-0 gap-tight'>
              {/* <Button
                variant='default'
                size='sm'
                onClick={() => handleEdit(acc)}
                className='hover:text-primary'
              >
                Edit
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='text-destructive'
              >
                Delete
              </Button> */}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );

  return (
    <ScrollArea className=''>
      <section className=''>
        <h2 className='text-heading font-semibold'>Accounts</h2>
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

      {isNewDrawerOpen && (
        <AddAccountDrawer
          open={isNewDrawerOpen}
          onClose={() => setIsNewDrawerOpen(false)}
        />
      )}
    </ScrollArea>
  );
}
