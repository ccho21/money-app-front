'use client';

import { useState } from 'react';
import { ArrowLeft, Pencil, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const accounts = {
  Cash: ['Cash', 'Cash 2'],
  Accounts: ['Bank Accounts'],
  Card: ['Card'],
};

export default function AccountEditPage() {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  return (
    <div className='bg-white'>
      {/* Header */}
      <div className='flex justify-between items-center px-4 py-3 border-b'>
        <div className='flex items-center gap-3'>
          <button onClick={router.back}>
            <ArrowLeft />
          </button>
          <h1 className='text-lg font-semibold'>Expense</h1>
        </div>
        <button>
          <Plus />
        </button>
      </div>
      {/* Account Group List */}
      <div className='px-4 py-2 space-y-4'>
        {Object.entries(accounts).map(([group, list]) => (
          <div key={group}>
            <h2 className='text-xs text-gray-500 font-semibold mb-1'>
              {group}
            </h2>
            <div className='bg-gray-100 rounded'>
              {list.map((item) => (
                <div
                  key={item}
                  className='px-4 py-3 bg-white border-b last:border-none text-sm'
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
