// src/app/stats/page.tsx
import { redirect } from 'next/navigation';

export default function ViewPage() {
  redirect('/transaction/view/list');
}
