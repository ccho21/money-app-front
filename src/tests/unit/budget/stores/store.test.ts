import { useBudgetStore } from '@/modules/budget/stores/store';
import type {
  BudgetCategoryListResponse,
  BudgetCategoryPeriodItemDTO,
} from '@/modules/budget/types/types';

describe('useBudgetStore', () => {
  beforeEach(() => {
    useBudgetStore.getState().reset();
  });

  it('sets budgets correctly', () => {
    const dummyBudgets: BudgetCategoryListResponse = {
      total: 2,
      items: [
        {
          categoryId: 'food',
          categoryName: 'Food',
          icon: '🍔',
          color: '#FF0000',
          amount: 300,
          used: 120,
          remaining: 180,
          isOver: false,
          type: 'expense',
          budgetId: 'a1',
        },
        {
          categoryId: 'transport',
          categoryName: 'Transport',
          icon: '🚗',
          color: '#00FF00',
          amount: 150,
          used: 150,
          remaining: 0,
          isOver: true,
          type: 'expense',
          budgetId: 'b2',
        },
      ],
    };

    useBudgetStore.getState().setBudgets(dummyBudgets);
    expect(useBudgetStore.getState().budgets).toEqual(dummyBudgets);
  });

  it('sets selected budget', () => {
    const selected: BudgetCategoryPeriodItemDTO = {
      label: 'June',
      rangeStart: '2025-06-01',
      rangeEnd: '2025-06-30',
      categoryId: 'food',
      amount: 300,
      used: 120,
      remaining: 180,
      isCurrent: true,
      type: 'expense',
      isOver: false,
      budgetId: 'x1',
      isUnconfigured: false,
    };

    useBudgetStore.getState().setSelectedBudget(selected);
    expect(useBudgetStore.getState().selectedBudget).toEqual(selected);
  });

  it('deletes budget item by ID', () => {
    const initialBudgets: BudgetCategoryListResponse = {
      total: 3,
      items: [
        {
          categoryId: 'a',
          categoryName: 'A',
          icon: 'A',
          amount: 100,
          used: 50,
          remaining: 50,
          isOver: false,
          type: 'expense',
          budgetId: 'a1',
        },
        {
          categoryId: 'b',
          categoryName: 'B',
          icon: 'B',
          amount: 200,
          used: 200,
          remaining: 0,
          isOver: true,
          type: 'expense',
          budgetId: 'b2',
        },
        {
          categoryId: 'c',
          categoryName: 'C',
          icon: 'C',
          amount: 300,
          used: 100,
          remaining: 200,
          isOver: false,
          type: 'expense',
          budgetId: 'c3',
        },
      ],
    };

    useBudgetStore.getState().setBudgets(initialBudgets);
    useBudgetStore.getState().deleteBudgetItem('b2');

    const updated = useBudgetStore.getState().budgets;
    expect(updated?.items.map((i) => i.budgetId)).toEqual(['a1', 'c3']);
  });

  it('resets all state', () => {
    const dummy: BudgetCategoryPeriodItemDTO = {
      label: 'July',
      rangeStart: '2025-07-01',
      rangeEnd: '2025-07-31',
      categoryId: 'entertainment',
      amount: 100,
      used: 20,
      remaining: 80,
      isCurrent: false,
      type: 'expense',
      isUnconfigured: false,
      budgetId: 'x',
    };

    const dummyBudgets: BudgetCategoryListResponse = {
      total: 1,
      items: [
        {
          categoryId: 'entertainment',
          categoryName: 'Entertainment',
          icon: '🎮',
          amount: 100,
          used: 20,
          remaining: 80,
          isOver: false,
          type: 'expense',
          budgetId: 'x',
        },
      ],
    };

    useBudgetStore.setState({
      budgets: dummyBudgets,
      selectedBudget: dummy,
    });

    useBudgetStore.getState().reset();

    const { budgets, selectedBudget } = useBudgetStore.getState();
    expect({ budgets, selectedBudget }).toEqual({
      budgets: null,
      selectedBudget: null,
    });
  });
});
