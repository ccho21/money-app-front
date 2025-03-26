import { AccountSummary } from '@/features/accounts/types';
import { api } from '@/features/shared/api';
import { useEffect, useState } from 'react';

export function useAccountSummary() {
  const [data, setData] = useState<AccountSummary[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;

        const res = await api<AccountSummary[]>(
          `/accounts/summary?year=${year}&month=${month}`
        );

        setData(res);
      } catch (err) {
        console.error('💥 AccountSummary fetch error', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // ✅ 반드시 의존성 배열을 넣어야 최초 1회만 실행됨

  return { accountSummary: data, loading };
}
