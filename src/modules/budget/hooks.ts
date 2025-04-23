import { useState } from 'react';
import {
  fetchBudgetByCategoryAPI,
  fetchBudgetSummaryAPI,
  fetchGroupedBudgetCategoryAPI,
} from './api';
import { useBudgetStore } from './store';
import type { DateFilterParams } from '@/common/types';
import { BudgetCategoryPeriodItemDTO, BudgetGroupItemDTO } from './types';

// 📌 예산 리스트 조회용 훅
export const useBudgetList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { budgets, setBudgets } = useBudgetStore((state) => ({
    budgets: state.budgets,
    setBudgets: state.setBudgets,
  }));

  const fetchBudgets = async (params: DateFilterParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBudgetByCategoryAPI(params);
      setBudgets(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch budgets';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    budgets: budgets?.items || [],
    fetchBudgets,
    loading,
    error,
  };
};

// 📌 예산 요약 조회용 훅
export const useBudgetSummary = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { summary, setSummary } = useBudgetStore((state) => ({
    summary: state.summary,
    setSummary: state.setSummary,
  }));

  const fetchSummary = async (params: DateFilterParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBudgetSummaryAPI(params);
      setSummary(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch summary';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    summary,
    fetchSummary,
    loading,
    error,
  };
};

// 📌 budget 항목 삭제용 액션 훅
export const useBudgetActions = () => {
  const { deleteBudgetItem } = useBudgetStore((state) => ({
    deleteBudgetItem: state.deleteBudgetItem,
  }));

  return { deleteBudgetItem };
};

export const useBudgetGroup = () => {
  const [budgets, setBudgets] = useState<BudgetCategoryPeriodItemDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroupedBudgets = async (
    categoryId: string,
    params: DateFilterParams
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data: BudgetGroupItemDTO = await fetchGroupedBudgetCategoryAPI(
        categoryId,
        params
      );
      setBudgets(data.budgets);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to fetch grouped budgets';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    budgets,
    fetchGroupedBudgets,
    loading,
    error,
  };
};
