// src/modules/transaction/hooks/fetches.ts

import { TransactionGroupQuery } from '@/modules/transaction/types/types';
import {
  fetchTransactionCalendarAPI,
  fetchTransactionChartFlowAPI,
  fetchTransactionGroupsAPI,
  fetchTransactionSummaryAPI,
} from '@/modules/transaction/api';
import { useTransactionStore } from '@/modules/transaction/stores/store';

// Summary
export const fetchTransactionSummary = async (params: TransactionGroupQuery) => {
  const { setSummary, setLoading, setError } = useTransactionStore.getState();

  setLoading(true);
  try {
    const data = await fetchTransactionSummaryAPI(params);
    if (data) setSummary(data);
  } catch (error) {
    console.error(error);
    setError('Transaction summary API failed');
  } finally {
    setLoading(false);
  }
};

// Calendar
export const fetchTransactionCalendar = async (params: TransactionGroupQuery) => {
  const { setCalendar, setLoading, setError } = useTransactionStore.getState();

  setLoading(true);
  try {
    const data = await fetchTransactionCalendarAPI(params);
    if (data) setCalendar(data);
  } catch (error) {
    setError('Transaction calendar API failed');
  } finally {
    setLoading(false);
  }
};

// Groups
export const fetchTransactionGroups = async (params: TransactionGroupQuery) => {
  const { setGroupList, setLoading, setError } = useTransactionStore.getState();

  setLoading(true);
  try {
    const data = await fetchTransactionGroupsAPI(params);
    if (data) setGroupList(data);
  } catch (error) {
    setError('Transaction group API failed');
  } finally {
    setLoading(false);
  }
};

// Chart: Flow
export const fetchTransactionChartFlow = async (params: TransactionGroupQuery) => {
  const { setChartFlow, setLoading, setError } = useTransactionStore.getState();

  setLoading(true);
  try {
    const data = await fetchTransactionChartFlowAPI(params);
    if (data) setChartFlow(data);
  } catch (error) {
    setError('Error in fetchTransactionChartFlow');
  } finally {
    setLoading(false);
  }
};
