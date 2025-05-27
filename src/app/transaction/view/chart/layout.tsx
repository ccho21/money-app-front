// src/app/transaction/view/chart/layout.tsx

import TransactionChartShell from '@/modules/transaction/components/view/TransactionChartShell';
import { ReactNode } from 'react';

export default function TransactionChartLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <TransactionChartShell>{children}</TransactionChartShell>;
}
