// src/modules/category/__tests__/store.test.ts
import { useCategoryStore } from '@/modules/category/stores/store';
import { CategoryDetail } from '@/modules/category/types/types';
import { act } from '@testing-library/react';

describe('useCategoryStore', () => {
  const mockCategoryDetailIncome: CategoryDetail = {
    id: 'cat-income-1',
    name: 'Salary',
    type: 'income',
    icon: '💰',
    color: '#00C853',
  };

  const mockCategoryDetailExpense: CategoryDetail = {
    id: 'cat-expense-1',
    name: 'Groceries',
    type: 'expense',
    icon: '🛒',
    color: '#FF5252',
  };

  const mockCategoryList: CategoryDetail[] = [
    mockCategoryDetailIncome,
    mockCategoryDetailExpense,
  ];

  beforeEach(() => {
    // Zustand는 전역 상태라 초기화 필요
    useCategoryStore.setState({ categories: [] });
  });

  it('should have empty initial state', () => {
    const state = useCategoryStore.getState();
    expect(state.categories).toEqual([]);
  });

  it('should set categories correctly', () => {
    act(() => {
      useCategoryStore.getState().setCategories(mockCategoryList);
    });

    expect(useCategoryStore.getState().categories).toEqual(mockCategoryList);
  });

  it('should clear categories', () => {
    act(() => {
      useCategoryStore.getState().setCategories(mockCategoryList);
    });

    act(() => {
      useCategoryStore.getState().clear();
    });

    expect(useCategoryStore.getState().categories).toEqual([]);
  });
});
