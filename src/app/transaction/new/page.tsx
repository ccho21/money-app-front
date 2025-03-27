'use client';

import Selector from '@/components/ui/Selector';
import { ArrowLeft, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const TABS = ['Income', 'Expense', 'Transfer'] as const;
type Tab = (typeof TABS)[number];
export default function TransactionNewPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>('Expense');

  const dateStr = '2025-03-26 (Wed)';
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [account, setAccount] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [note, setNote] = useState('');
  const [description, setDescription] = useState('');

  const saveBtnColor =
    activeTab === 'Expense'
      ? 'bg-orange-500'
      : activeTab === 'Income'
      ? 'bg-blue-500'
      : 'bg-gray-700';

  return (
    <div className='flex flex-col bg-white'>
      {/* Header */}
      <div className='flex justify-between items-center px-4 py-3 border-b'>
        <div className='flex items-center gap-3'>
          <button onClick={router.back}>
            <ArrowLeft />
          </button>
          <h1 className='text-lg font-semibold'>Expense</h1>
        </div>
        <span></span>
      </div>
      {/* Tabs */}
      <div className='flex justify-around border-b py-2 text-sm'>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 rounded-full border ${
              activeTab === tab
                ? 'border-black text-black font-semibold'
                : 'text-gray-400 border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className='px-4 py-4 space-y-5 text-sm'>
        <Row label='Date' value={dateStr} />

        <Row label='Amount'>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='border-b w-full py-1'
            placeholder='$ 0.00'
          />
          {activeTab === 'Transfer' && (
            <button className='ml-2 px-2 py-1 border text-xs rounded'>
              Fees
            </button>
          )}
        </Row>

        {activeTab === 'Transfer' ? (
          <>
            <Row label='From'>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className='border-b w-full py-1'
                placeholder='Select From Account'
              />
            </Row>
            <Row label='To'>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className='border-b w-full py-1'
                placeholder='Select To Account'
              />
            </Row>
          </>
        ) : (
          <>
            {/* <Row label='Category'>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='border-b w-full py-1'
                placeholder='Select Category'
              />
            </Row> */}
            <Selector
              label='Account'
              value={account}
              onChange={setAccount}
              onEdit={() => router.push('account')}
              options={['Cash', 'Cash 2', 'Card', 'Bank Accounts', 'Add']}
            />
            {/* <Row label='Account'>
              <input
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className='border-b w-full py-1'
                placeholder='Select Account'
              />
            </Row> */}
            <Selector
              label='Category'
              value={category}
              onChange={setCategory}
              onEdit={() => router.push('category')}
              options={[
                'Food',
                'Social Life',
                'Pets',
                'Transport',
                'Culture',
                'Household',
                'Apparel',
                'Beauty',
                'Health',
                'Education',
                'Gift',
                'Other',
                'Add',
              ]}
            />
          </>
        )}

        <Row label='Note'>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className='border-b w-full py-1'
            placeholder='Optional'
          />
        </Row>

        {/* Description & Camera */}
        <div className='pt-2'>
          <label className='text-gray-500 text-sm block mb-1'>
            Description
          </label>
          <div className='relative'>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className='w-full border rounded-md p-2 text-sm'
              placeholder='Add description...'
            />
            <button className='absolute bottom-2 right-2 text-xl'>📷</button>
          </div>
        </div>
      </div>

      {/* Save & Continue */}
      <div className='mt-auto px-4 py-4 flex justify-between gap-3 border-t'>
        <button
          className={`flex-1 text-white py-3 rounded-md font-semibold ${saveBtnColor}`}
        >
          Save
        </button>
        <button className='flex-1 border border-gray-400 text-gray-700 py-3 rounded-md font-semibold'>
          Continue
        </button>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <label className='text-gray-500 text-sm block'>{label}</label>
      <div className='flex items-center mt-1'>
        {children || <div>{value}</div>}
      </div>
    </div>
  );
}
