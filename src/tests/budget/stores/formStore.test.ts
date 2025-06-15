import { useBudgetFormStore } from '@/modules/budget/stores/formStore';
import type { BudgetCategoryCreateRequest } from '@/modules/budget/types/types';

describe('useBudgetFormStore', () => {
  beforeEach(() => {
    useBudgetFormStore.getState().resetForm();
    useBudgetFormStore.setState({ mode: 'new' });
  });

  it('sets form fields via setField', () => {
    useBudgetFormStore.getState().setField('categoryId', 'cat1');
    useBudgetFormStore.getState().setField('amount', '500');
    useBudgetFormStore.getState().setField('startDate', '2025-06-01');
    useBudgetFormStore.getState().setField('endDate', '2025-06-30');

    const form = useBudgetFormStore.getState().form;
    expect(form).toEqual({
      categoryId: 'cat1',
      amount: '500',
      startDate: '2025-06-01',
      endDate: '2025-06-30',
    });
  });

  it('sets form via setForm and coerces amount to string', () => {
    useBudgetFormStore.getState().setForm({
      categoryId: 'cat2',
      amount: 1000, // number intentionally
    });

    const form = useBudgetFormStore.getState().form;
    expect(form.categoryId).toBe('cat2');
    expect(form.amount).toBe('1000'); // ✅ coerced to string
  });

  it('resets form to initial values', () => {
    useBudgetFormStore.getState().setField('categoryId', 'x');
    useBudgetFormStore.getState().resetForm();

    expect(useBudgetFormStore.getState().form).toEqual({
      categoryId: '',
      amount: '',
      startDate: '',
      endDate: '',
    });
  });

  it('sets mode correctly', () => {
    useBudgetFormStore.getState().setMode('edit');
    expect(useBudgetFormStore.getState().mode).toBe('edit');
  });

  it('returns correct BudgetCategoryCreateRequest', () => {
    useBudgetFormStore.setState({
      form: {
        categoryId: 'c1',
        amount: '123.45',
        startDate: '2025-07-01',
        endDate: '2025-07-31',
      },
    });

    const result: BudgetCategoryCreateRequest = useBudgetFormStore
      .getState()
      .getCreateFormData();

    expect(result).toEqual({
      categoryId: 'c1',
      amount: 123.45,
      startDate: '2025-07-01',
      endDate: '2025-07-31',
    });
  });
});
