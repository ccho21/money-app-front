'use client';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useAccountSummary } from './_components/useAccountSummary';
import AccountsBox from './_components/AccountsBox';
import BudgetBox from './_components/BudgetBox';

export default function SummaryPage() {
  const { accountSummary, loading: accountLoading } = useAccountSummary();

  if (accountLoading) return <LoadingSpinner />;
  if (!accountSummary) return <div className='p-4'>불러오는 중...</div>;

  return (
    <>
    <div className='px-3'>
      {accountSummary && <AccountsBox accounts={accountSummary} />}
      <BudgetBox />
    </div>
    </>
  );
}
