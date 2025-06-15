import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddBudgetDrawer } from '@/modules/budget/components/AddBudgetDrawer';
import type { ReactNode } from 'react';
import { BudgetCategoryCreateRequest } from '@/modules/budget/types/types';

const mockSetForm = jest.fn();
const mockResetForm = jest.fn();
const mockSetMode = jest.fn();
const mockMutateAsync = jest.fn().mockResolvedValue({});
const mockOnClose = jest.fn();

type BudgetFormStore = {
  form: BudgetCategoryCreateRequest;
  setForm: typeof mockSetForm;
  resetForm: typeof mockResetForm;
  setMode: typeof mockSetMode;
};

// 👉 Drawer mock
jest.mock('@/components/ui/drawer', () => {
  const Drawer = ({
    children,
    open,
    onOpenChange,
  }: {
    children: ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) => (
    <div data-testid='mock-drawer' data-open={String(open)}>
      <button onClick={() => onOpenChange(false)}>Close Drawer</button>
      {children}
    </div>
  );

  const DrawerContent = ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  );
  const DrawerHeader = ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  );
  const DrawerTitle = ({ children }: { children: ReactNode }) => (
    <h2 role='heading' aria-level={2}>
      {children}
    </h2>
  );

  return {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
  };
});

// 👉 BudgetCategoryForm mock
jest.mock('@/modules/budget/components/BudgetCategoryForm', () => ({
  BudgetCategoryForm: ({ onSubmit }: { onSubmit: () => void }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <button type='submit'>Submit</button>
    </form>
  ),
}));

// 👉 useConditionalRender always true
jest.mock('@/modules/shared/hooks/conditionalRender', () => ({
  useConditionalRender: jest.fn(() => true),
}));

// 👉 useCreateBudgetCategory mock
jest.mock('@/modules/budget/hooks/queries', () => ({
  useCreateBudgetCategory: () => ({
    mutateAsync: mockMutateAsync,
  }),
}));

// 👉 useBudgetFormStore mock
jest.mock('@/modules/budget/stores/formStore', () => ({
  useBudgetFormStore: (selector: (store: BudgetFormStore) => unknown) =>
    selector({
      form: {
        categoryId: 'cat-1',
        amount: 100,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
      },
      setForm: mockSetForm,
      resetForm: mockResetForm,
      setMode: mockSetMode,
    }),
}));

// 👉 useBudgetStore mock
jest.mock('@/modules/budget/stores/store', () => ({
  useBudgetStore: () => ({
    selectedBudget: {
      categoryId: 'cat-1',
      rangeStart: '2024-01-01',
      rangeEnd: '2024-12-31',
    },
  }),
}));

describe('AddBudgetDrawer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders drawer with title and form', () => {
    render(<AddBudgetDrawer onClose={mockOnClose} />);
    expect(
      screen.getByRole('heading', { name: /add budget/i })
    ).toBeInTheDocument();
  });

  it('calls mutateAsync, resetForm, and onClose on submit', async () => {
    render(<AddBudgetDrawer onClose={mockOnClose} />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        categoryId: 'cat-1',
        amount: 100,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
      });
      expect(mockResetForm).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('calls resetForm and onClose when drawer closes', () => {
    render(<AddBudgetDrawer onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Close Drawer'));
    expect(mockResetForm).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
