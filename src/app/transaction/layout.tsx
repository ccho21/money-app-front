'use client';

import { ReactNode } from 'react';
// import TopNav from '@/components/common/TopNav';
// import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  // const router = useRouter();

  return (
    <div className='min-h-screen flex flex-col h-full'>
      <div className='flex-1 overflow-y-auto'>{children}</div>
    </div>
  );
}
