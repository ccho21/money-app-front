'use client';

import { ReactNode } from 'react';
// import TopNav from '@/components/common/TopNav';
// import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // const router = useRouter();

  return (
    <div className=''>
      {/* <TopNav title='Trans.' onBack={router.back} /> */}
      <div className='mb-3'></div>
      {children}
    </div>
  );
}
