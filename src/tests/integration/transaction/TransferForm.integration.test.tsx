import TransferForm from '@/modules/transaction/components/forms/TransferForm';
import { render, screen, fireEvent } from '@testing-library/react';
import { wrapper } from '@/tests/test-utils';
import { useRouter } from 'next/navigation';
import { useTransactionFormStore } from '@/modules/transaction/stores/formStore';
import { useAccounts } from '@/modules/account/hooks/queries';
import {
  useSubmitTransferMutation,
  useDeleteTransferMutation,
} from '@/modules/transaction/hooks/queries';

jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('@/modules/transaction/stores/formStore', () => ({
  useTransactionFormStore: jest.fn(),
}));
jest.mock('@/modules/account/hooks/queries', () => ({
  useAccounts: jest.fn(),
}));
jest.mock('@/modules/transaction/hooks/queries', () => ({
  useSubmitTransferMutation: jest.fn(),
  useDeleteTransferMutation: jest.fn(),
}));

describe('TransferForm integration', () => {
  const push = jest.fn();
  const back = jest.fn();
  const submit = jest.fn();
  const deleteTx = jest.fn();
  const store = {
    state: {
      type: 'transfer' as const,
      amount: '50',
      from: 'acc1',
      to: 'acc2',
      date: '2025-06-15',
      note: '',
      description: '',
      accountId: '',
      categoryId: '',
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
      data: [
        { id: 'acc1', name: 'Cash', type: 'CASH' },
        { id: 'acc2', name: 'Bank', type: 'CASH' },
      ],
      isLoading: false,
    });
    (useSubmitTransferMutation as jest.Mock).mockReturnValue({
      mutate: submit,
    });
    (useDeleteTransferMutation as jest.Mock).mockReturnValue({
      mutate: deleteTx,
    });
  });

  it('submits and redirects', () => {
    store.isDirty.mockReturnValue(true);
    render(<TransferForm mode='new' />, { wrapper: wrapper() });

    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(submit).toHaveBeenCalled();
    submit.mock.calls[0][1].onSuccess();
    expect(push).toHaveBeenCalledWith('/transaction/view/list');
  });

  it('deletes transfer', () => {
    store.isDirty.mockReturnValue(false);
    render(<TransferForm mode='edit' transactionId='tx1' />, {
      wrapper: wrapper(),
    });

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(deleteTx).toHaveBeenCalledWith('tx1', expect.any(Object));
    deleteTx.mock.calls[0][1].onSuccess();
    expect(back).toHaveBeenCalled();
  });
});
