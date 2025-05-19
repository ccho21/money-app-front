// src/app/transaction/chart/account/page.tsx
'use client';

import AccountBarChart from "@/modules/transaction/components/chart/AccountBarChart";


export default function TransactionChartAccountPage() {
  return (
    <main className='w-full pb-[10vh] space-y-component'>
      <AccountBarChart />
    </main>
  );
}
