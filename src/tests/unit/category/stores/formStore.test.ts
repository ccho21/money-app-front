// src/modules/category/__tests__/formStore.test.ts
import { useCategoryFormStore } from '@/modules/category/stores/formStore';
import { act } from '@testing-library/react';

describe('useCategoryFormStore', () => {
  beforeEach(() => {
    useCategoryFormStore.setState({
      mode: 'new',
      name: '',
      type: 'expense',
      icon: undefined,
      color: undefined,
    });
  });

  it('should have initial state', () => {
    const state = useCategoryFormStore.getState();
    expect(state).toMatchObject({
      mode: 'new',
      name: '',
      type: 'expense',
      icon: undefined,
      color: undefined,
    });
  });

  it('should update a single field using setField', () => {
    act(() => {
      useCategoryFormStore.getState().setField('name', 'Groceries');
    });
    expect(useCategoryFormStore.getState().name).toBe('Groceries');
  });

  it('should update multiple fields using setAllFields', () => {
    act(() => {
      useCategoryFormStore.getState().setAllFields({
        name: 'Food',
        icon: '🍔',
        color: '#FFA500',
      });
    });
    const state = useCategoryFormStore.getState();
    expect(state.name).toBe('Food');
    expect(state.icon).toBe('🍔');
    expect(state.color).toBe('#FFA500');
  });

  it('should change mode using setMode', () => {
    act(() => {
      useCategoryFormStore.getState().setMode('edit');
    });
    expect(useCategoryFormStore.getState().mode).toBe('edit');
  });

  it('should reset to initial state', () => {
    act(() => {
      useCategoryFormStore.getState().setAllFields({
        name: 'Random',
        icon: '🎲',
        type: 'income',
      });
      useCategoryFormStore.getState().reset();
    });

    expect(useCategoryFormStore.getState()).toMatchObject({
      mode: 'new',
      name: '',
      type: 'expense',
      icon: undefined,
      color: undefined,
    });
  });

  it('should return correct create form data', () => {
    act(() => {
      useCategoryFormStore.getState().setAllFields({
        name: ' Rent ',
        icon: '🏠',
        color: ' #FF0000 ',
        type: 'expense',
      });
    });

    const form = useCategoryFormStore.getState().getCreateFormData();
    expect(form).toEqual({
      name: 'Rent',
      icon: '🏠',
      color: '#FF0000',
      type: 'expense',
    });
  });

  it('should return correct update form data', () => {
    act(() => {
      useCategoryFormStore.getState().setAllFields({
        name: ' Salary ',
        icon: '',
        color: undefined,
        type: 'income',
      });
    });

    const form = useCategoryFormStore.getState().getUpdateFormData();
    expect(form).toEqual({
      name: 'Salary',
      type: 'income',
    });
  });
});
