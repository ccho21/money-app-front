import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditBudgetDrawer } from '@/modules/budget/components/EditBudgetDrawer';
import type { ReactNode } from 'react';
import type { BudgetCategoryCreateRequest } from '@/modules/budget/types/types';

// 🧪 전역 mock 함수
const mockSetForm = jest.fn();
const mockResetForm = jest.fn();
const mockSetMode = jest.fn();
const mockMutateAsync = jest.fn().mockResolvedValue({});
const mockOnClose = jest.fn();

// 🧪 Zustand form store 타입
type BudgetFormStore = {
  form: BudgetCategoryCreateRequest;
  setForm: typeof mockSetForm;
  resetForm: typeof mockResetForm;
  setMode: typeof mockSetMode;
};

// 🧪 Drawer 컴포넌트 mock
jest.mock('@/components/ui/drawer', () => ({
  Drawer: ({
    open,
    children,
    onOpenChange,
  }: {
    open: boolean;
    children: ReactNode;
    onOpenChange: (open: boolean) => void;
  }) => (
    <div data-testid='drawer' data-open={String(open)}>
      <button onClick={() => onOpenChange(false)}>Close Drawer</button>
      {children}
    </div>
  ),
  DrawerContent: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  DrawerHeader: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  DrawerTitle: ({ children }: { children: ReactNode }) => (
    <h2 role='heading' aria-level={2}>
      {children}
    </h2>
  ),
}));

// 🧪 BudgetCategoryForm mock
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

// 🧪 Zustand store mock
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

jest.mock('@/modules/budget/stores/store', () => ({
  useBudgetStore: () => ({
    selectedBudget: {
      categoryId: 'cat-1',
      amount: 100,
      rangeStart: '2024-01-01',
      rangeEnd: '2024-12-31',
    },
  }),
}));

// 🧪 mutation mock
jest.mock('@/modules/budget/hooks/queries', () => ({
  useUpdateBudgetCategory: () => ({
    mutateAsync: mockMutateAsync,
  }),
}));

// 🧪 조건부 렌더링 hook mock
jest.mock('@/modules/shared/hooks/conditionalRender', () => ({
  useConditionalRender: jest.fn(() => true),
}));

// ======================
// ✅ 테스트 시작
// ======================

describe('EditBudgetDrawer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders drawer and initializes form in edit mode', () => {
    render(<EditBudgetDrawer onClose={mockOnClose} />);

    expect(
      screen.getByRole('heading', { name: /edit budget/i })
    ).toBeInTheDocument();
    expect(mockSetMode).toHaveBeenCalledWith('edit');
    expect(mockResetForm).toHaveBeenCalled();
    expect(mockSetForm).toHaveBeenCalledWith({
      categoryId: 'cat-1',
      amount: '100',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
    });
  });

  it('calls resetForm and onClose when drawer closes', () => {
    render(<EditBudgetDrawer onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Close Drawer'));

    expect(mockResetForm).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls mutateAsync, resetForm, and onClose on submit', async () => {
    render(<EditBudgetDrawer onClose={mockOnClose} />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        id: 'cat-1',
        data: {
          categoryId: 'cat-1',
          amount: 100,
          startDate: '2024-01-01',
          endDate: '2024-12-31',
        },
      });
      expect(mockResetForm).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
