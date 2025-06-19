import { act } from '@testing-library/react';
import { useTransactionFilterStore } from '@/modules/transaction/stores/filterStore';

describe('useTransactionFilterStore', () => {
  beforeEach(() => {
    useTransactionFilterStore.getState().resetQuery();
  });

  it('should update query with setQuery and update version if changed', () => {
    const original = useTransactionFilterStore.getState().query;
    act(() => {
      useTransactionFilterStore.getState().setQuery(() => ({
        categoryId: 'cat123',
      }));
    });
    const updated = useTransactionFilterStore.getState().query;
    expect(updated.categoryId).toBe('cat123');
    expect(updated.version).not.toBe(original.version);
  });

  it('should not update version if no changes', () => {
    const versionBefore = useTransactionFilterStore.getState().query.version;
    act(() => {
      useTransactionFilterStore.getState().setQuery(() => ({}));
    });
    const versionAfter = useTransactionFilterStore.getState().query.version;
    expect(versionAfter).toBe(versionBefore);
  });

  it('should reset query to default', () => {
    act(() => {
      useTransactionFilterStore.getState().setQuery(() => ({
        accountId: 'acc1',
      }));
      useTransactionFilterStore.getState().resetQuery();
    });

    const query = useTransactionFilterStore.getState().query;
    expect(query.accountId).toBeUndefined();
    expect(query.timeframe).toBe('monthly');
  });

  it('should initialize from URLSearchParams correctly', () => {
    const params = new URLSearchParams({
      date: '2025-05',
      timeframe: 'monthly',
      groupBy: 'category',
      type: 'expense',
      categoryId: 'cat1',
      accountId: 'acc1',
    });

    act(() => {
      useTransactionFilterStore.getState().initializeFromParams(params);
    });

    const query = useTransactionFilterStore.getState().query;
    expect(query.timeframe).toBe('monthly');
    expect(query.groupBy).toBe('category');
    expect(query.transactionType).toBe('expense');
    expect(query.categoryId).toBe('cat1');
    expect(query.accountId).toBe('acc1');
    expect(query.startDate).toMatch(/^2025-05/);
    expect(useTransactionFilterStore.getState().isInitialized).toBe(true);
  });

  it('should initialize list defaults with today’s range', () => {
    act(() => {
      useTransactionFilterStore.getState().initializeListDefaults();
    });
    const query = useTransactionFilterStore.getState().query;
    expect(query.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(query.endDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(query.timeframe).toBe('monthly');
    expect(useTransactionFilterStore.getState().isInitialized).toBe(true);
  });

  it('should generate correct query string', () => {
    act(() => {
      useTransactionFilterStore.getState().setQuery(() => ({
        startDate: '2025-01-01',
        timeframe: 'monthly',
        groupBy: 'tag',
        transactionType: 'income',
        categoryId: 'cat1',
        accountId: 'acc2',
      }));
    });

    const queryString = useTransactionFilterStore.getState().getQueryString();
    expect(queryString).toContain('?date=2025-01-01');
    expect(queryString).toContain('timeframe=monthly');
    expect(queryString).toContain('groupBy=tag');
    expect(queryString).toContain('type=income');
    expect(queryString).toContain('categoryId=cat1');
    expect(queryString).toContain('accountId=acc2');
  });

  it('should return date range key', () => {
    act(() => {
      useTransactionFilterStore.getState().setQuery(() => ({
        startDate: '2025-01-01',
        timeframe: 'monthly',
      }));
    });

    const key = useTransactionFilterStore.getState().getDateRangeKey();
    expect(key).toMatch(/^2025-01-01_2025-01-31$/);
  });
});
