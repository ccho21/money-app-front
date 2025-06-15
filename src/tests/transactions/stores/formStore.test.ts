import { useTransactionFormStore } from '@/modules/transaction/stores/formStore';
import { act } from '@testing-library/react';

describe('useTransactionFormStore', () => {
  beforeEach(() => {
    useTransactionFormStore.setState(useTransactionFormStore.getInitialState());
  });

  it('should set a single field correctly', () => {
    act(() => {
      useTransactionFormStore.getState().setField('amount', '100');
    });
    expect(useTransactionFormStore.getState().state.amount).toBe('100');
  });

  it('should set multiple fields correctly with setAllFields', () => {
    act(() => {
      useTransactionFormStore.getState().setAllFields({
        amount: '150',
        note: 'test note',
        recurring: {
          enabled: true,
          frequency: 'weekly',
          interval: 2,
          endDate: new Date('2025-12-31'),
        },
      });
    });
    const { state } = useTransactionFormStore.getState();
    expect(state.amount).toBe('150');
    expect(state.note).toBe('test note');
    expect(state.recurring.enabled).toBe(true);
    expect(state.recurring.frequency).toBe('weekly');
  });

  it('should init with default values in new mode', () => {
    act(() => {
      useTransactionFormStore.getState().init();
    });
    const { state, initialState, mode } = useTransactionFormStore.getState();
    expect(mode).toBe('new');
    expect(state).toEqual(initialState);
  });

  it('should init with preset and switch to edit mode', () => {
    act(() => {
      useTransactionFormStore.getState().init({ amount: '200', note: 'preset' });
    });
    const { state, initialState, mode } = useTransactionFormStore.getState();
    expect(mode).toBe('edit');
    expect(state.amount).toBe('200');
    expect(state.note).toBe('preset');
    expect(state).toEqual(initialState);
  });

  it('should reset to initialState in edit mode', () => {
    act(() => {
      useTransactionFormStore.getState().init({ amount: '200' });
      useTransactionFormStore.getState().setField('note', 'changed');
      useTransactionFormStore.getState().reset();
    });
    const { state } = useTransactionFormStore.getState();
    expect(state.note).toBe('');
    expect(state.amount).toBe('200'); // from initialState
  });

  it('should reset to defaultState in new mode', () => {
    act(() => {
      useTransactionFormStore.getState().setField('amount', '999');
      useTransactionFormStore.getState().reset();
    });
    const { state } = useTransactionFormStore.getState();
    expect(state.amount).toBe('');
  });

  it('should return correct create form data for expense', () => {
    act(() => {
      useTransactionFormStore.getState().setAllFields({
        amount: '123',
        accountId: 'acc1',
        categoryId: 'cat1',
        note: 'note',
        description: 'desc',
      });
    });
    const result = useTransactionFormStore.getState().getCreateFormData();
    expect(result).toEqual(
      expect.objectContaining({
        amount: 123,
        accountId: 'acc1',
        categoryId: 'cat1',
        note: 'note',
        description: 'desc',
        type: 'expense',
      })
    );
  });

  it('should return correct create form data for transfer', () => {
    act(() => {
      useTransactionFormStore.getState().setAllFields({
        type: 'transfer',
        from: 'acc1',
        to: 'acc2',
        amount: '300',
      });
    });
    const result = useTransactionFormStore.getState().getCreateFormData();
    expect(result).toEqual({
      type: 'transfer',
      fromAccountId: 'acc1',
      toAccountId: 'acc2',
      amount: 300,
      date: expect.any(String),
      note: undefined,
      description: undefined,
    });
  });

  it('should detect if form is dirty', () => {
    act(() => {
      useTransactionFormStore.getState().init({ amount: '100' });
      useTransactionFormStore.getState().setField('amount', '101');
    });
    expect(useTransactionFormStore.getState().isDirty()).toBe(true);
  });

  it('should not be dirty if nothing changed', () => {
    act(() => {
      useTransactionFormStore.getState().init({ amount: '100' });
    });
    expect(useTransactionFormStore.getState().isDirty()).toBe(false);
  });
});
