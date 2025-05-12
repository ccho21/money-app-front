// src/app/stats/page.tsx
import { redirect } from 'next/navigation';

export default function TransactionPage() {
  redirect('/transaction/list');
}
