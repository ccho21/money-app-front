// src/app/settings/layout.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { useTopNavPreset } from '@/modules/shared/hooks/useTopNavPreset';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';

export default function BudgetsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useTopNavPreset({ title: 'Budget', onBack: () => router.back() });

  const { initializeFromParams, getQueryString, isInitialized } =
    useTransactionFilterStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeFromParams(searchParams);
    }
    router.replace(getQueryString());
  }, [
    getQueryString,
    initializeFromParams,
    isInitialized,
    router,
    searchParams,
  ]);

  useTopNavPreset({
    title: 'Budgets',
  });

  return <>{children}</>;
}
