import ExpenseForm from '@/modules/transaction/components/forms/ExpenseForm';
import { render, screen, fireEvent } from '@testing-library/react';
import { wrapper } from '@/tests/test-utils';
import { useRouter } from 'next/navigation';
import { useTransactionFormStore } from '@/modules/transaction/stores/formStore';
import { useAccounts } from '@/modules/account/hooks/queries';
import { useCategories } from '@/modules/category/hooks/queries';
import {
  useSubmitTransactionMutation,
  useDeleteTransactionMutation,
} from '@/modules/transaction/hooks/queries';

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('@/modules/transaction/stores/formStore', () => ({
  useTransactionFormStore: jest.fn(),
}));
jest.mock('@/modules/account/hooks/queries', () => ({
  useAccounts: jest.fn(),
}));
jest.mock('@/modules/category/hooks/queries', () => ({
  useCategories: jest.fn(),
}));
jest.mock('@/modules/transaction/hooks/queries', () => ({
  useSubmitTransactionMutation: jest.fn(),
  useDeleteTransactionMutation: jest.fn(),
}));

describe('ExpenseForm integration', () => {
  const push = jest.fn();
  const back = jest.fn();
  const submit = jest.fn();
  const deleteTx = jest.fn();
  const store = {
    state: {
      type: 'expense' as const,
      amount: '100',
      accountId: 'acc1',
      categoryId: 'cat1',
      date: '2025-06-15',
      note: '',
      description: '',
      from: '',
      to: '',
      recurring: {
        enabled: false,
        frequency: 'monthly',
        interval: 1,
        endDate: null,
      },
    },
    setField: jest.fn(),
    isDirty: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push, back });
    (useTransactionFormStore as unknown as jest.Mock).mockImplementation(
      (sel) => sel(store)
    );
    (useAccounts as jest.Mock).mockReturnValue({
      data: [{ id: 'acc1', name: 'Cash', type: 'CASH' }],
      isLoading: false,
    });
    (useCategories as jest.Mock).mockReturnValue({
      data: [{ id: 'cat1', name: 'Food', type: 'expense', color: '#fff' }],
      isLoading: false,
    });
    (useSubmitTransactionMutation as jest.Mock).mockReturnValue({
      mutate: submit,
    });
    (useDeleteTransactionMutation as jest.Mock).mockReturnValue({
      mutate: deleteTx,
    });
  });

  it('submits and navigates to list', () => {
    store.isDirty.mockReturnValue(true);
    render(<ExpenseForm mode='new' />, { wrapper: wrapper() });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(submit).toHaveBeenCalled();
    const args = submit.mock.calls[0];
    args[1].onSuccess();
    expect(push).toHaveBeenCalledWith('/transaction/view/list');
  });

  it('deletes and goes back', () => {
    store.isDirty.mockReturnValue(false);
    render(<ExpenseForm mode='edit' transactionId='tx1' />, {
      wrapper: wrapper(),
    });

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(deleteTx).toHaveBeenCalledWith('tx1', expect.any(Object));
    deleteTx.mock.calls[0][1].onSuccess();
    expect(back).toHaveBeenCalled();
  });
});
