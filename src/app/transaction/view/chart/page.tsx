// src/app/stats/page.tsx
import { redirect } from 'next/navigation';

export default function TransactionChartPage() {
  redirect('/transaction/view/chart/flow');
}
