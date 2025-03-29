// 📄 경로: src/app/transaction/new/page.tsx
'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import IncomeForm from './_components/IncomeForm';
import ExpenseForm from './_components/ExpenseForm';
import TransferForm from './_components/TransferForm';
import { useTransactionFormStore } from '@/stores/useTransactionFormStore';
import { TransactionType } from '@/features/transaction/types';

const TABS = ['Income', 'Expense', 'Transfer'] as const;
type Tab = (typeof TABS)[number];

export default function TransactionNewPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('Expense');
  const setField = useTransactionFormStore((s) => s.setField);

  const handleTabChange = (tab: Tab) => {
    const type = tab.toLowerCase();
    if (['income', 'expense', 'transfer'].includes(type)) {
      setActiveTab(tab);
      setField('type', type as TransactionType);
    }
  };

  return (
    <div className='flex flex-col bg-white dark:bg-black min-h-screen'>
      {/* Header */}
      <div className='flex justify-between items-center px-4 py-3 border-b dark:border-gray-700'>
        <div className='flex items-center gap-3'>
          <button onClick={router.back}>
            <ArrowLeft className='text-gray-800 dark:text-white' />
          </button>
          <h1 className='text-lg font-semibold text-gray-800 dark:text-white'>
            {activeTab}
          </h1>
        </div>
        <span></span>
      </div>

      {/* Tabs */}
      <div className='flex justify-around border-b py-2 text-sm dark:border-gray-700'>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-1 rounded-full border transition-all duration-150 ${
              activeTab === tab
                ? 'border-black text-black dark:border-white dark:text-white font-semibold'
                : 'text-gray-400 border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className='px-4 py-5'>
        {activeTab === 'Income' && <IncomeForm />}
        {activeTab === 'Expense' && <ExpenseForm />}
        {activeTab === 'Transfer' && <TransferForm />}
      </div>
    </div>
  );
}
