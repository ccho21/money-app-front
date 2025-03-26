import { useCallback, useState } from 'react';
import { api } from '@/features/shared/api';

export interface BudgetAnalysis {
  categoryName: string;
  total: number;
  used: number;
  percent: number;
}

interface UseBudgetAnalysis {
  data: BudgetAnalysis[];
  loading: boolean;
  fetchBudgetAnalysis: () => void;
}

export function useBudgetAnalysis(): UseBudgetAnalysis {
  const [data, setData] = useState<BudgetAnalysis[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBudgetAnalysis = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api<BudgetAnalysis[]>('/analysis/budgets');
      setData(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error('💥 Failed to fetch budget analysis:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, fetchBudgetAnalysis };
}
